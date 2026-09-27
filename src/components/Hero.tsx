"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import LedLight from "./LedLight";

export default function Hero() {
  return (
    <section className="relative w-full px-6 md:px-16 pt-12 pb-24 flex flex-col md:flex-row gap-12 items-center justify-between min-h-[90vh] overflow-hidden">
      <LedLight />
      
      <motion.div 
        initial={{ opacity: 0, x: -100, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 flex flex-col gap-10 z-10"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-[2px] bg-accent"></div>
          <span className="text-sm uppercase tracking-[0.3em] text-accent font-semibold">SƏTƏM üzrə peşəkar yanaşma</span>
        </div>
        
        <h1 className="text-6xl md:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-white drop-shadow-2xl">
          Təhlükəsiz iş.<br />
          Sağlam həyat.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">Dayanıqlı gələcək.</span>
        </h1>
        
        <p className="text-text-muted text-xl md:text-2xl max-w-xl leading-relaxed font-light">
          İnsanları qoruyan, riskləri azaldan və ətraf mühitə dəyər verən iş mədəniyyəti birlikdə qurulur.
        </p>

        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(174,226,132,0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-accent to-accent-hover text-dark-bg px-10 py-5 w-fit font-bold text-lg flex items-center gap-3 rounded-full mt-4 transition-all duration-300"
        >
          Xidmətləri kəşf edin
          <ArrowUpRight className="w-6 h-6" />
        </motion.button>

        <div className="mt-16 flex flex-col gap-2 border-l-4 border-accent pl-6">
          <span className="font-bold text-2xl tracking-wide text-white">TMHSE</span>
          <span className="text-base text-text-muted font-medium">Sağlamlıq, əməyin təhlükəsizliyi və ətraf mühit</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 100, rotate: 5, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 relative h-[600px] md:h-[750px] rounded-[2rem] overflow-hidden group shadow-2xl shadow-black/50 z-10"
      >
        <img 
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80" 
          alt="Workers in hard hats" 
          className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-110 transition-all duration-1000 ease-out"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80"></div>

        <div className="absolute top-10 left-10">
          <span className="text-sm uppercase tracking-widest text-white/90 font-medium bg-black/30 px-4 py-2 rounded-full backdrop-blur-md">
            İnsan hər şeydən öncə
          </span>
        </div>

        <div className="absolute bottom-10 left-10 right-10 p-8 bg-dark-bg/60 backdrop-blur-xl rounded-2xl border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
          <div className="flex gap-6 items-start">
            <span className="text-accent font-bold text-2xl">01 /</span>
            <p className="text-3xl font-semibold leading-snug text-white">Hər təhlükəsiz addım <br/>gələcəyə sərmayədir.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
