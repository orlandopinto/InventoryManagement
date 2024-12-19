import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/english.json'; // English
import translationES from './locales/es/spanish.json'; // Spanish

if (localStorage.getItem('lang') === null)
     localStorage.setItem('lang', 'es')

const resources = {
     en: { translation: translationEN, },
     es: { translation: translationES, },
};

i18n.use(initReactI18next).init({
     preload: ["en", "es"],
     initImmediate: false,
     fallbackLng: localStorage.getItem('lang') as string,
     lng: localStorage.getItem('lang') as string, // Set the default language
     resources,
     keySeparator: false, // Allow for nested translations without using dots
     debug: true,
     interpolation: {
          escapeValue: false,
     },
});


export default i18n;