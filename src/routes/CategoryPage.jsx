import React from "react";
import { useParams } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { getArticlesByCategory } from "../data/articles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import ScrollToTop from "../components/ScrollToTop";

export default function CategoryPage() {
  const { cat } = useParams();
  const { t } = useLang();
  const articles = getArticlesByCategory(cat);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <ScrollToTop />
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8 flex items-center gap-3">
          <span className="w-1 h-8 bg-pink rounded-full" />
          <h1 className="text-gold font-arabic font-bold text-3xl">
            {t.categories[cat] || t.categories.all}
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          {articles.map(a => <NewsCard key={a.id} article={a} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}