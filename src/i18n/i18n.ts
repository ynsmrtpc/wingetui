import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Çeviri dosyaları - TypeScript'in bunları bulabilmesi için tür tanımları
// @ts-ignore
import translationEN from './locales/en/translation.json';
// @ts-ignore
import translationTR from './locales/tr/translation.json';

// Kullanılabilir diller
export const languages = {
  en: { nativeName: 'English', flag: '🇬🇧' },
  tr: { nativeName: 'Türkçe', flag: '🇹🇷' }
};

// Çeviri dosyalarını hazırla
const resources = {
  en: {
    translation: translationEN
  },
  tr: {
    translation: translationTR
  }
};

// Saklanan dil tercihini alma
const getSavedLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'en';
  }
  return 'en';
};

// i18n'i başlat
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlıyor
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

// Dil değiştirme fonksiyonu
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lng);
  }
};

export default i18n; 