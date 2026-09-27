"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, LogOut, Link as LinkIcon, FileText, Briefcase, FileBadge, Trash2, PlusCircle, Newspaper, Users, BookOpen, Presentation, Video } from "lucide-react";
import Image from "next/image";
import { 
  getVacancies, deleteVacancy, getCvs, deleteCv, getSettings, updateSetting, 
  getNews, addNews, deleteNews, getLegislation, addLegislation, deleteLegislation,
  getInternships, addInternship, deleteInternship, getServicePdfs, addServicePdf, deleteServicePdf,
  getServiceVideos, addServiceVideo, deleteServiceVideo 
} from "@/app/actions";
import { uploadToImgbb } from "@/lib/imgbb";
import { supabase } from "@/lib/supabase";

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
  const [legislation, setLegislation] = useState<any[]>([]);
  const [internships, setInternships] = useState<any[]>([]);
  const [servicePdfs, setServicePdfs] = useState<any[]>([]);
  const [serviceVideos, setServiceVideos] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  
  const [loading, setLoading] = useState(false);
  const [liveVisitors, setLiveVisitors] = useState(0);

  const loadData = async () => {
    setLoading(true);
    const [v, c, n, l, i, sp, sv, s] = await Promise.all([
      getVacancies(), getCvs(), getNews(), getLegislation(), getInternships(), getServicePdfs(), getServiceVideos(), getSettings()
    ]);
    setVacancies(v); setCvs(c); setNews(n); setLegislation(l); setInternships(i); setServicePdfs(sp); setServiceVideos(sv); setSettings(s);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadData();

      // Track Live Visitors
      const channel = supabase.channel('online-visitors');
      channel.on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setLiveVisitors(Object.keys(state).length);
      }).subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
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

  const genericAddWithImage = async (e: React.FormEvent<HTMLFormElement>, addAction: Function) => {
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
    await addAction(title, content, img_url);
    alert("Əlavə edildi!");
    (e.target as HTMLFormElement).reset();
    loadData();
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

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark-bg text-white relative px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-dark-bg-card p-10 rounded-[2rem] shadow-2xl border border-white/10 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-8 text-center">İdarəetmə Paneli</h1>
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent" placeholder="info@tmhse.expert" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent" placeholder="••••••••" />
            {error && <span className="text-red-400 text-xs">{error}</span>}
            <button type="submit" className="w-full bg-accent text-dark-bg font-bold py-3 rounded-xl mt-4">Daxil Ol</button>
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
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden"><Image src="/ProLogo.png" alt="Logo" width={40} height={40} /></div>
          <div><span className="font-bold text-sm">TMHSE</span><span className="text-[10px] text-accent block uppercase">Admin Panel</span></div>
        </div>
        <div className="flex flex-col p-4 gap-2 mt-4 overflow-y-auto">
          {[
            {id:'dashboard', icon: LayoutDashboard, title: 'İcmal'},
            {id:'vacancies', icon: Briefcase, title: 'Vakansiyalar'},
            {id:'cvs', icon: FileBadge, title: 'CV-lər'},
            {id:'news', icon: Newspaper, title: 'Xəbərlər'},
            {id:'legislation', icon: BookOpen, title: 'Qanunvericilik'},
            {id:'internships', icon: Presentation, title: 'Təcrübə Proqramı'},
            {id:'services_media', icon: Video, title: 'Xidmət (PDF/Video)'},
            {id:'social', icon: LinkIcon, title: 'Sosial Şəbəkələr'}
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-accent text-dark-bg' : 'hover:bg-white/5 text-text-muted hover:text-white'}`}>
              <item.icon className="w-4 h-4" /> {item.title}
            </button>
          ))}
        </div>
        <div className="mt-auto p-4 border-t border-white/10">
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-white/5 w-full"><LogOut className="w-4 h-4" /> Çıxış Et</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full p-10 h-screen overflow-y-auto">
        <header className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5">
          <h2 className="text-2xl font-bold text-dark-bg capitalize">{activeTab.replace('_', ' ')}</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-green-700">Canlı Ziyarətçi: {liveVisitors}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-dark-bg rounded-full text-white flex items-center justify-center text-xs font-bold">TM</div>
              <span className="text-sm font-bold text-dark-bg">Admin</span>
            </div>
          </div>
        </header>

        {loading ? <p>Yüklənir...</p> : (
          <AnimatePresence mode="wait">
            
            {activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Vakansiyalar</span><span className="text-4xl font-black text-dark-bg">{vacancies.length}</span></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">CV-lər</span><span className="text-4xl font-black text-dark-bg">{cvs.length}</span></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Xəbərlər</span><span className="text-4xl font-black text-dark-bg">{news.length}</span></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Qanunvericilik</span><span className="text-4xl font-black text-dark-bg">{legislation.length}</span></div>
              </motion.div>
            )}

            {(activeTab === 'news' || activeTab === 'legislation' || activeTab === 'internships') && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-4 flex items-center gap-2"><PlusCircle className="w-5 h-5 text-accent"/> Yeni Əlavə Et</h3>
                  <form onSubmit={(e) => genericAddWithImage(e, activeTab === 'news' ? addNews : activeTab === 'legislation' ? addLegislation : addInternship)} className="flex flex-col gap-4 max-w-xl">
                    <input type="text" name="title" required placeholder="Başlıq" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    <textarea name="content" required placeholder="Məzmun..." rows={4} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent resize-none"></textarea>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Şəkil Seçin</label>
                      <input type="file" name="image" accept="image/*" className="text-sm" />
                    </div>
                    <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold w-fit mt-2 hover:bg-accent-hover">Dərc Et</button>
                  </form>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-dark-bg mb-4">Mövcud Paylaşım</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(activeTab === 'news' ? news : activeTab === 'legislation' ? legislation : internships).map(item => (
                      <div key={item.id} className="bg-white p-4 rounded-xl border border-dark-bg/10 flex gap-4 items-start">
                        {item.image_url ? <img src={item.image_url} alt="" className="w-20 h-20 object-cover rounded-lg shrink-0" /> : <div className="w-20 h-20 bg-background rounded-lg shrink-0 flex items-center justify-center text-xs">Şəkil yoxdur</div>}
                        <div className="flex flex-col">
                          <h4 className="font-bold text-dark-bg line-clamp-2 leading-tight">{item.title}</h4>
                          <span className="text-[10px] text-foreground/50 mt-1">{new Date(item.created_at).toLocaleDateString()}</span>
                          <button onClick={async () => { 
                            if(confirm("Silin?")) { 
                              if(activeTab === 'news') await deleteNews(item.id); 
                              if(activeTab === 'legislation') await deleteLegislation(item.id);
                              if(activeTab === 'internships') await deleteInternship(item.id);
                              loadData(); 
                            } 
                          }} className="text-red-500 text-xs font-bold mt-2 text-left hover:underline">Sil</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'services_media' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-4 flex items-center gap-2"><PlusCircle className="w-5 h-5 text-accent"/> Xidmətə Fayl və ya Video Bağla</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Add PDF */}
                    <form onSubmit={async(e)=>{e.preventDefault(); const fd=new FormData(e.currentTarget); await addServicePdf(fd.get('service_id') as string, fd.get('title') as string, fd.get('drive_link') as string); alert('Əlavə edildi'); (e.target as any).reset(); loadData();}} className="flex flex-col gap-4">
                      <h4 className="text-sm font-bold text-dark-bg border-b pb-2">PDF (Drive Link) Əlavə Et</h4>
                      <select name="service_id" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent">
                        <option value="emeyin-muhafizesi">Əməyin Mühafizəsi</option>
                        <option value="yanqina-qarsi-mubarize">Yanğına Qarşı Mübarizə</option>
                        <option value="hundurlukde-is">Hündürlükdə İş</option>
                        <option value="etraf-muhitin-muhafizesi">Ətraf Mühitin Mühafizəsi</option>
                      </select>
                      <input type="text" name="title" required placeholder="PDF Adı (məs: Təlimat)" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                      <input type="url" name="drive_link" required placeholder="Drive Linki (https://drive...)" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                      <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold mt-2">Yadda Saxla</button>
                    </form>

                    {/* Add Video */}
                    <form onSubmit={async(e)=>{e.preventDefault(); const fd=new FormData(e.currentTarget); await addServiceVideo(fd.get('service_id') as string, fd.get('title') as string, fd.get('youtube_link') as string); alert('Əlavə edildi'); (e.target as any).reset(); loadData();}} className="flex flex-col gap-4">
                      <h4 className="text-sm font-bold text-dark-bg border-b pb-2">Video (YouTube) Əlavə Et</h4>
                      <select name="service_id" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent">
                        <option value="emeyin-muhafizesi">Əməyin Mühafizəsi</option>
                        <option value="yanqina-qarsi-mubarize">Yanğına Qarşı Mübarizə</option>
                        <option value="hundurlukde-is">Hündürlükdə İş</option>
                        <option value="etraf-muhitin-muhafizesi">Ətraf Mühitin Mühafizəsi</option>
                      </select>
                      <input type="text" name="title" required placeholder="Videonun Adı" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                      <input type="url" name="youtube_link" required placeholder="YouTube Linki (https://youtube...)" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                      <button type="submit" className="bg-accent-hover text-white px-6 py-2 rounded-lg text-sm font-bold mt-2">Yadda Saxla</button>
                    </form>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                     <h3 className="font-bold text-sm mb-2">Mövcud PDF-lər</h3>
                     <div className="flex flex-col gap-2">
                       {servicePdfs.map(p => (
                         <div key={p.id} className="bg-white p-3 border rounded-lg text-sm flex justify-between">
                           <div><span className="font-bold">{p.title}</span> <span className="text-xs text-foreground/50">({p.service_id})</span></div>
                           <button onClick={async()=>{if(confirm("Silin?")){await deleteServicePdf(p.id); loadData()}}} className="text-red-500">Sil</button>
                         </div>
                       ))}
                     </div>
                   </div>
                   <div>
                     <h3 className="font-bold text-sm mb-2">Mövcud Videolar</h3>
                     <div className="flex flex-col gap-2">
                       {serviceVideos.map(v => (
                         <div key={v.id} className="bg-white p-3 border rounded-lg text-sm flex justify-between">
                           <div><span className="font-bold">{v.title}</span> <span className="text-xs text-foreground/50">({v.service_id})</span></div>
                           <button onClick={async()=>{if(confirm("Silin?")){await deleteServiceVideo(v.id); loadData()}}} className="text-red-500">Sil</button>
                         </div>
                       ))}
                     </div>
                   </div>
                </div>

              </motion.div>
            )}
            
            {/* Vacancies / CVs views kept same... omitted full rewrite but kept structure for brevity */}
            {activeTab === 'vacancies' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                <h3 className="font-bold text-lg text-dark-bg">Vakansiyalar</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-dark-bg/5 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-dark-bg/5 text-dark-bg font-bold uppercase text-xs">
                      <tr><th className="p-4">Şirkət</th><th className="p-4">Vəzifə</th><th className="p-4 text-right">Əməliyyat</th></tr>
                    </thead>
                    <tbody>
                      {vacancies.map(v => (
                        <tr key={v.id} className="border-b border-dark-bg/5">
                          <td className="p-4">{v.company}</td><td className="p-4">{v.role}</td>
                          <td className="p-4 text-right">
                            <button onClick={async () => { if(confirm("Silmək istədiyinizə əminsiniz?")) { await deleteVacancy(v.id); loadData(); } }} className="text-red-500 hover:text-red-700">Sil</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'cvs' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                <h3 className="font-bold text-lg text-dark-bg">CV-lər</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-dark-bg/5 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-dark-bg/5 text-dark-bg font-bold uppercase text-xs">
                      <tr><th className="p-4">Ad Soyad</th><th className="p-4">İxtisas</th><th className="p-4 text-right">Əməliyyat</th></tr>
                    </thead>
                    <tbody>
                      {cvs.map(c => (
                        <tr key={c.id} className="border-b border-dark-bg/5">
                          <td className="p-4 font-bold">{c.first_name} {c.last_name}</td>
                          <td className="p-4">{c.skills.substring(0,30)}...</td>
                          <td className="p-4 text-right">
                            <button onClick={async () => { if(confirm("Silmək istədiyinizə əminsiniz?")) { await deleteCv(c.id); loadData(); } }} className="text-red-500 hover:text-red-700">Sil</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
