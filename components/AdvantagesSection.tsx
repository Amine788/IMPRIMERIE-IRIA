
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { FaTruck, FaMoneyBillWave, FaShieldAlt, FaHeadset } from 'react-icons/fa';

interface AdvantageCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ icon: Icon, title, description }) => (
  <div className="card-3d p-8 flex flex-col items-center text-center group">
    <div className="w-16 h-16 rounded-2xl bg-aria-bg flex items-center justify-center mb-6 group-hover:bg-aria-accent transition-colors duration-300 shadow-inner">
        <Icon className="text-aria-primary text-3xl group-hover:text-white transition-colors duration-300" />
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const AdvantagesSection: React.FC = () => {
  const { translate } = useAppContext();

  const advantages = [
    {
      icon: FaTruck,
      title: translate('advantage.freeDelivery'),
      description: translate('advantage.freeDelivery.description'),
    },
    {
      icon: FaMoneyBillWave,
      title: translate('advantage.instantPrice'),
      description: translate('advantage.instantPrice.description'),
    },
    {
      icon: FaShieldAlt,
      title: translate('advantage.securePayment'),
      description: translate('advantage.securePayment.description'),
    },
    {
      icon: FaHeadset,
      title: translate('advantage.customerSupport'),
      description: translate('advantage.customerSupport.description'),
    },
  ];

  return (
    <section className="py-20 relative z-10 -mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={index} {...advantage} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;