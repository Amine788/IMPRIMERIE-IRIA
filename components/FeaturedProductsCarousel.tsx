
import React, { useRef } from 'react';
import { getProducts } from '../services/productService';
import FeaturedProductCard from './FeaturedProductCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FeaturedProductsCarousel: React.FC = () => {
  const featuredProducts = getProducts().slice(0, 10); 
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
        containerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
        containerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (featuredProducts.length === 0) return null;

  return (
    <div className="relative w-full max-w-[1600px] mx-auto py-8 group px-4">
        
      {/* Navigation Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-4 bg-white text-aria-primary rounded-full shadow-2xl hover:bg-aria-accent hover:text-white transition-all duration-300 focus:outline-none opacity-0 group-hover:opacity-100 transform hover:scale-110 border border-gray-100 hidden md:block ml-2"
        aria-label="Previous"
      >
        <FaChevronLeft size={24} />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-4 bg-white text-aria-primary rounded-full shadow-2xl hover:bg-aria-accent hover:text-white transition-all duration-300 focus:outline-none opacity-0 group-hover:opacity-100 transform hover:scale-110 border border-gray-100 hidden md:block mr-2"
        aria-label="Next"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Scrollable Container - Retour à des cartes plus larges style Carrousel */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto gap-8 pb-12 pt-4 px-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featuredProducts.map((product) => (
            <div 
                key={product.id} 
                className="flex-none w-[85vw] sm:w-[350px] snap-center"
            >
                <div className="h-[450px]">
                    <FeaturedProductCard product={product} />
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductsCarousel;
