import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import travelVideo from "../assets/travel.mp4";

export default function GlobeScene() {
  const { t } = useLang();

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">

      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={travelVideo} type="video/mp4" />
      </video>

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Contenu centré */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center
                      text-center px-4">

        {/* Titre */}
        <h1 className="font-arabic font-bold text-gold leading-tight
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                       drop-shadow-lg mb-3 sm:mb-4">
          {t.hero.title}
        </h1>

        {/* Sous-titre */}
        <p className="font-arabic text-mist/90
                      text-sm sm:text-base md:text-lg lg:text-xl
                      mb-6 sm:mb-8 max-w-[90%] sm:max-w-xl">
          {t.hero.subtitle}
        </p>

        {/* Bouton CTA */}
        <Link
          to="/category/politics"
          className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 border border-gold text-gold font-mono
                     text-[10px] sm:text-xs md:text-sm uppercase tracking-widest
                     hover:bg-gold hover:text-black
                     transition-all duration-300 rounded-sm"
        >
          {t.hero.cta}
        </Link>

        {/* Points villes - caché sur très petit écran */}
        <div className="hidden sm:flex absolute bottom-16 left-0 right-0
                        justify-center gap-4 sm:gap-5 md:gap-6 flex-wrap px-4">
          {["الرباط", "باريس", "نيويورك", "طوكيو", "القاهرة"].map((city, i) => (
            <span key={i}
              className="flex items-center gap-1.5 text-mist/60 font-mono
                         text-xs sm:text-sm">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-pink
                               shadow-sm shadow-pink/50 flex-shrink-0" />
              {city}
            </span>
          ))}
        </div>

        {/* Hint scroll - caché sur mobile */}
        <div className="hidden sm:flex absolute bottom-6 left-0 right-0 flex-col items-center gap-1">
          <p className="text-mist/40 font-mono text-[9px] sm:text-xs tracking-widest">
            SCROLL
          </p>
          <div className="w-px h-4 sm:h-6 bg-gradient-to-b from-mist/40 to-transparent" />
        </div>

      </div>
    </div>
  );
}