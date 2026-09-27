"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, LogOut, Link as LinkIcon, FileText, Briefcase, FileBadge, Trash2, PlusCircle, Link2, Newspaper } from "lucide-react";
import Image from "next/image";
import { getVacancies, deleteVacancy, getCvs, deleteCv, getSettings, updateSetting, getNews, addNews, deleteNews } from "@/app/actions";
import { uploadToImgbb } from "@/lib/imgbb";

export default function AdminPanelPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Data States
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [cvs, setCvs] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const v = await getVacancies();
    const c = await getCvs();
    const n = await getNews();
    const s = await getSettings();
    setVacancies(v);
    setCvs(c);
    setNews(n);
    setSettings(s);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "info@tmhse.expert" && password === "Tural2026") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Email və ya şifrə yanlışdır.");
    }
  };

  const handleSaveSocial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateSetting("facebook_url", formData.get("facebook") as string);
    await updateSetting("instagram_url", formData.get("instagram") as string);
    await updateSetting("linkedin_url", formData.get("linkedin") as string);
    alert("Yadda saxlanıldı!");
    loadData();
  };

  const handleAddNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = (e.currentTarget.elements.namedItem("image") as HTMLInputElement).files?.[0];
    
    let img_url = "";
    if (file) {
      const url = await uploadToImgbb(file);
      if (url) img_url = url;
    }

    await addNews(title, content, img_url);
    alert("Xəbər əlavə edildi!");
    (e.target as HTMLFormElement).reset();
    loadData();
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark-bg text-white relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-accent/5 z-0 blur-[100px] rounded-full w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-dark-bg-card p-10 rounded-[2rem] shadow-2xl border border-white/10 z-10 flex flex-col items-center">
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
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="info@tmhse.expert" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-accent/80">Şifrə</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="••••••••" />
            </div>
            {error && <span className="text-red-400 text-xs font-medium">{error}</span>}
            <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-dark-bg font-bold py-3 rounded-xl mt-4 transition-colors">Daxil Ol</button>
          </form>
        </motion.div>
      </main>
    );
  }

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
        <div className="flex flex-col p-4 gap-2 mt-4 overflow-y-auto">
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-accent text-dark-bg' : 'hover:bg-white/5 text-text-muted hover:text-white'}`}>
            <LayoutDashboard className="w-4 h-4" /> İcmal
          </button>
          <button onClick={() => setActiveTab('vacancies')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'vacancies' ? 'bg-accent text-dark-bg' : 'hover:bg-white/5 text-text-muted hover:text-white'}`}>
            <Briefcase className="w-4 h-4" /> Vakansiyalar
          </button>
          <button onClick={() => setActiveTab('cvs')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'cvs' ? 'bg-accent text-dark-bg' : 'hover:bg-white/5 text-text-muted hover:text-white'}`}>
            <FileBadge className="w-4 h-4" /> CV-lər
          </button>
          <button onClick={() => setActiveTab('news')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'news' ? 'bg-accent text-dark-bg' : 'hover:bg-white/5 text-text-muted hover:text-white'}`}>
            <Newspaper className="w-4 h-4" /> Xəbərlər
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
      <div className="ml-64 w-full p-10 h-screen overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-dark-bg capitalize">{activeTab === 'dashboard' ? 'İcmal' : activeTab}</h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-dark-bg rounded-full text-white flex items-center justify-center text-xs font-bold">TM</div>
            <span className="text-sm font-bold text-dark-bg">Admin</span>
          </div>
        </header>

        {loading ? <p>Yüklənir...</p> : (
          <AnimatePresence mode="wait">
            
            {activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2">
                  <span className="text-sm font-bold text-foreground/60 uppercase">Aktiv Vakansiyalar</span>
                  <span className="text-4xl font-black text-dark-bg">{vacancies.length}</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2">
                  <span className="text-sm font-bold text-foreground/60 uppercase">Aktiv CV-lər</span>
                  <span className="text-4xl font-black text-dark-bg">{cvs.length}</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2">
                  <span className="text-sm font-bold text-foreground/60 uppercase">Xəbərlər</span>
                  <span className="text-4xl font-black text-dark-bg">{news.length}</span>
                </div>
              </motion.div>
            )}

            {activeTab === 'vacancies' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
                <h3 className="font-bold text-lg text-dark-bg">İstifadəçilərin Əlavə Etdiyi Vakansiyalar</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-dark-bg/5 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-dark-bg/5 text-dark-bg font-bold uppercase text-xs">
                      <tr><th className="p-4">Şirkət</th><th className="p-4">Vəzifə</th><th className="p-4">Email</th><th className="p-4 text-right">Əməliyyat</th></tr>
                    </thead>
                    <tbody>
                      {vacancies.map(v => (
                        <tr key={v.id} className="border-b border-dark-bg/5">
                          <td className="p-4">{v.company}</td><td className="p-4">{v.role}</td><td className="p-4">{v.contact_email}</td>
                          <td className="p-4 text-right">
                            <button onClick={async () => { if(confirm("Silmək istədiyinizə əminsiniz?")) { await deleteVacancy(v.id); loadData(); } }} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'cvs' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
                <h3 className="font-bold text-lg text-dark-bg">İstifadəçilərin Əlavə Etdiyi CV-lər</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-dark-bg/5 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-dark-bg/5 text-dark-bg font-bold uppercase text-xs">
                      <tr><th className="p-4">Ad Soyad</th><th className="p-4">İxtisas</th><th className="p-4">Email / Nömrə</th><th className="p-4 text-right">Əməliyyat</th></tr>
                    </thead>
                    <tbody>
                      {cvs.map(c => (
                        <tr key={c.id} className="border-b border-dark-bg/5">
                          <td className="p-4 font-bold">{c.first_name} {c.last_name}</td>
                          <td className="p-4">{c.skills.substring(0,30)}...</td>
                          <td className="p-4">{c.email} <br/><span className="text-xs text-foreground/50">{c.phone}</span></td>
                          <td className="p-4 text-right">
                            <button onClick={async () => { if(confirm("Silmək istədiyinizə əminsiniz?")) { await deleteCv(c.id); loadData(); } }} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'news' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-8">
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-4 flex items-center gap-2"><PlusCircle className="w-5 h-5 text-accent"/> Yeni Xəbər Əlavə Et</h3>
                  <form onSubmit={handleAddNews} className="flex flex-col gap-4 max-w-xl">
                    <input type="text" name="title" required placeholder="Xəbərin başlığı" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    <textarea name="content" required placeholder="Xəbərin mətni..." rows={4} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent resize-none"></textarea>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Xəbərin Şəkli</label>
                      <input type="file" name="image" accept="image/*" className="text-sm" />
                    </div>
                    <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold w-fit mt-2 hover:bg-accent-hover transition-colors">Dərc Et</button>
                  </form>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-dark-bg mb-4">Bütün Xəbərlər</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {news.map(n => (
                      <div key={n.id} className="bg-white p-4 rounded-xl border border-dark-bg/10 flex gap-4 items-start">
                        {n.image_url ? <img src={n.image_url} alt="" className="w-20 h-20 object-cover rounded-lg shrink-0" /> : <div className="w-20 h-20 bg-background rounded-lg shrink-0 flex items-center justify-center text-xs">Şəkil yoxdur</div>}
                        <div className="flex flex-col">
                          <h4 className="font-bold text-dark-bg line-clamp-2 leading-tight">{n.title}</h4>
                          <span className="text-[10px] text-foreground/50 mt-1">{new Date(n.created_at).toLocaleDateString()}</span>
                          <button onClick={async () => { if(confirm("Silin?")) { await deleteNews(n.id); loadData(); } }} className="text-red-500 text-xs font-bold mt-2 text-left hover:underline">Sil</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {activeTab === 'social' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5 max-w-xl">
                <h3 className="font-bold text-lg text-dark-bg mb-6">Sosial Media Linkləri</h3>
                <form onSubmit={handleSaveSocial} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-dark-bg">Facebook Linki</label>
                    <input type="text" name="facebook" defaultValue={settings.facebook_url || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-dark-bg">Instagram Linki</label>
                    <input type="text" name="instagram" defaultValue={settings.instagram_url || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-dark-bg">LinkedIn Linki</label>
                    <input type="text" name="linkedin" defaultValue={settings.linkedin_url || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                  </div>
                  <button type="submit" className="bg-dark-bg text-white px-6 py-3 rounded-lg text-sm font-bold w-fit mt-4 hover:bg-accent-hover transition-colors">Yadda Saxla</button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
