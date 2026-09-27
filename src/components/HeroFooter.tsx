"use client";

import { motion } from "framer-motion";

const items = [
  { letter: "H", title: "Sağlamlığın qorunması", sub: "HEALTH" },
  { letter: "S", title: "Əməyin təhlükəsizliyi", sub: "SAFETY" },
  { letter: "E", title: "Ətraf mühitin mühafizəsi", sub: "ENVIRONMENT" }
];

export default function HeroFooter() {
  return (
    <div className="w-full border-y border-white/10 bg-dark-bg/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex-1 p-8 flex items-center gap-6 hover:bg-white/5 transition-colors group cursor-default"
          >
            <span className="text-4xl text-accent/80 font-light group-hover:text-accent transition-colors">{item.letter}</span>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-lg">{item.title}</span>
              <span className="text-xs tracking-[0.2em] text-text-muted">{item.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
