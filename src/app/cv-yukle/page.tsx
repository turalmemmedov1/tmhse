"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UploadCloud, CheckCircle, User, Mail, Phone, Briefcase, Link as LinkIcon } from "lucide-react";
import { addCv, getCvs } from "@/app/actions";
import { uploadToImgbb } from "@/lib/imgbb";

type CV = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  skills: string;
  image_url: string;
  cv_drive_link: string;
};

export default function CvYuklePage() {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getCvs();
      setCvs(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    let image_url = "";
    if (selectedFile) {
      const url = await uploadToImgbb(selectedFile);
      if (url) image_url = url;
    }

    const cvData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      skills: formData.get("skills") as string,
      cv_drive_link: formData.get("cv_drive_link") as string || "",
      image_url
    };

    const res = await addCv(cvData);
    
    if (res.success) {
      setSubmitted(true);
      const data = await getCvs();
      setCvs(data);
      setTimeout(() => {
        setSubmitted(false);
        setSelectedFile(null);
      }, 4000);
      (e.target as HTMLFormElement).reset();
    } else {
      alert(res.error);
    }
    setIsSubmitting(false);
  };

  return (
    <main className="flex min-h-screen flex-col w-full max-w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-24 pb-16 px-6 md:px-16 w-full max-w-[1920px] mx-auto min-h-[70vh] flex flex-col lg:flex-row gap-12">
        
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark-bg">CV Yüklə</h1>
            <p className="text-sm md:text-base text-foreground/70">
              Öz profilinizi və bacarıqlarınızı bura əlavə edərək potensial işəgötürənlərin sizi tapmasına kömək edin.
            </p>
          </motion.div>

          {!submitted ? (
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full bg-white rounded-[2rem] p-6 shadow-xl shadow-black/5 border border-dark-bg/5 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">Adınız *</label>
                <input type="text" name="first_name" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="Tural" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">Soyadınız *</label>
                <input type="text" name="last_name" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="Məmmədov" />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">E-poçt ünvanınız *</label>
                <input type="email" name="email" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="numune@email.com" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">Əlaqə nömrəsi *</label>
                <input type="tel" name="phone" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="+994 50 123 45 67" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">Bacarıqlar / İxtisas *</label>
                <textarea name="skills" required rows={3} className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm resize-none" placeholder="Məsələn: SƏTƏM mütəxəssisi, ISO standartları..."></textarea>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">CV (Google Drive Linki)</label>
                <input type="url" name="cv_drive_link" className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="https://drive.google.com/..." />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">Profil Şəkli (İstəyə bağlı)</label>
                <label className={`w-full border-2 border-dashed ${selectedFile ? 'border-accent-hover bg-accent/5' : 'border-dark-bg/20'} rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent-hover hover:bg-accent/5 transition-colors`}>
                  <UploadCloud className={`w-5 h-5 ${selectedFile ? 'text-accent-hover' : 'text-foreground/40'}`} />
                  <span className="text-xs font-medium text-foreground/60 text-center">
                    {selectedFile ? selectedFile.name : "Şəkil yükləmək üçün klikləyin"}
                  </span>
                  <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="hidden" />
                </label>
              </div>

              <button disabled={isSubmitting} type="submit" className="w-full bg-accent-hover hover:bg-[#349b65] text-white font-bold py-3 rounded-lg transition-colors duration-300 text-sm mt-2 disabled:opacity-50">
                {isSubmitting ? "Yüklənir..." : "CV Yerləşdir"}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-white rounded-[2rem] p-8 shadow-xl border border-dark-bg/5 flex flex-col items-center justify-center text-center gap-4"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
              <h2 className="text-2xl font-bold text-dark-bg">Təşəkkürlər!</h2>
              <p className="text-sm text-foreground/70">
                Məlumatlarınız CV lövhəsinə uğurla əlavə edildi. İşəgötürənlər sizinlə birbaşa əlaqə saxlaya biləcək.
              </p>
            </motion.div>
          )}
        </div>

        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-dark-bg">Aktiv CV-lər / Elanlar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <p className="text-sm text-foreground/70">Yüklənir...</p>
            ) : cvs.length === 0 ? (
              <p className="text-sm text-foreground/70">Hazırda aktiv CV yoxdur.</p>
            ) : (
              cvs.map((cv) => (
                <motion.div 
                  key={cv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-4 group hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-background border border-dark-bg/10 flex items-center justify-center overflow-hidden shrink-0">
                      {cv.image_url ? <img src={cv.image_url} alt={cv.first_name} className="w-full h-full object-cover" /> : <User className="w-6 h-6 text-dark-bg/30" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark-bg">{cv.first_name} {cv.last_name}</h3>
                      <span className="text-xs font-medium text-accent-hover">SƏTƏM Namizədi</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2 text-sm text-foreground/80">
                      <Briefcase className="w-4 h-4 text-dark-bg/40 mt-0.5 shrink-0" />
                      <p className="leading-tight font-medium">{cv.skills}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/60">
                      <Mail className="w-3.5 h-3.5" /> <a href={`mailto:${cv.email}`} className="hover:text-accent-hover">{cv.email}</a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/60">
                      <Phone className="w-3.5 h-3.5" /> <a href={`tel:${cv.phone}`} className="hover:text-accent-hover">{cv.phone}</a>
                    </div>
                    {cv.cv_drive_link && (
                      <div className="flex items-center gap-2 text-xs text-foreground/60 mt-1">
                        <LinkIcon className="w-3.5 h-3.5 text-accent" /> <a href={cv.cv_drive_link} target="_blank" rel="noreferrer" className="hover:text-accent-hover text-accent font-bold">Ətraflı CV PDF</a>
                      </div>
                    )}
                  </div>
                  
                  <a href={`mailto:${cv.email}`} className="mt-auto w-full bg-dark-bg text-white text-center py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors">
                    Əlaqə
                  </a>
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
