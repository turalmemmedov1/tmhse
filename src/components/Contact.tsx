"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="w-full bg-background text-foreground py-32 px-6 md:px-16 overflow-hidden">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 100, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 w-full md:w-3/5"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-accent-hover"></div>
            <span className="text-sm uppercase tracking-[0.3em] text-foreground/80 font-bold">Birlikdə daha təhlükəsiz</span>
          </div>
          <h2 className="text-6xl md:text-[5.5rem] font-bold leading-[1.05] text-dark-bg tracking-tight">
            Bu gün təhlükəsiz.<br />
            <span className="text-accent-hover drop-shadow-sm">Sabah dayanıqlı.</span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-2/5 flex flex-col gap-8 bg-white p-12 rounded-[2rem] shadow-2xl shadow-black/5 border border-dark-bg/5 relative"
        >
          <div className="absolute top-0 right-0 p-8 text-accent-hover/20">
            <Mail className="w-24 h-24" />
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-dark-bg mb-2">Tural Mammadov</h3>
            <p className="text-foreground/60 text-lg font-medium">SƏTƏM üzrə əməkdaşlıq və xidmətlər</p>
          </div>
          
          <a href="mailto:info@hsetms.com" className="relative z-10 text-3xl md:text-4xl font-black text-dark-bg hover:text-accent-hover transition-colors duration-300 w-fit">
            info@hsetms.com
          </a>

          <Link href="/elaqe">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 15px 40px rgba(152,207,110,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 bg-accent-hover text-white px-8 py-5 rounded-full flex items-center justify-between font-bold text-xl mt-6 hover:bg-[#349b65] transition-all duration-300 w-full"
            >
              Əlaqə Səhifəsinə Keçid
              <ArrowUpRight className="w-6 h-6" />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
