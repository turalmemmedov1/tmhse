"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { target: 10, suffix: "+", label: "İllik Təcrübə" },
  { target: 500, suffix: "+", label: "Keçirilmiş Təlim" },
  { target: 100, suffix: "%", label: "Müştəri Məmnuniyyəti" },
  { target: 0, suffix: "", label: "Ciddi İnsident" }
];

function Counter({ target, suffix }: { target: number, suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, { duration: 2, ease: "easeOut" });
      return controls.stop;
    } else {
      count.set(0); // Reset when out of view if we want it to count every time
    }
  }, [inView, count, target]);

  return (
    <motion.span ref={ref} className="text-4xl md:text-5xl font-black tracking-tighter">
      <motion.span>{rounded}</motion.span>{suffix}
    </motion.span>
  );
}

export default function Stats() {
  return (
    <section className="relative w-full bg-accent text-dark-bg py-8 md:py-12 px-6 md:px-16 overflow-hidden">
      {/* Rotating LED inside the bar */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white/40 blur-[50px] rounded-full pointer-events-none"
      />
      
      <div className="relative z-10 w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-1"
          >
            <Counter target={stat.target} suffix={stat.suffix} />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-dark-bg/80">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
