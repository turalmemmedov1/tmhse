"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PoliciesPage() {
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-dark-bg">Siyasətlər və Qaydalar</h1>
          <p className="text-xl text-foreground/70 max-w-2xl">TMHSE tərəfindən tətbiq edilən ümumi qaydalar, istifadə şərtləri və məxfilik siyasəti haqqında məlumat.</p>
        </motion.div>

        <div className="bg-white rounded-[2rem] p-10 md:p-16 shadow-xl shadow-black/5 border border-dark-bg/5">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-4xl prose-headings:text-dark-bg prose-a:text-accent-hover"
          >
            <h2>Məxfilik Siyasəti</h2>
            <p>Bizimlə paylaşdığınız bütün məlumatlar ciddi şəkildə qorunur və üçüncü tərəflərə təqdim edilmir. Təqdim olunan xidmətlər çərçivəsində toplanan məlumatlar yalnız xidmət keyfiyyətinin artırılması məqsədilə istifadə olunur.</p>

            <h2>İstifadə Şərtləri</h2>
            <p>Vebsaytımızdan və təqdim etdiyimiz SƏTƏM xidmətlərindən istifadə zamanı qanunvericiliyin tələblərinə və müəyyən edilmiş qaydalara riayət edilməsi mütləqdir. Bütün sənədlər və yanaşmalar tərəfimizdən müəllif hüquqları ilə qorunur.</p>

            <h2>SƏTƏM Siyasəti</h2>
            <p>Fəaliyyətimizin əsas məqsədi insan həyatının qorunması və ətraf mühitə zərərin qarşısının alınmasıdır. Bu məqsədlə daimi inkişaf, sıfır insident hədəfi və beynəlxalq standartlara tam uyğunluq əsas fəaliyyət prinsipimizdir.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
