"use client";

import { motion } from "framer-motion";

const items = [
  { letter: "H", title: "Sağlamlığın qorunması", sub: "HEALTH" },
  { letter: "S", title: "Əməyin təhlükəsizliyi", sub: "SAFETY" },
  { letter: "E", title: "Ətraf mühitin mühafizəsi", sub: "ENVIRONMENT" }
];

export default function HeroFooter() {
  return (
    <div className="w-full border-y border-white/10 bg-dark-bg/80 backdrop-blur-md relative z-10">
      <div className="w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 p-12 flex items-center justify-center gap-8 hover:bg-white/5 transition-colors group cursor-default"
          >
            <span className="text-6xl text-accent/50 font-bold group-hover:text-accent group-hover:scale-110 transition-all duration-500">{item.letter}</span>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-2xl text-white group-hover:text-accent-hover transition-colors">{item.title}</span>
              <span className="text-sm tracking-[0.3em] text-text-muted font-medium">{item.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
