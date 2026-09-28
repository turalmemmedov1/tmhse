"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, MessageSquare, Phone, Settings,  LogOut, Link as LinkIcon, ImageIcon as ImageIcon, Folder as FolderIcon, FileText, Briefcase, FileBadge, Trash2, PlusCircle, Newspaper, Users, BookOpen, Presentation, Video } from "lucide-react";
import Image from "next/image";
import { 
  getVacancies, deleteVacancy, getCvs, deleteCv, getSettings, updateSetting, 
  getNews, addNews, deleteNews, updateNews, getLegislation, addLegislation, deleteLegislation, updateLegislation,
  getInternships, addInternship, deleteInternship, updateInternship, getServicePdfs, addServicePdf, addServicePdfWithFile, deleteServicePdf,
  getServiceVideos, addServiceVideo, deleteServiceVideo, getMonthlyVisits, getTemplates, addTemplateWithFile, deleteTemplate, verifyAdmin, updateAdminCredentials
} from "@/app/actions";
import { uploadToImgbb } from "@/lib/imgbb";
import { createClient } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";

export default function AdminPanelPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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
  const [templates, setTemplates] = useState<any[]>([]);
    const [settings, setSettings] = useState<Record<string, string>>({});
  
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedStats, setSelectedStats] = useState<{y: string, m: string, cvs: number, vacs: number} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [monthlyVisits, setMonthlyVisits] = useState(0);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTab, setEditTab] = useState("");
  
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = toast.loading("Düzəliş edilir...");
    try {
      if (editTab === 'news') await updateNews(editingItem.id, editTitle, editContent);
      if (editTab === 'legislation') await updateLegislation(editingItem.id, editTitle, editContent);
      if (editTab === 'internships') await updateInternship(editingItem.id, editTitle, editContent);
      toast.success("Düzəliş edildi!", { id: t });
      setEditingItem(null);
      loadData();
    } catch(err) {
      toast.error("Xəta baş verdi", { id: t });
    }
  };


  const loadData = async () => {
    setLoading(true);
    try {
      const [v, c, n, l, i, sp, sv, s, mVisits, tData] = await Promise.all([
        getVacancies(), getCvs(), getNews(), getLegislation(), getInternships(), getServicePdfs(), getServiceVideos(), getSettings(), getMonthlyVisits(), getTemplates()
      ]);
      setVacancies(v || []); setCvs(c || []); setNews(n || []); setLegislation(l || []); setInternships(i || []); setServicePdfs(sp || []); setServiceVideos(sv || []); setSettings(s || {}); setMonthlyVisits(mVisits || 0); setTemplates(tData || []);
    } catch (e) {
      console.error("Error loading admin data:", e);
      toast.error("Məlumatları yükləyərkən xəta baş verdi");
    }
    setLoading(false);
  };

  useEffect(() => {
    const isSaved = localStorage.getItem("tmhse_admin_logged_in");
    if (isSaved === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadData();

      // Track Live Visitors using a fresh client to avoid singleton channel conflicts
      const adminSupabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy',
        { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
      );
      
      const channel = adminSupabase.channel('online-visitors');
      channel.on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setLiveVisitors(Object.keys(state).length);
      }).subscribe();

      return () => {
        adminSupabase.removeChannel(channel);
      };
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await verifyAdmin(email, password);
    if (isValid) {
      setIsLoggedIn(true);
      localStorage.setItem("tmhse_admin_logged_in", "true");
      setError("");
      toast.success("Uğurla daxil oldunuz!");
    } else {
      setError("Email və ya şifrə yanlışdır.");
      toast.error("Email və ya şifrə yanlışdır.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("tmhse_admin_logged_in");
    toast.success("Çıxış edildi");
  };

  const genericAddWithImage = async (e: React.FormEvent<HTMLFormElement>, addAction: Function) => {
    e.preventDefault();
    const loadingToast = toast.loading("Əlavə edilir, zəhmət olmasa gözləyin...");
    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get("title") as string;
      const content = formData.get("content") as string;
      const file = (e.currentTarget.elements.namedItem("image") as HTMLInputElement)?.files?.[0];
      
      let img_url = "";
      if (file && file.size > 0) {
        const url = await uploadToImgbb(file);
        if (url) img_url = url;
      }
      
      const res = await addAction(title, content, img_url);
      if(res && res.success === false) throw new Error(res.error || "Xəta");
      
      toast.success("Uğurla əlavə edildi!", { id: loadingToast });
      (e.target as HTMLFormElement).reset();
      loadData();
    } catch (err) {
      toast.error("Əlavə edilərkən xəta baş verdi.", { id: loadingToast });
    }
  };

  

  const toggleMenu = async (menuKey: string, isActive: boolean) => {
    const newValue = isActive ? "false" : "true";
    setSettings(prev => ({ ...prev, [menuKey]: newValue }));
    await updateSetting(menuKey, newValue);
    toast.success("Menyu statusu dəyişdirildi!");
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark-bg text-white relative px-6">
        <Toaster position="top-center" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-dark-bg-card p-10 rounded-[2rem] shadow-2xl border border-white/10 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-8 text-center">İdarəetmə Paneli</h1>
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <input type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent" placeholder="info@hsetms.com" />
            <input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent" placeholder="••••••••" />
            {error && <span className="text-red-400 text-xs">{error}</span>}
            <button type="submit" className="w-full bg-accent text-dark-bg font-bold py-3 rounded-xl mt-4">Daxil Ol</button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-background text-foreground">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <button className="md:hidden fixed top-6 left-6 z-50 p-2 bg-dark-bg text-white rounded-xl shadow-lg" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}><LayoutDashboard className="w-6 h-6" /></button>
   <div className={`w-64 bg-dark-bg text-white flex flex-col fixed inset-y-0 left-0 z-40 border-r border-white/10 transition-transform duration-300 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"><Image src="/Logo.png" alt="Logo" width={40} height={40} /></div>
          <div><span className="font-bold text-sm">TM&S</span><span className="text-[10px] text-accent block uppercase">Admin Panel</span></div>
        </div>
        <div className="flex flex-col p-4 gap-2 mt-4 pb-20">
          {[
            {id:'dashboard', icon: LayoutDashboard, title: 'İcmal'},
            {id:'vacancies', icon: Briefcase, title: 'Vakansiyalar'},
            {id:'cvs', icon: FileBadge, title: 'CV-lər'},
            {id:'news', icon: Newspaper, title: 'Xəbərlər'},
            {id:'legislation', icon: BookOpen, title: 'Qanunvericilik'},
            {id:'templates', icon: FileText, title: 'Şablonlar'},
                        {id:'internships', icon: Presentation, title: 'Təcrübə Proqramı'},
            {id:'services_media', icon: Video, title: 'Xidmət (PDF/Video)'},
            {id:'social', icon: Phone, title: 'Əlaqə və Tənzimləmələr'},
            {id:'account', icon: Settings, title: 'Hesab Tənzimləmələri'},
            {id:'menus', icon: LayoutDashboard, title: 'Menyular'},
            {id:'home_images', icon: ImageIcon, title: 'Ana Səhifə Şəkilləri'}
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-accent text-dark-bg' : 'hover:bg-white/5 text-text-muted hover:text-white'}`}>
              <item.icon className="w-4 h-4" /> {item.title}
            </button>
          ))}
        </div>
        <div className="mt-auto p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-white/5 w-full"><LogOut className="w-4 h-4" /> Çıxış Et</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:ml-64 p-4 md:p-10 min-h-screen mt-16 md:mt-0 overflow-x-hidden">
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

        {loading ? <p className="text-dark-bg font-bold">Yüklənir...</p> : (
          <div className="flex flex-col gap-6 w-full">
            
            {activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Vakansiyalar</span><span className="text-4xl font-black text-dark-bg">{vacancies?.length || 0}</span></div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">CV-lər</span><span className="text-4xl font-black text-dark-bg">{cvs?.length || 0}</span></div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Xəbərlər</span><span className="text-4xl font-black text-dark-bg">{news?.length || 0}</span></div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Qanunvericilik</span><span className="text-4xl font-black text-dark-bg">{legislation?.length || 0}</span></div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-accent/20 bg-accent/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Aylıq Ziyarət</span><span className="text-4xl font-black text-dark-bg">{monthlyVisits || 0}</span></div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-6">Aylıq CV və Vakansiya Statistikası</h3>
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <input type="month" className="border px-4 py-2 rounded-lg" onChange={(e) => {
                      const val = e.target.value; 
                      if(!val) return;
                      const [y, m] = val.split('-');
                      const filteredCvs = (cvs||[]).filter(c => c.created_at && c.created_at.startsWith(`${y}-${m}`));
                      const filteredVacs = (vacancies||[]).filter(v => v.created_at && v.created_at.startsWith(`${y}-${m}`));
                      setSelectedStats({ y, m, cvs: filteredCvs.length, vacs: filteredVacs.length });
                    }} />
                    <p className="text-sm text-text-muted my-auto">Təqvimlə istədiyiniz ayı seçib o ay ərzində neçə CV və Vakansiya gəldiyini görə bilərsiniz.</p>
                  </div>
                  {selectedStats && (
                    <div className="mt-6 p-6 bg-accent/10 border border-accent/20 rounded-xl flex gap-8">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-500 uppercase">Seçilmiş Ay</span>
                            <span className="text-lg font-bold text-dark-bg">{selectedStats.y} / {selectedStats.m}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-500 uppercase">Əlavə olunan CV</span>
                            <span className="text-xl font-bold text-dark-bg">{selectedStats.cvs}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-500 uppercase">Əlavə olunan Vakansiya</span>
                            <span className="text-xl font-bold text-dark-bg">{selectedStats.vacs}</span>
                        </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {(activeTab === 'news' || activeTab === 'legislation' || activeTab === 'internships') && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-4 flex items-center gap-2"><PlusCircle className="w-5 h-5 text-accent"/> Yeni Əlavə Et</h3>
                  <form onSubmit={(e) => genericAddWithImage(e, activeTab === 'news' ? addNews : activeTab === 'legislation' ? addLegislation : addInternship)} className="flex flex-col gap-4 max-w-xl">
                    <input type="text" name="title" required placeholder="Başlıq" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    <textarea name="content" required placeholder="Məzmun..." rows={6} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent resize-none"></textarea>
                    
                    {activeTab !== 'legislation' && (
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-dark-bg">Şəkil Seçin</label>
                        <input type="file" name="image" accept="image/*" className="text-sm" />
                      </div>
                    )}

                    <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold w-fit mt-2 hover:bg-accent-hover transition-colors">Dərc Et</button>
                  </form>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-dark-bg mb-4">Mövcud Paylaşım</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(activeTab === 'news' ? news : activeTab === 'legislation' ? legislation : internships)?.map(item => (
                      <div key={item.id} className="bg-white p-4 rounded-xl border border-dark-bg/10 flex gap-4 items-start">
                        {(activeTab !== 'legislation') && (
                          item.image_url ? <img src={item.image_url} alt="" className="w-20 h-20 object-cover rounded-lg shrink-0" /> : <div className="w-20 h-20 bg-background rounded-lg shrink-0 flex items-center justify-center text-xs text-center p-2 text-foreground/50">Şəkil yoxdur</div>
                        )}
                        <div className="flex flex-col">
                          <h4 className="font-bold text-dark-bg line-clamp-2 leading-tight">{item.title}</h4>
                          <span className="text-[10px] text-foreground/50 mt-1">{item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}</span>
                          <div className="flex gap-4 mt-2">
                            <button onClick={() => { setEditingItem(item); setEditTitle(item.title); setEditContent(item.content); setEditTab(activeTab); }} className="text-blue-500 text-xs font-bold hover:underline text-left">Düzəliş Et</button>
                            <button onClick={async () => { 
                              if(confirm("Silmək istədiyinizə əminsiniz?")) { 
                                const loadingToast = toast.loading("Silinir...");
                                if(activeTab === 'news') await deleteNews(item.id); 
                                if(activeTab === 'legislation') await deleteLegislation(item.id);
                                if(activeTab === 'internships') await deleteInternship(item.id);
                                toast.success("Silindi", { id: loadingToast });
                                loadData(); 
                              } 
                            }} className="text-red-500 text-xs font-bold text-left hover:underline">Sil</button>
                          </div>
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
                    <form onSubmit={async(e)=>{
                      e.preventDefault(); 
                      const fd=new FormData(e.currentTarget); 
                      const t = toast.loading("PDF Sistemə Yüklənir...");
                      const res = await addServicePdfWithFile(fd); 
                      if (res.success) {
                        toast.success('Əlavə edildi', { id: t }); 
                        (e.target as any).reset(); 
                        loadData();
                      } else {
                        toast.error(res.error || "Xəta baş verdi", { id: t });
                      }
                    }} className="flex flex-col gap-4">
                      <h4 className="text-sm font-bold text-dark-bg border-b pb-2">PDF Yüklə</h4>
                      <select name="service_id" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent">
                        <option value="emeyin-muhafizesi">Əməyin mühafizəsi</option>
                        <option value="risklerin-qiymetlendirilmesi">Risklərin qiymətləndirilməsi</option>
                        <option value="setem-telimleri">SƏTƏM təlimləri</option>
                        <option value="audit-ve-monitorinq">Audit və monitorinq</option>
                        <option value="etraf-muhitin-muhafizesi">Ətraf mühitin mühafizəsi</option>
                        <option value="setem-senedlesmesi">SƏTƏM sənədləşməsi</option>
                        <option value="texniki-tehlukesizlik">Texniki təhlükəsizlik</option>
                      </select>
                      <input type="text" name="title" required placeholder="PDF Adı (məs: Təlimat)" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                      <input type="file" name="pdf_file" accept=".pdf,.doc,.docx" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                      <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold mt-2">Yüklə və Yadda Saxla</button>
                    </form>

                    {/* Add Video */}
                    <form onSubmit={async(e)=>{
                      e.preventDefault(); 
                      const fd=new FormData(e.currentTarget); 
                      const t = toast.loading("Əlavə edilir...");
                      await addServiceVideo(fd.get('service_id') as string, fd.get('title') as string, fd.get('youtube_link') as string); 
                      toast.success('Əlavə edildi', { id: t }); 
                      (e.target as any).reset(); 
                      loadData();
                    }} className="flex flex-col gap-4">
                      <h4 className="text-sm font-bold text-dark-bg border-b pb-2">Video (YouTube) Əlavə Et</h4>
                      <select name="service_id" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent">
                        <option value="emeyin-muhafizesi">Əməyin mühafizəsi</option>
                        <option value="risklerin-qiymetlendirilmesi">Risklərin qiymətləndirilməsi</option>
                        <option value="setem-telimleri">SƏTƏM təlimləri</option>
                        <option value="audit-ve-monitorinq">Audit və monitorinq</option>
                        <option value="etraf-muhitin-muhafizesi">Ətraf mühitin mühafizəsi</option>
                        <option value="setem-senedlesmesi">SƏTƏM sənədləşməsi</option>
                        <option value="texniki-tehlukesizlik">Texniki təhlükəsizlik</option>
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
                       {servicePdfs?.map(p => (
                         <div key={p.id} className="bg-white p-3 border rounded-lg text-sm flex justify-between">
                           <div><span className="font-bold">{p.title}</span> <span className="text-xs text-foreground/50">({p.service_id})</span></div>
                           <button onClick={async()=>{
                             if(confirm("Silin?")){
                               const t = toast.loading("Silinir...");
                               await deleteServicePdf(p.id); 
                               toast.success("Silindi", { id: t });
                               loadData();
                             }
                           }} className="text-red-500 hover:underline">Sil</button>
                         </div>
                       ))}
                     </div>
                   </div>
                   <div>
                     <h3 className="font-bold text-sm mb-2">Mövcud Videolar</h3>
                     <div className="flex flex-col gap-2">
                       {serviceVideos?.map(v => (
                         <div key={v.id} className="bg-white p-3 border rounded-lg text-sm flex justify-between">
                           <div><span className="font-bold">{v.title}</span> <span className="text-xs text-foreground/50">({v.service_id})</span></div>
                           <button onClick={async()=>{
                             if(confirm("Silin?")){
                               const t = toast.loading("Silinir...");
                               await deleteServiceVideo(v.id); 
                               toast.success("Silindi", { id: t });
                               loadData();
                             }
                           }} className="text-red-500 hover:underline">Sil</button>
                         </div>
                       ))}
                     </div>
                   </div>
                </div>

              </motion.div>
            )}
            
            {activeTab === 'vacancies' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                <h3 className="font-bold text-lg text-dark-bg">Vakansiyalar</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-dark-bg/5 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-dark-bg/5 text-dark-bg font-bold uppercase text-xs">
                      <tr><th className="p-4">Şirkət</th><th className="p-4">Vəzifə</th><th className="p-4 text-right">Əməliyyat</th></tr>
                    </thead>
                    <tbody>
                      {vacancies?.map(v => (
                        <tr key={v.id} className="border-b border-dark-bg/5">
                          <td className="p-4">{v.company}</td><td className="p-4">{v.role}</td>
                          <td className="p-4 text-right">
                            <button onClick={async () => { 
                              if(confirm("Silmək istədiyinizə əminsiniz?")) { 
                                const t = toast.loading("Silinir...");
                                await deleteVacancy(v.id); 
                                toast.success("Silindi", { id: t });
                                loadData(); 
                              } 
                            }} className="text-red-500 hover:text-red-700">Sil</button>
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
                      {cvs?.map(c => (
                        <tr key={c.id} className="border-b border-dark-bg/5">
                          <td className="p-4 font-bold">{c.first_name} {c.last_name}</td>
                          <td className="p-4">{c.skills?.substring(0,30)}...</td>
                          <td className="p-4 text-right">
                            <button onClick={async () => { 
                              if(confirm("Silmək istədiyinizə əminsiniz?")) { 
                                const t = toast.loading("Silinir...");
                                await deleteCv(c.id); 
                                toast.success("Silindi", { id: t });
                                loadData(); 
                              } 
                            }} className="text-red-500 hover:text-red-700">Sil</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
            
            
            {activeTab === 'account' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5 max-w-xl">
                <h3 className="font-bold text-lg text-dark-bg mb-6">Giriş Məlumatlarını Yenilə</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const newEmail = fd.get("new_email");
                  const newPass = fd.get("new_password");
                  if(newEmail && newPass) {
                    const t = toast.loading("Yenilənir...");
                    const success = await updateAdminCredentials(newEmail.toString(), newPass.toString());
                    if(success) {
                        toast.success("Giriş məlumatları dəyişdirildi!", { id: t });
                        (e.target).reset();
                    }
                    else toast.error("Xəta baş verdi", { id: t });
                  }
                }} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-dark-bg">Yeni E-poçt (Login üçün)</label>
                    <input type="email" name="new_email" required placeholder="yeni_mail@example.com" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-3 text-sm focus:border-accent" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-dark-bg">Yeni Şifrə</label>
                    <input type="password" name="new_password" required placeholder="••••••••" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-3 text-sm focus:border-accent" />
                  </div>
                  <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-xs leading-relaxed">
                    <strong>Diqqət:</strong> Məlumatları yenilədikdən sonra növbəti girişdə mütləq yeni yazdığınız e-poçt və şifrədən istifadə etməlisiniz. Şifrənizi yaddan çıxarmamağınız tövsiyə olunur.
                  </div>
                  <button type="submit" className="bg-red-600 text-white px-8 py-3 rounded-xl text-sm font-bold w-fit hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">Yenilə</button>
                </form>
              </motion.div>
            )}

{activeTab === 'social' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5 max-w-xl">
                <h3 className="font-bold text-lg text-dark-bg mb-6">Əlaqə və Sosial Media</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const loadingToast = toast.loading("Yadda saxlanılır...");
                  await updateSetting("facebook_url", formData.get("facebook") as string);
                  await updateSetting("instagram_url", formData.get("instagram") as string);
                  await updateSetting("linkedin_url", formData.get("linkedin") as string);
                  await updateSetting("contact_email", formData.get("email") as string);
                  await updateSetting("contact_phone", formData.get("phone") as string);
                  toast.success("Yadda saxlanıldı", { id: loadingToast });
                  loadData();
                }} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-dark-bg">Əlaqə E-poçtu (Email)</label>
                    <input type="email" name="email" defaultValue={settings?.contact_email || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" placeholder="info@hsetms.com" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-dark-bg">Əlaqə Nömrəsi (Telefon)</label>
                    <input type="text" name="phone" defaultValue={settings?.contact_phone || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" placeholder="+994 50 123 45 67" />
                  </div>
                  <div className="flex flex-col gap-1 mt-4">
                    <label className="text-xs font-bold text-dark-bg">Facebook Linki</label>
                    <input type="text" name="facebook" defaultValue={settings?.facebook_url || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-dark-bg">Instagram Linki</label>
                    <input type="text" name="instagram" defaultValue={settings?.instagram_url || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-dark-bg">LinkedIn Linki</label>
                    <input type="text" name="linkedin" defaultValue={settings?.linkedin_url || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                  </div>
                  <button type="submit" className="bg-dark-bg text-white px-6 py-3 rounded-lg text-sm font-bold w-fit mt-4 hover:bg-accent-hover transition-colors">Yadda Saxla</button>
                </form>
              </motion.div>
            )}

            {activeTab === 'menus' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5 max-w-xl">
                <h3 className="font-bold text-lg text-dark-bg mb-6">Menyuların İdarə Edilməsi (Aktiv/Deaktiv)</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { key: "menu_xidmetler", label: "Xidmətlər" },
                    { key: "menu_tecrube", label: "Təcrübə Proqramı" },
                    { key: "menu_qanunvericilik", label: "Qanunvericilik" },
                    { key: "menu_xeberler", label: "Xəbərlər" },
                    { key: "menu_vakansiyalar", label: "Vakansiyalar" },
                    { key: "menu_sablonlar", label: "Şablonlar" },
                    { key: "menu_cv", label: "CV Yüklə" },
                  ].map(menu => {
                    const isActive = settings?.[menu.key] !== "false";
                    return (
                      <div key={menu.key} className="flex items-center justify-between p-4 border rounded-xl">
                        <span className="font-bold text-sm text-dark-bg">{menu.label}</span>
                        <button 
                          onClick={() => toggleMenu(menu.key, isActive)}
                          className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${isActive ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                        >
                          {isActive ? "Gizlət" : "Göstər"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}


            {activeTab === 'home_images' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5 max-w-xl">
                <h3 className="font-bold text-lg text-dark-bg mb-6">Ana Səhifə Şəkilləri</h3>
                
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const loadingToast = toast.loading("Yüklənir...");
                  const file = (e.currentTarget.elements.namedItem("image_1") as HTMLInputElement)?.files?.[0];
                  if (file && file.size > 0) {
                    const url = await uploadToImgbb(file);
                    if (url) await updateSetting("home_image_1", url);
                  }
                  toast.success("Yadda saxlanıldı", { id: loadingToast });
                  loadData();
                }} className="flex flex-col gap-4 mb-8 border-b pb-8">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-dark-bg">1. "SƏTƏM üzrə peşəkar yanaşma" Şəkli</label>
                    {settings?.home_image_1 && (
                      <div className="flex items-end gap-4 mb-2">
                        <img src={settings.home_image_1} className="w-32 h-32 object-cover rounded-xl border" />
                        <button type="button" onClick={async () => {
                          if (confirm("Şəkli silmək istəyirsiniz?")) {
                            const loadingToast = toast.loading("Silinir...");
                            await updateSetting("home_image_1", "");
                            toast.success("Silindi", { id: loadingToast });
                            loadData();
                          }
                        }} className="text-red-500 text-sm font-bold hover:underline mb-2">Sil</button>
                      </div>
                    )}
                    <input type="file" name="image_1" accept="image/*" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm" />
                  </div>
                  <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold w-fit hover:bg-accent-hover transition-colors">Yenilə</button>
                </form>

                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const loadingToast = toast.loading("Yüklənir...");
                  const file = (e.currentTarget.elements.namedItem("image_2") as HTMLInputElement)?.files?.[0];
                  if (file && file.size > 0) {
                    const url = await uploadToImgbb(file);
                    if (url) await updateSetting("home_image_2", url);
                  }
                  toast.success("Yadda saxlanıldı", { id: loadingToast });
                  loadData();
                }} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-dark-bg">2. "TM&S" (Haqqımızda) Şəkli</label>
                    {settings?.home_image_2 && (
                      <div className="flex items-end gap-4 mb-2">
                        <img src={settings.home_image_2} className="w-32 h-32 object-cover rounded-xl border" />
                        <button type="button" onClick={async () => {
                          if (confirm("Şəkli silmək istəyirsiniz?")) {
                            const loadingToast = toast.loading("Silinir...");
                            await updateSetting("home_image_2", "");
                            toast.success("Silindi", { id: loadingToast });
                            loadData();
                          }
                        }} className="text-red-500 text-sm font-bold hover:underline mb-2">Sil</button>
                      </div>
                    )}
                    <input type="file" name="image_2" accept="image/*" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm" />
                  </div>
                  <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold w-fit hover:bg-accent-hover transition-colors">Yenilə</button>
                </form>

                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const loadingToast = toast.loading("Yüklənir...");
                  const file = (e.currentTarget.elements.namedItem("image_3") as HTMLInputElement)?.files?.[0];
                  if (file && file.size > 0) {
                    const url = await uploadToImgbb(file);
                    if (url) await updateSetting("about_image", url);
                  }
                  toast.success("Yadda saxlanıldı", { id: loadingToast });
                  loadData();
                }} className="flex flex-col gap-4 mt-8 pt-8 border-t">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-dark-bg">3. Haqqımızda Səhifəsi Şəkli</label>
                    {settings?.about_image && (
                      <div className="flex items-end gap-4 mb-2">
                        <img src={settings.about_image} className="w-32 h-32 object-cover rounded-xl border" />
                        <button type="button" onClick={async () => {
                          if (confirm("Şəkli silmək istəyirsiniz?")) {
                            const loadingToast = toast.loading("Silinir...");
                            await updateSetting("about_image", "");
                            toast.success("Silindi", { id: loadingToast });
                            loadData();
                          }
                        }} className="text-red-500 text-sm font-bold hover:underline mb-2">Sil</button>
                      </div>
                    )}
                    <input type="file" name="image_3" accept="image/*" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm" />
                  </div>
                  <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold w-fit hover:bg-accent-hover transition-colors">Yenilə</button>
                </form>
              </motion.div>
            )}

            {activeTab === 'templates' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-6 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-accent"/> {editingItem && activeTab === 'templates' ? 'Şablonu Redaktə Et' : 'Yeni Şablon Əlavə Et'}
                  </h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    const t = toast.loading("Saxlanılır...");
                    const fd = new FormData(e.currentTarget);
                    
                    const imgFile = fd.get('image_file') as File;
                    let image_url = editingItem?.image_url || "";
                    if(imgFile && imgFile.size > 0) {
                      image_url = await uploadToImgbb(imgFile) || "";
                    }

                    const docFile = fd.get('file') as File;
                    let doc_url = editingItem?.file_url || "";
                    if(docFile && docFile.size > 0) {
                        doc_url = await uploadToImgbb(docFile) || "";
                    }
                    
                    const { addTemplateDirect, updateTemplateDirect } = await import("@/app/actions");
                    let res;
                    if(editingItem && activeTab === 'templates') {
                        res = await updateTemplateDirect(editingItem.id, fd.get('title') as string, doc_url, image_url);
                    } else {
                        res = await addTemplateDirect(fd.get('title') as string, doc_url, image_url);
                    }
                    
                    if (res.success) {
                      toast.success("Saxlanıldı!", { id: t });
                      if(editingItem) setEditingItem(null);
                      (e.target as any).reset();
                      loadData();
                    } else {
                      toast.error(res.error || "Xəta baş verdi", { id: t });
                    }
                    setIsSubmitting(false);
                  }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="text-xs font-bold text-dark-bg">Şablonun Adı *</label>
                      <input type="text" name="title" defaultValue={editingItem?.title || ""} required className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" placeholder="Məs: Risk Qiymətləndirmə Forması" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Şəkil Yüklə (Mövcudu dəyişmək/yükləmək üçün)</label>
                      <input type="file" name="image_file" accept="image/*" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Sənəd Faylı (Mövcudu dəyişmək/yükləmək üçün)</label>
                      <input type="file" name="file" accept=".pdf,.doc,.docx" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    </div>
                    <div className="md:col-span-2 flex gap-4 mt-2">
                      <button disabled={isSubmitting} type="submit" className="bg-dark-bg text-white px-8 py-3 rounded-xl text-sm font-bold w-fit hover:bg-accent-hover transition-colors disabled:opacity-50">
                        {isSubmitting ? 'Saxlanılır...' : 'Saxla'}
                      </button>
                      {editingItem && activeTab === 'templates' && (
                        <button type="button" onClick={() => setEditingItem(null)} className="bg-gray-100 text-dark-bg px-8 py-3 rounded-xl text-sm font-bold w-fit hover:bg-gray-200 transition-colors">
                            Ləğv Et
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-6">Mövcud Şablonlar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.length === 0 ? <p className="text-sm text-gray-500">Heç bir şablon yoxdur.</p> : templates.map(t => (
                      <div key={t.id} className="border border-dark-bg/10 rounded-xl p-4 flex flex-col gap-4 relative overflow-hidden group">
                        {t.image_url ? (
                          <div className="w-full h-32 relative rounded-lg overflow-hidden border border-dark-bg/5">
                            <img src={t.image_url} alt={t.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded-lg border border-dark-bg/5">
                            <FileText className="w-10 h-10 text-gray-300" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-dark-bg text-sm line-clamp-2">{t.title}</h4>
                          <a href={t.file_url} target="_blank" rel="noreferrer" className="text-accent text-xs font-bold hover:underline mt-2 inline-block">Sənədə Bax</a>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditingItem(t); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            <button onClick={async () => {
                              if(confirm("Silmək istədiyinizə əminsiniz?")) {
                                const tst = toast.loading("Silinir...");
                                await deleteTemplate(t.id);
                                toast.success("Silindi", {id: tst});
                                loadData();
                              }
                            }} className="bg-red-500 text-white p-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}


            

          </div>
        )}
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 flex flex-col gap-4 relative">
            <h3 className="font-bold text-xl text-dark-bg">Düzəliş Et</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input type="text" required value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-3 text-sm focus:border-accent" />
              <textarea required value={editContent} onChange={e => setEditContent(e.target.value)} rows={10} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-3 text-sm focus:border-accent resize-none"></textarea>
              <div className="flex gap-4 mt-2">
                <button type="submit" className="bg-accent-hover text-white px-6 py-2 rounded-lg font-bold">Yadda Saxla</button>
                <button type="button" onClick={() => setEditingItem(null)} className="bg-gray-200 text-dark-bg px-6 py-2 rounded-lg font-bold">Ləğv Et</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
