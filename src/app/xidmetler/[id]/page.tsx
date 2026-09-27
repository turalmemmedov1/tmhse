"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { servicesData } from "@/components/Services";
import { useParams } from "next/navigation";
import { FileText, PlayCircle, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const service = servicesData.find(s => s.id === id);

  if (!service) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-bold text-dark-bg">Xidmət tapılmadı</h1>
        <Link href="/xidmetler" className="mt-4 text-accent-hover underline">Xidmətlərə qayıt</Link>
      </main>
    );
  }

  // Mock PDFs and Videos
  const pdfs = [
    { name: "Təlimat Bələdçisi.pdf", size: "2.4 MB" },
    { name: "Standartlar_2026.pdf", size: "1.1 MB" },
    { name: "Risk_Analizi_Nümunə.pdf", size: "3.5 MB" }
  ];

  const videos = [
    { title: "Giriş və Əsas Anlayışlar" },
    { title: "Praktiki Tətbiq Nümunələri" },
    { title: "İnsidentlərin İdarə Olunması" }
  ];

  return (
    <main className="flex min-h-screen flex-col w-full max-w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-28 pb-20 px-6 md:px-16 w-full max-w-[1920px] mx-auto min-h-[70vh]">
        <Link href="/xidmetler" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-accent-hover mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Bütün xidmətlər
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-dark-bg rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md">
            {service.icon}
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-dark-bg leading-tight">{service.title}</h1>
          </div>
        </motion.div>

        <div className="flex flex-col gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-dark-bg/5"
          >
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-4xl">
              {service.desc} Bu istiqamətdə təqdim etdiyimiz xidmətlər ən son beynəlxalq standartlara əsaslanır. Şirkətinizdə təhlükəsizlik mədəniyyətini formalaşdırmaq və riskləri minimuma endirmək üçün fərdiləşdirilmiş yanaşma tətbiq edirik.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-bg-card text-white rounded-3xl p-6 md:p-8 shadow-md"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                <FileText className="w-5 h-5 text-accent" /> Tədris Materialları (PDF)
              </h3>
              <div className="flex flex-col gap-3">
                {pdfs.map((pdf, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{pdf.name}</span>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider">{pdf.size}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-xs font-bold text-white bg-dark-bg rounded-lg hover:text-accent transition-colors">Oxu</button>
                      <button className="px-3 py-1.5 text-xs font-bold text-dark-bg bg-accent rounded-lg flex items-center gap-1 hover:bg-accent-hover transition-colors">
                        <Download className="w-3 h-3" /> Yüklə
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-dark-bg/5"
            >
              <h3 className="text-lg font-bold text-dark-bg mb-6 flex items-center gap-3">
                <PlayCircle className="w-5 h-5 text-accent-hover" /> Video Təlimatlar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((vid, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="w-full aspect-video bg-background rounded-xl flex items-center justify-center border border-dark-bg/10 relative overflow-hidden mb-2">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-0"></div>
                      <PlayCircle className="w-10 h-10 text-white z-10 drop-shadow-md group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-bold text-dark-bg group-hover:text-accent-hover transition-colors line-clamp-2">{vid.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
