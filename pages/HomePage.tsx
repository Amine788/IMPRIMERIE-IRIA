
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import AdvantagesSection from '../components/AdvantagesSection';
import CustomerReviewsSection from '../components/CustomerReviewsSection';
import { useAppContext } from '../contexts/AppContext';
import Button from '../components/Button';
import { ROUTES, PRODUCT_DATA, CURRENCY } from '../constants';
import { Product, ProductCategory } from '../types';
import { FaTruck, FaShieldAlt, FaPhone, FaTag, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

// ─── IDs des produits avec vraies photos ──────────────────────────────────────
const ARIA_PRODUCTS_IDS = [
  'flyer-standard',   // Flyers A5
  'flyer-a6',         // Flyers A6
  'flyer-dl',         // Flyers DL
  'depliant-2volets', // Dépliants A4
  'depliant-a3',      // Dépliants A3
  'carnets-ncr-a5',   // Carnets NCR A5
  'carnets-ncr-a4',   // Carnets NCR A4
  'carnets-ncr-a4-rv', // Carnets NCR A4 R/V
];

// ─── Offres Promo tirées des flyers ───────────────────────────────────────────
const PROMOS = [
  {
    qty: '5 000',
    product: 'Flyers A5',
    specs: '135g Couché • Recto/Verso',
    price: '2 300',
    highlight: true,
    id: 'flyer-standard',
  },
  {
    qty: '5 000',
    product: 'Flyers A6',
    specs: '135g Couché • Recto/Verso',
    price: '1 900',
    highlight: false,
    id: 'flyer-a6',
  },
  {
    qty: '5 000',
    product: 'Flyers DL',
    specs: '135g Couché • Recto/Verso',
    price: '1 990',
    highlight: false,
    id: 'flyer-dl',
  },
  {
    qty: '1 000',
    product: 'Dépliants A4',
    specs: '135g Couché Plié • R/V',
    price: '1 790',
    highlight: true,
    id: 'depliant-2volets',
  },
  {
    qty: '1 000',
    product: 'Dépliants A3',
    specs: '135g Couché Plié • R/V',
    price: '3 990',
    highlight: false,
    id: 'depliant-a3',
  },
];

// ─── Catégories de filtrage ────────────────────────────────────────────────────
const FILTER_CATEGORIES = [
  { key: 'all', label: 'Tout voir' },
  { key: ProductCategory.FLYERS_DEPLIANTS, label: 'Flyers & Dépliants' },
  { key: ProductCategory.PAPETERIE, label: 'Carnets & Papeterie' },
  { key: ProductCategory.CARTES, label: 'Cartes' },
  { key: ProductCategory.OBJETS_PLV, label: 'Objets & PLV' },
];

// ─── Tile produit style print24 ───────────────────────────────────────────────
const ProductTile: React.FC<{ product: Product }> = ({ product }) => {
  const { translate } = useAppContext();

  const displayPrice = useMemo(() => {
    // Pour les carnets, on affiche le prix par carnet
    if (product.id.startsWith('carnets')) {
      return `${product.basePricePerUnit.toFixed(0)} ${CURRENCY}/carnet`;
    }
    // Pour les autres, prix pour la quantité minimum
    const total = (product.basePricePerUnit * product.minQuantity);
    return `${total.toFixed(0)} ${CURRENCY}/${product.minQuantity.toLocaleString()} ex.`;
  }, [product]);

  return (
    <Link to={`${ROUTES.PRODUCTS}/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 h-full flex flex-col">
        {/* Image principale */}
        <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '3/4' }}>
          <img
            src={product.image}
            alt={translate(product.name)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=600&h=400&fit=crop';
            }}
          />
          {/* Badge catégorie */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-aria-primary text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
            {translate(`category.${product.category}`)}
          </div>
          {/* Overlay hover */}
          <div className="absolute inset-0 bg-aria-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-bold text-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Configurer <FaArrowRight className="text-sm" />
            </span>
          </div>
        </div>

        {/* Infos produit */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-extrabold text-gray-900 text-lg mb-1 leading-tight group-hover:text-aria-accent transition-colors">
            {translate(product.name)}
          </h3>
          <p className="text-xs text-gray-400 mb-4 flex-grow line-clamp-2 font-open-sans">
            {translate(product.description)}
          </p>
          <div className="border-t border-gray-100 pt-4 flex items-end justify-between">
            <div>
              <span className="text-[11px] text-gray-400 uppercase tracking-wide block font-semibold">À partir de</span>
              <span className="font-extrabold text-aria-primary text-xl leading-none">{displayPrice}</span>
            </div>
            <div className="bg-aria-accent group-hover:bg-aria-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-aria-accent/30">
              <FaArrowRight className="text-xs" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─── Carte Promo ───────────────────────────────────────────────────────────────
const PromoCard: React.FC<typeof PROMOS[0]> = ({ qty, product, specs, price, highlight, id }) => (
  <Link to={`${ROUTES.PRODUCTS}/${id}`} className="group block">
    <div className={`rounded-2xl p-5 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
      highlight
        ? 'bg-gradient-to-br from-aria-primary to-[#2B5C9E] border-aria-accent text-white shadow-lg shadow-aria-primary/30'
        : 'bg-white border-gray-200 hover:border-aria-accent'
    }`}>
      <div className={`text-xs font-black uppercase tracking-widest mb-1 ${highlight ? 'text-aria-accent' : 'text-aria-accent'}`}>
        PROMO CHOC
      </div>
      <div className={`text-sm font-bold mb-0.5 ${highlight ? 'text-blue-100' : 'text-gray-500'}`}>
        {qty} {product}
      </div>
      <div className={`text-[11px] mb-3 ${highlight ? 'text-blue-200' : 'text-gray-400'}`}>
        {specs}
      </div>
      <div className={`text-3xl font-black leading-none ${highlight ? 'text-white' : 'text-aria-primary'}`}>
        {price}
        <span className={`text-sm font-normal ml-1 ${highlight ? 'text-blue-100' : 'text-gray-400'}`}>Dh HT</span>
      </div>
      <div className={`mt-3 text-xs flex items-center gap-1 ${highlight ? 'text-blue-100' : 'text-gray-400'}`}>
        <FaCheckCircle className="text-green-400 flex-shrink-0" /> Délai: 3 à 5 jours ouvrés
      </div>
    </div>
  </Link>
);

// ─── Page d'Accueil ────────────────────────────────────────────────────────────
const HomePage: React.FC = () => {
  const { translate } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Produits Aria (avec vraies photos) en tête, puis les autres
  const ariaProducts = useMemo(
    () => PRODUCT_DATA.filter(p => ARIA_PRODUCTS_IDS.includes(p.id)),
    []
  );

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return ariaProducts;
    return ariaProducts.filter(p => p.category === activeFilter);
  }, [ariaProducts, activeFilter]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Bande de confiance ── */}
      <div className="bg-aria-primary text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <FaTruck className="text-aria-accent" />
              <span>Livraison gratuite partout au Maroc</span>
            </div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-aria-accent" />
              <span>Qualité offset garantie</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-aria-accent" />
              <span>Tiznit: 05 28 86 29 28 — Aït Melloul: 05 28 30 40 00</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section Produits style print24 ── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">

          {/* Titre section */}
          <div className="text-center mb-10">
            <span className="text-aria-accent font-black text-xs tracking-widest uppercase">Imprimerie Aria — Tiznit & Aït Melloul</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Nos Produits d'Impression
            </h2>
            <p className="text-gray-400 font-open-sans mt-2 max-w-xl mx-auto">
              Impression offset haute qualité. Prix directs imprimerie, délais rapides.
            </p>
          </div>

          {/* Filtres de catégorie */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTER_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border ${
                  activeFilter === cat.key
                    ? 'bg-aria-primary text-white border-aria-primary shadow-lg shadow-aria-primary/30'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-aria-primary hover:text-aria-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grille de produits — style print24 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductTile key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-400 py-16 font-open-sans italic">
              Aucun produit dans cette catégorie.
            </p>
          )}

          {/* Voir tous les produits */}
          <div className="text-center mt-14">
            <Button as="link" to={ROUTES.PRODUCTS} variant="outline" size="lg"
              className="group !border-aria-primary !text-aria-primary hover:!bg-aria-primary hover:!text-white transition-all duration-300 transform hover:scale-105">
              Voir tout notre catalogue <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Section Promotions Choc ── */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider mb-4">
              <FaTag /> Offres Promo
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Promos Choc du Moment
            </h2>
            <p className="text-gray-400 font-open-sans mt-2">
              Prix HT · Délais de livraison : 2 à 5 jours ouvrés · Fichiers acceptés : PDF, AI, PSD, CDR
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PROMOS.map((promo, i) => (
              <PromoCard key={i} {...promo} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button as="link" to={ROUTES.PROMOTIONS} variant="outline" size="lg"
              className="group !border-aria-accent !text-aria-accent hover:!bg-aria-accent hover:!text-white transition-all duration-300 transform hover:scale-105">
              Toutes nos promotions <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Avantages ── */}
      <AdvantagesSection />

      {/* ── Contact rapide ── */}
      <section className="py-12 bg-aria-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Besoin d'un devis personnalisé ?
          </h2>
          <p className="text-blue-100 mb-8 font-open-sans max-w-xl mx-auto">
            Notre équipe est disponible pour vous conseiller et établir un devis sur mesure rapidement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button as="link" to={ROUTES.CONTACT} variant="primary" size="lg"
              className="group !bg-aria-accent !text-white hover:scale-105 transition-all duration-300 shadow-xl shadow-aria-accent/20">
              <FaPhone className="mr-2 group-hover:rotate-12 transition-transform" /> Demander un devis
            </Button>
            <Button as="link" to={ROUTES.PRODUCTS} variant="outline" size="lg"
              className="group !bg-white !border-white !text-aria-primary hover:!bg-aria-accent hover:!text-white hover:!border-aria-accent transition-all duration-300 transform hover:scale-105">
              Configurer mon impression <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Avis clients ── */}
      <CustomerReviewsSection />
    </div>
  );
};

export default HomePage;