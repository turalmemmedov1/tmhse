"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-dark-bg-card text-white pt-24 pb-12 px-6 md:px-16 border-t border-white/10 overflow-hidden relative">
      
      <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-16 mb-24 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 max-w-sm"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="relative w-16 h-16">
              <Image src="/ProLogo.png" alt="TMHSE Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-2xl tracking-wider uppercase text-white">TMHSE</span>
          </div>
          <p className="text-accent text-lg font-medium leading-relaxed italic border-l-2 border-accent pl-4">
            "Təhlükəsizlik qaydadan daha böyük dəyərdir."
          </p>
          <p className="text-text-muted text-sm leading-relaxed mt-2">
            İnsanları qoruyan, riskləri azaldan və ətraf mühitə dəyər verən iş mədəniyyəti.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Siyasətlər və Digər</h4>
            <Link href="/siyasetler" className="text-text-muted hover:text-white transition-colors w-fit font-medium">Məxfilik Siyasəti</Link>
            <Link href="/siyasetler" className="text-text-muted hover:text-white transition-colors w-fit font-medium">İstifadə Şərtləri</Link>
            <Link href="/siyasetler" className="text-text-muted hover:text-white transition-colors w-fit font-medium">SƏTƏM Siyasəti</Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Əlaqə</h4>
            <Link href="/elaqe" className="text-white hover:text-accent font-bold underline underline-offset-4 mb-2">Əlaqə Səhifəsinə Keçid</Link>
            <a href="mailto:info@tmhse.expert" className="text-text-muted hover:text-white transition-colors w-fit font-medium">info@tmhse.expert</a>
            <p className="text-text-muted text-sm">Bakı şəhəri, Azərbaycan</p>
          </motion.div>
        </div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm relative z-10"
      >
        <div className="text-text-muted text-xs md:text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} TMHSE. Bütün hüquqlar qorunur. <br className="md:hidden" />
          <span className="md:ml-2 text-white/50">Saytın təsisçisi və icraçısı: <span className="text-white font-medium">Tural Məmmədov</span></span>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-text-muted hover:text-white hover:border-accent hover:bg-accent/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-text-muted hover:text-white hover:border-accent hover:bg-accent/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors uppercase tracking-[0.2em] text-xs font-bold group border-l border-white/20 pl-8"
          >
            Yuxarı
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent transition-colors">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </motion.div>

      {/* Huge background text */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 text-[15vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        TMHSE EXPERT
      </div>
    </footer>
  );
}
