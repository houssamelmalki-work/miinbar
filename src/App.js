import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import Home from "./routes/Home";
import ArticlePage from "./routes/ArticlePage";
import CategoryPage from "./routes/CategoryPage";
import ContactPage from "./routes/ContactPage";

function App() {
  const location = useLocation();

  // ✅ Envoie chaque visite de page à Google Analytics
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page:    location.pathname,
    });
  }, [location]);

  return (
    <Routes>
      <Route path="/"              element={<Home />} />
      <Route path="/article/:id"   element={<ArticlePage />} />
      <Route path="/category/:cat" element={<CategoryPage />} />
      <Route path="/contact"       element={<ContactPage />} />
    </Routes>
  );
}

export default App;