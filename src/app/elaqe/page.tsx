"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { getSettings } from "@/app/actions";
import { useEffect } from "react";

export default function ContactPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  useEffect(() => {
    getSettings().then(s => setSettings(s || {}));
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <main className="flex min-h-screen flex-col w-full bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-28 pb-20 px-6 md:px-16 w-full max-w-[1920px] mx-auto min-h-[70vh]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-accent-hover"></div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-dark-bg/60">Bizimlə Əlaqə</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-dark-bg">Sualınız var?</h1>
          <p className="text-sm md:text-base text-foreground/70 max-w-2xl font-medium">SƏTƏM həlləri və digər xidmətlərimiz barədə ətraflı məlumat almaq üçün bizimlə əlaqə saxlayın.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-dark-bg/5 flex items-start gap-6 group hover:border-accent-hover transition-colors">
              <div className="w-12 h-12 rounded-full bg-dark-bg/5 flex items-center justify-center text-dark-bg group-hover:bg-accent-hover group-hover:text-white transition-colors shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-sm font-bold text-dark-bg uppercase tracking-widest">Ünvan</span>
                <p className="text-foreground/70 text-sm">Bakı şəhəri, Azərbaycan</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-dark-bg/5 flex items-start gap-6 group hover:border-accent-hover transition-colors">
              <div className="w-12 h-12 rounded-full bg-dark-bg/5 flex items-center justify-center text-dark-bg group-hover:bg-accent-hover group-hover:text-white transition-colors shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-sm font-bold text-dark-bg uppercase tracking-widest">E-poçt</span>
                <a href={`mailto:${settings.contact_email || 'info@tmhse.expert'}`} className="text-accent-hover font-medium hover:underline text-sm">{settings.contact_email || 'info@tmhse.expert'}</a>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-dark-bg/5 flex items-start gap-6 group hover:border-accent-hover transition-colors">
              <div className="w-12 h-12 rounded-full bg-dark-bg/5 flex items-center justify-center text-dark-bg group-hover:bg-accent-hover group-hover:text-white transition-colors shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-sm font-bold text-dark-bg uppercase tracking-widest">WhatsApp / Zəng</span>
                <a href={`tel:${settings.contact_phone || "+994500000000"}`} className="text-foreground/70 font-medium hover:text-accent-hover transition-colors text-sm">{settings.contact_phone || "+994 50 000 00 00"}</a>
              </div>
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-white rounded-[2rem] p-8 shadow-xl shadow-black/5 border border-dark-bg/5 flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              const formData = new FormData(e.currentTarget);
              
              
              try {
                const response = await fetch("https://formsubmit.co/ajax/info@hsetms.com", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        name: formData.get("fullName"),
                        email: formData.get("email"),
                        message: formData.get("message")
                    })
                });
                
                setIsLoading(false);
                if (response.ok) {
                  setSuccess(true);
                  (e.target as HTMLFormElement).reset();
                  setTimeout(() => setSuccess(false), 5000);
                } else {
                  alert("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
                }
              } catch (error) {
                setIsLoading(false);
                alert("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
              }
            }}
          >
            <h3 className="text-xl font-bold text-dark-bg mb-2">Mesaj Göndər</h3>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-dark-bg">Ad və Soyad</label>
              <input type="text" name="fullName" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-hover" placeholder="Adınızı yazın" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-dark-bg">E-poçt ünvanı</label>
              <input type="email" name="email" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-hover" placeholder="nümunə@email.com" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-dark-bg">Mesajınız</label>
              <textarea rows={4} name="message" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-hover resize-none" placeholder="Sualınızı bura yazın..."></textarea>
            </div>

            {success && <span className="text-green-600 text-sm font-bold mt-2">Mesajınız uğurla göndərildi!</span>}

            <button disabled={isLoading} type="submit" className="w-full bg-dark-bg hover:bg-accent-hover text-white font-bold py-3 rounded-lg mt-2 transition-colors duration-300 text-sm disabled:opacity-50">
              {isLoading ? 'Göndərilir...' : 'Göndər'}
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
