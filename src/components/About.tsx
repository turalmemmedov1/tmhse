"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function About({ bgImage }: { bgImage?: string }) {


  return (
    <section className="w-full bg-dark-bg text-white py-24 px-6 md:px-16 border-b border-white/10 relative overflow-hidden">
      
      <div className="w-full flex flex-col md:flex-row gap-16 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 aspect-video bg-gradient-to-br from-dark-bg-card to-dark-bg rounded-[2rem] flex flex-col items-center justify-center border border-white/5 shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-dark-bg-card opacity-50 z-0"></div>
          {bgImage ? (
            <img src={bgImage} fetchPriority="high" loading="eager" alt="About" className="w-full h-full object-cover relative z-10" />
          ) : (
            <span className="text-white/10 text-xl font-light tracking-widest z-10 uppercase">Şəkil Yeri</span>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full md:w-1/2 flex flex-col gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-accent"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">TM&S</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold leading-[1.2] text-white">
            Təhlükəsizlik <span className="text-accent">qaydadan</span><br />
            daha böyük dəyərdir.
          </h2>

          <div className="flex flex-col gap-4 text-text-muted text-lg mt-2 max-w-2xl font-light leading-relaxed">
            <p>
              SƏTƏM — sağlamlığın, əməyin təhlükəsizliyinin və ətraf mühitin mühafizəsinin vahid yanaşmada birləşməsidir.
            </p>
            <p>
              Məqsəd hər bir əməkdaşın evinə sağlam qayıtdığı, məsuliyyətin paylaşıldığı iş mühitidir.
            </p>
          </div>

          <Link href="/xidmetler">
            <motion.div 
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
              className="mt-6 flex gap-4 items-center p-5 bg-white/5 rounded-2xl border border-white/10 w-fit cursor-pointer transition-colors"
            >
              <ArrowUpRight className="text-accent w-6 h-6 shrink-0" />
              <div className="flex flex-col gap-1 text-base font-medium">
                <span className="text-white">İnsana qayğı. İşə məsuliyyət.</span>
                <span className="text-accent/70 text-xs uppercase tracking-wider">Gələcəyə hörmət. (Xidmətlərə keçid)</span>
              </div>
            </motion.div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
