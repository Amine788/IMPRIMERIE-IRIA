
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Product,
  Dimension,
  PaperType,
  FinishType,
  PrintSide,
  ProductOptionValues,
  CartItem,
  ProductCategory,
} from '../types';
import { getProductById, calculatePrice, getDeliveryEstimateDays } from '../services/productService';
import { useAppContext } from '../contexts/AppContext';
import { useCart } from '../contexts/CartContext';
import { ROUTES } from '../constants';
import Button from '../components/Button';
import { FaUpload, FaSpinner, FaTimesCircle, FaShoppingCart, FaArrowRight } from 'react-icons/fa';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { translate } = useAppContext();
  const { addToCart } = useCart();

  const product: Product | undefined = useMemo(() => getProductById(id || ''), [id]);

  const [selectedDimensionId, setSelectedDimensionId] = useState<string>('');
  const [customWidth, setCustomWidth] = useState<number | null>(null);
  const [customHeight, setCustomHeight] = useState<number | null>(null);
  const [selectedPaperTypeId, setSelectedPaperTypeId] = useState<string>('');
  const [selectedFinishTypeId, setSelectedFinishTypeId] = useState<string>('');
  const [selectedPrintSide, setSelectedPrintSide] = useState<PrintSide>(PrintSide.RECTO);
  const [quantity, setQuantity] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [deliveryDays, setDeliveryDays] = useState<number>(0);

  const isObjetsPlvWithoutPaperOrFinish = useCallback((prod: Product) => {
    return prod.category === ProductCategory.OBJETS_PLV &&
           ['mug-personnalise', 'tote-bag-personnalise', 'pens-personnalise'].includes(prod.id);
  }, []);

  useEffect(() => {
    if (product) {
      setSelectedDimensionId(product.defaultOptions.dimensionId);

      const defaultPaper = product.availablePaperTypes.find(p => p.id === product.defaultOptions.paperTypeId) || product.availablePaperTypes.find(p => p.id === 'NA_PAPER');
      setSelectedPaperTypeId(defaultPaper ? defaultPaper.id : '');

      const defaultFinish = product.availableFinishTypes.find(f => f.id === product.defaultOptions.finishTypeId) || product.availableFinishTypes.find(f => f.id === 'NA_FINISH');
      setSelectedFinishTypeId(defaultFinish ? defaultFinish.id : '');
      
      setSelectedPrintSide(product.defaultOptions.printSide);
      setQuantity(product.defaultOptions.quantity);
      
      const defaultDimension = product.availableDimensions.find(d => d.id === product.defaultOptions.dimensionId);
      if (!defaultDimension?.isCustom) {
        setCustomWidth(null);
        setCustomHeight(null);
      }
    }
  }, [product, isObjetsPlvWithoutPaperOrFinish]);

  useEffect(() => {
    if (!product || !selectedDimensionId || !quantity) {
      setCalculatedPrice(0);
      setDeliveryDays(0);
      return;
    }

    if (!selectedPaperTypeId || !selectedFinishTypeId) {
      setCalculatedPrice(0);
      setDeliveryDays(0);
      return;
    }

    const options: ProductOptionValues = {
      dimensionId: selectedDimensionId,
      paperTypeId: selectedPaperTypeId,
      finishTypeId: selectedFinishTypeId,
      printSide: selectedPrintSide,
      quantity: quantity,
    };

    const currentPrice = calculatePrice(product, options, customWidth, customHeight);
    setCalculatedPrice(currentPrice);

    const currentDeliveryDays = getDeliveryEstimateDays(product, quantity);
    setDeliveryDays(currentDeliveryDays);
  }, [
    product,
    selectedDimensionId,
    customWidth,
    customHeight,
    selectedPaperTypeId,
    selectedFinishTypeId,
    selectedPrintSide,
    quantity,
  ]);

  if (!product) {
    return <div className="text-center py-12 text-xl font-open-sans">{translate('notFound.message')}</div>;
  }

  const selectedDimension = product.availableDimensions.find(
    (d) => d.id === selectedDimensionId
  );
  
  const currentSelectedPaperType = product.availablePaperTypes.find(
    (p) => p.id === selectedPaperTypeId
  ) || { id: 'NA_PAPER', name: 'productDetail.NA_PAPER', grammage: 0, priceMultiplier: 1.0 };
  const currentSelectedFinishType = product.availableFinishTypes.find(
    (f) => f.id === selectedFinishTypeId
  ) || { id: 'NA_FINISH', name: 'productDetail.NA_FINISH', priceMultiplier: 1.0 };


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileError(null);
      if (file.size > 25 * 1024 * 1024) { 
        setFileError('Le fichier est trop volumineux (max 25 Mo).');
        setUploadedFile(null);
        return;
      }
      if (!file.type.includes('pdf')) { 
        setFileError('Seuls les fichiers PDF sont acceptés.');
        setUploadedFile(null);
        return;
      }

      setUploading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUploadedFile(file);
      setUploading(false);
    }
  };

  const createCartItem = (): CartItem | null => {
    if (!product || !selectedDimension || quantity <= 0 || !uploadedFile) {
      alert('Veuillez configurer toutes les options et uploader votre fichier.');
      return null;
    }

    return {
      productId: product.id,
      productName: product.name,
      image: product.image,
      selectedDimension: selectedDimension,
      selectedPaperType: currentSelectedPaperType,
      selectedFinishType: currentSelectedFinishType,
      selectedPrintSide: selectedPrintSide,
      quantity: quantity,
      unitPrice: calculatedPrice / quantity,
      totalPrice: calculatedPrice,
      fileUrl: uploadedFile ? URL.createObjectURL(uploadedFile) : undefined,
    };
  };

  const handleAddToCart = useCallback(() => {
    const item = createCartItem();
    if (item) {
      addToCart(item);
      navigate(ROUTES.CART);
    }
  }, [createCartItem, addToCart, navigate]);

  const handleBuyNow = useCallback(() => {
    const item = createCartItem();
    if (item) {
      addToCart(item);
      navigate(ROUTES.CHECKOUT); 
    }
  }, [createCartItem, addToCart, navigate]);

  // White inputs with clear borders
  const commonInputClasses = "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-aria-accent focus:border-aria-accent text-gray-800 bg-white transition-all duration-200";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 mb-16 border border-gray-100">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 lg:mb-8">{translate(product.name)}</h1>
      <p className="text-lg text-gray-700 mb-8 lg:mb-10 font-open-sans leading-relaxed">{translate(product.description)}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Product Image */}
        <div className="relative w-full h-[480px] lg:h-[560px] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50 flex items-center justify-center">
          <img
            src={product.image}
            alt={translate(product.name)}
            className="max-w-full max-h-full object-contain p-4 transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Configuration Options */}
        <div className="space-y-7">
          {/* Dimensions */}
          <div>
            <label htmlFor="dimension-select" className="block text-xl font-bold text-gray-800 mb-2">
              {translate('productDetail.selectDimensions')}
            </label>
            <select
              id="dimension-select"
              value={selectedDimensionId}
              onChange={(e) => setSelectedDimensionId(e.target.value)}
              className={commonInputClasses}
            >
              <option value="">{translate('productDetail.selectOption')}</option>
              {product.availableDimensions.map((dim: Dimension) => (
                <option key={dim.id} value={dim.id}>
                  {translate(dim.name)} {dim.width && dim.height ? `(${dim.width}x${dim.height} mm)` : ''}
                </option>
              ))}
            </select>
            {selectedDimension?.isCustom && (
              <div className="mt-5 grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="custom-width" className="block text-sm font-bold text-gray-700 mb-1">
                    {translate('productDetail.width')}
                  </label>
                  <input
                    type="number"
                    id="custom-width"
                    value={customWidth || ''}
                    onChange={(e) => setCustomWidth(parseInt(e.target.value) || null)}
                    placeholder={translate('productDetail.customDimensionPlaceholder')}
                    className={`${commonInputClasses} text-sm`}
                  />
                </div>
                <div>
                  <label htmlFor="custom-height" className="block text-sm font-bold text-gray-700 mb-1">
                    {translate('productDetail.height')}
                  </label>
                  <input
                    type="number"
                    id="custom-height"
                    value={customHeight || ''}
                    onChange={(e) => setCustomHeight(parseInt(e.target.value) || null)}
                    placeholder={translate('productDetail.customDimensionPlaceholder')}
                    className={`${commonInputClasses} text-sm`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Paper Type */}
          <div>
            <label htmlFor="paper-select" className="block text-xl font-bold text-gray-800 mb-2">
              {translate('productDetail.selectPaper')}
            </label>
            <select
              id="paper-select"
              value={selectedPaperTypeId}
              onChange={(e) => setSelectedPaperTypeId(e.target.value)}
              className={commonInputClasses}
            >
              <option value="">{translate('productDetail.selectOption')}</option>
              {product.availablePaperTypes.map((paper: PaperType) => (
                <option key={paper.id} value={paper.id}>
                  {translate(paper.name)} {paper.grammage ? `(${paper.grammage} ${translate('productDetail.grams')})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Finish Type */}
          <div>
            <label htmlFor="finish-select" className="block text-xl font-bold text-gray-800 mb-2">
              {translate('productDetail.selectFinish')}
            </label>
            <select
              id="finish-select"
              value={selectedFinishTypeId}
              onChange={(e) => setSelectedFinishTypeId(e.target.value)}
              className={commonInputClasses}
            >
              <option value="">{translate('productDetail.selectOption')}</option>
              {product.availableFinishTypes.map((finish: FinishType) => (
                <option key={finish.id} value={finish.id}>
                  {translate(finish.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Print Side */}
          <div>
            <label className="block text-xl font-bold text-gray-800 mb-2">
              {translate('productDetail.printSide')}
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm hover:border-aria-accent transition-all w-full">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-aria-accent border-gray-400 focus:ring-aria-accent transition-colors duration-200"
                  name="printSide"
                  value={PrintSide.RECTO}
                  checked={selectedPrintSide === PrintSide.RECTO}
                  onChange={() => setSelectedPrintSide(PrintSide.RECTO)}
                />
                <span className="ml-3 text-lg text-gray-700 font-open-sans font-medium">{translate('productDetail.RECTO')}</span>
              </label>
              <label className="inline-flex items-center cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm hover:border-aria-accent transition-all w-full">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-aria-accent border-gray-400 focus:ring-aria-accent transition-colors duration-200"
                  name="printSide"
                  value={PrintSide.RECTO_VERSO}
                  checked={selectedPrintSide === PrintSide.RECTO_VERSO}
                  onChange={() => setSelectedPrintSide(PrintSide.RECTO_VERSO)}
                />
                <span className="ml-3 text-lg text-gray-700 font-open-sans font-medium">{translate('productDetail.RECTO_VERSO')}</span>
              </label>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity-select" className="block text-xl font-bold text-gray-800 mb-2">
              {translate('productDetail.quantity')}
            </label>
            <select
              id="quantity-select"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className={commonInputClasses}
            >
              {product.quantitySteps.map((q: number) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload - White Background */}
          <div>
            <label className="block text-xl font-bold text-gray-800 mb-3">
              {translate('productDetail.uploadFile')}
            </label>
            <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-aria-accent border-dashed rounded-xl transition-all duration-200 hover:border-aria-primary bg-gray-50 hover:bg-white">
              <div className="space-y-2 text-center">
                <FaUpload className="mx-auto h-14 w-14 text-aria-accent mb-2" />
                <div className="flex text-base text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-aria-accent hover:text-aria-primary focus-within:outline-none">
                    <span>{uploadedFile ? translate('productDetail.changeFile') : 'Cliquer pour uploader'}</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" />
                  </label>
                  <p className="pl-1">ou glisser-déposer</p>
                </div>
                <p className="text-sm text-gray-500 font-open-sans">
                  {translate('productDetail.uploadFileInstructions')}
                </p>
                {uploadedFile && (
                  <p className="text-base text-gray-700 mt-2 font-medium">
                    {translate('productDetail.fileUploaded')} <span className="font-semibold text-aria-accent">{uploadedFile.name}</span>
                  </p>
                )}
                {!uploadedFile && !uploading && (
                  <p className="text-base text-gray-500 mt-2">
                    {translate('productDetail.noFileSelected')}
                  </p>
                )}
                {uploading && (
                  <p className="text-base text-aria-accent flex items-center justify-center mt-2">
                    <FaSpinner className="animate-spin mr-2" /> Téléchargement...
                  </p>
                )}
                {fileError && (
                  <p className="text-base text-red-600 flex items-center justify-center mt-2">
                    <FaTimesCircle className="mr-2" /> {fileError}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Price & Action Buttons */}
          <div className="bg-white border-2 border-aria-accent/20 p-8 rounded-xl shadow-lg text-center mt-8">
            <p className="text-xl font-bold text-gray-900 mb-2">
              {translate('productDetail.estimatedPrice')} :
            </p>

            {calculatedPrice > 0 ? (
              <>
                <p className="text-4xl font-extrabold text-aria-primary mb-2">
                  {calculatedPrice.toFixed(2)} dh
                </p>
                <p className="text-sm text-gray-400 font-semibold mb-4">Prix HT — TVA 20% en sus</p>
                <p className="text-gray-600 mb-6 font-open-sans text-sm">
                  {translate('productDetail.deliveryTime')} : <span className="font-semibold">{deliveryDays} {translate('productDetail.deliveryDays')}</span>
                </p>
              </>
            ) : (
              <p className="text-center text-gray-400 italic text-sm mb-6 py-4">
                Sélectionnez vos options pour voir le prix
              </p>
            )}
            
            <div className="flex flex-col gap-4">
                <Button
                onClick={handleAddToCart}
                className="w-full py-4 text-lg flex items-center justify-center gap-2 bg-white text-aria-primary border-2 border-aria-primary hover:bg-gray-50"
                disabled={calculatedPrice <= 0 || !uploadedFile || uploading}
                >
                <FaShoppingCart /> {translate('productDetail.addToCart')}
                </Button>

                <Button
                onClick={handleBuyNow}
                className="w-full py-4 text-xl flex items-center justify-center gap-2 shadow-xl bg-aria-accent text-white hover:bg-aria-primary"
                disabled={calculatedPrice <= 0 || !uploadedFile || uploading}
                >
                {translate('productDetail.buyNow')} <FaArrowRight />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
