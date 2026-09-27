"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, LogOut, Settings, List, Link as LinkIcon, FileText, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function AdminPanelPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "info@tmhse.expert" && password === "Tural2026") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Email və ya şifrə yanlışdır.");
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark-bg text-white relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-accent/5 z-0 blur-[100px] rounded-full w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-dark-bg-card p-10 rounded-[2rem] shadow-2xl border border-white/10 z-10 flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1 mb-6 border-2 border-accent">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image src="/ProLogo.png" alt="Logo" fill className="object-cover" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-center">İdarəetmə Paneli</h1>
          <p className="text-text-muted text-xs mb-8 text-center">TMHSE idarəetmə sisteminə giriş</p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-accent/80">E-poçt</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="info@tmhse.expert"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-accent/80">Şifrə</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && <span className="text-red-400 text-xs font-medium">{error}</span>}

            <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-dark-bg font-bold py-3 rounded-xl mt-4 transition-colors">
              Daxil Ol
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  // Dashboard Visuals
  return (
    <main className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 bg-dark-bg text-white flex flex-col fixed inset-y-0 left-0 z-20 border-r border-white/10">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <Image src="/ProLogo.png" alt="Logo" width={40} height={40} className="object-cover" />
          </div>
          <div>
            <span className="font-bold tracking-widest text-sm">TMHSE</span>
            <span className="text-[10px] text-accent block uppercase">Admin Panel</span>
          </div>
        </div>

        <div className="flex flex-col p-4 gap-2 mt-4">
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-accent text-dark-bg' : 'hover:bg-white/5 text-text-muted hover:text-white'}`}>
            <LayoutDashboard className="w-4 h-4" /> İcmal
          </button>
          <button onClick={() => setActiveTab('menu')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'menu' ? 'bg-accent text-dark-bg' : 'hover:bg-white/5 text-text-muted hover:text-white'}`}>
            <List className="w-4 h-4" /> Menyu İdarəetməsi
          </button>
          <button onClick={() => setActiveTab('content')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'content' ? 'bg-accent text-dark-bg' : 'hover:bg-white/5 text-text-muted hover:text-white'}`}>
            <FileText className="w-4 h-4" /> Məzmun İdarəetməsi
          </button>
          <button onClick={() => setActiveTab('social')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'social' ? 'bg-accent text-dark-bg' : 'hover:bg-white/5 text-text-muted hover:text-white'}`}>
            <LinkIcon className="w-4 h-4" /> Sosial Şəbəkələr
          </button>
        </div>

        <div className="mt-auto p-4 border-t border-white/10">
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-white/5 w-full transition-colors">
            <LogOut className="w-4 h-4" /> Çıxış Et
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full p-10">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-dark-bg capitalize">{activeTab === 'dashboard' ? 'İcmal' : activeTab === 'menu' ? 'Menyu İdarəetməsi' : activeTab === 'content' ? 'Məzmun İdarəetməsi' : 'Sosial Şəbəkələr'}</h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-dark-bg rounded-full text-white flex items-center justify-center text-xs font-bold">TM</div>
            <span className="text-sm font-bold text-dark-bg">Admin</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2">
                <span className="text-sm font-bold text-foreground/60 uppercase">Aktiv Vakansiyalar</span>
                <span className="text-4xl font-black text-dark-bg">2</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2">
                <span className="text-sm font-bold text-foreground/60 uppercase">Aktiv CV-lər</span>
                <span className="text-4xl font-black text-dark-bg">14</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2">
                <span className="text-sm font-bold text-foreground/60 uppercase">Xəbərlər</span>
                <span className="text-4xl font-black text-dark-bg">0</span>
              </div>
              
              <div className="md:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5 mt-6">
                <h3 className="font-bold text-lg text-dark-bg mb-4">Sistem Məlumatı</h3>
                <p className="text-sm text-foreground/70">Xoş gəlmisiniz! Sol tərəfdəki menyudan istifadə edərək saytın müxtəlif bölmələrini (Üst menyu, alt menyu, sosial media linkləri və s.) asanlıqla dəyişdirə bilərsiniz. Gələcəkdə bu bölmə birbaşa bazaya (Supabase) qoşulacaq.</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5 max-w-2xl">
              <h3 className="font-bold text-lg text-dark-bg mb-6">Sosial Media Linkləri</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-dark-bg">Facebook Linki</label>
                  <input type="text" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" defaultValue="https://facebook.com/tmhse" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-dark-bg">Instagram Linki</label>
                  <input type="text" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" defaultValue="https://instagram.com/tmhse" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-dark-bg">LinkedIn Linki</label>
                  <input type="text" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" placeholder="https://linkedin.com/..." />
                </div>
                <button className="bg-dark-bg text-white px-6 py-3 rounded-lg text-sm font-bold w-fit mt-4 hover:bg-accent-hover transition-colors">Yadda Saxla</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
