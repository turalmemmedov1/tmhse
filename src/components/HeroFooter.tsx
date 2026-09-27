"use client";

import { motion } from "framer-motion";

const items = [
  { letter: "H", title: "Sağlamlığın qorunması", sub: "HEALTH" },
  { letter: "S", title: "Əməyin təhlükəsizliyi", sub: "SAFETY" },
  { letter: "E", title: "Ətraf mühitin mühafizəsi", sub: "ENVIRONMENT" }
];

export default function HeroFooter() {
  return (
    <div className="w-full border-y border-white/10 bg-dark-bg/80 backdrop-blur-md relative z-10 overflow-hidden">
      <div className="w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 py-8 px-6 md:p-12 flex items-center justify-start md:justify-center gap-6 md:gap-8 hover:bg-white/5 transition-colors group cursor-default relative overflow-hidden"
          >
            {/* Background glowing letter for mobile too */}
            <span className="absolute -right-4 -bottom-4 text-9xl text-white/[0.02] font-serif italic select-none pointer-events-none group-hover:text-accent/[0.05] transition-colors duration-500">
              {item.letter}
            </span>
            
            <span className="text-5xl md:text-6xl text-accent/80 font-serif italic drop-shadow-[0_0_10px_rgba(174,226,132,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(174,226,132,0.9)] group-hover:text-accent group-hover:scale-110 transition-all duration-500 z-10">
              {item.letter}
            </span>
            <div className="flex flex-col gap-1 md:gap-2 z-10">
              <span className="font-bold text-lg md:text-2xl text-white group-hover:text-accent-hover transition-colors">{item.title}</span>
              <span className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-text-muted font-medium">{item.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
