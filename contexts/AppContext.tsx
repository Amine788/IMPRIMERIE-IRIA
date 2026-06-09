
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Language, AppContextType, Translations } from '../types';
import { DEFAULT_LANGUAGE, CURRENCY, TRANSLATIONS } from '../constants';

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    // Initialize from localStorage to persist login across sessions
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const translate = useCallback((key: string, lang: Language = language): string => {
    const translationSet = TRANSLATIONS[lang];
    if (translationSet && translationSet[key]) {
      return translationSet[key];
    }
    // Fallback to English if not found in selected or French
    if (TRANSLATIONS[Language.EN] && TRANSLATIONS[Language.EN][key]) {
      return TRANSLATIONS[Language.EN][key];
    }
    return key; // Return the key itself if no translation is found
  }, [language]);

  const loginAdmin = useCallback((username: string, password: string): boolean => {
    // --- SIMULATED ADMIN LOGIN LOGIC ---
    // In a real application, this would involve API calls to a backend for authentication
    // and receiving a JWT or session token.
    const validUsername = 'admin';
    const validPassword = 'password'; // For demo purposes only

    if (username === validUsername && password === validPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('isAdminLoggedIn', 'true'); // Persist login
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn'); // Clear persisted login
  }, []);


  const contextValue: AppContextType = {
    language,
    setLanguage,
    currency: CURRENCY,
    translate,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
