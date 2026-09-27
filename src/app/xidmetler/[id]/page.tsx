"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { servicesData } from "@/components/Services";
import { useParams } from "next/navigation";
import { FileText, PlayCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const service = servicesData.find(s => s.id === id);

  if (!service) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-4xl font-bold text-dark-bg">Xidmət tapılmadı</h1>
        <Link href="/xidmetler" className="mt-4 text-accent-hover underline">Xidmətlərə qayıt</Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col w-full max-w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-32 pb-24 px-6 md:px-16 w-full max-w-[1920px] mx-auto min-h-[70vh]">
        <Link href="/xidmetler" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-muted hover:text-accent-hover mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Bütün xidmətlər
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex items-center gap-6"
        >
          <div className="w-20 h-20 bg-dark-bg rounded-3xl flex items-center justify-center text-white shrink-0">
            {service.icon}
          </div>
          <div>
            <span className="text-accent font-bold text-xl mb-1 block">Xidmət {service.num}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-dark-bg">{service.title}</h1>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-black/5 border border-dark-bg/5"
          >
            <h2 className="text-2xl font-bold text-dark-bg mb-6">Xidmət haqqında ətraflı</h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-6">
              {service.desc}
            </p>
            <p className="text-base text-foreground/60 leading-relaxed">
              Bu sahədə təqdim etdiyimiz xidmətlər ən son beynəlxalq standartlara (məsələn: ISO 45001) əsaslanır. Şirkətinizdə təhlükəsizlik mədəniyyətini formalaşdırmaq, qanunvericiliyin tələblərinə cavab vermək və işçi məmnuniyyətini artırmaq üçün fərdiləşdirilmiş yanaşma tətbiq edirik. 
            </p>
            <p className="text-base text-foreground/60 leading-relaxed mt-4">
              Mütəxəssislərimiz iş sahənizdəki mövcud vəziyyəti analiz edir, çatışmazlıqları aşkarlayır və həll yollarını addım-addım icra edir.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-dark-bg-card text-white rounded-[2rem] p-8 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-accent" /> PDF Materiallar
              </h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-sm text-text-muted">Təlimat Bələdçisi.pdf</span>
                  <a href="#" className="text-xs font-bold text-accent hover:text-white transition-colors">Yüklə</a>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Prosedur Qaydaları.pdf</span>
                  <a href="#" className="text-xs font-bold text-accent hover:text-white transition-colors">Yüklə</a>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-dark-bg/5">
              <h3 className="text-xl font-bold text-dark-bg mb-6 flex items-center gap-3">
                <PlayCircle className="w-6 h-6 text-accent-hover" /> Videolar
              </h3>
              <div className="w-full aspect-video bg-background rounded-xl flex items-center justify-center border border-dark-bg/10 relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-0"></div>
                <PlayCircle className="w-12 h-12 text-white z-10 drop-shadow-md group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-white drop-shadow-md z-10">Təqdimat Videosu</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
