import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useLang } from "../context/LanguageContext";
import logo from "../assets/logo_minbar.png";

export default function Footer() {
  const { t } = useLang();

  const sections = [
    { key: "politics", path: "/category/politics" },
    { key: "economy",  path: "/category/economy" },
    { key: "sports",   path: "/category/sports" },
    { key: "tech",     path: "/category/tech" },
    { key: "culture",  path: "/category/culture" },
    { key: "world",    path: "/category/world" },
  ];

  // URLs des réseaux sociaux (à remplacer par vos vraies URLs)
  const socialLinks = {
    facebook: "https://facebook.com/minbar",
    twitter: "https://twitter.com/minbar",
    instagram: "https://instagram.com/minbar",
    youtube: "https://youtube.com/minbar"
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-8 sm:pt-12 pb-4 sm:pb-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-6 sm:mb-8 md:mb-10">

        {/* Brand */}
        <div className="text-center sm:text-left">
          <img src={logo} alt="منبر" className="h-8 sm:h-10 mb-3 sm:mb-4 mx-auto sm:mx-0" />
          <p className="text-mist/50 font-arabic text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
            {t.footer.description}
          </p>
          <div className="flex gap-4 mt-4 sm:mt-5 justify-center sm:justify-start">
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
              className="text-mist/30 hover:text-pink transition-colors hover:-translate-y-1 duration-200 block"
              aria-label="Facebook">
              <FaFacebook size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href={socialLinks.x} target="_blank" rel="noopener noreferrer"
              className="text-mist/30 hover:text-pink transition-colors hover:-translate-y-1 duration-200 block"
              aria-label="Twitter">
              <FaTwitter size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
              className="text-mist/30 hover:text-pink transition-colors hover:-translate-y-1 duration-200 block"
              aria-label="Instagram">
              <FaInstagram size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
              className="text-mist/30 hover:text-pink transition-colors hover:-translate-y-1 duration-200 block"
              aria-label="YouTube">
              <FaYoutube size={18} className="sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>

        {/* Sections */}
        <div className="text-center sm:text-left">
          <h4 className="text-gold font-mono font-bold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
            {t.footer.sections}
          </h4>
          <ul className="space-y-1.5 sm:space-y-2">
            {sections.map(({ key, path }) => (
              <li key={key}>
                <Link to={path}
                  className="text-mist/50 hover:text-pink font-arabic text-xs sm:text-sm transition-colors">
                  {t.categories[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="text-center sm:text-left">
          <h4 className="text-gold font-mono font-bold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
            {t.nav.contact}
          </h4>
          <div className="space-y-1.5 sm:space-y-2 text-mist/50 font-mono text-[10px] sm:text-xs">
            <p>{t.contact.address}</p>
            <p>{t.contact.phone}</p>
            <p className="break-all">{t.contact.emailContact}</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-mist/30 text-[10px] sm:text-xs font-mono px-2">
        <p className="text-center sm:text-left">© {new Date().getFullYear()} منبر · Minbar. {t.footer.rights}</p>
        <div className="flex gap-4 sm:gap-6">
          <Link to="/privacy" className="hover:text-pink transition-colors">{t.footer.privacy}</Link>
          <Link to="/terms" className="hover:text-pink transition-colors">{t.footer.terms}</Link>
        </div>
      </div>
    </footer>
  );
}