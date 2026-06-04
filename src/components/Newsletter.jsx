import React, { useState } from "react";
import { useLang } from "../context/LanguageContext";

export default function Newsletter() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setDone(true); setEmail(""); }
  };

  return (
    <div className="bg-wine/10 border-t border-b border-wine/20 py-10 sm:py-12 md:py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-gold font-arabic font-bold text-xl sm:text-2xl mb-2">{t.newsletter.title}</h2>
        <p className="text-mist/60 font-arabic text-sm sm:text-base mb-4 sm:mb-6">{t.newsletter.subtitle}</p>

        {done ? (
          <p className="text-green-400 font-arabic text-sm sm:text-base">{t.newsletter.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col xs:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              className="flex-1 bg-black border border-wine/50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white font-arabic text-xs sm:text-sm
                         focus:outline-none focus:border-pink transition-colors placeholder-mist/30"
            />
            <button type="submit"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-pink text-white font-mono text-xs sm:text-sm font-bold rounded-lg
                         hover:bg-wine transition-colors flex-shrink-0">
              {t.newsletter.btn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}