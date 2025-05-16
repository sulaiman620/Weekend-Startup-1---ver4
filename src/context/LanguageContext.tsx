import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the available languages
export type Language = 'en' | 'ar';

// Define the language context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  dir: 'ltr'
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'en'
  );
  
  // Translations object - will be populated from separate files
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);

  // Update language in localStorage and document attributes
  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    setLanguageState(lang);
  };

  // Get translation for a key
  const t = (key: string): string => {
    if (!translations[language]) return key;
    return translations[language][key] || translations['en'][key] || key;
  };

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Dynamic import both language files
        const [enTranslations, arTranslations] = await Promise.all([
          import('../locales/en.json'),
          import('../locales/ar.json')
        ]);
        
        setTranslations({
          en: enTranslations.default,
          ar: arTranslations.default
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to load translations:', error);
        setLoading(false);
      }
    };
    
    loadTranslations();
  }, []);

  // Set document direction on language change
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Add RTL support to the body if needed
    if (language === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [language]);  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t,
        dir: language === 'ar' ? 'rtl' : 'ltr'
      }}
    >
      {!loading && children}
    </LanguageContext.Provider>
  );
};
