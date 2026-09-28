"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPageClient({ settings }: { settings: Record<string, string> }) {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-dark-bg text-white">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 md:px-16 w-full max-w-[1920px] mx-auto min-h-[70vh]">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 flex flex-col gap-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-2">Haqqımızda</h1>
            <h2 className="text-3xl text-accent font-medium leading-relaxed">
              Təhlükəsizlik qaydadan daha böyük dəyərdir.
            </h2>
            <div className="text-lg text-text-muted flex flex-col gap-6 leading-relaxed font-light mt-4">
              <p>
                TM&S olaraq missiyamız iş mühitlərini sadəcə qanunvericiliyin tələblərinə uyğunlaşdırmaq deyil, eyni zamanda hər bir əməkdaşın günün sonunda evinə sağ-salamat qayıtdığı təhlükəsizlik mədəniyyətini formalaşdırmaqdır.
              </p>
              <p>
                Biz inanırıq ki, SƏTƏM – sağlamlığın, əməyin təhlükəsizliyinin və ətraf mühitin mühafizəsinin vahid yanaşmada birləşməsidir. Uzun illik təcrübəmizə əsaslanaraq, müxtəlif sənaye sahələrindəki müəssisələr üçün risklərin qiymətləndirilməsi, təlimlərin təşkili və auditi üzrə peşəkar xidmətlər göstəririk.
              </p>
              <p>
                <strong className="text-white">Dəyərlərimiz:</strong> İnsana qayğı, İşə məsuliyyət, Gələcəyə hörmət.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 aspect-square bg-dark-bg-card rounded-[3rem] p-12 flex items-center justify-center border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {settings.about_image ? (
              <img src={settings.about_image} fetchPriority="high" loading="eager" alt="Haqqımızda" className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" />
            ) : (
              <>
                <div className="absolute inset-0 bg-white/5 z-0"></div>
                <span className="text-white/20 text-2xl font-light tracking-widest z-10 uppercase">Şəkil Yeri</span>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
