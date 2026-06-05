import { createContext, useContext, useState, useEffect } from "react";
import ar from "../locales/ar";
import fr from "../locales/fr";
import en from "../locales/en";

const texts = { ar, fr, en };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ar");
  const t = texts[lang];
  const isRTL = lang === "ar";

  // ✅ Applique dir sur le html directement
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);