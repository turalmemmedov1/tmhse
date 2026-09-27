"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function CareersPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-40 pb-24 px-6 md:px-16 w-full max-w-[1920px] mx-auto min-h-[70vh]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-dark-bg">Vakansiyalar</h1>
          <p className="text-xl text-foreground/70 max-w-2xl">TMHSE komandasına qoşulmaq istəyirsiniz? Mövcud vakansiyalarla tanış olun və karyeranızı bizimlə qurun.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] p-16 shadow-xl shadow-black/5 border border-dark-bg/5 flex flex-col items-center justify-center text-center min-h-[400px]"
        >
          <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mb-8">
            <Briefcase className="w-10 h-10 text-text-muted" />
          </div>
          <h2 className="text-3xl font-bold text-dark-bg mb-4">Hazırda aktiv vakansiya yoxdur</h2>
          <p className="text-lg text-foreground/60 max-w-lg">
            Hal-hazırda komandamızda açıq mövqe yoxdur, lakin SƏTƏM sahəsində peşəkar olduğunuza inanırsınızsa, CV-nizi <a href="mailto:info@tmhse.expert" className="text-accent-hover font-bold">info@tmhse.expert</a> ünvanına göndərə bilərsiniz. Müraciətiniz məlumat bazamızda saxlanılacaq.
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
