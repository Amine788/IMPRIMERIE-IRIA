
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa'; // Added FaQuestionCircle

const FAQPage: React.FC = () => {
  const { translate } = useAppContext();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Mock FAQ data
  const faqs = [
    {
      question: "Comment puis-je passer une commande ?",
      answer: "Pour passer une commande, parcourez notre catalogue de produits, configurez votre produit avec les options souhaitées (dimensions, papier, finition, quantité), téléchargez votre fichier d'impression, puis ajoutez le produit à votre panier. Vous pourrez ensuite finaliser votre commande via le processus de paiement."
    },
    {
      question: "Quels sont les délais de production et de livraison ?",
      answer: "Les délais de production varient en fonction du produit et des options choisies. Une estimation du délai de production est affichée sur chaque page produit. La livraison est ensuite gratuite partout au Maroc et prend généralement 1 à 3 jours ouvrables après la production."
    },
    {
      question: "Quels formats de fichiers acceptez-vous pour l'impression ?",
      answer: "Nous acceptons principalement les fichiers PDF au format CMJN avec une résolution de 300 DPI. Veuillez vous assurer que vos fichiers respectent ces spécifications pour garantir une qualité d'impression optimale."
    },
    {
      question: "Quelles sont les méthodes de paiement acceptées ?",
      answer: "Nous acceptons les paiements par carte bancaire, virement bancaire et espèces à la livraison pour certaines commandes. Vous pourrez choisir votre méthode préférée lors du processus de commande."
    },
    {
      question: "Puis-je suivre ma commande ?",
      answer: "Oui, une fois votre commande expédiée, vous recevrez un numéro de suivi par email pour suivre l'acheminement de votre colis."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 px-4 bg-aria-white rounded-2xl shadow-xl animate-fade-in-down"> {/* More rounded, stronger shadow, more padding */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">{translate('faq.title')}</h1> {/* Stronger font */}
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-10 font-open-sans leading-relaxed">
        Vous avez des questions ? Trouvez rapidement les réponses aux interrogations les plus fréquentes concernant nos services d'impression.
      </p>

      <div className="max-w-4xl mx-auto space-y-4"> {/* Increased max-width, more spacing */}
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-md"> {/* More rounded, stronger shadow */}
            <button
              className="flex justify-between items-center w-full p-6 text-left bg-aria-background-secondary hover:bg-gray-100 transition-colors duration-200" // More padding, hover effect
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FaQuestionCircle className="text-aria-accent mr-3 text-2xl" /> {/* Aria Blue question icon */}
                {faq.question}
              </h2>
              <FaChevronDown className={`text-gray-600 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180 text-aria-accent' : ''}`} /> {/* Animated, colored icon */}
            </button>
            {openIndex === index && (
              <div id={`faq-answer-${index}`} className="p-6 bg-aria-white border-t border-gray-100 animate-fade-in-up"> {/* More padding, lighter border */}
                <p className="text-gray-700 leading-relaxed font-open-sans">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;