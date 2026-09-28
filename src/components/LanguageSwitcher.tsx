"use client";

import { useEffect, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

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
    const googtrans = getCookie("googtrans") as string;
    const hasChosen = getCookie("has_chosen_lang");
    
    if (googtrans) {
      const current = googtrans.split("/").pop()?.toUpperCase() || "AZ";
      setCurrentLang(current);
    } else if (!hasChosen) {
      // Heç bir dil seçilməyibsə və ilk dəfədirsə, IP ilə təyin et
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data => {
            const country = data.country_code;
            if (country === 'RU') changeLanguage('ru', 'RU', true);
            else if (country === 'TR') changeLanguage('tr', 'TR', true);
            else if (country === 'US' || country === 'GB' || country === 'CA' || country === 'EU') changeLanguage('en', 'EN', true);
            else {
              // AZ və ya digər - heç nə etmə, sadəcə qeyd et ki yoxlanıldı
              setCookie("has_chosen_lang", "true", { maxAge: 31536000 });
            }
        })
        .catch(() => {});
    }

    
    // Just visually hide Google UI elements without removing them from DOM
    const hideGoogleUI = () => {
        document.querySelectorAll('.skiptranslate, .goog-te-spinner-pos, .goog-te-spinner, iframe.goog-te-banner-frame').forEach((el: any) => {
            if(el.id !== 'google_translate_element' && el.tagName !== 'BODY') {
                el.style.display = 'none';
                el.style.opacity = '0';
                el.style.visibility = 'hidden';
            }
        });
        if(document.body.style.top !== '0px') {
            document.body.style.top = '0px';
        }
    };
    
    const observer = new MutationObserver(() => {
        hideGoogleUI();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    setTimeout(hideGoogleUI, 500);
    setTimeout(hideGoogleUI, 2000);

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

  const changeLanguage = (langCode: string, langName: string, isAutoDetect = false) => {
    setCurrentLang(langName);
    setIsOpen(false);
    
    setCookie("has_chosen_lang", "true", { maxAge: 31536000 });

    if (langCode === 'az') {
      deleteCookie("googtrans");
      deleteCookie("googtrans", { domain: window.location.hostname });
    } else {
      setCookie("googtrans", `/az/${langCode}`);
      setCookie("googtrans", `/az/${langCode}`, { domain: window.location.hostname });
    }
    
    window.location.reload();
  };

  return (
    <div className="relative z-[90]">
      {/* Gizli div */}
      <div id="google_translate_element" className="absolute top-[-9999px] left-[-9999px] opacity-0 pointer-events-none w-0 h-0 overflow-hidden"></div>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white font-bold text-xs bg-white/5 hover:bg-white/10 px-3 py-2 rounded-full border border-white/10 transition-colors"
      >
        <Globe className="w-5 h-5 md:w-3.5 md:h-3.5" />
        <span className="hidden md:inline">{currentLang}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-70 hidden md:block" />
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
