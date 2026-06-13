
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'; // Added contact icons
import { ROUTES } from '../constants'; // Import ROUTES

const Footer: React.FC = () => {
  const { translate } = useAppContext();
  // Using the link for Tiznit
  const googleMapsLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110550.39964813586!2d-9.7322227!3d29.697417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb479f80a0452e5%3A0x4a96c3829202720!2sTiznit!5e0!3m2!1sen!2sma!4v1714574400000!5m2!1sen!2sma";

  return (
    <footer className="bg-aria-primary text-gray-300 py-12 mt-16 shadow-inner-top"> {/* Darker background, more padding, custom shadow */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"> {/* More gap */}
        {/* About Section */}
        <div>
          <div className="mb-6">
            <img 
              src="/assets/logo_aria.jpg" 
              alt={translate('app.name')} 
              className="h-20 w-20 rounded-full object-cover brightness-0 invert" 
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <p className="text-sm font-open-sans leading-relaxed">
            {translate('hero.title')}
          </p>
          <p className="text-sm mt-2 font-open-sans leading-relaxed">
            {translate('hero.subtitle')}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-aria-white text-xl font-bold mb-4">Liens Rapides</h4>
          <ul className="space-y-2 text-base"> {/* Slightly larger text */}
            <li><Link to={ROUTES.ABOUT} className="hover:text-aria-accent transition-colors duration-200">{translate('nav.about')}</Link></li>
            <li><Link to={ROUTES.FAQ} className="hover:text-aria-accent transition-colors duration-200">{translate('nav.faq')}</Link></li>
            <li><Link to={ROUTES.BLOG} className="hover:text-aria-accent transition-colors duration-200">{translate('nav.blog')}</Link></li>
            <li><Link to={ROUTES.CONTACT} className="hover:text-aria-accent transition-colors duration-200">{translate('nav.contact')}</Link></li>
            <li><Link to={ROUTES.PROMOTIONS} className="hover:text-aria-accent transition-colors duration-200">{translate('nav.promotions')}</Link></li>
          </ul>
        </div>

        {/* Legal & Info */}
        <div>
          <h4 className="text-aria-white text-xl font-bold mb-4">Informations Légales</h4>
          <ul className="space-y-2 text-base">
            <li><Link to="/cgv" className="hover:text-aria-accent transition-colors duration-200">{translate('footer.cgv')}</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-aria-accent transition-colors duration-200">{translate('footer.privacyPolicy')}</Link></li>
            <li><Link to="/payment-methods" className="hover:text-aria-accent transition-colors duration-200">{translate('footer.paymentMethods')}</Link></li>
            <li><Link to="/delivery" className="hover:text-aria-accent transition-colors duration-200">{translate('footer.delivery')}</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-aria-white text-xl font-bold mb-4">{translate('footer.contactInfo')}</h4>
          <address className="not-italic text-base font-open-sans space-y-2">
            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-aria-accent transition-colors duration-200">
              <FaMapMarkerAlt className="text-aria-accent mr-3" /> Tiznit, Maroc
            </a>
            <p className="flex items-center"><FaPhone className="text-aria-accent mr-3" /> +212 5XX XXXXXX</p>
            <p className="flex items-center"><FaEnvelope className="text-aria-accent mr-3" /> info@imprimeriearia.ma</p>
          </address>

          <h4 className="text-aria-white text-xl font-bold mt-8 mb-4">{translate('footer.socialNetworks')}</h4> {/* More margin */}
          <div className="flex space-x-5"> {/* More spacing */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-aria-accent transform hover:scale-110 transition-all duration-300">
              <FaFacebookF className="h-7 w-7" /> {/* Larger icons */}
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-aria-accent transform hover:scale-110 transition-all duration-300">
              <FaInstagram className="h-7 w-7" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-aria-accent transform hover:scale-110 transition-all duration-300">
              <FaLinkedinIn className="h-7 w-7" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-aria-accent transform hover:scale-110 transition-all duration-300">
              <FaTwitter className="h-7 w-7" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10 pt-6 border-t border-aria-primary/50 text-center text-sm font-open-sans flex flex-col sm:flex-row justify-between items-center">
        <span className="text-gray-400">&copy; {new Date().getFullYear()} <span className="font-semibold">{translate('app.name')}</span>. {translate('footer.allRightsReserved')}</span>
        <Link to={ROUTES.ADMIN_LOGIN} className="text-gray-400 hover:text-aria-accent transition-colors duration-200 mt-2 sm:mt-0">
            {translate('nav.admin')}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;