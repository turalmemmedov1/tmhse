"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TriangleAlert, GraduationCap, ClipboardCheck, Leaf, FileText, Plus } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Əməyin mühafizəsi",
    desc: "Gündəlik iş proseslərində təhlükəsizliyin təşkili və təhlükəsiz iş vərdişlərinin formalaşdırılması.",
    icon: <ShieldCheck className="w-8 h-8" />
  },
  {
    id: "02",
    title: "Risklərin qiymətləndirilməsi",
    desc: "Təhlükə mənbələrinin müəyyən edilməsi və risklərin azaldılması üçün konkret fəaliyyət planı.",
    icon: <TriangleAlert className="w-8 h-8" />
  },
  {
    id: "03",
    title: "SƏTƏM təlimləri",
    desc: "Komandanın təhlükəsizlik biliklərini real iş şəraitinə çevirən praktik maarifləndirmə.",
    icon: <GraduationCap className="w-8 h-8" />
  },
  {
    id: "04",
    title: "Audit və monitorinq",
    desc: "İş sahəsində mövcud vəziyyətin təhlili, çatışmazlıqların aşkarlanması və inkişaf tövsiyələri.",
    icon: <ClipboardCheck className="w-8 h-8" />
  },
  {
    id: "05",
    title: "Ətraf mühitin mühafizəsi",
    desc: "Resurslardan məsuliyyətli istifadə və fəaliyyətin ətraf mühitə təsirinin azaldılması.",
    icon: <Leaf className="w-8 h-8" />
  },
  {
    id: "06",
    title: "SƏTƏM sənədləşməsi",
    desc: "Aydın, işlək və müəssisənin fəaliyyətinə uyğun təhlükəsizlik sənədlərinin hazırlanması.",
    icon: <FileText className="w-8 h-8" />
  }
];

export default function Services() {
  return (
    <section id="xidmetler" className="w-full bg-background text-foreground py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 max-w-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-accent-hover"></div>
              <span className="text-xs uppercase tracking-widest text-foreground/60 font-bold">Xidmət İstiqamətləri</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1] text-dark-bg">
              Təhlükəsizlik sistemli<br />
              yanaşmadan başlayır.
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/70 max-w-sm text-lg md:text-right"
          >
            İş yerinin ehtiyaclarına uyğun, gündəlik fəaliyyətdə tətbiq oluna bilən SƏTƏM həlləri.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-dark-bg/10 rounded-2xl overflow-hidden bg-white shadow-sm">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-10 flex flex-col h-full hover:bg-gray-50 transition-colors group ${
                index % 3 !== 2 ? 'lg:border-r border-dark-bg/10' : ''
              } ${
                index < 3 ? 'lg:border-b border-dark-bg/10' : ''
              } ${
                index % 2 === 0 ? 'md:border-r border-dark-bg/10' : ''
              } border-b md:border-b-0`}
            >
              <div className="flex justify-between items-start mb-8 text-dark-bg/40 group-hover:text-accent-hover transition-colors">
                <span className="text-sm font-medium">{service.id}</span>
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold text-dark-bg mb-4">{service.title}</h3>
              <p className="text-foreground/70 flex-grow mb-12">
                {service.desc}
              </p>

              <button className="flex items-center justify-between text-accent-hover font-semibold text-sm mt-auto w-full group/btn">
                <span>Ətraflı</span>
                <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
