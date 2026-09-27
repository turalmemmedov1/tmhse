"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, TriangleAlert, GraduationCap, ClipboardCheck, Leaf, FileText } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Əməyin mühafizəsi",
    desc: "Gündəlik iş proseslərində təhlükəsizliyin təşkili və təhlükəsiz iş vərdişlərinin formalaşdırılması.",
    details: "Müəssisənizdə işçilərin sağlamlığı və təhlükəsizliyi üçün xüsusi proqramlar hazırlayırıq. İş mühitinin standartlara uyğunlaşdırılması, qəzaların qarşısının alınması və personalın təhlükəsizlik qaydalarına riayət etməsinin təmin edilməsi əsas məqsədimizdir.",
    icon: <ShieldCheck className="w-12 h-12" />
  },
  {
    id: "02",
    title: "Risklərin qiymətləndirilməsi",
    desc: "Təhlükə mənbələrinin müəyyən edilməsi və risklərin azaldılması üçün konkret fəaliyyət planı.",
    details: "İş yerindəki potensial təhlükələri sistemli şəkildə müəyyənləşdirir və qiymətləndiririk. Alınan nəticələrə əsasən, riskləri minimuma endirəcək effektiv strategiyalar və fəaliyyət planları təqdim edirik.",
    icon: <TriangleAlert className="w-12 h-12" />
  },
  {
    id: "03",
    title: "SƏTƏM təlimləri",
    desc: "Komandanın təhlükəsizlik biliklərini real iş şəraitinə çevirən praktik maarifləndirmə.",
    details: "İşçilərinizin məlumatlılığını və peşəkarlığını artırmaq üçün fərdiləşdirilmiş təlimlər keçirik. Nəzəri biliklərlə yanaşı, real ssenarilər üzərindən praktiki vərdişlər aşılayırıq.",
    icon: <GraduationCap className="w-12 h-12" />
  },
  {
    id: "04",
    title: "Audit və monitorinq",
    desc: "İş sahəsində mövcud vəziyyətin təhlili, çatışmazlıqların aşkarlanması və inkişaf tövsiyələri.",
    details: "SƏTƏM standartlarına uyğunluğu yoxlamaq üçün müstəqil audit və dövri monitorinqlər təşkil edirik. Aşkarlanmış uyğunsuzluqların aradan qaldırılması üçün peşəkar həll yolları təklif edirik.",
    icon: <ClipboardCheck className="w-12 h-12" />
  },
  {
    id: "05",
    title: "Ətraf mühitin mühafizəsi",
    desc: "Resurslardan məsuliyyətli istifadə və fəaliyyətin ətraf mühitə təsirinin azaldılması.",
    details: "Müəssisənizin ekoloji izini minimuma endirmək, tullantıların idarə olunması və enerji effektivliyini artırmaq üçün qabaqcıl həllər tətbiq edirik.",
    icon: <Leaf className="w-12 h-12" />
  },
  {
    id: "06",
    title: "SƏTƏM sənədləşməsi",
    desc: "Aydın, işlək və müəssisənin fəaliyyətinə uyğun təhlükəsizlik sənədlərinin hazırlanması.",
    details: "Qanunvericiliyin tələblərinə və beynəlxalq standartlara cavab verən bütün növ SƏTƏM sənədlərinin (təlimatlar, prosedurlar, jurnallar və s.) hazırlanmasını və yenilənməsini təmin edirik.",
    icon: <FileText className="w-12 h-12" />
  }
];

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-40 pb-24 px-6 md:px-16 w-full max-w-[1920px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-accent-hover"></div>
            <span className="text-sm uppercase tracking-[0.3em] font-bold text-dark-bg/60">Xidmətlərimiz</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-dark-bg">Hərtərəfli SƏTƏM həlləri</h1>
          <p className="text-xl text-foreground/70 max-w-2xl font-medium">İş yerinin ehtiyaclarına uyğun, qanunvericiliyin tələblərinə tam cavab verən, praktikada tətbiqi asan olan xidmətlər təqdim edirik.</p>
        </motion.div>

        <div className="flex flex-col gap-16">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[3rem] p-12 shadow-xl shadow-black/5 flex flex-col md:flex-row gap-12 items-start border border-dark-bg/5 hover:border-accent-hover transition-colors duration-500 group"
            >
              <div className="w-full md:w-1/3 flex flex-col gap-6">
                <span className="text-2xl font-bold text-dark-bg/20 group-hover:text-accent-hover transition-colors">{service.id}</span>
                <div className="p-6 bg-background rounded-3xl w-fit text-dark-bg group-hover:bg-accent-hover group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h2 className="text-3xl font-bold text-dark-bg">{service.title}</h2>
              </div>
              <div className="w-full md:w-2/3 flex flex-col gap-6 md:border-l border-dark-bg/10 md:pl-12">
                <p className="text-2xl font-medium text-dark-bg/80 leading-relaxed">
                  {service.desc}
                </p>
                <p className="text-lg text-foreground/60 leading-relaxed font-light">
                  {service.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
