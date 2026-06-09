
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAppContext } from '../contexts/AppContext';
import { CURRENCY, ROUTES } from '../constants';
import Button from '../components/Button';
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa'; // Added FaShoppingCart for empty cart

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, getCartTotal } = useCart();
  const { translate } = useAppContext();

  const handleQuantityChange = (productId: string, optionsHash: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    updateCartItemQuantity(productId, optionsHash, newQuantity);
  };

  const generateItemHash = (item: any): string => {
    return `${item.productId}-${item.selectedDimension.id}-${item.selectedPaperType.id}-${item.selectedFinishType.id}-${item.selectedPrintSide}`;
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center"> {/* Stronger font */}
        {translate('cart.title')}
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center bg-aria-white p-12 rounded-2xl shadow-xl max-w-xl mx-auto"> {/* More padding, rounded, stronger shadow */}
          <FaShoppingCart className="mx-auto text-aria-accent text-6xl mb-6" /> {/* Larger icon */}
          <p className="text-xl text-gray-600 mb-8 font-open-sans">{translate('cart.empty')}</p> {/* Larger text */}
          <Link to={ROUTES.PRODUCTS}>
            <Button size="lg">{translate('cart.continueShopping')}</Button> {/* Larger button */}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-2/3 bg-aria-white p-8 rounded-2xl shadow-xl"> {/* More padding, rounded, stronger shadow */}
            <div className="hidden md:grid grid-cols-6 gap-4 border-b-2 pb-4 mb-6 font-bold text-gray-800 text-lg"> {/* Thicker border, bolder text, larger text */}
              <div className="col-span-2">{translate('cart.product')}</div>
              <div>{translate('cart.options')}</div>
              <div>{translate('cart.unitPrice')}</div>
              <div>{translate('cart.quantity')}</div>
              <div>{translate('cart.total')}</div>
              <div></div> {/* For remove button */}
            </div>
            {cartItems.map((item, index) => (
              <div
                key={generateItemHash(item)}
                className={`grid grid-cols-1 md:grid-cols-6 gap-4 items-center py-5 ${ /* More padding */
                  index < cartItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Product Info */}
                <div className="col-span-2 flex items-center">
                  <img
                    src={item.image}
                    alt={translate(item.productName)}
                    className="w-20 h-20 object-cover rounded-lg mr-4 shadow-sm" // Larger image, rounded, shadow
                  />
                  <span className="font-semibold text-gray-800 text-lg">{translate(item.productName)}</span> {/* Larger text */}
                </div>

                {/* Options */}
                <div className="text-base text-gray-600 font-open-sans"> {/* Larger text */}
                  <p>{translate(item.selectedDimension.name)}</p>
                  <p>{translate(item.selectedPaperType.name)}</p>
                  <p>{translate(item.selectedFinishType.name)}</p>
                  <p>{translate(item.selectedPrintSide)}</p>
                  {item.fileUrl && <p className="text-sm italic">Fichier: {item.fileUrl.split('/').pop()}</p>}
                </div>

                {/* Unit Price */}
                <div className="font-open-sans text-gray-700 text-base">
                  {item.unitPrice.toFixed(2)} {CURRENCY}
                </div>

                {/* Quantity */}
                <div>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.productId,
                        generateItemHash(item),
                        parseInt(e.target.value)
                      )
                    }
                    className="w-24 p-2.5 border border-gray-300 rounded-lg text-center shadow-sm focus:ring-aria-accent focus:border-aria-accent" // Larger, rounded, shadow
                    aria-label={`Quantité pour ${translate(item.productName)}`}
                  />
                </div>

                {/* Total Price for Item */}
                <div className="font-bold text-xl text-aria-primary font-open-sans"> {/* Larger, bolder text */}
                  {item.totalPrice.toFixed(2)} {CURRENCY}
                </div>

                {/* Remove Button */}
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.productId, generateItemHash(item))}
                    className="text-red-500 hover:text-red-700 p-2"
                    aria-label={`Supprimer ${translate(item.productName)} du panier`}
                  >
                    <FaTrashAlt className="h-5 w-5" /> {/* Larger icon */}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:w-1/3 bg-aria-white p-8 rounded-2xl shadow-xl h-fit"> {/* More padding, rounded, stronger shadow */}
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b-2 pb-4"> {/* Larger, bolder title, thicker border */}
              {translate('cart.totalToPay')}
            </h2>
            <div className="space-y-4 font-open-sans">
              <div className="flex justify-between text-lg text-gray-700"> {/* Larger text */}
                <span>{translate('cart.subtotal')}:</span>
                <span className="font-semibold">{getCartTotal().toFixed(2)} {CURRENCY}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-700"> {/* Larger text */}
                <span>{translate('cart.delivery')}:</span>
                <span className="font-semibold text-green-600">Gratuite</span>
              </div>
              <div className="flex justify-between text-4xl font-extrabold text-gray-900 border-t-2 pt-4 mt-6"> {/* Larger, bolder text, thicker border */}
                <span>Total:</span>
                <span className="text-aria-primary">{getCartTotal().toFixed(2)} {CURRENCY}</span>
              </div>
            </div>
            <Link to={ROUTES.CHECKOUT} className="block mt-10"> {/* More margin */}
              <Button className="w-full text-xl py-4"> {/* Larger button */}
                {translate('cart.proceedToCheckout')}
              </Button>
            </Link>
            <Link to={ROUTES.PRODUCTS} className="block mt-5 text-center text-aria-accent hover:underline text-lg font-semibold"> {/* More margin, larger text, bolder */}
              {translate('cart.continueShopping')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;