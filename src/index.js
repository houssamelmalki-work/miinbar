import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import ReactGA from "react-ga4";

// ✅ Initialise Google Analytics
ReactGA.initialize("G-JQ51LD3147");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>
);