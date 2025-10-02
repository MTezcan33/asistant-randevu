import React, { createContext, useState, useContext } from 'react';
import translations from '@/lib/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('tr');

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to Turkish if translation is missing
        let fallbackResult = translations.tr;
        for (const fk of keys) {
          fallbackResult = fallbackResult?.[fk];
        }
        return fallbackResult || key;
      }
    }
    return result;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};