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
    a: "Əməyin mühafizəsi, ilk tibbi yardım, yanğın təhlükəsizliyi, risklərin idarə olunması və s. kimi bir çox SƏTƏM sahələrində beynəlxalq standartlara cavab verən təlimlərimiz mövcuddur."
  }
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="w-full bg-background text-foreground py-24 px-6 md:px-16 overflow-hidden">
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 w-full md:w-2/5 sticky top-32"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-accent-hover"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-foreground/80 font-bold">Məlumat mərkəzi</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] text-dark-bg tracking-tight">
            Tez-tez verilən<br />
            <span className="text-accent-hover drop-shadow-sm">suallar.</span>
          </h2>
          <p className="text-foreground/70 text-lg font-medium max-w-sm mt-4">
            Xidmətlərimiz haqqında ən çox verilən suallara buradan cavab tapa bilərsiniz.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-3/5 flex flex-col gap-4 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-black/5 border border-dark-bg/5"
        >
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-dark-bg/10 pb-4 last:border-0 last:pb-0">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-lg md:text-xl py-4 hover:text-accent-hover transition-colors"
              >
                {faq.q}
                <motion.div animate={{ rotate: openFaq === idx ? 45 : 0 }}>
                  <Plus className="w-6 h-6 shrink-0 text-accent-hover" />
                </motion.div>
              </button>
              <motion.div 
                initial={false}
                animate={{ height: openFaq === idx ? "auto" : 0, opacity: openFaq === idx ? 1 : 0 }}
                className="overflow-hidden text-foreground/70 text-base md:text-lg leading-relaxed"
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
