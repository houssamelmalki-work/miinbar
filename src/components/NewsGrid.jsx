import React, { useState } from "react";
import { useLang } from "../context/LanguageContext";
import NewsCard from "./NewsCard";
import { articles, getFeaturedArticles } from "../data/articles";

const catLabel = {
  ar: { all:"الكل", politics:"سياسة", economy:"اقتصاد", sports:"رياضة", tech:"تكنولوجيا", culture:"ثقافة", world:"العالم" },
  fr: { all:"Tout", politics:"Politique", economy:"Économie", sports:"Sport", tech:"Technologie", culture:"Culture", world:"Monde" },
  en: { all:"All", politics:"Politics", economy:"Economy", sports:"Sports", tech:"Technology", culture:"Culture", world:"World" },
};

export default function NewsGrid() {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");
  const [visible, setVisible] = useState(6);

  const categories = ["all", "politics", "economy", "sports", "tech", "culture", "world"];
  const featured = getFeaturedArticles().slice(0, 2);
  const filtered = activeCategory === "all"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="bg-black min-h-screen px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-w-6xl mx-auto">

        {/* Featured */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-gold font-arabic font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3">
            <span className="w-0.5 h-4 sm:h-5 md:h-6 bg-pink rounded-full" />
            {t.news.trending}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {featured.map(a => <NewsCard key={a.id} article={a} featured />)}
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-1.5 sm:gap-2 mb-5 sm:mb-6 md:mb-8 overflow-x-auto pb-2 scrollbar-hide
                        -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setVisible(6); }}
              className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-mono border
                          whitespace-nowrap flex-shrink-0 transition-all duration-200
                          ${activeCategory === cat
                            ? "bg-pink border-pink text-white"
                            : "border-white/20 text-mist/60 hover:border-pink/50 hover:text-white"}`}>
              {catLabel[lang][cat]}
            </button>
          ))}
        </div>

        {/* Latest */}
        <h2 className="text-gold font-arabic font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3">
          <span className="w-0.5 h-4 sm:h-5 md:h-6 bg-pink rounded-full" />
          {t.news.latest}
        </h2>

        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          {filtered.slice(0, visible).map(a => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>

        {visible < filtered.length && (
          <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
            <button onClick={() => setVisible(v => v + 6)}
              className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 border border-gold text-gold font-mono text-[11px] sm:text-xs md:text-sm
                         hover:bg-gold hover:text-black transition-all duration-200 rounded-sm">
              {t.news.loadMore}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}