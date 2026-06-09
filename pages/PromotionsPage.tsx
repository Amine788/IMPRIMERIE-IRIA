
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { ROUTES } from '../constants';
import { FaTag, FaGift } from 'react-icons/fa'; // Added FaTag, FaGift icons

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  imageUrl: string;
  linkTo: string; // Product ID or category
}

const mockPromotions: Promotion[] = [
  {
    id: 'promo-flyers',
    title: '-20% sur tous les Flyers !',
    description: 'Profitez d\'une réduction exceptionnelle pour imprimer vos flyers publicitaires. Idéal pour vos campagnes de communication.',
    discount: '20%',
    imageUrl: 'https://images.unsplash.com/photo-1511266014389-70a793c3065b?auto=format&fit=crop&q=80&w=600&h=400', // Updated: Person holding promotional flyers
    linkTo: `${ROUTES.PRODUCTS}/flyer-standard`, // Link to a specific product
  },
  {
    id: 'promo-cartes-visite',
    title: 'Cartes de Visite Luxe - Offre Spéciale',
    description: 'Sublimez votre image professionnelle avec nos cartes de visite luxe. Obtenez 100 cartes supplémentaires offertes pour toute commande de 500.',
    discount: '100 cartes offertes',
    imageUrl: 'https://images.unsplash.com/photo-1575465597402-4161a0526715?auto=format&fit=crop&q=80&w=600&h=400', // Updated: Elegant business cards (consistent with product)
    linkTo: `${ROUTES.PRODUCTS}/carte-visite-luxe`,
  },
  {
    id: 'promo-packaging',
    title: '5% de réduction sur le Packaging Sur Mesure',
    description: 'Réduisez vos coûts sur vos solutions d\'emballage personnalisées. Offre valable pour toutes les nouvelles commandes de packaging.',
    discount: '5%',
    imageUrl: 'https://images.unsplash.com/photo-1606825227749-06b251a3a60a?auto=format&fit=crop&q=80&w=600&h=400', // Updated: Custom packaging for a product
    linkTo: `${ROUTES.PRODUCTS}/boite-carton`, // Fixed: Added missing linkTo property
  },
];

const PromotionsPage: React.FC = () => {
  const { translate } = useAppContext();

  return (
    <div className="py-12 px-4 bg-aria-white rounded-2xl shadow-xl animate-fade-in-down"> {/* More rounded, stronger shadow, more padding */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-3"> {/* Stronger font, icon */}
        <FaGift className="text-aria-accent text-5xl" /> {translate('promotions.title')}
      </h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-10 font-open-sans leading-relaxed">
        Découvrez nos offres et promotions exclusives pour maximiser la valeur de vos impressions professionnelles.
      </p>

      {mockPromotions.length === 0 ? (
        <p className="text-center text-xl text-gray-600 font-open-sans animate-fade-in-up delay-100">
          Aucune promotion active pour le moment. Revenez bientôt !
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"> {/* Increased gap, max-width */}
          {mockPromotions.map((promo, index) => (
            <div key={promo.id} className="bg-aria-background-secondary rounded-xl shadow-premium overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"> {/* Accent background, more rounded, stronger shadow, lift effect */}
              <img src={promo.imageUrl} alt={promo.title} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300" /> {/* Larger image, zoom on hover */}
              <div className="p-6"> {/* More padding */}
                <h2 className="text-2xl font-bold text-aria-primary mb-2 group-hover:text-aria-accent transition-colors duration-200">{promo.title}</h2> {/* Larger text, hover color */}
                <p className="text-gray-700 text-base mb-4 font-open-sans leading-relaxed">{promo.description}</p> {/* Larger text, more spacing */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-aria-accent/30"> {/* Separator */}
                  <span className="text-2xl font-extrabold text-red-600 flex items-center gap-2"><FaTag className="text-red-500" /> {promo.discount}</span> {/* Larger, bolder discount with icon */}
                  <Link to={promo.linkTo}>
                    <Button variant="primary" className="py-2.5 px-6">Profiter de l'offre</Button> {/* Medium button size */}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromotionsPage;