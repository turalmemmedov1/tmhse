"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle, Briefcase, MapPin, Building2, Plus } from "lucide-react";
import { getVacancies, addVacancy } from "@/app/actions";

type Vacancy = {
  id: number;
  company: string;
  role: string;
  location: string;
  type: string;
  description: string;
  contact_email: string;
};

export default function VakansiyalarPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getVacancies();
      setVacancies(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const res = await addVacancy(formData);
    
    if (res.success) {
      setSubmitted(true);
      const data = await getVacancies();
      setVacancies(data);
    } else {
      alert(res.error);
    }
    setIsSubmitting(false);
  };

  return (
    <main className="flex min-h-screen flex-col w-full bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-40 pb-20 px-6 md:px-16 w-full max-w-[1400px] mx-auto min-h-[70vh] flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-dark-bg">Aktiv Vakansiyalar</h1>
            <p className="text-sm text-foreground/70">
              Şirkətiniz üçün SƏTƏM mütəxəssisi axtarırsınız? Elanınızı pulsuz yerləşdirin.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-accent hover:bg-accent-hover text-dark-bg font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" /> Vakansiya Yerləşdir
          </button>
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-6 md:p-8 w-full w-full max-w-2xl max-h-[95vh] overflow-y-auto relative"
              >
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-dark-bg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-2xl font-bold text-dark-bg mb-2">Vakansiya Yerləşdir</h2>
                <p className="text-sm text-gray-500 mb-6">Şirkətiniz üçün SƏTƏM mütəxəssisi axtarırsınız?</p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Şirkətin adı *</label>
                      <input type="text" name="company" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="Məs: SOCAR" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Vəzifə (Rol) *</label>
                      <input type="text" name="role" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="SƏTƏM Mühəndisi" />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Ünvan / Şəhər *</label>
                      <input type="text" name="location" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="Bakı" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">İş qrafiki</label>
                      <select name="type" className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm">
                        <option>Tam ştat</option>
                        <option>Yarım ştat</option>
                        <option>Təcrübə proqramı</option>
                        <option>Müqavilə əsasında</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Tələblər / Təsvir *</label>
                      <textarea name="desc" required rows={3} className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm resize-none" placeholder="Vakansiya barədə məlumat..."></textarea>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Əlaqə E-poçtu *</label>
                      <input type="email" name="contact" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="hr@sirket.az" />
                    </div>

                    <button disabled={isSubmitting} type="submit" className="w-full bg-dark-bg hover:bg-accent-hover text-white font-bold py-3 rounded-lg transition-colors duration-300 text-sm mt-2 disabled:opacity-50">
                      {isSubmitting ? "Yüklənir..." : "Elan Əlavə Et"}
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                    <h2 className="text-xl font-bold text-dark-bg">Uğurla Yerləşdirildi!</h2>
                    <p className="text-sm text-foreground/70">Elanınız vakansiyalar siyahısına əlavə olundu.</p>
                    <button onClick={() => { setSubmitted(false); setIsModalOpen(false); }} className="mt-4 bg-dark-bg text-white px-6 py-2 rounded-lg">Bağla</button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {loading ? (
            <p className="text-sm text-foreground/70">Yüklənir...</p>
          ) : vacancies.length === 0 ? (
             <p className="text-sm text-foreground/70">Hazırda aktiv vakansiya yoxdur.</p>
          ) : (
            vacancies.map((vac) => (
              <motion.div 
                key={vac.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-dark-bg/5 flex flex-col justify-between gap-6 group hover:shadow-md transition-shadow relative overflow-hidden h-full min-h-[300px]"
              >
                <div className="flex flex-col gap-3 max-w-3xl">
                  <div>
                    <h3 className="text-xl font-bold text-dark-bg group-hover:text-accent-hover transition-colors">{vac.role}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-foreground/70 font-medium">
                      <Building2 className="w-4 h-4 text-accent-hover" /> {vac.company}
                      <span className="text-dark-bg/20">|</span>
                      <MapPin className="w-4 h-4 text-accent-hover" /> {vac.location}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">{vac.description}</p>
                  <span className="text-xs font-bold bg-dark-bg/5 px-3 py-1 rounded-full w-fit mt-1">{vac.type}</span>
                </div>
                
                <div className="flex flex-col items-start w-full shrink-0 mt-auto pt-4 border-t border-dark-bg/5">
                  <a href={`mailto:${vac.contact_email}`} className="w-full text-center bg-dark-bg text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl hover:bg-accent-hover transition-colors shadow-md">
                    Müraciət Et
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </section>

      <Footer />
    </main>
  );
}
