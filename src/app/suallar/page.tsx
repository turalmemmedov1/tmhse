"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

const allFaqs = [
  { q: "SƏTƏM nədir və nə üçün vacibdir?", a: "SƏTƏM (Sağlamlıq, Əməyin Təhlükəsizliyi və Ətraf Mühit) iş yerində riskləri azaltmaq və qanunvericiliyə uyğunluğu təmin etmək üçün sistemli yanaşmadır." },
  { q: "Siz hansı sahələr üzrə təlimlər keçirirsiniz?", a: "Biz əməyin mühafizəsi, ilk tibbi yardım, yanğın təhlükəsizliyi, hündürlükdə iş və risklərin idarə olunması üzrə təlimlər keçirik." },
  { q: "Audit və monitorinq xidməti nələri əhatə edir?", a: "İş yerinin mövcud qaydalara uyğunluğunun yoxlanması, risklərin aşkarlanması və inkişaf planının hazırlanmasını əhatə edir." },
  { q: "Xidmətləriniz yalnız böyük şirkətlər üçündür?", a: "Xeyr, həm kiçik, həm orta, həm də böyük bizneslər üçün fərdiləşdirilmiş SƏTƏM həlləri təklif edirik." },
  { q: "Müqavilə prosesi necə gedir?", a: "İlkin baxış keçirilir, ehtiyaclar müəyyənləşdirilir, kommersiya təklifi verilir və rəsmi müqavilə bağlanır." },
  { q: "İşçilər üçün ilk tibbi yardım təlimi məcburidirmi?", a: "Bəli, yerli qanunvericiliyə əsasən müəyyən sayda işçisi olan müəssisələrdə ilk tibbi yardım bilikləri olan şəxslərin olması mütləqdir." },
  { q: "ISO 45001 sertifikatına hazırlıq görürsünüzmü?", a: "Bəli, müəssisənizin beynəlxalq standartlara uyğunlaşdırılması və ISO 45001 auditi üçün tam dəstək göstəririk." },
  { q: "Qiymətləndirmə nə qədər vaxt aparır?", a: "Müəssisənin böyüklüyündən və fəaliyyət sahəsindən asılı olaraq 3 gündən 2 həftəyə qədər davam edə bilər." },
  { q: "Risklərin qiymətləndirilməsi sənədi nə qədər müddətə etibarlıdır?", a: "İstehsalat şəraiti dəyişmədikcə adətən 1 il, lakin hər hansı ciddi dəyişiklik və ya insident olduqda yenilənməlidir." },
  { q: "Tikinti sahələrində SƏTƏM nəzarəti həyata keçirirsiniz?", a: "Bəli, həm gündəlik, həm də dövri olaraq tikinti sahələrində SƏTƏM üzrə tam nəzarəti təmin edirik." },
  { q: "Ətraf mühitin mühafizəsi xidmətlərinə nələr daxildir?", a: "Tullantıların idarə edilməsi, emissiya göstəricilərinin yoxlanması və ekoloji qanunvericiliyə uyğunluğun təmin edilməsi." },
  { q: "SƏTƏM sənədləşməsi nədir?", a: "Qanunvericiliyin tələb etdiyi bütün daxili əmrlər, təlimatlar, jurnallar və hesabat formalarının sıfırdan hazırlanmasıdır." },
  { q: "Müəssisədə bədbəxt hadisə baş verdikdə nə edirsiniz?", a: "İnsidentin kök səbəblərinin araşdırılması (RCA), düzəldici tədbirlərin görülməsi və rəsmi qurumlar üçün hesabatın hazırlanmasında iştirak edirik." },
  { q: "Təlimlərin sonunda sertifikat verilirmi?", a: "Bəli, təlimi uğurla başa vuran bütün iştirakçılara rəsmi və beynəlxalq səviyyədə tanınan sertifikatlar təqdim olunur." },
  { q: "Sizinlə necə əlaqə saxlamaq olar?", a: "Saytımızın Əlaqə bölməsindən, WhatsApp nömrəmizdən və ya info@tmhse.expert ünvanından bizə yaza bilərsiniz." }
];

export default function SuallarPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="flex min-h-screen flex-col w-full max-w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-28 pb-20 px-6 md:px-16 w-full max-w-[1920px] mx-auto min-h-[70vh] flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 max-w-2xl"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-accent-hover"></div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-dark-bg/60">Məlumat Mərkəzi</span>
            <div className="w-8 h-[2px] bg-accent-hover"></div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-dark-bg">Tez-tez Verilən Suallar</h1>
          <p className="text-sm md:text-base text-foreground/70 font-medium">
            SƏTƏM xidmətləri, təlimlər və qanunvericiliklə bağlı ən çox verilən 15 sualın cavabını burada tapa bilərsiniz.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-4xl bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-black/5 border border-dark-bg/5"
        >
          {allFaqs.map((faq, idx) => (
            <div key={idx} className="border-b border-dark-bg/10 pb-4 last:border-0 last:pb-0 mb-4 last:mb-0">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-base md:text-lg py-3 hover:text-accent-hover transition-colors"
              >
                <span className="pr-8">{idx + 1}. {faq.q}</span>
                <motion.div animate={{ rotate: openFaq === idx ? 45 : 0 }} className="shrink-0">
                  <Plus className="w-5 h-5 text-accent-hover" />
                </motion.div>
              </button>
              <motion.div 
                initial={false}
                animate={{ height: openFaq === idx ? "auto" : 0, opacity: openFaq === idx ? 1 : 0 }}
                className="overflow-hidden text-foreground/70 text-sm md:text-base leading-relaxed"
              >
                <p className="pb-4 pt-1 pr-12">{faq.a}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
