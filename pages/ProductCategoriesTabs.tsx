
import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';
import { useAppContext } from '../contexts/AppContext';
import { ProductCategory, Product } from '../types';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import Button from '../components/Button';

const ProductCategoriesTabs: React.FC = () => {
  const { translate } = useAppContext();
  const allProducts = useMemo(() => getProducts(), []);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const categories = useMemo(() => {
    const uniqueCategories = new Set<ProductCategory>();
    allProducts.forEach(product => uniqueCategories.add(product.category));
    return Array.from(uniqueCategories).sort((a, b) => translate(`category.${a}`).localeCompare(translate(`category.${b}`)));
  }, [allProducts, translate]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return allProducts;
    }
    return allProducts.filter(product => product.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  // Limit to 6 products for a cleaner homepage view, can be adjusted
  const productsToShow = filteredProducts.slice(0, 6);

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in-up delay-200">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-3 rounded-full font-bold transition-all duration-200 transform hover:-translate-y-1 active:scale-95 shadow-md ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-aria-primary to-aria-accent text-white shadow-aria-primary/30 ring-2 ring-offset-2 ring-aria-primary' 
              : 'bg-white text-gray-600 hover:text-aria-primary hover:shadow-lg border border-gray-200'
            }`}
          aria-pressed={selectedCategory === 'all'}
        >
          {translate('productListing.allCategories')}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-200 transform hover:-translate-y-1 active:scale-95 shadow-md ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-aria-primary to-aria-accent text-white shadow-aria-primary/30 ring-2 ring-offset-2 ring-aria-primary' 
                : 'bg-white text-gray-600 hover:text-aria-primary hover:shadow-lg border border-gray-200'
              }`}
            aria-pressed={selectedCategory === category}
          >
            {translate(`category.${category}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsToShow.map((product, index) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {productsToShow.length === 0 && (
        <p className="text-center text-gray-600 text-xl mt-12 animate-fade-in-up delay-300 font-open-sans">
          Aucun produit trouvé dans cette catégorie.
        </p>
      )}

      {filteredProducts.length > 6 && (
        <div className="text-center mt-12 animate-fade-in-up delay-400">
          <Button as="link" to={`${ROUTES.PRODUCTS}?category=${selectedCategory === 'all' ? '' : selectedCategory}`} variant="outline">
            Voir plus de {translate(`category.${selectedCategory}`)} &rarr;
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCategoriesTabs;