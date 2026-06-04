import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import ArticlePage from "./routes/ArticlePage";
import ContactPage from "./routes/ContactPage";
import CategoryPage from "./routes/CategoryPage";

function App() {
  return (
    <Routes>
      <Route path="/"                  element={<Home />} />
      <Route path="/article/:id"       element={<ArticlePage />} />
      <Route path="/category/:cat"     element={<CategoryPage />} />
      <Route path="/contact"           element={<ContactPage />} />
    </Routes>
  );
}

export default App;