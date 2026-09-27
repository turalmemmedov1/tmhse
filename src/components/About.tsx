"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section id="haqqinda" className="w-full bg-dark-bg text-white py-24 px-6 md:px-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 aspect-video md:aspect-square bg-dark-bg-card rounded-2xl flex flex-col items-center justify-center p-12 border border-white/5 relative overflow-hidden group"
        >
          {/* Logo representation */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-400 drop-shadow-lg mb-8 flex items-center">
              H<span className="text-accent">S</span>E
            </h2>
            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold tracking-widest mb-2">TURAL MAMMADOV</h3>
              <p className="text-[10px] tracking-[0.3em] text-text-muted mb-12">HEALTH · SAFETY · ENVIRONMENT</p>
              <p className="text-xs tracking-widest text-text-muted/60 uppercase">Safer Today. Sustainable Tomorrow.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-accent"></div>
            <span className="text-xs uppercase tracking-widest text-text-muted font-semibold">Tural Mammadov · HSE</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold leading-[1.2]">
            Təhlükəsizlik qaydadan<br />
            daha böyük dəyərdir.
          </h2>

          <div className="flex flex-col gap-6 text-text-muted text-lg mt-4 max-w-xl">
            <p>
              SƏTƏM — sağlamlığın, əməyin təhlükəsizliyinin və ətraf mühitin mühafizəsinin vahid yanaşmada birləşməsidir.
            </p>
            <p>
              Məqsəd sadəcə sənədləşmə deyil. Məqsəd hər bir əməkdaşın günün sonunda evinə sağlam qayıtdığı, məsuliyyətin paylaşıldığı iş mühitidir.
            </p>
          </div>

          <div className="mt-8 flex gap-4 items-start">
            <ArrowUpRight className="text-accent w-8 h-8 mt-1 shrink-0" />
            <div className="flex flex-col gap-1 text-lg font-medium">
              <span>İnsana qayğı.</span>
              <span className="text-text-muted">İşə məsuliyyət. Gələcəyə hörmət.</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
