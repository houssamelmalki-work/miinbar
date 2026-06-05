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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ferme le menu si on resize vers desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-black/95 backdrop-blur-sm shadow-lg shadow-black/50"
          : "bg-black/60 backdrop-blur-sm"
        }`}
      style={{ maxWidth: "100vw", left: 0, right: 0 }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3"
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      >
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="منبر" className="h-7 sm:h-8 md:h-9 w-auto" />
        </Link>

        {/* Desktop links */}
        <ul
          className="hidden md:flex gap-4 lg:gap-6 list-none"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          {links.map(({ key, path }) => (
            <li key={key}>
              <Link
                to={path}
                className="text-mist/70 hover:text-gold font-arabic text-xs lg:text-sm
                           transition-colors duration-200 whitespace-nowrap"
              >
                {t.nav[key]}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: dropdown + hamburger */}
        <div
          className="flex items-center gap-2 sm:gap-3"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          {/* Language Dropdown */}
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setDropOpen(!dropOpen)}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg
                         border border-white/15 text-white text-[11px] sm:text-sm font-mono
                         hover:border-pink/60 hover:bg-white/5 transition-all duration-200"
            >
              <span>{langLabels[lang].flag}</span>
              <span className="text-[11px] sm:text-sm">{langLabels[lang].label}</span>
              <svg
                width="10" height="10" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                className={`transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {dropOpen && (
              <div
                className="absolute top-full mt-2 w-36 sm:w-40 bg-[#0a0a0a]
                           border border-white/10 rounded-xl shadow-xl shadow-black/80
                           overflow-hidden z-50"
                style={{ [isRTL ? "left" : "right"]: 0 }}
              >
                {Object.entries(langLabels).map(([code, { label, flag }]) => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); setDropOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3
                                text-[11px] sm:text-sm font-mono transition-colors duration-150
                                border-b border-white/5 last:border-b-0
                                ${isRTL ? "flex-row-reverse text-right" : "text-left"}
                                ${lang === code
                                  ? "bg-pink/20 text-pink font-bold"
                                  : "text-mist/70 hover:bg-white/5 hover:text-white"}`}
                  >
                    <span>{flag}</span>
                    <span>{label}</span>
                    {lang === code && (
                      <svg
                        className={isRTL ? "mr-auto" : "ml-auto"}
                        width="12" height="12" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="3"
                        strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-white p-1.5 rounded-lg
                       hover:bg-white/10 transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full
                     flex flex-col items-center gap-0
                     border-t border-white/10"
          style={{
            background: "rgba(5, 5, 5, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Links */}
          {links.map(({ key, path }, index) => (
            <Link
              key={key}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="w-full text-center font-arabic text-base
                         text-mist/80 hover:text-gold
                         transition-all duration-200
                         py-4 px-6
                         hover:bg-white/5"
              style={{
                borderBottom: index < links.length - 1
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "none",
              }}
            >
              {t.nav[key]}
            </Link>
          ))}

          {/* Ligne décorative bas */}
          <div className="py-4 flex flex-col items-center gap-2">
            <div className="w-10 h-0.5 bg-pink rounded-full opacity-60" />
            <p className="text-mist/30 font-mono text-[10px] tracking-widest">
              MINBAR · منبر
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;