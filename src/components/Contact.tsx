"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="elaqe" className="w-full bg-background text-foreground py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 w-full md:w-1/2"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-accent-hover"></div>
            <span className="text-xs uppercase tracking-widest text-foreground/60 font-bold">Birlikdə daha təhlükəsiz</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-semibold leading-[1.1] text-dark-bg tracking-tight">
            Bu gün təhlükəsiz.<br />
            <span className="text-accent-hover">Sabah dayanıqlı.</span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-full md:w-1/3 flex flex-col gap-6 border-l border-dark-bg/10 pl-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-dark-bg mb-1">Tural Mammadov</h3>
            <p className="text-foreground/60 text-sm">SƏTƏM üzrə əməkdaşlıq və xidmətlər</p>
          </div>
          
          <a href="tel:+994554886668" className="text-3xl font-bold text-dark-bg hover:text-accent-hover transition-colors">
            +994 55 488 66 68
          </a>

          <motion.a 
            href="https://wa.me/994554886668"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-accent-hover text-white px-6 py-4 rounded-sm flex items-center justify-between font-semibold mt-4 hover:bg-[#349b65] transition-colors shadow-lg shadow-accent-hover/20"
          >
            WhatsApp-da yazın
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
