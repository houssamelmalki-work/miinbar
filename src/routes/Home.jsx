import React from "react";
import Navbar from "../components/Navbar";
import GlobeScene from "../components/GlobeScene";
import BreakingBanner from "../components/BreakingBanner";
import NewsGrid from "../components/NewsGrid";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <GlobeScene />
      <BreakingBanner />
      <NewsGrid />
      <Newsletter />
      <Footer />
      <ScrollToTop />
    </div>
  );
}