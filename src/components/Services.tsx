"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TriangleAlert, GraduationCap, ClipboardCheck, Leaf, FileText, Plus } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Əməyin mühafizəsi",
    desc: "Gündəlik iş proseslərində təhlükəsizliyin təşkili və təhlükəsiz iş vərdişlərinin formalaşdırılması.",
    icon: <ShieldCheck className="w-10 h-10" />
  },
  {
    id: "02",
    title: "Risklərin qiymətləndirilməsi",
    desc: "Təhlükə mənbələrinin müəyyən edilməsi və risklərin azaldılması üçün konkret fəaliyyət planı.",
    icon: <TriangleAlert className="w-10 h-10" />
  },
  {
    id: "03",
    title: "SƏTƏM təlimləri",
    desc: "Komandanın təhlükəsizlik biliklərini real iş şəraitinə çevirən praktik maarifləndirmə.",
    icon: <GraduationCap className="w-10 h-10" />
  },
  {
    id: "04",
    title: "Audit və monitorinq",
    desc: "İş sahəsində mövcud vəziyyətin təhlili, çatışmazlıqların aşkarlanması və inkişaf tövsiyələri.",
    icon: <ClipboardCheck className="w-10 h-10" />
  },
  {
    id: "05",
    title: "Ətraf mühitin mühafizəsi",
    desc: "Resurslardan məsuliyyətli istifadə və fəaliyyətin ətraf mühitə təsirinin azaldılması.",
    icon: <Leaf className="w-10 h-10" />
  },
  {
    id: "06",
    title: "SƏTƏM sənədləşməsi",
    desc: "Aydın, işlək və müəssisənin fəaliyyətinə uyğun təhlükəsizlik sənədlərinin hazırlanması.",
    icon: <FileText className="w-10 h-10" />
  }
];

export default function Services() {
  return (
    <section id="xidmetler" className="w-full bg-background text-foreground py-32 px-6 md:px-16 relative overflow-hidden">
      <div className="w-full flex flex-col relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 max-w-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-accent-hover"></div>
              <span className="text-sm uppercase tracking-[0.3em] text-foreground/80 font-bold">Xidmət İstiqamətləri</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] text-dark-bg">
              Təhlükəsizlik sistemli<br />
              yanaşmadan başlayır.
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-foreground/70 max-w-md text-xl md:text-right font-medium"
          >
            İş yerinin ehtiyaclarına uyğun, gündəlik fəaliyyətdə tətbiq oluna bilən SƏTƏM həlləri.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5 border border-dark-bg/5">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`p-12 flex flex-col h-full hover:bg-gray-50/80 transition-colors group cursor-pointer ${
                index % 3 !== 2 ? 'lg:border-r border-dark-bg/5' : ''
              } ${
                index < 3 ? 'lg:border-b border-dark-bg/5' : ''
              } ${
                index % 2 === 0 ? 'md:border-r border-dark-bg/5' : ''
              } border-b md:border-b-0`}
            >
              <div className="flex justify-between items-start mb-10 text-dark-bg/30 group-hover:text-accent-hover transition-colors duration-500">
                <span className="text-lg font-bold">{service.id}</span>
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="p-4 bg-dark-bg/5 rounded-2xl group-hover:bg-accent/10 transition-colors duration-500"
                >
                  {service.icon}
                </motion.div>
              </div>
              
              <h3 className="text-2xl font-bold text-dark-bg mb-6 group-hover:text-accent-hover transition-colors duration-300">{service.title}</h3>
              <p className="text-foreground/70 flex-grow mb-16 text-lg leading-relaxed">
                {service.desc}
              </p>

              <button className="flex items-center justify-between text-dark-bg font-bold text-base mt-auto w-full group/btn group-hover:text-accent-hover transition-colors">
                <span className="uppercase tracking-widest">Ətraflı</span>
                <div className="w-10 h-10 rounded-full border-2 border-dark-bg/10 flex items-center justify-center group-hover/btn:border-accent-hover group-hover/btn:bg-accent-hover group-hover/btn:text-white transition-all duration-300">
                  <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-500" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
