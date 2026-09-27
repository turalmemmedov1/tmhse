"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { servicesData } from "@/components/Services";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col w-full max-w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-32 pb-24 px-6 md:px-16 w-full max-w-[1920px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-accent-hover"></div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-dark-bg/60">Xidmətlərimiz</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-dark-bg">Hərtərəfli SƏTƏM həlləri</h1>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl font-medium">İş yerinin ehtiyaclarına uyğun, qanunvericiliyin tələblərinə tam cavab verən, praktikada tətbiqi asan olan xidmətlər təqdim edirik.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {servicesData.map((service, idx) => (
            <Link key={service.id} href={`/xidmetler/${service.id}`}>
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg shadow-black/5 flex flex-col gap-6 border border-dark-bg/5 hover:border-accent-hover transition-colors duration-500 group h-full cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center group-hover:bg-accent-hover transition-colors duration-500 text-dark-bg group-hover:text-white shadow-sm border border-dark-bg/10">
                    <div className="scale-75 origin-center">{service.icon}</div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-dark-bg group-hover:text-accent-hover transition-colors">{service.title}</h2>
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed font-light">
                  {service.desc}
                </p>

                <div className="mt-auto pt-4 flex items-center text-xs font-bold uppercase tracking-widest text-accent-hover opacity-0 group-hover:opacity-100 transition-opacity">
                  Ətraflı məlumat &rarr;
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
