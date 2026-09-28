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
    <footer className="w-full bg-dark-bg-card text-white py-8 px-6 md:px-16 border-t border-white/10 overflow-hidden relative">
      
      <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-10 mb-10 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 max-w-sm"
        >
          
          <p className="text-accent text-base font-medium leading-relaxed italic border-l-2 border-accent pl-4">
            "Təhlükəsizlik qaydadan daha böyük dəyərdir."
          </p>
          <p className="text-text-muted text-xs leading-relaxed mt-2">
            İnsanları qoruyan, riskləri azaldan və ətraf mühitə dəyər verən iş mədəniyyəti.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-1">Siyasətlər və Digər</h4>
            <Link href="/haqqimizda" className="text-text-muted hover:text-white transition-colors w-fit text-sm font-medium">Haqqımızda</Link>
            <Link href="/siyasetler/mexfilik" className="text-text-muted hover:text-white transition-colors w-fit text-sm font-medium">Məxfilik Siyasəti</Link>
            <Link href="/siyasetler/sertler" className="text-text-muted hover:text-white transition-colors w-fit text-sm font-medium">İstifadə Şərtləri</Link>
            <Link href="/siyasetler/setem" className="text-text-muted hover:text-white transition-colors w-fit text-sm font-medium">SƏTƏM Siyasəti</Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-1">Əlaqə</h4>
            <Link href="/elaqe" className="text-white hover:text-accent text-sm font-bold underline underline-offset-4 mb-1">Əlaqə Səhifəsinə Keçid</Link>
            
            <p className="text-text-muted text-xs">Bakı şəhəri, Azərbaycan</p>
          </motion.div>
        </div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm relative z-10"
      >
        <div className="text-text-muted text-[10px] md:text-xs text-center md:text-left leading-relaxed">
          &copy; {new Date().getFullYear()} TMHSE. Bütün hüquqlar qorunur. <br className="md:hidden" />
          <span className="md:ml-2 text-white/50">Saytın təsisçisi və icraçısı: <span className="text-white font-medium">Tural Məmmədov</span></span>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center gap-6">
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-text-muted hover:text-white hover:border-accent hover:bg-accent/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-text-muted hover:text-white hover:border-accent hover:bg-accent/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors uppercase tracking-[0.2em] text-[10px] font-bold group border-b md:border-b-0 md:border-l border-white/20 pb-4 md:pb-0 md:pl-6 w-full md:w-auto justify-center"
          >
            Yuxarı
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent transition-colors">
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
