"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-dark-bg text-white border-t border-white/10 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        
        <div className="flex items-center gap-2 font-bold tracking-widest uppercase">
          Tural Mammadov <span className="text-accent ml-2">HSE</span>
        </div>

        <div className="text-text-muted text-xs md:text-sm text-center">
          &copy; {new Date().getFullYear()} - Nümunə təqdimat - Xidmətlər ilkin təklifdir
        </div>

        <button 
          onClick={scrollToTop}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold"
        >
          Yuxarı
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
}
