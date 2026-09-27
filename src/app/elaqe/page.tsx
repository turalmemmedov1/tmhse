"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "SƏTƏM xidmətləri niyə vacibdir?",
    a: "İş yerində sağlamlığın, təhlükəsizliyin qorunması və ətraf mühitə zərərin minimuma endirilməsi həm qanunvericiliyin tələbidir, həm də işçilərin motivasiyasını artıraraq daha məhsuldar mühit yaradır."
  },
  {
    q: "Audit və monitorinq prosesi necə həyata keçirilir?",
    a: "Peşəkar komandamız iş sahənizə baxış keçirir, mövcud qaydalara uyğunluğu yoxlayır və potensial riskləri analiz edir. Yekunda ətraflı hesabat və təkmilləşdirmə planı təqdim olunur."
  },
  {
    q: "Hansı sahələr üzrə təlimlər keçirirsiniz?",
    a: "Əməyin mühafizəsi, ilk tibbi yardım, yanğın təhlükəsizliyi, risklərin idarə olunması və s. kimi bir çox SƏTƏM sahələrində beynəlxalq standartlara cavab verən təlimlərimiz mövcuddur."
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-dark-bg text-white">
      <Navbar />
      
      <section className="pt-48 pb-24 px-6 md:px-16 w-full max-w-[1920px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Əlaqə</h1>
          <p className="text-xl text-text-muted max-w-2xl">Suallarınız var və ya xidmətlərimizdən yararlanmaq istəyirsiniz? Bizimlə asanlıqla əlaqə saxlayın.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10"
          >
            <div className="bg-dark-bg-card p-10 rounded-[2rem] border border-white/5 flex items-start gap-6">
              <Mail className="w-10 h-10 text-accent shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">E-poçt</h3>
                <a href="mailto:info@tmhse.expert" className="text-lg text-text-muted hover:text-accent transition-colors">info@tmhse.expert</a>
              </div>
            </div>

            <div className="bg-dark-bg-card p-10 rounded-[2rem] border border-white/5 flex items-start gap-6">
              <MapPin className="w-10 h-10 text-accent shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Ünvan</h3>
                <p className="text-lg text-text-muted">Bakı şəhəri, Azərbaycan</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white text-dark-bg p-12 rounded-[2rem]"
          >
            <h2 className="text-4xl font-bold mb-10">Tez-tez verilən suallar</h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-dark-bg/10 pb-4">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-xl py-4 hover:text-accent-hover transition-colors"
                  >
                    {faq.q}
                    <motion.div animate={{ rotate: openFaq === idx ? 45 : 0 }}>
                      <Plus className="w-6 h-6 shrink-0" />
                    </motion.div>
                  </button>
                  <motion.div 
                    initial={false}
                    animate={{ height: openFaq === idx ? "auto" : 0, opacity: openFaq === idx ? 1 : 0 }}
                    className="overflow-hidden text-foreground/70 text-lg leading-relaxed"
                  >
                    <p className="pb-4">{faq.a}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
