import React, { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollUp}
      className={`fixed bottom-4 sm:bottom-6 md:bottom-8 left-3 sm:left-5 md:left-6 z-50 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full
                  bg-pink text-white flex items-center justify-center
                  shadow-lg shadow-pink/30 transition-all duration-300
                  hover:bg-wine hover:scale-110 active:scale-95
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      aria-label="Retour en haut"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
}