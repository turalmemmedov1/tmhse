"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-dark-bg-card text-white pt-24 pb-12 px-6 md:px-16 border-t border-white/10 overflow-hidden relative">
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-bold text-3xl tracking-wider uppercase text-white">TMHSE</span>
          </div>
          <p className="text-text-muted text-sm leading-relaxed max-w-xs">
            İnsanları qoruyan, riskləri azaldan və ətraf mühitə dəyər verən iş mədəniyyəti.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Sürətli keçidlər</h4>
          <Link href="/haqqimizda" className="text-text-muted hover:text-white transition-colors w-fit font-medium">Haqqımızda</Link>
          <Link href="/xidmetler" className="text-text-muted hover:text-white transition-colors w-fit font-medium">Xidmətlər</Link>
          <Link href="/vakansiyalar" className="text-text-muted hover:text-white transition-colors w-fit font-medium">Vakansiyalar</Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Siyasətlər</h4>
          <Link href="/siyasetler" className="text-text-muted hover:text-white transition-colors w-fit font-medium">Məxfilik Siyasəti</Link>
          <Link href="/siyasetler" className="text-text-muted hover:text-white transition-colors w-fit font-medium">İstifadə Şərtləri</Link>
          <Link href="/siyasetler" className="text-text-muted hover:text-white transition-colors w-fit font-medium">SƏTƏM Siyasəti</Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Əlaqə</h4>
          <a href="mailto:info@tmhse.expert" className="text-text-muted hover:text-white transition-colors w-fit font-medium text-lg">info@tmhse.expert</a>
          <p className="text-text-muted text-sm max-w-xs">Bakı şəhəri, Azərbaycan</p>
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm relative z-10"
      >
        <div className="text-text-muted text-xs md:text-sm text-center">
          &copy; {new Date().getFullYear()} TMHSE. Bütün hüquqlar qorunur.
        </div>

        <button 
          onClick={scrollToTop}
          className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors uppercase tracking-[0.2em] text-xs font-bold group"
        >
          Yuxarı
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent transition-colors">
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </div>
        </button>
      </motion.div>

      {/* Huge background text */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 text-[15vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        TMHSE EXPERT
      </div>
    </footer>
  );
}
