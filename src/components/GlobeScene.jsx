import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import travelVideo from "../assets/travel.mp4";

export default function GlobeScene() {
  const { t, isRTL } = useLang();

  const cities = isRTL
    ? ["الرباط", "باريس", "نيويورك", "طوكيو", "القاهرة"]
    : ["Rabat", "Paris", "New York", "Tokyo", "Cairo"];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", maxWidth: "100vw" }}
    >
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Contenu */}
      <div
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4"
        style={{ width: "100%", maxWidth: "100vw" }}
      >
        {/* Titre */}
        <h1
          className="font-arabic font-bold text-gold leading-tight drop-shadow-lg mb-3 sm:mb-4 w-full"
          style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
        >
          {t.hero.title}
        </h1>

        {/* Sous-titre */}
        <p
          className="font-arabic text-mist/90 mb-6 sm:mb-8 w-full px-2"
          style={{
            fontSize: "clamp(0.85rem, 3vw, 1.25rem)",
            maxWidth: "min(90%, 500px)",
          }}
        >
          {t.hero.subtitle}
        </p>

        {/* Bouton CTA */}
        <Link
          to="/category/politics"
          className="border border-gold text-gold font-mono uppercase tracking-widest
                     hover:bg-gold hover:text-black transition-all duration-300 rounded-sm
                     px-5 py-2.5 sm:px-6 sm:py-3 md:px-8"
          style={{ fontSize: "clamp(0.6rem, 2vw, 0.85rem)" }}
        >
          {t.hero.cta}
        </Link>

        {/* Villes */}
        <div
          className="hidden sm:flex absolute bottom-16 left-0 right-0
                     justify-center flex-wrap px-4"
          style={{ gap: "clamp(0.75rem, 3vw, 1.5rem)" }}
        >
          {cities.map((city, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-mist/60 font-mono"
              style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.875rem)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink flex-shrink-0 shadow-sm shadow-pink/50" />
              <span className={isRTL ? "font-arabic" : ""}>{city}</span>
            </span>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="hidden sm:flex absolute bottom-6 left-0 right-0 flex-col items-center gap-1">
          <p className="text-mist/40 font-mono tracking-widest"
            style={{ fontSize: "clamp(0.55rem, 1.5vw, 0.75rem)" }}>
            {isRTL ? "تمرير" : "SCROLL"}
          </p>
          <div className="w-px h-5 bg-gradient-to-b from-mist/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}