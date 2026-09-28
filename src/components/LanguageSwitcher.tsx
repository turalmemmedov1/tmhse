"use client";

import { useEffect, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCookie, setCookie } from "cookies-next";

const languages = [
  { code: "az", name: "AZ" },
  { code: "en", name: "EN" },
  { code: "ru", name: "RU" },
  { code: "tr", name: "TR" }
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("AZ");

  useEffect(() => {
    // Check initial language from cookie
    const googtrans = getCookie("googtrans") as string;
    if (googtrans) {
      const current = googtrans.split("/").pop()?.toUpperCase() || "AZ";
      setCurrentLang(current);
    }

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "az",
            includedLanguages: "az,en,ru,tr",
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }
  }, []);

  const changeLanguage = (langCode: string, langName: string) => {
    setCurrentLang(langName);
    setIsOpen(false);
    
    // Set Google Translate cookie
    setCookie("googtrans", `/az/${langCode}`);
    setCookie("googtrans", `/az/${langCode}`, { domain: window.location.hostname });
    
    // Reload page to apply translation safely without bugs
    window.location.reload();
  };

  return (
    <div className="relative z-[90]">
      {/* Gizli div - tam display:none etmirik ki, load olsun, sadəcə gizlədirik */}
      <div id="google_translate_element" className="absolute top-[-9999px] left-[-9999px] opacity-0 pointer-events-none"></div>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white font-bold text-xs bg-white/5 hover:bg-white/10 px-3 py-2 rounded-full border border-white/10 transition-colors"
      >
        <Globe className="w-3.5 h-3.5" />
        {currentLang}
        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-24 bg-white rounded-xl shadow-xl border border-dark-bg/10 overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code, lang.name)}
                className="w-full text-left px-4 py-2.5 text-xs font-bold text-dark-bg hover:bg-gray-100 hover:text-accent transition-colors border-b border-gray-50 last:border-0"
              >
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
