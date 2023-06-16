import React, { createContext, useContext, useState } from 'react';

type LanguageContextValue = {
  currentLocale: string;
  setCurrentLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState('fa');

  const setLocale = (locale: string) => {
    setCurrentLocale(locale);
  };

  return (
    <LanguageContext.Provider value={{ currentLocale, setCurrentLocale: setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
