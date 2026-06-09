
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useAppContext } from '../contexts/AppContext';

interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  image: string;
}

const reviews: Review[] = [
  {
    id: 1,
    customerName: 'Amina B.',
    rating: 5,
    comment: 'Service impeccable et qualité d\'impression au top ! Mes flyers sont magnifiques.',
    image: 'https://picsum.photos/id/1011/60/60',
  },
  {
    id: 2,
    customerName: 'Mehdi L.',
    rating: 4,
    comment: 'Délais respectés et prix compétitifs. Je recommande pour les cartes de visite.',
    image: 'https://picsum.photos/id/1012/60/60',
  },
  {
    id: 3,
    customerName: 'Fatima Z.',
    rating: 5,
    comment: 'Mon packaging personnalisé est parfait, exactement ce que j\'attendais.',
    image: 'https://picsum.photos/id/1013/60/60',
  },
  {
    id: 4,
    customerName: 'Omar H.',
    rating: 5,
    comment: 'Très bonne communication et aide pour le design. Satisfait de mes affiches.',
    image: 'https://picsum.photos/id/1014/60/60',
  },
];

const CustomerReviewsSection: React.FC = () => {
  const { translate } = useAppContext();

  return (
    <section className="py-16 bg-aria-background-secondary rounded-2xl mb-16 shadow-inner-top">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          {translate('customerReviews.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-aria-white p-6 rounded-xl shadow-premium hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <img
                src={review.image}
                alt={review.customerName}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-aria-accent shadow-md"
              />
              <p className="text-gray-700 text-lg mb-3 flex-grow font-open-sans leading-relaxed">"{review.comment}"</p>
              <div className="flex justify-center text-yellow-400 mb-2 space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="font-bold text-gray-800 text-lg">- {review.customerName}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;
