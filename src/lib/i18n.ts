import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enTranslation from "../locales/en/translation.json";
import koTranslation from "../locales/ko/translation.json";

i18n
    .use(LanguageDetector) //브라우저 언어 감지 플러그인
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            ko: { translation: koTranslation },
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;