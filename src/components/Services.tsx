"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TriangleAlert, GraduationCap, ClipboardCheck, Leaf, FileText, Settings } from "lucide-react";
import Link from "next/link";

export const servicesData = [
  {
    id: "emeyin-muhafizesi",
    num: "01",
    title: "Əməyin mühafizəsi",
    desc: "Gündəlik iş proseslərində təhlükəsizliyin təşkili və təhlükəsiz iş vərdişlərinin formalaşdırılması.",
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
  },
  {
    id: "risklerin-qiymetlendirilmesi",
    num: "02",
    title: "Risklərin qiymətləndirilməsi",
    desc: "Təhlükə mənbələrinin müəyyən edilməsi və risklərin azaldılması üçün konkret fəaliyyət planı.",
    icon: <TriangleAlert className="w-8 h-8 md:w-10 md:h-10" />
  },
  {
    id: "setem-telimleri",
    num: "03",
    title: "SƏTƏM təlimləri",
    desc: "Komandanın təhlükəsizlik biliklərini real iş şəraitinə çevirən praktik maarifləndirmə.",
    icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />
  },
  {
    id: "audit-ve-monitorinq",
    num: "04",
    title: "Audit və monitorinq",
    desc: "İş sahəsində mövcud vəziyyətin təhlili, çatışmazlıqların aşkarlanması və inkişaf tövsiyələri.",
    icon: <ClipboardCheck className="w-8 h-8 md:w-10 md:h-10" />
  },
  {
    id: "etraf-muhitin-muhafizesi",
    num: "05",
    title: "Ətraf mühitin mühafizəsi",
    desc: "Resurslardan məsuliyyətli istifadə və fəaliyyətin ətraf mühitə təsirinin azaldılması.",
    icon: <Leaf className="w-8 h-8 md:w-10 md:h-10" />
  },
  {
    id: "setem-senedlesmesi",
    num: "06",
    title: "SƏTƏM sənədləşməsi",
    desc: "Aydın, işlək və müəssisənin fəaliyyətinə uyğun təhlükəsizlik sənədlərinin hazırlanması.",
    icon: <FileText className="w-8 h-8 md:w-10 md:h-10" />
  },
  {
    id: "texniki-tehlukesizlik",
    num: "07",
    title: "Texniki təhlükəsizlik",
    desc: "Avadanlıqların pasportlarının hazırlanması və reyestrə salınması xidmətləri.",
    icon: <Settings className="w-8 h-8 md:w-10 md:h-10" />
  }
];

export default function Services() {
  return (
    <section className="w-full bg-background text-foreground py-24 px-6 md:px-16 overflow-hidden">
      
      <div className="w-full flex flex-col relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 max-w-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-[2px] bg-accent-hover"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-foreground/80 font-bold">Xidmət İstiqamətləri</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] text-dark-bg">
              Təhlükəsizlik sistemli<br />
              yanaşmadan başlayır.
            </h2>
          </motion.div>

          <Link href="/xidmetler">
            <motion.button 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-bold uppercase tracking-widest text-dark-bg border-b-2 border-dark-bg pb-1 hover:text-accent-hover hover:border-accent-hover transition-colors mt-4 md:mt-0"
            >
              Bütün xidmətlər
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {servicesData.map((service, index) => (
            <Link key={service.id} href={`/xidmetler/${service.id}`}>
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-[2rem] p-8 shadow-lg shadow-black/5 flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-500 cursor-pointer border border-dark-bg/5"
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-dark-bg rounded-2xl flex items-center justify-center group-hover:bg-accent transition-colors duration-500 shadow-md text-white">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-dark-bg group-hover:text-accent-hover transition-colors">{service.title}</h3>
                
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed font-light">
                  {service.desc}
                </p>

                <div className="mt-auto pt-4 flex items-center text-xs font-bold uppercase tracking-widest text-accent-hover opacity-0 group-hover:opacity-100 transition-opacity">
                  Ətraflı bax &rarr;
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
