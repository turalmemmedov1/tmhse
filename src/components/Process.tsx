"use client";

import { motion } from "framer-motion";
import LedLight from "./LedLight";
import { Search, ClipboardCheck, GraduationCap, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Tanışlıq və təhlil",
    desc: "Fəaliyyətin, iş mühitinin və ilkin ehtiyacların öyrənilməsi."
  },
  {
    icon: ClipboardCheck,
    title: "Planlaşdırma",
    desc: "Prioritetlərin və tətbiq ediləcək təhlükəsizlik tədbirlərinin müəyyənləşdirilməsi."
  },
  {
    icon: GraduationCap,
    title: "Tətbiq və təlim",
    desc: "Razılaşdırılmış tədbirlərin həyata keçirilməsi və komandanın məlumatlandırılması."
  },
  {
    icon: TrendingUp,
    title: "İzləmə və inkişaf",
    desc: "Nəticələrin nəzərdən keçirilməsi və yanaşmanın davamlı təkmilləşdirilməsi."
  }
];

export default function Process() {
  return (
    <section className="w-full bg-dark-bg text-white py-12 md:py-16 px-6 md:px-16 border-t border-white/5 relative overflow-hidden">
      <LedLight />
      
      <div className="w-full flex flex-col relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 max-w-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-[2px] bg-accent"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">İş Prinsipləri</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.1]">
              Aydın proses.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Davamlı inkişaf.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group cursor-default"
            >
              <div className="w-full h-[2px] bg-white/10 mb-6 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.5, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-accent"
                />
              </div>
              <div className="text-accent mb-4 group-hover:scale-110 origin-left transition-transform duration-500">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">{step.title}</h3>
              <p className="text-text-muted text-base leading-relaxed font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
