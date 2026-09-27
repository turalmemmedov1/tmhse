"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
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
    a: "Əməyin mühafizəsi, ilk tibbi yardım, yanğın təhlükəsizliyi, hündürlükdə iş və risklərin idarə olunması kimi beynəlxalq standartlara cavab verən bir çox SƏTƏM təlimlərimiz mövcuddur."
  },
  {
    q: "Xidmətləriniz yalnız böyük şirkətlər üçündür?",
    a: "Xeyr, biz həm kiçik, həm orta, həm də böyük müəssisələr üçün xüsusi və fərdiləşdirilmiş SƏTƏM həlləri təklif edirik. Hər bir biznesin ehtiyacına uyğun paketimiz var."
  },
  {
    q: "Bizimlə necə əməkdaşlığa başlaya bilərsiniz?",
    a: "Əlaqə bölməsindən E-poçt (info@tmhse.expert) və ya WhatsApp vasitəsilə bizə yaza bilərsiniz. Mütəxəssislərimiz ən qısa zamanda sizinlə əlaqə saxlayıb ilkin görüşü təyin edəcəklər."
  }
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="w-full bg-background text-foreground py-20 md:py-24 px-6 md:px-16 overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 lg:gap-6 w-full lg:w-2/5 lg:sticky top-32"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-accent-hover"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-foreground/80 font-bold">Məlumat mərkəzi</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] text-dark-bg tracking-tight">
            Tez-tez verilən<br />
            <span className="text-accent-hover drop-shadow-sm">suallar.</span>
          </h2>
          <p className="text-foreground/70 text-base md:text-lg font-medium max-w-sm mt-2 md:mt-4">
            Xidmətlərimiz haqqında ən çox verilən 5 suala buradan cavab tapa bilərsiniz.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-3/5 flex flex-col gap-4 bg-white p-6 md:p-12 rounded-[2rem] shadow-xl shadow-black/5 border border-dark-bg/5"
        >
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-dark-bg/10 pb-4 last:border-0 last:pb-0">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-base md:text-xl py-4 hover:text-accent-hover transition-colors"
              >
                {faq.q}
                <motion.div animate={{ rotate: openFaq === idx ? 45 : 0 }}>
                  <Plus className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-accent-hover ml-4" />
                </motion.div>
              </button>
              <motion.div 
                initial={false}
                animate={{ height: openFaq === idx ? "auto" : 0, opacity: openFaq === idx ? 1 : 0 }}
                className="overflow-hidden text-foreground/70 text-sm md:text-lg leading-relaxed"
              >
                <p className="pb-4">{faq.a}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
