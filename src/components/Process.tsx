"use client";

import { motion } from "framer-motion";

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
    <section id="yanasma" className="w-full bg-dark-bg text-white py-24 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 max-w-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-accent"></div>
              <span className="text-xs uppercase tracking-widest text-text-muted font-semibold">İş Prinsipləri</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1]">
              Aydın proses.<br />
              Davamlı inkişaf.
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted max-w-md text-lg"
          >
            Hər iş mühiti fərqlidir. Yanaşma da onun insanlarına, fəaliyyətinə və risklərinə uyğun qurulmalıdır.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col"
            >
              <div className="w-full h-[1px] bg-white/10 mb-6 relative">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                  className="absolute inset-0 bg-accent origin-left"
                />
              </div>
              <span className="text-accent font-medium mb-4">{step.id}</span>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
