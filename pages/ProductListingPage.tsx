import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';
import { useAppContext } from '../contexts/AppContext';
import { ProductCategory } from '../types';
import { ROUTES } from '../constants';
import { AriaPricingCatalog, PricingSheet } from '../pricingData';
import PriceCalculator from '../components/PriceCalculator';
import { 
  FaBookOpen, 
  FaFileInvoice, 
  FaTags, 
  FaInfoCircle, 
  FaArrowRight, 
  FaCheck, 
  FaCalendarAlt, 
  FaPhone, 
  FaEnvelope, 
  FaRegListAlt,
  FaCalculator
} from 'react-icons/fa';

const ProductListingPage: React.FC = () => {
  const { translate } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Onglet actif : 'catalog' | 'pricing' | 'calculator'
  const [activeTab, setActiveTab] = useState<'catalog' | 'pricing' | 'calculator'>('catalog');
  
  // Catégorie sélectionnée dans la vue catalogue
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  
  // Produit tarifaire sélectionné
  const [selectedPricingId, setSelectedPricingId] = useState<string>('flyer-a6');

  // Synchronisation avec les hashes d'URL (ex: #tarifs, #calculateur)
  useEffect(() => {
    if (location.hash === '#tarifs') {
      setActiveTab('pricing');
    } else if (location.hash === '#calculateur') {
      setActiveTab('calculator');
    } else {
      setActiveTab('catalog');
    }
  }, [location.hash]);

  const allProducts = useMemo(() => getProducts(), []);

  // Catégories uniques
  const categories = useMemo(() => {
    const uniqueCategories = new Set<ProductCategory>();
    allProducts.forEach(product => uniqueCategories.add(product.category));
    return Array.from(uniqueCategories).sort((a, b) => 
      translate(`category.${a}`).localeCompare(translate(`category.${b}`))
    );
  }, [allProducts, translate]);

  // Filtrage des produits pour le catalogue
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return allProducts;
    }
    return allProducts.filter(product => product.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  // Fiche tarifaire sélectionnée
  const selectedPricingSheet = useMemo(() => {
    return AriaPricingCatalog.find(sheet => sheet.id === selectedPricingId) || AriaPricingCatalog[0];
  }, [selectedPricingId]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête de page principal */}
      <div className="text-center mb-10 animate-fade-in-down">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-aria-primary mb-4 tracking-tight">
          {activeTab === 'catalog' 
            ? translate('productListing.title') 
            : activeTab === 'pricing'
            ? 'Grilles Tarifaires de l\'Imprimerie'
            : 'Calculateur de Prix Instantané'
          }
        </h1>
        <p className="text-lg text-gray-500 font-open-sans max-w-2xl mx-auto">
          {activeTab === 'catalog'
            ? 'Découvrez nos supports d\'impression de haute qualité avec configuration en temps réel.'
            : activeTab === 'pricing'
            ? 'Consultez les grilles de prix détaillées pour nos produits phares de flyers, dépliants et carnets.'
            : 'Obtenez votre prix en temps réel — Sélectionnez le produit, les options et la quantité.'
          }
        </p>
      </div>

      {/* Selecteur d'onglet principal (Style print24) */}
      <div className="flex justify-center mb-10">
        <div className="bg-gray-150 p-1.5 rounded-2xl inline-flex flex-wrap gap-1 shadow-inner border border-gray-200">
          <button
            onClick={() => {
              navigate(ROUTES.PRODUCTS);
              setActiveTab('catalog');
            }}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
              activeTab === 'catalog'
                ? 'bg-aria-primary text-white shadow-lg'
                : 'text-gray-600 hover:text-aria-primary hover:bg-gray-100'
            }`}
          >
            <FaBookOpen className="inline mr-2 text-base" /> Catalogue
          </button>
          <button
            onClick={() => {
              navigate(`${ROUTES.PRODUCTS}#tarifs`);
              setActiveTab('pricing');
            }}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
              activeTab === 'pricing'
                ? 'bg-aria-primary text-white shadow-lg'
                : 'text-gray-600 hover:text-aria-primary hover:bg-gray-100'
            }`}
          >
            <FaFileInvoice className="inline mr-2 text-base" /> Grille des Tarifs
          </button>
          <button
            onClick={() => {
              navigate(`${ROUTES.PRODUCTS}#calculateur`);
              setActiveTab('calculator');
            }}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'calculator'
                ? 'bg-gradient-to-r from-aria-accent to-aria-primary text-white shadow-lg'
                : 'text-gray-600 hover:text-aria-primary hover:bg-gray-100'
            }`}
          >
            <FaCalculator className="text-base" />
            Calculateur de Prix
            {activeTab !== 'calculator' && (
              <span className="ml-1 bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                NEW
              </span>
            )}
          </button>
        </div>
      </div>

      {/* CONTENU ONGLET 1 : CATALOGUE */}
      {activeTab === 'catalog' && (
        <div className="space-y-8 animate-fade-in-up">
          {/* Boutons de filtres */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-250 transform hover:-translate-y-0.5 active:scale-95 shadow-sm ${
                selectedCategory === 'all'
                  ? 'bg-aria-primary text-white shadow-aria-primary/30 ring-2 ring-offset-2 ring-aria-primary' 
                  : 'bg-white text-gray-600 hover:text-aria-primary hover:shadow-md border border-gray-200'
              }`}
            >
              {translate('productListing.allCategories')}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-250 transform hover:-translate-y-0.5 active:scale-95 shadow-sm ${
                  selectedCategory === category
                    ? 'bg-aria-primary text-white shadow-aria-primary/30 ring-2 ring-offset-2 ring-aria-primary' 
                    : 'bg-white text-gray-600 hover:text-aria-primary hover:shadow-md border border-gray-200'
                }`}
              >
                {translate(`category.${category}`)}
              </button>
            ))}
          </div>

          {/* Grille de cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl font-open-sans italic">
                Aucun produit trouvé dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      )}

      {/* CONTENU ONGLET 2 : GRILLE DES TARIFS */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-fade-in-up">
          
          {/* COLONNE GAUCHE : SÉLECTEUR DE PRODUITS (4/12 width) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-lg font-black text-aria-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <FaRegListAlt className="text-aria-accent" /> Sélectionner un produit
            </h3>
            
            {/* Vue mobile : select drop-down */}
            <div className="block lg:hidden">
              <select
                value={selectedPricingId}
                onChange={(e) => setSelectedPricingId(e.target.value)}
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-aria-accent focus:border-aria-accent text-gray-800 font-bold"
              >
                {AriaPricingCatalog.map((sheet) => (
                  <option key={sheet.id} value={sheet.id}>
                    {sheet.name} {sheet.subtitle ? `(${sheet.subtitle})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Vue desktop : sidebar de boutons interactifs */}
            <div className="hidden lg:flex flex-col space-y-2">
              {AriaPricingCatalog.map((sheet) => {
                const isActive = sheet.id === selectedPricingId;
                return (
                  <button
                    key={sheet.id}
                    onClick={() => setSelectedPricingId(sheet.id)}
                    className={`text-left p-4 rounded-xl font-bold transition-all duration-300 border flex items-center justify-between ${
                      isActive
                        ? 'bg-aria-primary text-white border-aria-primary shadow-xl shadow-aria-primary/10 translate-x-2'
                        : 'bg-white text-gray-700 hover:text-aria-primary border-gray-200 hover:border-aria-accent hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <span className="block text-base leading-tight">{sheet.name}</span>
                      {sheet.subtitle && (
                        <span className={`text-xs block mt-1 ${isActive ? 'text-blue-200 font-medium' : 'text-gray-400 font-normal'}`}>
                          {sheet.subtitle}
                        </span>
                      )}
                    </div>
                    <FaArrowRight className={`text-sm transition-transform duration-300 ${isActive ? 'translate-x-1 text-aria-accent' : 'text-gray-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Carte de réassurance en dessous des tarifs */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-md mt-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-aria-accent" /> Informations Utiles
              </h4>
              <ul className="space-y-3 text-sm text-gray-500 font-open-sans">
                <li className="flex items-start gap-2">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Tous les prix sont affichés en <strong>DH Hors Taxes (HT)</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Délais de livraison : <strong>2 à 5 jours ouvrés</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Formats acceptés : PDF, AI, PSD, CDR (CMJN 300 DPI).</span>
                </li>
              </ul>
              <div className="border-t border-gray-100 pt-4 mt-4 space-y-2.5 text-xs font-semibold text-gray-700">
                <a href="tel:0528304000" className="flex items-center gap-2 hover:text-aria-accent transition-colors">
                  <FaPhone className="text-aria-accent" /> Aït Melloul : 05 28 30 40 00
                </a>
                <a href="tel:0528862928" className="flex items-center gap-2 hover:text-aria-accent transition-colors">
                  <FaPhone className="text-aria-accent" /> Tiznit : 05 28 86 29 28
                </a>
                <a href="mailto:imprimerie.aria@gmail.com" className="flex items-center gap-2 hover:text-aria-accent transition-colors">
                  <FaEnvelope className="text-aria-accent" /> imprimerie.aria@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : FICHE TARIFAIRE DÉTAILLÉE (8/12 width) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-150 p-6 md:p-8 shadow-lg">
              
              {/* Entête Fiche */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-aria-accent">Fiche Tarifaire</span>
                  <h2 className="text-3xl font-extrabold text-aria-primary mt-1">
                    {selectedPricingSheet.name}
                  </h2>
                  {selectedPricingSheet.subtitle && (
                    <p className="text-sm font-semibold text-gray-500 mt-1">
                      Format : {selectedPricingSheet.dimensions}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm mt-3 font-open-sans leading-relaxed">
                    {selectedPricingSheet.description}
                  </p>
                </div>
                {/* Image flyer miniature */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 shadow-sm flex items-center justify-center">
                  <img
                    src={selectedPricingSheet.image}
                    alt={selectedPricingSheet.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=300&h=300&fit=crop';
                    }}
                  />
                </div>
              </div>

              {/* Badge Promo si disponible */}
              {selectedPricingSheet.promo && (
                <div className="mt-6 bg-gradient-to-r from-red-500 to-[#e11d48] text-white p-4 rounded-xl flex items-center gap-3 shadow-md animate-pulse">
                  <FaTags className="text-xl flex-shrink-0" />
                  <div className="font-extrabold text-sm md:text-base leading-snug">
                    {selectedPricingSheet.promo.text}
                  </div>
                </div>
              )}

              {/* Tableaux de Prix */}
              <div className="mt-8 space-y-8">
                {selectedPricingSheet.tables.map((table, tIdx) => (
                  <div key={tIdx} className="space-y-3">
                    <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-aria-accent rounded-full"></span>
                      {table.title}
                    </h4>
                    <div className="overflow-x-auto rounded-xl border border-gray-150 shadow-sm bg-white">
                      <table className="w-full text-left border-collapse font-open-sans">
                        <thead>
                          <tr className="bg-aria-primary text-white text-sm font-extrabold font-montserrat">
                            {table.headers.map((header, hIdx) => (
                              <th key={hIdx} className="p-4 uppercase tracking-wider text-xs border-r border-aria-primary/10">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, rIdx) => {
                            // Détecter s'il faut surligner la ligne de promo (ex: ligne 5000 ex si promo)
                            const isPromoRow = selectedPricingSheet.promo && 
                              typeof row[0] === 'string' &&
                              row[0].includes(selectedPricingSheet.promo.preselect.quantity.toLocaleString());

                            return (
                              <tr
                                key={rIdx}
                                className={`text-sm transition-colors duration-150 border-b border-gray-150 ${
                                  isPromoRow
                                    ? 'bg-amber-50/70 hover:bg-amber-100/70 border-l-4 border-l-amber-500 font-semibold'
                                    : 'hover:bg-gray-50'
                                } ${rIdx % 2 === 1 && !isPromoRow ? 'bg-gray-50/30' : ''}`}
                              >
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`p-4 border-r border-gray-100 ${
                                      cIdx === 0 ? 'font-bold text-gray-900' : 'text-gray-700 font-semibold'
                                    }`}
                                  >
                                    {typeof cell === 'number' ? `${cell.toLocaleString()} dh` : cell}
                                    {isPromoRow && cIdx > 0 && (
                                      <span className="text-[10px] bg-red-100 text-red-600 font-extrabold px-1.5 py-0.5 rounded ml-2 uppercase">
                                        PROMO
                                      </span>
                                    )}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              {/* Options Additionnelles */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                  <FaInfoCircle className="text-aria-accent" /> Options & Finitions Disponibles
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPricingSheet.options.map((opt, optIdx) => (
                    <div key={optIdx} className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex justify-between items-center text-sm font-open-sans">
                      <span className="text-gray-700 font-medium">{opt.name}</span>
                      <span className="text-aria-primary font-bold bg-white px-2 py-1 rounded-lg border border-gray-200">
                        {opt.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton de configuration directe */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500 font-open-sans flex items-center gap-2">
                  <FaCalendarAlt className="text-aria-accent" /> Délai moyen constaté : 2 à 5 jours ouvrés
                </div>
                
                <button
                  onClick={() => {
                    // Redirection vers la page produit configurateur
                    navigate(`${ROUTES.PRODUCTS}/${selectedPricingSheet.id}`);
                  }}
                  className="btn-3d w-full md:w-auto bg-aria-accent hover:bg-aria-primary text-white font-extrabold px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-aria-accent/20 text-base"
                >
                  Configurer & Commander <FaArrowRight className="text-sm" />
                </button>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* CONTENU ONGLET 3 : CALCULATEUR DE PRIX */}
      {activeTab === 'calculator' && (
        <div className="animate-fade-in-up">
          <PriceCalculator />
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;