"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import LedLight from "./LedLight";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSettings } from "@/app/actions";

export default function Hero() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    getSettings().then(res => {
      if(res?.home_image_1) setImgUrl(res.home_image_1);
    });
  }, []);

  return (
    <section className="relative w-full px-6 md:px-16 pt-32 pb-16 flex flex-col md:flex-row gap-12 items-center justify-between min-h-[85vh] overflow-hidden">
      <LedLight />
      
      <motion.div 
        initial={{ opacity: 0, x: -50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 flex flex-col gap-5 z-10"
      >
        <div className="flex items-center gap-4 mt-8 md:mt-0">
          <div className="w-8 h-[2px] bg-accent"></div>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-accent font-semibold">SƏTƏM üzrə peşəkar yanaşma</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl">
          Təhlükəsiz iş.<br />
          Sağlam həyat.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">Dayanıqlı gələcək.</span>
        </h1>
        
        <p className="text-text-muted text-sm md:text-lg max-w-lg leading-relaxed font-light mt-2">
          Riskləri azaldan və ətraf mühitə dəyər verən iş mədəniyyəti birlikdə qurulur.
        </p>

        <Link href="/xidmetler">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(174,226,132,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-accent to-accent-hover text-dark-bg px-6 py-3 md:px-8 md:py-4 w-fit font-bold text-sm md:text-base flex items-center gap-3 rounded-full mt-4 transition-all duration-300"
          >
            Xidmətləri kəşf edin
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50, rotate: 2, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 relative h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden group shadow-xl z-10 border border-white/10 bg-dark-bg-card flex flex-col items-center justify-center"
      >
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-dark-bg/70 z-0 flex items-center justify-center"
        >
          {imgUrl ? (
            <img src={imgUrl} alt="Hero" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white/10 text-lg md:text-xl font-light tracking-widest uppercase">Şəkil Yeri</span>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-20"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/90 font-medium bg-black/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-md border border-white/10">
            İnsan hər şeydən öncə
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
