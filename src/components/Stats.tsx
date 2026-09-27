"use client";

import { motion } from "framer-motion";

const stats = [
  { num: "10+", label: "İllik Təcrübə" },
  { num: "500+", label: "Keçirilmiş Təlim" },
  { num: "100%", label: "Müştəri Məmnuniyyəti" },
  { num: "0", label: "Ciddi İnsident" }
];

export default function Stats() {
  return (
    <section className="w-full bg-accent text-dark-bg py-24 px-6 md:px-16 overflow-hidden">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-5xl md:text-6xl font-black tracking-tighter">{stat.num}</span>
            <span className="text-base md:text-lg font-bold uppercase tracking-widest text-dark-bg/70">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
