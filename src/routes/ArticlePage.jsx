import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { getArticleById, articles } from "../data/articles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import NewsCard from "../components/NewsCard";

const categoryColors = {
  politics:"text-red-400", economy:"text-green-400",
  sports:"text-blue-400", tech:"text-purple-400",
  culture:"text-yellow-400", world:"text-gray-400",
};

export default function ArticlePage() {
  const { id } = useParams();
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const article = getArticleById(id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!article) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <p className="text-mist font-arabic text-xl mb-4">المقال غير موجود</p>
        <Link to="/" className="text-pink font-mono underline">← العودة</Link>
      </div>
    </div>
  );

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(
      lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-GB",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );
  };

  // Related articles (same category, different id)
  const related = articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 2);

  // Prev / Next
  const currentIndex = articles.findIndex(a => a.id === article.id);
  const prevArticle = articles[currentIndex - 1];
  const nextArticle = articles[currentIndex + 1];

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <ScrollToTop />

      <div className="max-w-3xl mx-auto px-4 pt-24 pb-20">

        {/* Back button */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-mist/60 hover:text-pink font-mono text-sm mb-8 transition-colors group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          {lang === "ar" ? "العودة" : lang === "fr" ? "Retour" : "Back"}
        </button>

        {/* Category */}
        <span className={`font-mono text-sm font-bold uppercase tracking-widest ${categoryColors[article.category]}`}>
          {t.categories[article.category]}
        </span>

        {/* Title */}
        <h1 className="text-white font-arabic font-bold text-3xl md:text-4xl leading-tight mt-3 mb-4">
          {article.title[lang]}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-mist/50 text-sm font-mono mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-wine flex items-center justify-center text-white text-sm font-bold">
              {article.author[lang][0]}
            </div>
            <span>{t.news.by} <strong className="text-mist/80">{article.author[lang]}</strong></span>
          </div>
          <span>·</span>
          <span>{formatDate(article.date)}</span>
          <span>·</span>
          <span>{article.time}</span>
          <span>·</span>
          <span>{article.readTime} {t.news.minRead}</span>
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden mb-8 h-64 md:h-96">
          <img src={article.image} alt={article.title[lang]}
            className="w-full h-full object-cover" />
        </div>

        {/* Intro */}
        <p className="text-gold font-arabic text-lg leading-relaxed mb-8 border-r-4 border-pink pr-4">
          {article.intro[lang]}
        </p>

        {/* Content */}
        <div className="text-mist/80 font-arabic text-base leading-relaxed space-y-5">
          {article.content[lang].split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Prev / Next navigation */}
        <div className="grid grid-cols-2 gap-4 mt-16 pt-8 border-t border-white/10">
          {prevArticle ? (
            <Link to={`/article/${prevArticle.id}`}
              className="group flex flex-col gap-1 p-4 bg-[#0f1218] rounded-xl border border-white/5 hover:border-wine/40 transition-all">
              <span className="text-mist/40 text-xs font-mono flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                {lang === "ar" ? "السابق" : lang === "fr" ? "Précédent" : "Previous"}
              </span>
              <span className="text-white font-arabic text-sm line-clamp-2 group-hover:text-gold transition-colors">
                {prevArticle.title[lang]}
              </span>
            </Link>
          ) : <div />}

          {nextArticle ? (
            <Link to={`/article/${nextArticle.id}`}
              className="group flex flex-col gap-1 p-4 bg-[#0f1218] rounded-xl border border-white/5 hover:border-wine/40 transition-all text-right">
              <span className="text-mist/40 text-xs font-mono flex items-center gap-1 justify-end">
                {lang === "ar" ? "التالي" : lang === "fr" ? "Suivant" : "Next"}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
              <span className="text-white font-arabic text-sm line-clamp-2 group-hover:text-gold transition-colors">
                {nextArticle.title[lang]}
              </span>
            </Link>
          ) : <div />}
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-gold font-arabic font-bold text-xl mb-6 flex items-center gap-3">
              <span className="w-1 h-5 bg-pink rounded-full" />
              {t.news.related}
            </h3>
            <div className="flex flex-col gap-4">
              {related.map(a => <NewsCard key={a.id} article={a} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}