
import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../services/productService';
import { useAppContext } from '../contexts/AppContext';
import { ProductCategory } from '../types';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import Button from './Button';

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

  const productsToShow = filteredProducts.slice(0, 6);

  return (
    <div className="w-full">
      {/* Category Pills - Floating Style */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up delay-200">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-md ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-aria-primary to-aria-accent text-white shadow-lg ring-2 ring-offset-2 ring-aria-primary' 
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
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-md ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-aria-primary to-aria-accent text-white shadow-lg ring-2 ring-offset-2 ring-aria-primary' 
                : 'bg-white text-gray-600 hover:text-aria-primary hover:shadow-lg border border-gray-200'
              }`}
            aria-pressed={selectedCategory === category}
          >
            {translate(`category.${category}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsToShow.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {productsToShow.length === 0 && (
        <p className="text-center text-gray-500 text-xl mt-12 font-open-sans italic">
          Aucun produit trouvé dans cette catégorie.
        </p>
      )}

      {filteredProducts.length > 6 && (
        <div className="text-center mt-16 animate-fade-in-up delay-300">
          <Button as="link" to={`${ROUTES.PRODUCTS}?category=${selectedCategory === 'all' ? '' : selectedCategory}`} variant="outline" className="px-10 py-4 text-lg">
            Voir plus de {translate(`category.${selectedCategory}`)}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCategoriesTabs;