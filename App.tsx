
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './contexts/AppContext'; // Import useAppContext
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
// import AccountPage from './pages/AccountPage'; // Removed
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import MachinesPage from './pages/MachinesPage';
import PromotionsPage from './pages/PromotionsPage';
import AdminLoginPage from './pages/AdminLoginPage'; // New import
import AdminDashboardPage from './pages/AdminDashboardPage'; // New import
import { ROUTES } from './constants';

// A simple Higher-Order Component for route protection
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminLoggedIn } = useAppContext();
  if (!isAdminLoggedIn) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AppProvider>
      <CartProvider>
        <HashRouter>
          {/* Main container with light background for general app content */}
          <div className="flex flex-col min-h-screen bg-aria-background-secondary"> 
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.PRODUCTS} element={<ProductListingPage />} />
                <Route path={ROUTES.PRODUITS} element={<ProductListingPage />} />
                <Route path={`${ROUTES.PRODUCTS}/:id`} element={<ProductDetailPage />} />
                <Route path={`${ROUTES.PRODUITS}/:id`} element={<ProductDetailPage />} />
                <Route path={ROUTES.PROMOTIONS} element={<PromotionsPage />} />
                <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                <Route path={ROUTES.FAQ} element={<FAQPage />} />
                <Route path={ROUTES.MACHINES} element={<MachinesPage />} />
                <Route path={ROUTES.BLOG} element={<BlogPage />} />
                <Route path={ROUTES.CONTACT} element={<ContactPage />} />
                {/* <Route path={ROUTES.ACCOUNT} element={<AccountPage />} /> */} {/* Removed */}
                <Route path={ROUTES.CART} element={<CartPage />} />
                <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />

                {/* Admin Routes */}
                <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
                <Route 
                  path={ROUTES.ADMIN_DASHBOARD} 
                  element={
                    <ProtectedRoute>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } 
                />

                {/* Modification : Rediriger n'importe quelle URL inconnue vers l'Accueil au lieu d'afficher une erreur */}
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </CartProvider>
    </AppProvider>
  );
  }

export default App;