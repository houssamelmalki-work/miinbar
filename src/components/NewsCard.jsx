import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

const categoryColors = {
  politics: "bg-red-900/60 text-red-300",
  economy:  "bg-green-900/60 text-green-300",
  sports:   "bg-blue-900/60 text-blue-300",
  tech:     "bg-purple-900/60 text-purple-300",
  culture:  "bg-yellow-900/60 text-yellow-300",
  world:    "bg-gray-700/60 text-gray-300",
};

const categoryLabels = {
  ar: { politics:"سياسة", economy:"اقتصاد", sports:"رياضة", tech:"تكنولوجيا", culture:"ثقافة", world:"العالم" },
  fr: { politics:"Politique", economy:"Économie", sports:"Sport", tech:"Technologie", culture:"Culture", world:"Monde" },
  en: { politics:"Politics", economy:"Economy", sports:"Sports", tech:"Technology", culture:"Culture", world:"World" },
};

export default function NewsCard({ article, featured = false }) {
  const { lang, t } = useLang();

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(
      lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-GB",
      { year: "numeric", month: "long", day: "numeric" }
    );
  };

  if (featured) {
    return (
      <Link to={`/article/${article.id}`}
        className="group relative block rounded-xl sm:rounded-2xl overflow-hidden shadow-xl
                   h-56 xs:h-64 sm:h-72 md:h-80 lg:h-96">
        <img src={article.image} alt={article.title[lang]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <span className={`absolute top-2 right-2 sm:top-3 sm:right-3 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-mono font-bold ${categoryColors[article.category]}`}>
          {categoryLabels[lang][article.category]}
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 sm:mb-2 text-mist/70 text-[9px] sm:text-xs font-mono">
            <span>{formatDate(article.date)}</span>
            <span>·</span>
            <span>{article.time}</span>
            <span>·</span>
            <span className="hidden xs:inline">{article.readTime} {t.news.minRead}</span>
          </div>

          <h2 className="text-white font-arabic font-bold
                         text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl
                         leading-snug mb-1 sm:mb-2 group-hover:text-gold transition-colors
                         line-clamp-2 sm:line-clamp-3">
            {article.title[lang]}
          </h2>

          {/* intro cachée sur très petit écran */}
          <p className="hidden sm:block text-mist/80 font-arabic text-xs sm:text-sm line-clamp-2">
            {article.intro[lang]}
          </p>

          <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-pink flex items-center justify-center text-white text-[9px] sm:text-xs font-bold flex-shrink-0">
              {article.author[lang][0]}
            </div>
            <span className="text-mist/60 text-[9px] sm:text-xs font-mono truncate">
              {t.news.by} {article.author[lang]}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Carte compacte responsive
  return (
    <Link to={`/article/${article.id}`}
      className="group flex gap-2 sm:gap-3 bg-[#0f1218] border border-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4
                 hover:border-wine/40 transition-all duration-300 w-full">
      {/* Image */}
      <div className="w-20 h-16 xs:w-24 xs:h-20 sm:w-28 sm:h-24 md:w-32 md:h-28 flex-shrink-0 rounded-md sm:rounded-lg overflow-hidden">
        <img src={article.image} alt={article.title[lang]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className={`inline-block px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-mono mb-0.5 sm:mb-1 ${categoryColors[article.category]}`}>
          {categoryLabels[lang][article.category]}
        </span>

        <h3 className="text-white font-arabic font-bold text-xs sm:text-sm leading-snug
                       line-clamp-2 group-hover:text-gold transition-colors mb-0.5 sm:mb-1">
          {article.title[lang]}
        </h3>

        <div className="flex flex-wrap items-center gap-1 text-mist/50 text-[9px] sm:text-xs font-mono">
          <span>{formatDate(article.date)}</span>
          <span>·</span>
          <span>{article.time}</span>
          <span className="hidden xs:inline">·</span>
          <span className="hidden xs:inline">{article.readTime} {t.news.minRead}</span>
        </div>
      </div>
    </Link>
  );
}