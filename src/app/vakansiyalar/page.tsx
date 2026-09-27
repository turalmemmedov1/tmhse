"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Building2, MapPin, CheckCircle } from "lucide-react";

type Vacancy = {
  id: number;
  company: string;
  role: string;
  location: string;
  type: string;
  desc: string;
  contact: string;
};

const initialMockVacancies: Vacancy[] = [
  {
    id: 1,
    company: "SOCAR Downstream",
    role: "SƏTƏM üzrə Mühəndis",
    location: "Bakı, Azərbaycan",
    type: "Tam ştat",
    desc: "İstehsalat sahəsində təhlükəsizlik qaydalarının yoxlanılması, risk analizlərinin aparılması və hesabatların hazırlanması.",
    contact: "hr@socar-example.az",
  },
  {
    id: 2,
    company: "AzərGold QSC",
    role: "Əməyin Mühafizəsi Mütəxəssisi",
    location: "Daşkəsən, Azərbaycan",
    type: "Tam ştat",
    desc: "Mədən ərazisində işçilərin təlimatlandırılması və əməyin mühafizəsi standartlarına nəzarət.",
    contact: "cv@azergold-example.az",
  }
];

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>(initialMockVacancies);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    type: "Tam ştat",
    desc: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVacancy = {
      id: Date.now(),
      ...formData
    };
    setVacancies(prev => [newVacancy, ...prev].slice(0, 5));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ company: "", role: "", location: "", type: "Tam ştat", desc: "", contact: "" });
    }, 4000);
  };

  return (
    <main className="flex min-h-screen flex-col w-full max-w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground">
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
                <input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="Məs: SOCAR" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">Vəzifə (Rol) *</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="SƏTƏM Mühəndisi" />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">Ünvan / Şəhər *</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="Bakı" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">İş qrafiki</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm">
                  <option>Tam ştat</option>
                  <option>Yarım ştat</option>
                  <option>Təcrübə proqramı</option>
                  <option>Müqavilə əsasında</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">Tələblər / Təsvir *</label>
                <textarea name="desc" value={formData.desc} onChange={handleChange} required rows={3} className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm resize-none" placeholder="Vakansiya barədə məlumat..."></textarea>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">Əlaqə E-poçtu *</label>
                <input type="email" name="contact" value={formData.contact} onChange={handleChange} required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="hr@sirket.az" />
              </div>

              <button type="submit" className="w-full bg-dark-bg hover:bg-accent-hover text-white font-bold py-3 rounded-lg transition-colors duration-300 text-sm mt-2">
                Elan Əlavə Et
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
            {vacancies.map((vac) => (
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
                  <p className="text-sm text-foreground/70 leading-relaxed">{vac.desc}</p>
                  <span className="text-xs font-bold bg-dark-bg/5 px-3 py-1 rounded-full w-fit mt-1">{vac.type}</span>
                </div>
                
                <div className="flex flex-col items-start md:items-end justify-center shrink-0">
                  <a href={`mailto:${vac.contact}`} className="bg-dark-bg text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl hover:bg-accent-hover transition-colors shadow-md">
                    Müraciət Et
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
