"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-32 pb-24 px-6 md:px-16 w-full max-w-[1920px] mx-auto min-h-[70vh]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-dark-bg">İstifadə Şərtləri</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">TMHSE xidmətlərindən istifadə edərkən riayət edilməsi tələb olunan ümumi qaydalar.</p>
        </motion.div>

        <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-xl shadow-black/5 border border-dark-bg/5">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-base md:prose-lg max-w-4xl prose-headings:text-dark-bg prose-a:text-accent-hover"
          >
            <h3>1. Ümumi Müddəalar</h3>
            <p>Bu vebsayta daxil olmaqla və xidmətlərimizdən faydalanmaqla siz aşağıda qeyd olunan istifadə şərtlərini qəbul etmiş olursunuz.</p>

            <h3>2. Müəllif Hüquqları</h3>
            <p>Vebsaytda yerləşən bütün mətnlər, materiallar, audit formaları və təlim sənədləri TMHSE-yə məxsusdur və müəllif hüquqları ilə qorunur. İcazəsiz istifadəsi və kopyalanması qadağandır.</p>

            <h3>3. Məsuliyyətin Məhdudlaşdırılması</h3>
            <p>Saytda təqdim olunan məlumatlar ümumi xarakter daşıyır. Xüsusi bir istehsalat sahəsi üçün konkret həllərin tətbiqi yalnız rəsmi müqavilə və peşəkar audit əsasında həyata keçirilə bilər.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
