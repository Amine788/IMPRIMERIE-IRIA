
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { ROUTES } from '../constants';
import Button from './Button';
import { FaArrowRight, FaFileInvoiceDollar, FaTag } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  const { translate } = useAppContext();

  return (
    <section className="relative w-full pt-28 pb-40 overflow-hidden bg-aria-primary flex items-center justify-center">
      {/* Background - Dark Blue Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2B5C9E] via-[#1B3A6B] to-[#0f2444] z-0"></div>
      
      {/* Decorative texture */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 animate-fade-in-up">
          
          {/* Promo Badge */}
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] transform hover:scale-105 transition-transform duration-300 border-2 border-red-400 cursor-default">
             <FaTag className="text-lg" />
             <span className="font-extrabold tracking-wide uppercase text-sm md:text-lg">Promo : -20% sur tout le site</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl tracking-tight mt-4">
            L'Impression <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200">
              Professionnelle
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-blue-50 font-open-sans max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
            {translate('hero.subtitle')}. <br/>
            <span className="font-bold text-white mt-3 block text-lg">Qualité Premium • Livraison Gratuite • Prix Direct</span>
          </p>
          
          {/* Action Buttons - FIXED CONTRAST */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 w-full">
            
            {/* Button 1: Commander - Blue Background / White Text */}
            <Button 
              as="link" 
              to={ROUTES.PRODUCTS} 
              size="lg" 
              variant="primary" // Explicitly primary
              className="w-full sm:w-auto min-w-[250px] py-5 text-xl font-extrabold !bg-[#4A90E2] !text-white hover:!bg-[#357ABD] shadow-[0_10px_30px_rgba(74,144,226,0.4)] border-2 border-transparent hover:border-white/50 transform hover:scale-105 transition-all duration-300 rounded-2xl"
            >
              {translate('hero.cta')} <FaArrowRight className="ml-3" />
            </Button>
            
            {/* Button 2: Devis - White Background / Dark Blue Text */}
            <Button 
              as="link" 
              to={ROUTES.CONTACT} 
              size="lg" 
              variant="secondary" // Explicitly secondary to avoid default white text
              className="w-full sm:w-auto min-w-[250px] py-5 text-xl font-extrabold !bg-white !text-[#1B3A6B] hover:!bg-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.2)] border-4 border-white transform hover:scale-105 transition-all duration-300 rounded-2xl"
            >
              <FaFileInvoiceDollar className="mr-3 text-[#1B3A6B]" /> Demander un devis
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
