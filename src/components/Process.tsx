"use client";

import { motion } from "framer-motion";
import LedLight from "./LedLight";

const steps = [
  {
    id: "01",
    title: "Tanışlıq və təhlil",
    desc: "Fəaliyyətin, iş mühitinin və ilkin ehtiyacların öyrənilməsi."
  },
  {
    id: "02",
    title: "Planlaşdırma",
    desc: "Prioritetlərin və tətbiq ediləcək təhlükəsizlik tədbirlərinin müəyyənləşdirilməsi."
  },
  {
    id: "03",
    title: "Tətbiq və təlim",
    desc: "Razılaşdırılmış tədbirlərin həyata keçirilməsi və komandanın məlumatlandırılması."
  },
  {
    id: "04",
    title: "İzləmə və inkişaf",
    desc: "Nəticələrin nəzərdən keçirilməsi və yanaşmanın davamlı təkmilləşdirilməsi."
  }
];

export default function Process() {
  return (
    <section id="yanasma" className="w-full bg-dark-bg text-white py-32 px-6 md:px-16 border-t border-white/5 relative overflow-hidden">
      <LedLight />
      
      <div className="w-full flex flex-col relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-28">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 max-w-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="text-sm uppercase tracking-[0.3em] text-accent font-bold">İş Prinsipləri</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-[1.1]">
              Aydın proses.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Davamlı inkişaf.</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-text-muted max-w-md text-xl font-light"
          >
            Hər iş mühiti fərqlidir. Yanaşma da onun insanlarına, fəaliyyətinə və risklərinə uyğun qurulmalıdır.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group cursor-default"
            >
              <div className="w-full h-[2px] bg-white/10 mb-8 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-accent"
                />
              </div>
              <span className="text-accent font-bold text-2xl mb-6 group-hover:scale-110 origin-left transition-transform duration-500">{step.id}</span>
              <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-accent transition-colors duration-300">{step.title}</h3>
              <p className="text-text-muted text-lg leading-relaxed font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
