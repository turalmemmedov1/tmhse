"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import LedLight from "./LedLight";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full px-6 md:px-16 pt-32 pb-16 flex flex-col md:flex-row gap-12 items-center justify-between min-h-[85vh] overflow-hidden">
      <LedLight />
      
      <motion.div 
        initial={{ opacity: 0, x: -50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 flex flex-col gap-6 z-10"
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-[2px] bg-accent"></div>
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">SƏTƏM üzrə peşəkar yanaşma</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl">
          Təhlükəsiz iş.<br />
          Sağlam həyat.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">Dayanıqlı gələcək.</span>
        </h1>
        
        <p className="text-text-muted text-lg max-w-lg leading-relaxed font-light mt-2">
          Riskləri azaldan və ətraf mühitə dəyər verən iş mədəniyyəti birlikdə qurulur.
        </p>

        <Link href="/xidmetler">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(174,226,132,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-accent to-accent-hover text-dark-bg px-8 py-4 w-fit font-bold text-base flex items-center gap-3 rounded-full mt-4 transition-all duration-300"
          >
            Xidmətləri kəşf edin
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50, rotate: 2, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 relative h-[350px] md:h-[500px] rounded-[2rem] overflow-hidden group shadow-xl z-10 border border-white/10 bg-dark-bg-card flex flex-col items-center justify-center"
      >
        {/* Boş Şəkil Yeri / Image Placeholder */}
        <div className="absolute inset-0 bg-dark-bg/50 backdrop-blur-sm z-0"></div>
        <span className="text-white/20 text-xl font-light tracking-widest z-10 uppercase">Şəkil Yeri</span>

        <div className="absolute top-6 left-6 z-20">
          <span className="text-xs uppercase tracking-widest text-white/90 font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
            İnsan hər şeydən öncə
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 z-20">
          <div className="flex gap-4 items-start">
            <span className="text-accent font-bold text-xl">01 /</span>
            <p className="text-lg font-medium leading-snug text-white">Hər təhlükəsiz addım <br/>gələcəyə sərmayədir.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
