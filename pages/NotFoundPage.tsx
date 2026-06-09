
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { ROUTES } from '../constants';
import Button from '../components/Button';
import { FaSadTear } from 'react-icons/fa'; // Icon for 404 page

const NotFoundPage: React.FC = () => {
  const { translate } = useAppContext();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center bg-aria-white rounded-2xl shadow-xl p-16 animate-fade-in-down"> {/* More rounded, stronger shadow, more padding */}
      <FaSadTear className="text-aria-accent text-8xl mb-8 animate-pulse" /> {/* Large, blue, pulsing icon */}
      <h1 className="text-7xl font-extrabold text-aria-accent mb-4 drop-shadow-lg">404</h1> {/* Larger, bolder, drop shadow */}
      <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up delay-100">{translate('notFound.title')}</h2>
      <p className="text-xl text-gray-600 mb-10 max-w-lg font-open-sans animate-fade-in-up delay-200 leading-relaxed">{translate('notFound.message')}</p> {/* Larger text, more spacing */}
      <Link to={ROUTES.HOME}>
        <Button variant="primary" size="lg" className="animate-fade-in-up delay-300">
          {translate('notFound.backHome')}
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;