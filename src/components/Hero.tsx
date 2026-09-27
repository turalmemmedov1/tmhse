"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full px-6 md:px-12 pt-12 pb-24 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-between min-h-[85vh]">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 flex flex-col gap-8 z-10"
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-accent"></div>
          <span className="text-xs uppercase tracking-widest text-text-muted font-semibold">SƏTƏM üzrə peşəkar yanaşma</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight">
          Təhlükəsiz iş.<br />
          Sağlam həyat.<br />
          <span className="text-accent">Dayanıqlı gələcək.</span>
        </h1>
        
        <p className="text-text-muted text-lg md:text-xl max-w-md leading-relaxed">
          İnsanları qoruyan, riskləri azaldan və ətraf mühitə dəyər verən iş mədəniyyəti birlikdə qurulur.
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-accent text-dark-bg px-8 py-4 w-fit font-semibold flex items-center gap-3 rounded-sm mt-4 hover:bg-accent-hover transition-colors"
        >
          Xidmətləri kəşf edin
          <ArrowUpRight className="w-5 h-5" />
        </motion.button>

        <div className="mt-12 flex flex-col gap-1 border-l-2 border-white/10 pl-4">
          <span className="font-semibold text-lg">Tural Mammadov</span>
          <span className="text-sm text-text-muted">Sağlamlıq, əməyin təhlükəsizliyi və ətraf mühit</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full md:w-1/2 relative h-[500px] md:h-[650px] rounded-2xl overflow-hidden group"
      >
        {/* Placeholder for real image */}
        <div className="absolute inset-0 bg-dark-bg-card flex items-center justify-center border border-white/10">
          <span className="text-white/20 text-xl font-light tracking-widest">Görsel / Şəkil Yeri</span>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80" 
          alt="Workers in hard hats" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
        />
        
        <div className="absolute top-8 left-8">
          <span className="text-xs uppercase tracking-widest text-white/70">İnsan hər şeydən öncə</span>
        </div>

        <div className="absolute bottom-8 left-8 right-8 p-6 bg-dark-bg/40 backdrop-blur-md rounded-xl border border-white/10">
          <div className="flex gap-4">
            <span className="text-accent font-medium">01 /</span>
            <p className="text-xl font-medium leading-snug">Hər təhlükəsiz addım gələcəyə sərmayədir.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
