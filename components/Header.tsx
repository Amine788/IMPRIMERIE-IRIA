
import React, { useState, useRef, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES, PRODUCT_DATA, SUPPORTED_LANGUAGES } from '../constants';
import { useAppContext } from '../contexts/AppContext';
import { useCart } from '../contexts/CartContext';
import { Language } from '../types';

import ProductsMegaMenu from './ProductsMegaMenu';

import { FaShoppingCart, FaBars, FaTimes, FaGlobe, FaChevronDown } from 'react-icons/fa';

const Header: React.FC = () => {
  const { language, setLanguage, translate } = useAppContext();
  const { cartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const productsMenuTimeoutRef = useRef<number | null>(null);

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProductsMenuOpen(false); // Close products menu if mobile menu opens
  };
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  const handleProductsNavLinkMouseEnter = useCallback(() => {
    if (productsMenuTimeoutRef.current) {
      clearTimeout(productsMenuTimeoutRef.current);
    }
    setIsProductsMenuOpen(true);
  }, []);

  const handleProductsNavLinkMouseLeave = useCallback(() => {
    productsMenuTimeoutRef.current = window.setTimeout(() => {
      setIsProductsMenuOpen(false);
    }, 250); 
  }, []);

  const handleMegaMenuMouseEnter = useCallback(() => {
    if (productsMenuTimeoutRef.current) {
      clearTimeout(productsMenuTimeoutRef.current);
    }
    setIsProductsMenuOpen(true); 
  }, []);

  const handleMegaMenuMouseLeave = useCallback(() => {
    productsMenuTimeoutRef.current = window.setTimeout(() => {
      setIsProductsMenuOpen(false);
    }, 250); 
  }, []);

  const closeProductsMenu = useCallback(() => {
    setIsProductsMenuOpen(false);
    if (productsMenuTimeoutRef.current) {
      clearTimeout(productsMenuTimeoutRef.current);
    }
  }, []);

  const navLinks = [
    { path: ROUTES.HOME, label: translate('nav.home') },
    { path: ROUTES.PRODUITS, label: translate('nav.products') },
    { path: ROUTES.PROMOTIONS, label: translate('nav.promotions') },
    { path: ROUTES.ABOUT, label: translate('nav.about') },
    { path: ROUTES.FAQ, label: translate('nav.faq') },
    { path: ROUTES.MACHINES, label: translate('nav.machines') },
    { path: ROUTES.BLOG, label: translate('nav.blog') },
    { path: ROUTES.CONTACT, label: translate('nav.contact') },
  ];

  return (
    // Header avec ombre douce et sticky
    <header className="bg-aria-white shadow-[0_4px_20px_-5px_rgba(27,58,107,0.1)] sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative z-50">
        
        {/* Logo Section */}
        <Link to={ROUTES.HOME} className="flex items-center group">
          <div className="relative">
             {/* Effet lumineux discret au survol */}
            <div className="absolute inset-0 bg-aria-accent opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity duration-500"></div>
            <img
              src="/assets/logo aria.jpg"
              alt={translate('app.name')}
              className="h-16 w-16 rounded-full object-cover relative z-10 transform group-hover:scale-105 transition-transform duration-300 border-2 border-aria-accent/20"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-grow justify-center">
          <ul className="flex space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              if (link.path === ROUTES.PRODUCTS || link.path === ROUTES.PRODUITS) {
                return (
                  <li
                    key={link.path}
                    onMouseEnter={handleProductsNavLinkMouseEnter}
                    onMouseLeave={handleProductsNavLinkMouseLeave}
                    className="relative h-full flex items-center"
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center text-sm xl:text-base font-semibold transition-all duration-200 py-2 px-3 rounded-lg ${
                          isActive || isProductsMenuOpen 
                            ? 'text-aria-primary bg-aria-accent/10' 
                            : 'text-gray-600 hover:text-aria-accent hover:bg-gray-50'
                        }`
                      }
                    >
                      {translate('nav.products')} <FaChevronDown className={`ml-1 text-xs transition-transform duration-200 relative top-[1px] ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
                    </NavLink>
                  </li>
                );
              }
              return (
                <li key={link.path} className="flex items-center">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-sm xl:text-base font-semibold transition-all duration-200 py-2 px-3 rounded-lg ${
                        isActive 
                          ? 'text-aria-primary bg-aria-accent/10' 
                          : 'text-gray-600 hover:text-aria-accent hover:bg-gray-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Section: Language, Cart */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={toggleLanguageMenu}
              className="flex items-center text-gray-600 hover:text-aria-accent focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <FaGlobe className="text-lg" />
              <span className="uppercase font-bold text-xs ml-1">{language}</span>
            </button>
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl py-2 z-20 border border-gray-100 animate-fade-in-up origin-top-right">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-aria-accent/10 hover:text-aria-primary transition-colors duration-200 font-medium"
                  >
                    {lang === Language.FR && 'Français'}
                    {lang === Language.AR && 'العربية'}
                    {lang === Language.EN && 'English'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to={ROUTES.CART} className="relative group text-gray-600 hover:text-aria-accent p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <FaShoppingCart className="h-6 w-6" />
            {totalItemsInCart > 0 && (
              <span className="absolute top-0 right-0 bg-aria-accent text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white shadow-sm transform group-hover:scale-110 transition-transform">
                {totalItemsInCart}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-aria-primary focus:outline-none p-2" >
              {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      {isProductsMenuOpen && (
        <ProductsMegaMenu
          products={PRODUCT_DATA}
          translate={translate}
          onLinkClick={closeProductsMenu}
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
        />
      )}

      {/* Mobile Menu - Full Screen improved */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-xl border-t border-gray-100 absolute w-full left-0 z-40 min-h-screen animate-fade-in-down">
          <ul className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={toggleMobileMenu}
                  className={({ isActive }) =>
                    `block py-4 px-6 font-bold text-lg rounded-xl transition-all duration-200 border border-transparent ${
                      isActive 
                      ? 'bg-aria-primary text-white shadow-lg' 
                      : 'text-gray-700 bg-gray-50 hover:bg-white hover:border-aria-accent hover:text-aria-accent'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
