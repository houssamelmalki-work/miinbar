import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLang } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs.send("service_67tywgi", "template_5et7vbu",
      { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
      "rtP34a9hac_q0w-p-"
    ).then(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(""), 4000);
    }).catch(() => setStatus("error"));
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <ScrollToTop />
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-10">
          <h1 className="text-gold font-arabic font-bold text-4xl mb-2">{t.contact.title}</h1>
          <p className="text-mist/60 font-arabic">{t.contact.subtitle}</p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: "📍", val: t.contact.address },
            { icon: "📞", val: t.contact.phone },
            { icon: "✉️", val: t.contact.emailContact },
          ].map((item, i) => (
            <div key={i} className="bg-[#0f1218] rounded-xl p-4 text-center border border-white/5">
              <span className="text-2xl block mb-2">{item.icon}</span>
              <span className="text-mist/60 font-mono text-xs">{item.val}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { key: "name",    label: t.contact.name,    placeholder: t.contact.namePlaceholder,    type: "text" },
            { key: "email",   label: t.contact.email,   placeholder: t.contact.emailPlaceholder,   type: "email" },
            { key: "subject", label: t.contact.subject, placeholder: t.contact.subjectPlaceholder, type: "text" },
          ].map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label className="block text-gold text-xs font-mono uppercase tracking-wider mb-2">{label}</label>
              <input type={type} placeholder={placeholder} required value={form[key]}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                className="w-full bg-[#0f1218] border border-white/10 rounded-xl px-4 py-3 text-white font-arabic
                           placeholder-mist/30 focus:outline-none focus:border-pink transition-colors" />
            </div>
          ))}

          <div>
            <label className="block text-gold text-xs font-mono uppercase tracking-wider mb-2">{t.contact.message}</label>
            <textarea rows={6} placeholder={t.contact.messagePlaceholder} required value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              className="w-full bg-[#0f1218] border border-white/10 rounded-xl px-4 py-3 text-white font-arabic
                         placeholder-mist/30 focus:outline-none focus:border-pink transition-colors resize-none" />
          </div>

          <button type="submit" disabled={status === "sending"}
            className="w-full py-4 bg-pink text-white font-mono font-bold text-sm uppercase tracking-widest
                       rounded-xl hover:bg-wine transition-colors disabled:opacity-60">
            {status === "sending" ? t.contact.sending : t.contact.send}
          </button>

          {status === "success" && <p className="text-center text-green-400 font-arabic">{t.contact.success}</p>}
          {status === "error"   && <p className="text-center text-red-400   font-arabic">{t.contact.error}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
}