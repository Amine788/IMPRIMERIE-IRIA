
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { CURRENCY, ROUTES } from '../constants';
import { FaArrowRight } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { translate } = useAppContext();

  return (
    <Link to={`${ROUTES.PRODUCTS}/${product.id}`} className="block group h-full">
      <div className="card-3d h-full flex flex-col overflow-hidden relative">
        {/* Image Container */}
        <div className="relative w-full h-56 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={translate(product.name)}
            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          {/* Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-aria-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
             <span className="text-white font-bold flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                Voir les détails <FaArrowRight className="ml-2" />
             </span>
          </div>
          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-aria-primary shadow-sm">
            {translate(`category.${product.category}`)}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-aria-accent transition-colors duration-200 line-clamp-1">
            {translate(product.name)}
          </h3>
          <p className="text-gray-500 text-sm mb-6 flex-grow font-open-sans line-clamp-2 leading-relaxed">
            {translate(product.description)}
          </p>
          
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-wide">À partir de</span>
                <span className="text-xl font-extrabold text-aria-primary">
                {product.basePricePerUnit.toFixed(2)} <span className="text-sm font-normal text-gray-500">{CURRENCY}</span>
                </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-aria-primary group-hover:bg-aria-accent group-hover:text-white transition-colors duration-300 shadow-sm">
                <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;