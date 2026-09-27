"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section id="haqqinda" className="w-full bg-dark-bg text-white py-32 px-6 md:px-16 border-b border-white/10 relative overflow-hidden">
      
      <div className="w-full flex flex-col md:flex-row gap-20 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 aspect-video md:aspect-square bg-gradient-to-br from-dark-bg-card to-dark-bg rounded-[3rem] flex flex-col items-center justify-center p-12 border border-white/10 relative overflow-hidden group shadow-2xl shadow-accent/5"
        >
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative w-48 h-48 mb-10"
            >
              <Image src="/ProLogo.png" alt="TMHSE Logo" fill className="object-contain drop-shadow-2xl" />
            </motion.div>
            
            <div className="text-center mt-6">
              <h3 className="text-4xl font-bold tracking-widest mb-4 text-white">TMHSE</h3>
              <p className="text-sm tracking-[0.4em] text-accent mb-12 font-medium uppercase">Health · Safety · Environment</p>
              <p className="text-sm tracking-widest text-text-muted uppercase">Safer Today. Sustainable Tomorrow.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col gap-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-accent"></div>
            <span className="text-sm uppercase tracking-[0.3em] text-accent font-bold">TMHSE</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold leading-[1.2] text-white">
            Təhlükəsizlik qaydadan<br />
            daha <span className="text-accent">böyük dəyərdir.</span>
          </h2>

          <div className="flex flex-col gap-8 text-text-muted text-xl mt-4 max-w-2xl font-light leading-relaxed">
            <p>
              SƏTƏM — sağlamlığın, əməyin təhlükəsizliyinin və ətraf mühitin mühafizəsinin vahid yanaşmada birləşməsidir.
            </p>
            <p>
              Məqsəd sadəcə sənədləşmə deyil. Məqsəd hər bir əməkdaşın günün sonunda evinə sağlam qayıtdığı, məsuliyyətin paylaşıldığı iş mühitidir.
            </p>
          </div>

          <motion.div 
            whileHover={{ x: 20 }}
            className="mt-12 flex gap-6 items-start p-8 bg-white/5 rounded-2xl border border-white/10 w-fit cursor-default"
          >
            <ArrowUpRight className="text-accent w-10 h-10 mt-1 shrink-0" />
            <div className="flex flex-col gap-2 text-xl font-medium">
              <span className="text-white">İnsana qayğı.</span>
              <span className="text-text-muted">İşə məsuliyyət. Gələcəyə hörmət.</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
