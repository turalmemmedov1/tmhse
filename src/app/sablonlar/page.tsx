"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, Download } from "lucide-react";
import { getTemplates } from "@/app/actions";

type Template = {
  id: number;
  title: string;
  image_url: string;
  file_url: string;
  created_at: string;
};

export default function SablonlarPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getTemplates();
      setTemplates(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <main className="flex min-h-screen flex-col w-full bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-40 pb-20 px-6 md:px-16 w-full max-w-[1400px] mx-auto min-h-[70vh]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark-bg">Sənəd Şablonları</h1>
          <p className="text-sm md:text-base text-foreground/70 max-w-2xl mx-auto">
            SƏTƏM və digər sahələr üzrə lazımlı sənəd nümunələri və şablonları buradan yükləyə bilərsiniz.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="text-sm font-bold text-foreground/50">Yüklənir...</span>
          </div>
        ) : templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <FileText className="w-12 h-12 text-foreground/20" />
            <p className="text-sm font-bold text-foreground/50">Hazırda heç bir şablon yoxdur.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((tpl, idx) => (
              <motion.div 
                key={tpl.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-dark-bg/5 overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
              >
                {tpl.image_url ? (
                  <div className="w-full aspect-video relative overflow-hidden bg-gray-100">
                    <img src={tpl.image_url} alt={tpl.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gray-50 flex items-center justify-center border-b border-dark-bg/5 group-hover:bg-gray-100 transition-colors">
                    <FileText className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-dark-bg text-sm line-clamp-2 mb-4 flex-1">{tpl.title}</h3>
                  <a 
                    href={tpl.file_url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-center gap-2 bg-accent/10 text-accent font-bold py-2.5 rounded-xl hover:bg-accent hover:text-white transition-colors text-xs"
                  >
                    <Download className="w-4 h-4" /> Yüklə / Bax
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
