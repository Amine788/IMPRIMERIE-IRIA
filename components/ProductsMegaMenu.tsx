
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { ProductCategory, Product } from '../types';

interface ProductsMegaMenuProps {
  products: Product[];
  translate: (key: string) => string;
  onLinkClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProductsMegaMenu: React.FC<ProductsMegaMenuProps> = ({ products, translate, onLinkClick, onMouseEnter, onMouseLeave }) => {
  const categoriesMap = new Map<ProductCategory, Product[]>();
  products.forEach(product => {
    if (!categoriesMap.has(product.category)) {
      categoriesMap.set(product.category, []);
    }
    categoriesMap.get(product.category)?.push(product);
  });

  const categories = Array.from(categoriesMap.keys()).sort();

  return (
    <div
      className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl z-40 border-t border-gray-100 animate-fade-in-down origin-top"
      aria-orientation="horizontal"
      role="menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {categories.map(category => (
            <div key={category} className="group">
              <h3 className="font-extrabold text-aria-primary text-base mb-4 uppercase tracking-wider border-b-2 border-transparent group-hover:border-aria-accent/30 pb-1 transition-colors inline-block">
                <Link to={`${ROUTES.PRODUCTS}?category=${category}`} onClick={onLinkClick}>
                  {translate(`category.${category}`)}
                </Link>
              </h3>
              <ul className="space-y-3">
                {categoriesMap.get(category)?.slice(0, 5).map(product => (
                  <li key={product.id}>
                    <Link
                      to={`${ROUTES.PRODUCTS}/${product.id}`}
                      onClick={onLinkClick}
                      className="text-gray-500 hover:text-aria-accent hover:translate-x-1 transition-all duration-200 block text-sm font-medium"
                    >
                      {translate(product.name)}
                    </Link>
                  </li>
                ))}
                {categoriesMap.get(category) && categoriesMap.get(category)!.length > 5 && (
                  <li>
                    <Link
                      to={`${ROUTES.PRODUCTS}?category=${category}`}
                      onClick={onLinkClick}
                      className="text-aria-accent font-bold text-xs uppercase hover:underline mt-2 inline-block"
                    >
                      Voir tout &rarr;
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsMegaMenu;