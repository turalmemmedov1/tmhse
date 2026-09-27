"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function CvGonderPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="flex min-h-screen flex-col w-full max-w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-32 pb-24 px-6 md:px-16 w-full max-w-4xl mx-auto min-h-[70vh] flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-dark-bg">Komandamıza Qoşulun</h1>
          <p className="text-base md:text-lg text-foreground/70 max-w-xl mx-auto">
            SƏTƏM sahəsində peşəkar olduğunuza inanırsınızsa, CV-nizi bizə göndərin. Sizinlə tanış olmağı səbirsizliklə gözləyirik.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-black/5 border border-dark-bg/5 flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-dark-bg">Adınız *</label>
                <input type="text" required className="w-full bg-background border border-dark-bg/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-hover transition-colors" placeholder="Məsələn, Tural" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-dark-bg">Soyadınız *</label>
                <input type="text" required className="w-full bg-background border border-dark-bg/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-hover transition-colors" placeholder="Məsələn, Məmmədov" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-dark-bg">E-poçt ünvanınız *</label>
              <input type="email" required className="w-full bg-background border border-dark-bg/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-hover transition-colors" placeholder="adiniz@email.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-dark-bg">CV Faylınız (PDF, DOCX) *</label>
              <label className="w-full border-2 border-dashed border-dark-bg/20 rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-accent-hover hover:bg-accent/5 transition-colors">
                <UploadCloud className="w-8 h-8 text-accent-hover" />
                <span className="text-sm font-medium text-foreground/60">Faylı seçmək üçün bura klikləyin</span>
                <input type="file" required accept=".pdf,.doc,.docx" className="hidden" />
              </label>
            </div>

            <button type="submit" className="w-full bg-accent-hover hover:bg-[#349b65] text-white font-bold py-4 rounded-xl mt-4 transition-colors duration-300">
              Göndər
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-white rounded-[2rem] p-12 shadow-xl border border-dark-bg/5 flex flex-col items-center justify-center text-center gap-6"
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h2 className="text-3xl font-bold text-dark-bg">Təşəkkürlər!</h2>
            <p className="text-lg text-foreground/70 max-w-md">
              CV-niz uğurla göndərildi. Məlumatlarınız incələndikdən sonra uyğun vakansiya olduqda sizinlə əlaqə saxlanılacaq.
            </p>
          </motion.div>
        )}
      </section>

      <Footer />
    </main>
  );
}
