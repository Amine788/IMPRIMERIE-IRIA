
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { CURRENCY, ROUTES } from '../constants';
import { FaArrowRight } from 'react-icons/fa';

interface FeaturedProductCardProps {
  product: Product;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product }) => {
  const { translate } = useAppContext();

  return (
    <Link to={`${ROUTES.PRODUCTS}/${product.id}`} className="block h-full group">
      {/* Card Container */}
      <div className="h-full bg-aria-primary rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative group-hover:-translate-y-3 transition-transform duration-500">
        
        {/* Image Area */}
        <div className="relative h-full w-full">
          <img
            src={product.image}
            alt={translate(product.name)}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
          />
          
          {/* VERY STRONG Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-aria-primary/80 to-transparent opacity-100 z-10"></div>
          
          {/* Category Tag */}
          <div className="absolute top-5 left-5 z-20">
             <span className="bg-white text-aria-primary text-xs font-black px-3 py-1 rounded uppercase tracking-wider shadow-md">
                {translate(`category.${product.category}`)}
             </span>
          </div>

          {/* Text Content Area - Positioned absolutely at bottom */}
          <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">
            <div className="mt-auto">
                <h3 className="text-2xl font-extrabold text-white mb-2 leading-tight drop-shadow-md group-hover:text-aria-accent transition-colors">
                    {translate(product.name)}
                </h3>
                <p className="text-gray-300 text-sm mb-6 line-clamp-2 font-open-sans font-medium">
                    {translate(product.description)}
                </p>
                
                {/* Footer: Price and CTA */}
                <div className="flex items-center justify-between border-t border-white/20 pt-4">
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">À partir de</span>
                        <span className="text-2xl font-bold text-white">
                            {product.basePricePerUnit.toFixed(2)} <span className="text-sm font-normal text-gray-300">{CURRENCY}</span>
                        </span>
                    </div>
                    <div className="bg-white text-aria-primary h-10 w-10 rounded-full flex items-center justify-center shadow-lg group-hover:bg-aria-accent group-hover:text-white transition-all duration-300">
                        <FaArrowRight />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedProductCard;
