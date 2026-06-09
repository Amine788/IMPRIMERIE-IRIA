
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import Button from '../components/Button';
import { ROUTES } from '../constants';
import {
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaTags,
  FaFileUpload,
  FaChartLine,
  FaSignOutAlt,
  FaCogs, // Generic icon for admin dashboard header
} from 'react-icons/fa';

interface AdminCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  link?: string;
  onClick?: () => void;
}

const AdminCard: React.FC<AdminCardProps> = ({ icon: Icon, title, description, link, onClick }) => {
  const { translate } = useAppContext(); // Access translate for card descriptions

  const cardContent = (
    <>
      <Icon className="text-aria-accent text-4xl mb-4 transition-colors duration-300 group-hover:text-aria-white" />
      <h3 className="text-xl font-semibold text-gray-50 mb-2 transition-colors duration-300 group-hover:text-aria-white">{translate(title)}</h3>
      <p className="text-gray-300 text-center text-sm font-open-sans transition-colors duration-300 group-hover:text-aria-accent/50">
        {translate(description)}
      </p>
    </>
  );

  return (
    <div className="group p-6 bg-aria-primary/80 rounded-xl shadow-premium hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center transform hover:scale-103 hover:bg-aria-accent border border-transparent hover:border-aria-accent">
      {link ? (
        <a href={link} className="block w-full h-full flex flex-col items-center justify-center">
          {cardContent}
        </a>
      ) : (
        <button onClick={onClick} className="block w-full h-full flex flex-col items-center justify-center">
          {cardContent}
        </button>
      )}
    </div>
  );
};


const AdminDashboardPage: React.FC = () => {
  const { translate, logoutAdmin } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate(ROUTES.ADMIN_LOGIN);
  };

  const adminFeatures = [
    {
      icon: FaBoxOpen,
      title: 'admin.dashboard.manageProducts',
      description: 'admin.card.manageProducts.description',
      link: '#/admin/products', // Placeholder link
    },
    {
      icon: FaClipboardList,
      title: 'admin.dashboard.manageOrders',
      description: 'admin.card.manageOrders.description',
      link: '#/admin/orders', // Placeholder link
    },
    {
      icon: FaUsers,
      title: 'admin.dashboard.manageUsers',
      description: 'admin.card.manageUsers.description',
      link: '#/admin/users', // Placeholder link
    },
    {
      icon: FaTags,
      title: 'admin.dashboard.managePromos',
      description: 'admin.card.managePromos.description',
      link: '#/admin/promos', // Placeholder link
    },
    {
      icon: FaFileUpload,
      title: 'admin.dashboard.uploadClientFiles',
      description: 'admin.card.uploadClientFiles.description',
      link: '#/admin/client-files', // Placeholder link
    },
    {
      icon: FaChartLine,
      title: 'admin.dashboard.kpiDashboard',
      description: 'admin.card.kpiDashboard.description',
      link: '#/admin/kpis', // Placeholder link
    },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4 bg-aria-primary/95 text-gray-50"> {/* Deep dark background */}
      <div className="max-w-7xl mx-auto p-8 bg-aria-primary/80 rounded-2xl shadow-xl animate-fade-in-down border border-aria-accent/30">
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-6">
          <div className="flex items-center gap-4">
            <FaCogs className="text-aria-accent text-5xl" />
            <h1 className="text-4xl font-extrabold text-aria-white">{translate('admin.dashboard.title')}</h1>
          </div>
          <Button onClick={handleLogout} variant="danger" className="flex items-center">
            <FaSignOutAlt className="mr-2" /> {translate('admin.logout')}
          </Button>
        </div>

        <p className="text-xl text-gray-200 mb-10 font-open-sans">
          {translate('admin.dashboard.welcome')} {translate('admin.dashboard.manageContent')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminFeatures.map((feature, index) => (
            <AdminCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;