"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-40 pb-24 px-6 md:px-16 w-full max-w-[1920px] mx-auto min-h-[70vh]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-dark-bg">Məxfilik Siyasəti</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">TM&S olaraq məlumatlarınızın qorunmasına və gizliliyinə böyük önəm veririk.</p>
        </motion.div>

        <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-xl shadow-black/5 border border-dark-bg/5">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-base md:prose-lg max-w-4xl prose-headings:text-dark-bg prose-a:text-accent-hover"
          >
            <p><strong>Son yenilənmə tarixi:</strong> 27 Sentyabr 2026</p>
            <p>Bu məxfilik siyasəti sənədi TM&S platformasından və xidmətlərindən istifadə edərkən şəxsi məlumatlarınızın necə toplanıldığını, istifadə edildiyini və qorunduğunu izah edir.</p>

            <h3>1. Toplanan Məlumatlar</h3>
            <p>Bizimlə əlaqə saxlayarkən və ya xidmətlərimizdən faydalanarkən (məsələn: e-poçt vasitəsilə müraciət edərkən) adınız, əlaqə vasitələriniz və şirkətiniz barədə təməl məlumatlar toplana bilər.</p>

            <h3>2. Məlumatların İstifadəsi</h3>
            <p>Toplanan məlumatlar yalnız xidmət keyfiyyətinin artırılması, sizə müvafiq SƏTƏM həllərinin təklif edilməsi və əks-əlaqə yaradılması məqsədilə istifadə olunur.</p>

            <h3>3. Üçüncü Tərəflərlə Paylaşım</h3>
            <p>Müştərilərimizin heç bir kommersiya və ya şəxsi məlumatı icazəsiz olaraq üçüncü tərəflərə təqdim edilmir və satılmır. Bütün məlumatlar tam konfidensial şəkildə qorunur.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
