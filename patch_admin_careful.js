const fs = require('fs');
let code = fs.readFileSync('src/app/adminpanel/page.tsx', 'utf8');

// 1. Mobile Sidebar Fix (Task 5)
// Add mobileSidebarOpen state
if (!code.includes('mobileSidebarOpen')) {
    code = code.replace('const [isLoggedIn', 'const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);\n  const [isLoggedIn');
}

// Sidebar replacement
const sidebarOld = `<div className="w-64 bg-dark-bg text-white flex flex-col fixed inset-y-0 left-0 z-20 border-r border-white/10">`;
const sidebarNew = `
      <button 
        className="md:hidden fixed top-6 left-6 z-50 p-2 bg-dark-bg text-white rounded-xl shadow-lg"
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      >
        <LayoutDashboard className="w-6 h-6" />
      </button>
      
      <div className={\`w-64 bg-dark-bg text-white flex flex-col fixed inset-y-0 left-0 z-40 border-r border-white/10 transition-transform duration-300 \${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}\`}>`;
code = code.replace(sidebarOld, sidebarNew);

// Main content margin
const mainContentOld = `<div className="ml-64 w-full p-10 h-screen">`;
const mainContentNew = `<div className="w-full md:ml-64 p-4 md:p-10 min-h-screen mt-16 md:mt-0 overflow-x-hidden">`;
code = code.replace(mainContentOld, mainContentNew);

// 2. Editing Items State
if (!code.includes('editingItem')) {
    code = code.replace('const [loading, setLoading] = useState(false);', 'const [loading, setLoading] = useState(false);\n  const [editingItem, setEditingItem] = useState<any>(null);');
}

// 3. Stats (Task 3) - Monthly filter
// Let's replace only the first part of activeTab === 'dashboard'
const dashboardFind = `{activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-5 gap-6">`;
const dashboardReplace = `{activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">`;
code = code.replace(dashboardFind, dashboardReplace);

const dashboardEndFind = `<div className="bg-white p-6 rounded-2xl shadow-sm border border-accent/20 bg-accent/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Aylıq Ziyarət</span><span className="text-4xl font-black text-dark-bg">{monthlyVisits || 0}</span></div>
              </motion.div>
            )}`;
const dashboardEndReplace = `<div className="bg-white p-6 rounded-2xl shadow-sm border border-accent/20 bg-accent/5 flex flex-col gap-2"><span className="text-xs font-bold text-foreground/60 uppercase">Aylıq Ziyarət</span><span className="text-4xl font-black text-dark-bg">{monthlyVisits || 0}</span></div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-6">Aylıq Statistika</h3>
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <input type="month" className="border px-4 py-2 rounded-lg" onChange={(e) => {
                      const val = e.target.value; // YYYY-MM
                      if(!val) return;
                      const [y, m] = val.split('-');
                      const filteredCvs = (cvs||[]).filter(c => c.created_at && c.created_at.startsWith(\`\${y}-\${m}\`));
                      const filteredVacs = (vacancies||[]).filter(v => v.created_at && v.created_at.startsWith(\`\${y}-\${m}\`));
                      alert(\`Seçilmiş ay üzrə:\\n\\nƏlavə edilən CV: \${filteredCvs.length}\\nƏlavə edilən Vakansiya: \${filteredVacs.length}\`);
                    }} />
                    <p className="text-sm text-text-muted my-auto">Təqvimlə istədiyiniz ayı seçib o ay ərzində neçə CV və Vakansiya gəldiyini görə bilərsiniz.</p>
                  </div>
                </div>
              </motion.div>
            )}`;
code = code.replace(dashboardEndFind, dashboardEndReplace);


// 4. Vacancies (Task 2)
// Since vacancies is the FIRST tab in the mapped array (wait, it's just `activeTab === 'vacancies'`), we can find it.
const vacFind = `{(activeTab === 'news' || activeTab === 'legislation' || activeTab === 'internships') && (`;
const vacReplace = `{activeTab === 'vacancies' && (
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
                    if(editingItem) {
                        res = await updateVacancy(editingItem.id, fd);
                    } else {
                        res = await addVacancy(fd);
                    }
                    
                    if(res.success) {
                        toast.success("Saxlanıldı!", { id: t });
                        setEditingItem(null);
                        (e.target as any).reset();
                        loadData();
                    } else {
                        toast.error(res.error || "Xəta baş verdi", { id: t });
                    }
                    setIsSubmitting(false);
                  }} className="flex flex-col gap-4 max-w-xl">
                    <input type="text" name="title" defaultValue={editingItem?.title || ""} required placeholder="Vakansiya Adı" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    <textarea name="content" defaultValue={editingItem?.content || ""} required placeholder="Tələblər və İş barədə məlumat..." rows={5} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent resize-none"></textarea>
                    <div className="flex gap-4">
                      <button type="submit" disabled={isSubmitting} className="bg-dark-bg text-white px-6 py-2.5 rounded-lg text-sm font-bold w-fit hover:bg-accent-hover transition-colors disabled:opacity-50">
                        {isSubmitting ? "Saxlanılır..." : "Saxla"}
                      </button>
                      {editingItem && (
                        <button type="button" onClick={() => { setEditingItem(null); }} className="bg-gray-100 text-dark-bg px-6 py-2.5 rounded-lg text-sm font-bold w-fit hover:bg-gray-200 transition-colors">Ləğv Et</button>
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
                            <button onClick={() => setEditingItem(v)} className="text-blue-500 hover:text-blue-700">Redaktə</button>
                            <button onClick={async () => { 
                              if(confirm("Silmək istədiyinizə əminsiniz?")) { 
                                const { deleteVacancy } = await import("@/app/actions");
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
            
            {(activeTab === 'news' || activeTab === 'legislation' || activeTab === 'internships') && (`;
code = code.replace(vacFind, vacReplace);


// Remove the old vacancies block that I might have missed (actually it was grouped under activeTab === 'cvs' in the old code? NO, wait.
// Let's check if there is an existing 'vacancies' block
const existingVacRegex = /\{activeTab === 'vacancies' && \([\s\S]*?<\/motion\.div>\n            \}\)/;
// Wait, I just injected the new block ABOVE the news block. I must remove the existing vacancies block.
code = code.replace(existingVacRegex, ""); // First occurrence is the old one if it exists. Actually, the replace above injected it. I will just run replace on the original `activeTab === 'vacancies'` instead!

fs.writeFileSync('src/app/adminpanel/page.tsx', code);
