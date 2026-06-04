import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLang } from "../context/LanguageContext";
import logo from "../assets/logo_minbar.png";

const langLabels = {
  ar: { label: "العربية", flag: "🇲🇦" },
  fr: { label: "Français", flag: "🇫🇷" },
  en: { label: "English",  flag: "🇬🇧" },
};

const Navbar = () => {
  const { lang, setLang, t, isRTL } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { key: "home",     path: "/" },
    { key: "politics", path: "/category/politics" },
    { key: "economy",  path: "/category/economy" },
    { key: "sports",   path: "/category/sports" },
    { key: "tech",     path: "/category/tech" },
    { key: "contact",  path: "/contact" },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 px-3 sm:px-6 py-2 sm:py-3
      ${scrolled ? "bg-black/95 backdrop-blur-sm shadow-lg" : "bg-black/60 backdrop-blur-sm"}`}>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="منبر" className="h-7 sm:h-8 md:h-9 w-auto" />
        </Link>

        {/* Desktop links - caché sur mobile */}
        <ul className="hidden md:flex gap-4 lg:gap-6 list-none">
          {links.map(({ key, path }) => (
            <li key={key}>
              <Link to={path}
                className="text-mist/70 hover:text-gold font-arabic text-xs lg:text-sm transition-colors duration-200 whitespace-nowrap">
                {t.nav[key]}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Language dropdown + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* ── Language Dropdown ── */}
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setDropOpen(!dropOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-white/15
                         text-white text-[11px] sm:text-sm font-mono hover:border-pink/60 hover:bg-white/5
                         transition-all duration-200"
            >
              <span className="text-sm sm:text-base">{langLabels[lang].flag}</span>
              <span className="hidden xs:inline text-[11px] sm:text-sm">{langLabels[lang].label}</span>

              {/* Arrow */}
              <svg
                width="10" height="10" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                className={`transition-transform duration-200 w-2.5 h-2.5 sm:w-3 sm:h-3 ${dropOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {dropOpen && (
              <div className="absolute top-full mt-2 right-0 w-36 sm:w-40 bg-[#0f1218] border border-white/10
                              rounded-xl shadow-xl shadow-black/50 overflow-hidden z-50">
                {Object.entries(langLabels).map(([code, { label, flag }]) => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); setDropOpen(false); }}
                    className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-sm font-mono
                                transition-colors duration-150 text-left
                                ${lang === code
                                  ? "bg-pink/20 text-pink font-bold"
                                  : "text-mist/70 hover:bg-white/5 hover:text-white"}`}
                  >
                    <span className="text-sm sm:text-base">{flag}</span>
                    <span>{label}</span>
                    {lang === code && (
                      <svg className="ml-auto w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="3"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger mobile */}
          <button className="md:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/97 backdrop-blur-sm
                        py-4 sm:py-6 flex flex-col items-center gap-3 sm:gap-5 border-t border-white/10">
          {links.map(({ key, path }) => (
            <Link key={key} to={path} onClick={() => setMenuOpen(false)}
              className="text-mist/80 hover:text-gold font-arabic text-base sm:text-lg transition-colors">
              {t.nav[key]}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;