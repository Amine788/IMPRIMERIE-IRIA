
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { FaBuilding, FaBullseye, FaHandshake } from 'react-icons/fa'; // Icons for about sections

const AboutPage: React.FC = () => {
  const { translate } = useAppContext();
  return (
    <div className="py-12 px-4 bg-aria-white rounded-2xl shadow-xl animate-fade-in-down"> {/* More rounded, stronger shadow, more padding */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">{translate('about.title')}</h1> {/* Stronger font */}

      <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-8 font-open-sans leading-relaxed"> {/* Increased max-width, more spacing */}
        <p>
          Bienvenue chez <span className="font-bold text-aria-primary">{translate('app.name')}</span>, votre partenaire d'impression en ligne dédié aux professionnels et aux entreprises au Maroc.
          Nous nous engageons à offrir des solutions d'impression de haute qualité, rapides et fiables, avec la commodité d'une commande en ligne et la flexibilité de la personnalisation.
        </p>
        <p>
          Notre mission est de simplifier l'accès à des services d'impression professionnels, qu'il s'agisse de cartes de visite, de flyers percutants,
          d'affiches grand format, de packaging innovant ou de papeterie personnalisée. Nous combinons l'expertise de notre équipe avec une technologie
          de pointe pour transformer vos visions en produits imprimés exceptionnels.
        </p>
        
        {/* Added dedicated sections for Mission/Vision/Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-center">
          <div className="p-6 bg-aria-background-secondary rounded-xl shadow-md">
            <FaBullseye className="text-aria-accent text-4xl mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-aria-primary mb-2">Notre Mission</h3>
            <p className="text-gray-700 text-sm">Offrir des solutions d'impression innovantes et accessibles pour tous les professionnels.</p>
          </div>
          <div className="p-6 bg-aria-background-secondary rounded-xl shadow-md">
            <FaBuilding className="text-aria-accent text-4xl mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-aria-primary mb-2">Notre Vision</h3>
            <p className="text-gray-700 text-sm">Devenir le leader de l'impression en ligne au Maroc, reconnu pour sa qualité et son service.</p>
          </div>
          <div className="p-6 bg-aria-background-secondary rounded-xl shadow-md">
            <FaHandshake className="text-aria-accent text-4xl mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-aria-primary mb-2">Nos Valeurs</h3>
            <p className="text-gray-700 text-sm">Qualité, rapidité, innovation, intégrité et satisfaction client.</p>
          </div>
        </div>

        <p className="text-gray-700 mt-8">
          Chez <span className="font-bold text-aria-primary">{translate('app.name')}</span>, nous croyons que chaque impression est une opportunité de laisser une marque. C'est pourquoi nous mettons l'accent sur
          la précision, la qualité des matériaux et le respect des délais, tout en assurant une livraison gratuite partout au Maroc.
          Faites confiance à <span className="font-bold text-aria-primary">{translate('app.name')}</span> pour toutes vos exigences en matière d'impression, et découvrez la différence d'un service client
          dédié et d'une passion pour l'excellence.
        </p>
        <p className="text-center italic text-xl text-gray-600 pt-4"> {/* Larger italic quote */}
          "Votre succès est notre impression."
        </p>
      </div>
    </div>
  );
};

export default AboutPage;