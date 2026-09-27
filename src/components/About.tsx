"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section className="w-full bg-dark-bg text-white py-32 px-6 md:px-16 border-b border-white/10 relative overflow-hidden">
      
      <div className="w-full flex flex-col md:flex-row gap-20 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 aspect-video md:aspect-square bg-gradient-to-br from-dark-bg-card to-dark-bg rounded-[3rem] flex flex-col items-center justify-center p-12 border border-white/5 shadow-2xl relative overflow-hidden"
        >
          {/* Boş Şəkil Yeri / Image Placeholder */}
          <div className="absolute inset-0 bg-dark-bg-card opacity-50 z-0"></div>
          <span className="text-white/10 text-2xl font-light tracking-widest z-10">ŞƏKİL YERİ</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-accent"></div>
            <span className="text-sm uppercase tracking-[0.3em] text-accent font-bold">TMHSE</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold leading-[1.2] text-white">
            Təhlükəsizlik <span className="text-accent">qaydadan</span><br />
            daha böyük dəyərdir.
          </h2>

          <div className="flex flex-col gap-6 text-text-muted text-xl mt-4 max-w-2xl font-light leading-relaxed">
            <p>
              SƏTƏM — sağlamlığın, əməyin təhlükəsizliyinin və ətraf mühitin mühafizəsinin vahid yanaşmada birləşməsidir.
            </p>
            <p>
              Məqsəd hər bir əməkdaşın evinə sağlam qayıtdığı, məsuliyyətin paylaşıldığı iş mühitidir.
            </p>
          </div>

          <motion.div 
            whileHover={{ x: 20 }}
            className="mt-8 flex gap-6 items-center p-6 bg-white/5 rounded-2xl border border-white/10 w-fit cursor-default"
          >
            <ArrowUpRight className="text-accent w-8 h-8 shrink-0" />
            <div className="flex flex-col gap-1 text-lg font-medium">
              <span className="text-white">İnsana qayğı. İşə məsuliyyət.</span>
              <span className="text-accent/70 text-sm">Gələcəyə hörmət.</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
