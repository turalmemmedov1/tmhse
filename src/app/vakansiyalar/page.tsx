"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Building2, MapPin, CheckCircle } from "lucide-react";
import { addVacancy, getVacancies } from "@/app/actions";

type Vacancy = {
  id: number;
  company: string;
  role: string;
  location: string;
  type: string;
  description: string;
  contact_email: string;
};

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const data = await getVacancies(); // reload real data
      setVacancies(data);
      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
      (e.target as HTMLFormElement).reset();
    } else {
      alert(res.error);
    }
    setIsSubmitting(false);
  };

  return (
    <main className="flex min-h-screen flex-col w-full overflow-y-auto bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-28 pb-20 px-6 md:px-16 w-full max-w-[1920px] mx-auto min-h-[70vh] flex flex-col lg:flex-row gap-12">
        
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-dark-bg">Vakansiya Yerləşdir</h1>
            <p className="text-sm text-foreground/70">Şirkətiniz üçün SƏTƏM mütəxəssisi axtarırsınız? Elanınızı pulsuz yerləşdirin.</p>
          </motion.div>

          {!submitted ? (
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-dark-bg/5 flex flex-col gap-4"
            >
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
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-white rounded-3xl p-8 shadow-xl border border-dark-bg/5 flex flex-col items-center justify-center text-center gap-4"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
              <h2 className="text-xl font-bold text-dark-bg">Uğurla Yerləşdirildi!</h2>
              <p className="text-sm text-foreground/70">Elanınız vakansiyalar siyahısına əlavə olundu.</p>
            </motion.div>
          )}
        </div>

        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-dark-bg">Aktiv Vakansiyalar</h2>
          </div>

          <div className="flex flex-col gap-4">
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
                  className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col md:flex-row justify-between gap-6 group hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-3 max-w-xl">
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
                  
                  <div className="flex flex-col items-start md:items-end justify-center shrink-0">
                    <a href={`mailto:${vac.contact_email}`} className="bg-dark-bg text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl hover:bg-accent-hover transition-colors shadow-md">
                      Müraciət Et
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
