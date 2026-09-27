"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function HsePolicyPage() {
  return (
    <main className="flex min-h-screen flex-col w-full max-w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground">
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
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-dark-bg">SƏTƏM Siyasəti</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">Sağlamlıq, Əməyin Təhlükəsizliyi və Ətraf Mühitin Mühafizəsi üzrə əsas dəyərlərimiz və öhdəliklərimiz.</p>
        </motion.div>

        <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-xl shadow-black/5 border border-dark-bg/5">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-base md:prose-lg max-w-4xl prose-headings:text-dark-bg prose-a:text-accent-hover"
          >
            <h3>Sıfır İnsident Hədəfi</h3>
            <p>Fəaliyyətimizin əsas məqsədi insan həyatının qorunması və ətraf mühitə zərərin qarşısının alınmasıdır. TMHSE olaraq biz bütün layihələrimizdə "Sıfır İnsident" hədəfini mənimsəyirik.</p>

            <h3>Ətraf Mühitə Hörmət</h3>
            <p>Biz sadəcə bu günü deyil, gələcək nəsilləri də düşünürük. Tullantıların minimuma endirilməsi, resursların səmərəli istifadəsi və ekoloji davamlılıq əsas fəaliyyət prinsiplərimizdəndir.</p>

            <h3>Daimi Təkmilləşmə</h3>
            <p>Təhlükəsizlik qaydaları statik deyil. Biz hər zaman ən son beynəlxalq standartları (ISO 45001, ISO 14001) təqib edir, biliklərimizi yeniləyir və müştərilərimizə ən qabaqcıl həlləri təqdim edirik.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
