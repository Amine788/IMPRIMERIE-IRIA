
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import Button from '../components/Button';
import { ROUTES } from '../constants';
import {
  FaUserCircle,
  FaLock,
  FaSignInAlt,
  FaSpinner,
} from 'react-icons/fa'; // Added FaSignInAlt

const AdminLoginPage: React.FC = () => {
  const { translate, loginAdmin, isAdminLoggedIn } = useAppContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
    }
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = loginAdmin(username, password);

    if (success) {
      // Redirection handled by useEffect
    } else {
      setError(translate('admin.login.error'));
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 bg-aria-primary/95"> {/* Deep dark background */}
      <div className="bg-aria-primary/80 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-down border border-aria-accent/30"> {/* Elevated, rounded card with subtle blue border */}
        <div className="text-center mb-8">
          <FaLock className="mx-auto text-aria-accent text-5xl mb-4" /> {/* Prominent lock icon */}
          <h1 className="text-aria-white text-4xl font-bold">{translate('admin.login.title')}</h1> {/* White title */}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">
              {translate('admin.login.username')}
            </label>
            <div className="relative">
              <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 pr-3 py-2.5 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-50 placeholder-gray-400 focus:outline-none focus:ring-aria-accent focus:border-aria-accent"
                placeholder="admin"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
              {translate('admin.login.password')}
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-3 py-2.5 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-50 placeholder-gray-400 focus:outline-none focus:ring-aria-accent focus:border-aria-accent"
                placeholder="password"
                required
              />
            </div>
          </div>
          {error && (
            <div className="text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full py-3 flex items-center justify-center gap-2" loading={loading}>
            {loading ? <FaSpinner className="animate-spin" /> : <FaSignInAlt />} {translate('admin.login.button')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;