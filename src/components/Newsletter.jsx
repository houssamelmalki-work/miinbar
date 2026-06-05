import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLang } from "../context/LanguageContext";

const SERVICE_ID       = "service_lfh8ol8";
const TEMPLATE_NOTIFY  = "template_rqk3bbw"; // → toi tu reçois
const TEMPLATE_WELCOME = "template_dao24or"; // → utilisateur reçoit
const PUBLIC_KEY       = "xWVLfZ71ueNOSY83I";

export default function Newsletter() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    const messages = {
      ar: {
        subject:  "مرحباً بك في منبر 🎉",
        greeting: "مرحباً،",
        body:     "شكراً لاشتراكك في النشرة البريدية لمنبر. ستصلك أحدث الأخبار والتحليلات مباشرة في بريدك الإلكتروني.",
        closing:  "فريق منبر",
        website:  "miinbar.netlify.app",
      },
      fr: {
        subject:  "Bienvenue sur Minbar 🎉",
        greeting: "Bonjour,",
        body:     "Merci de vous être abonné à la newsletter de Minbar. Vous recevrez les dernières actualités directement dans votre boîte mail.",
        closing:  "L'équipe Minbar",
        website:  "miinbar.netlify.app",
      },
      en: {
        subject:  "Welcome to Minbar 🎉",
        greeting: "Hello,",
        body:     "Thank you for subscribing to Minbar newsletter. You will receive the latest news directly in your inbox.",
        closing:  "The Minbar Team",
        website:  "miinbar.netlify.app",
      },
    };

    const msg = messages[lang] || messages.ar;
    const date = new Date().toLocaleString(
      lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-GB"
    );

    try {
      // ── Email 1 : toi tu reçois la notification ──
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_NOTIFY,
        {
          subscriber_email: email,
          date:             date,
        },
        PUBLIC_KEY
      );

      // ── Email 2 : utilisateur reçoit bienvenue ──
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_WELCOME,
        {
          to_email: email,
          to_name:  email.split("@")[0],
          subject:  msg.subject,
          greeting: msg.greeting,
          body:     msg.body,
          closing:  msg.closing,
          website:  msg.website,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);

    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="bg-wine/10 border-t border-b border-wine/20 py-10 sm:py-12 md:py-16 px-4">
      <div className="max-w-xl mx-auto text-center">

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-pink/20 border border-pink/30
                        flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#fc005b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>

        <h2 className="text-gold font-arabic font-bold text-xl sm:text-2xl mb-2">
          {t.newsletter.title}
        </h2>
        <p className="text-mist/60 font-arabic text-sm sm:text-base mb-6">
          {t.newsletter.subtitle}
        </p>

        {/* Success */}
        {status === "success" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-14 h-14 rounded-full bg-green-900/30 border border-green-500/30
                            flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <p className="text-green-400 font-arabic text-base">
              {t.newsletter.success}
            </p>
            <p className="text-mist/40 font-mono text-xs">
              {lang === "ar"
                ? "تفقد صندوق بريدك الإلكتروني"
                : lang === "fr"
                ? "Vérifiez votre boîte mail"
                : "Check your inbox"}
            </p>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="mb-4 px-4 py-3 bg-red-900/20 border border-red-500/20 rounded-lg">
            <p className="text-red-400 font-arabic text-sm">
              {lang === "ar"
                ? "⚠️ حدث خطأ. تحقق من البريد وحاول مجدداً."
                : lang === "fr"
                ? "⚠️ Une erreur s'est produite. Réessayez."
                : "⚠️ An error occurred. Please try again."}
            </p>
          </div>
        )}

        {/* Form */}
        {(status === "idle" || status === "loading") && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col xs:flex-row gap-2 sm:gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              disabled={status === "loading"}
              className="flex-1 bg-black border border-wine/50 rounded-lg
                         px-3 sm:px-4 py-2.5 sm:py-3
                         text-white font-arabic text-xs sm:text-sm
                         focus:outline-none focus:border-pink transition-colors
                         placeholder-mist/30 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-pink text-white
                         font-mono text-xs sm:text-sm font-bold rounded-lg
                         hover:bg-wine transition-all duration-200
                         flex-shrink-0 flex items-center justify-center gap-2
                         disabled:opacity-60 disabled:cursor-not-allowed min-w-[100px]"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin" width="14" height="14"
                    viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  <span>
                    {lang === "ar" ? "جارٍ..." : lang === "fr" ? "Envoi..." : "Sending..."}
                  </span>
                </>
              ) : (
                t.newsletter.btn
              )}
            </button>
          </form>
        )}

        {/* Info */}
        {status === "idle" && (
          <p className="text-mist/30 font-mono text-[10px] mt-4 tracking-wide">
            {lang === "ar"
              ? "لن نشارك بريدك مع أي طرف ثالث"
              : lang === "fr"
              ? "Nous ne partagerons jamais votre email"
              : "We will never share your email"}
          </p>
        )}

      </div>
    </div>
  );
}