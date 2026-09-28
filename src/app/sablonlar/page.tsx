"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Folder } from "lucide-react";
import Link from "next/link";

export const TEMPLATE_CATEGORIES = [
  "Təlimatlar",
  "Təqdimatlar",
  "Jurnallar, Cədvəllər",
  "Risk dəyərləndirilməsi",
  "İşin Metodu",
  "Mülki Müdafiə haqqında",
  "SƏTƏM həftəlik və aylıq hesabatlar və yoxlamalar",
  "Təhlükəsizlik nişanları",
  "FMV standartları",
  "Siyasət",
  "Aktlar",
  "Nizamnamələr",
  "Planlar",
  "Əmrlər",
  "Protokollar",
  "Raportlar",
  "Ərizələr",
  "Qaydalar",
  "Arayışlar, Məktublar",
  "Əsasnamələr, qaydalar",
  "Digər sənədlər"
];

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[ə]/g, 'e')
    .replace(/[ı]/g, 'i')
    .replace(/[ö]/g, 'o')
    .replace(/[ü]/g, 'u')
    .replace(/[ş]/g, 's')
    .replace(/[ğ]/g, 'g')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default function SablonlarCategoriesPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-40 pb-20 px-6 md:px-16 w-full max-w-[1400px] mx-auto min-h-[70vh]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark-bg">Sənəd Şablonları</h1>
          <p className="text-sm md:text-base text-foreground/70 max-w-2xl mx-auto">
            SƏTƏM və digər sahələr üzrə lazımlı sənəd nümunələri və şablonları uyğun bölmələrdən seçib yükləyə bilərsiniz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TEMPLATE_CATEGORIES.map((cat, idx) => (
            <Link key={idx} href={`/sablonlar/kateqoriya/${generateSlug(cat)}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02, duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 hover:border-accent-hover hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer h-full"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white text-accent transition-colors">
                  <Folder className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-dark-bg text-sm group-hover:text-accent-hover transition-colors leading-tight">
                  {cat}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
