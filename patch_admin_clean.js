const fs = require('fs');
let code = fs.readFileSync('src/app/adminpanel/page.tsx', 'utf8');

// 1. Mobile Sidebar toggle
code = code.replace('const [isLoggedIn', 'const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);\n  const [isLoggedIn');
code = code.replace(
  '<div className="w-64 bg-dark-bg text-white flex flex-col fixed inset-y-0 left-0 z-20 border-r border-white/10">',
  `<button className="md:hidden fixed top-6 left-6 z-50 p-2 bg-dark-bg text-white rounded-xl shadow-lg" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}><LayoutDashboard className="w-6 h-6" /></button>
   <div className={\`w-64 bg-dark-bg text-white flex flex-col fixed inset-y-0 left-0 z-40 border-r border-white/10 transition-transform duration-300 \${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}\`}>`
);
code = code.replace(
  '<div className="ml-64 w-full p-10 h-screen">',
  '<div className="w-full md:ml-64 p-4 md:p-10 min-h-screen mt-16 md:mt-0 overflow-x-hidden">'
);

// 2. Editing State
code = code.replace(
  'const [loading, setLoading] = useState(false);',
  'const [loading, setLoading] = useState(false);\n  const [editingItem, setEditingItem] = useState<any>(null);'
);

// 3. Stats (Dashboard)
const dashboardOld = `{activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Vakansiyalar</span><span className="text-4xl font-black text-dark-bg">{vacancies?.length || 0}</span></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">CV-lər</span><span className="text-4xl font-black text-dark-bg">{cvs?.length || 0}</span></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Xəbərlər</span><span className="text-4xl font-black text-dark-bg">{news?.length || 0}</span></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Qanunvericilik</span><span className="text-4xl font-black text-dark-bg">{legislation?.length || 0}</span></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-accent/20 bg-accent/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Aylıq Ziyarət</span><span className="text-4xl font-black text-dark-bg">{monthlyVisits || 0}</span></div>
              </motion.div>
            )}`;

const dashboardNew = `{activeTab === 'dashboard' && (
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
                      const filteredCvs = (cvs||[]).filter(c => c.created_at && c.created_at.startsWith(\`\${y}-\${m}\`));
                      const filteredVacs = (vacancies||[]).filter(v => v.created_at && v.created_at.startsWith(\`\${y}-\${m}\`));
                      alert(\`\${y}-\${m} ayı üzrə:\\n\\nƏlavə edilən CV sayı: \${filteredCvs.length}\\nƏlavə edilən Vakansiya sayı: \${filteredVacs.length}\`);
                    }} />
                    <p className="text-sm text-text-muted my-auto">Təqvimlə istədiyiniz ayı seçib o ay ərzində neçə CV və Vakansiya gəldiyini görə bilərsiniz.</p>
                  </div>
                </div>
              </motion.div>
            )}`;
code = code.replace(dashboardOld, dashboardNew);

// 4. Vacancies tab
const vacOld = `{activeTab === 'vacancies' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-dark-bg/5 text-dark-bg">
                      <tr><th className="p-4">Ad</th><th className="p-4 text-right">Əməliyyat</th></tr>
                    </thead>
                    <tbody>
                      {vacancies?.map(v => (
                        <tr key={v.id} className="border-b border-dark-bg/5">
                          <td className="p-4 font-bold">{v.title}</td>
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
            )}`;

const vacNew = `{activeTab === 'vacancies' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-4 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-accent"/> {editingItem ? 'Vakansiyanı Redaktə Et' : 'Yeni Vakansiya Əlavə Et'}
                  </h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    const t = toast.loading("Saxlanılır...");
                    const fd = new FormData(e.currentTarget);
                    const { addVacancy, updateVacancy } = await import("@/app/actions");
                    
                    let res;
                    if(editingItem) res = await updateVacancy(editingItem.id, fd);
                    else res = await addVacancy(fd);
                    
                    if(res.success) {
                        toast.success("Saxlanıldı!", { id: t });
                        setEditingItem(null);
                        (e.target as any).reset();
                        loadData();
                    } else toast.error(res.error || "Xəta baş verdi", { id: t });
                    setIsSubmitting(false);
                  }} className="flex flex-col gap-4 max-w-xl">
                    <input type="text" name="title" defaultValue={editingItem?.title || ""} required placeholder="Vakansiya Adı" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    <textarea name="content" defaultValue={editingItem?.content || ""} required placeholder="Tələblər və İş barədə məlumat..." rows={5} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent resize-none"></textarea>
                    <div className="flex gap-4">
                      <button type="submit" disabled={isSubmitting} className="bg-dark-bg text-white px-6 py-2.5 rounded-lg text-sm font-bold w-fit hover:bg-accent-hover transition-colors disabled:opacity-50">
                        {isSubmitting ? "Saxlanılır..." : "Saxla"}
                      </button>
                      {editingItem && (
                        <button type="button" onClick={() => setEditingItem(null)} className="bg-gray-100 text-dark-bg px-6 py-2.5 rounded-lg text-sm font-bold w-fit hover:bg-gray-200 transition-colors">Ləğv Et</button>
                      )}
                    </div>
                  </form>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5 overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[600px]">
                    <thead className="bg-dark-bg/5 text-dark-bg">
                      <tr><th className="p-4">Ad</th><th className="p-4">Məzmun</th><th className="p-4 text-right">Əməliyyat</th></tr>
                    </thead>
                    <tbody>
                      {vacancies?.map(v => (
                        <tr key={v.id} className="border-b border-dark-bg/5">
                          <td className="p-4 font-bold">{v.title}</td>
                          <td className="p-4">{v.content?.substring(0,50)}...</td>
                          <td className="p-4 text-right flex justify-end gap-3">
                            <button onClick={() => setEditingItem(v)} className="text-blue-500 hover:text-blue-700 font-bold">Redaktə</button>
                            <button onClick={async () => { 
                              if(confirm("Silmək istədiyinizə əminsiniz?")) { 
                                const { deleteVacancy } = await import("@/app/actions");
                                const t = toast.loading("Silinir...");
                                await deleteVacancy(v.id); 
                                toast.success("Silindi", { id: t });
                                loadData(); 
                              } 
                            }} className="text-red-500 hover:text-red-700 font-bold">Sil</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}`;
code = code.replace(vacOld, vacNew);

// 5. CVs tab
const cvOld = `{activeTab === 'cvs' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-dark-bg/5 text-dark-bg">
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
            )}`;

const cvNew = `{activeTab === 'cvs' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-4 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-accent"/> {editingItem ? 'CV Redaktə Et' : 'Yeni CV Əlavə Et'}
                  </h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    const t = toast.loading("Saxlanılır...");
                    const fd = new FormData(e.currentTarget);
                    
                    const cvFile = fd.get('cv_file') as File;
                    if(cvFile && cvFile.size > 0) {
                        const fileUrl = await uploadToImgbb(cvFile);
                        if(fileUrl) fd.append("cv_drive_link", fileUrl);
                    } else if (editingItem && editingItem.cv_drive_link) {
                        fd.append("cv_drive_link", editingItem.cv_drive_link);
                    }

                    const { addCvAdmin, updateCv } = await import("@/app/actions");
                    let res;
                    if(editingItem) res = await updateCv(editingItem.id, fd);
                    else res = await addCvAdmin(fd);
                    
                    if(res.success) {
                        toast.success("Saxlanıldı!", { id: t });
                        setEditingItem(null);
                        (e.target as any).reset();
                        loadData();
                    } else toast.error(res.error || "Xəta baş verdi", { id: t });
                    setIsSubmitting(false);
                  }} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                    <input type="text" name="first_name" defaultValue={editingItem?.first_name || ""} required placeholder="Ad" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    <input type="text" name="last_name" defaultValue={editingItem?.last_name || ""} required placeholder="Soyad" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    <input type="email" name="email" defaultValue={editingItem?.email || ""} required placeholder="E-poçt" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    <input type="text" name="phone" defaultValue={editingItem?.phone || ""} required placeholder="Telefon" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    <textarea name="skills" defaultValue={editingItem?.skills || ""} required placeholder="İxtisas / Təcrübə" className="w-full md:col-span-2 bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent resize-none"></textarea>
                    
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="text-xs font-bold text-dark-bg">CV Faylı (Mövcudu dəyişmək/yükləmək üçün)</label>
                      <input type="file" name="cv_file" accept=".pdf,.doc,.docx" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    </div>

                    <div className="flex gap-4 md:col-span-2">
                      <button type="submit" disabled={isSubmitting} className="bg-dark-bg text-white px-6 py-2.5 rounded-lg text-sm font-bold w-fit hover:bg-accent-hover transition-colors disabled:opacity-50">
                        {isSubmitting ? "Saxlanılır..." : "Saxla"}
                      </button>
                      {editingItem && (
                        <button type="button" onClick={() => setEditingItem(null)} className="bg-gray-100 text-dark-bg px-6 py-2.5 rounded-lg text-sm font-bold w-fit hover:bg-gray-200 transition-colors">Ləğv Et</button>
                      )}
                    </div>
                  </form>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5 overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[600px]">
                    <thead className="bg-dark-bg/5 text-dark-bg">
                      <tr><th className="p-4">Ad Soyad</th><th className="p-4">İxtisas</th><th className="p-4">CV</th><th className="p-4 text-right">Əməliyyat</th></tr>
                    </thead>
                    <tbody>
                      {cvs?.map(c => (
                        <tr key={c.id} className="border-b border-dark-bg/5">
                          <td className="p-4 font-bold">{c.first_name} {c.last_name}</td>
                          <td className="p-4">{c.skills?.substring(0,30)}...</td>
                          <td className="p-4">
                            {c.cv_drive_link && <a href={c.cv_drive_link} target="_blank" className="text-blue-500 hover:underline">Bax</a>}
                          </td>
                          <td className="p-4 text-right flex justify-end gap-3">
                            <button onClick={() => setEditingItem(c)} className="text-blue-500 hover:text-blue-700 font-bold">Redaktə</button>
                            <button onClick={async () => { 
                              if(confirm("Silmək istədiyinizə əminsiniz?")) { 
                                const { deleteCv } = await import("@/app/actions");
                                const t = toast.loading("Silinir...");
                                await deleteCv(c.id); 
                                toast.success("Silindi", { id: t });
                                loadData(); 
                              } 
                            }} className="text-red-500 hover:text-red-700 font-bold">Sil</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}`;
code = code.replace(cvOld, cvNew);

// 6. Template Upload logic
const templateUploadOld = `const res = await addTemplateWithFile(fd);
                    if (res.success) {`;
const templateUploadNew = `const docFile = fd.get('file') as File;
                    let doc_url = "";
                    if(docFile && docFile.size > 0) doc_url = await uploadToImgbb(docFile) || "";
                    if(!doc_url) { toast.error("Fayl yüklənə bilmədi", { id: t }); setIsSubmitting(false); return; }
                    
                    const { addTemplateDirect } = await import("@/app/actions");
                    const res = await addTemplateDirect(fd.get('title') as string, doc_url, image_url);
                    if (res.success) {`;
code = code.replace(templateUploadOld, templateUploadNew);

// 7. Home Images White Background
const homeImgOld = `{activeTab === 'home_images' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">`;
const homeImgNew = `{activeTab === 'home_images' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8 bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5 min-h-[60vh]">
                <div className="w-full">`;
code = code.replace(homeImgOld, homeImgNew);

fs.writeFileSync('src/app/adminpanel/page.tsx', code);
