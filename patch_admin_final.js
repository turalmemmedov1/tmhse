const fs = require('fs');
const file = 'src/app/adminpanel/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add Şablonlar to tabs menu
const oldTabs = `{id:'legislation', icon: BookOpen, title: 'Qanunvericilik'},`;
code = code.replace(oldTabs, oldTabs + "\n            {id:'templates', icon: FileText, title: 'Şablonlar'},");

// 2. Add FileText to lucide-react imports if not there
if (!code.includes("FileText")) {
  code = code.replace('import { LayoutDashboard', 'import { LayoutDashboard, FileText');
}

// 3. Add templates UI block right before closing main content div
const templatesUI = `
            {activeTab === 'templates' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-6 flex items-center gap-2"><PlusCircle className="w-5 h-5 text-accent"/> Yeni Şablon Əlavə Et</h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    const t = toast.loading("Şablon yüklənir...");
                    const fd = new FormData(e.currentTarget);
                    
                    const imgFile = fd.get('image_file') as File;
                    let image_url = "";
                    if(imgFile && imgFile.size > 0) {
                      image_url = await uploadToImgbb(imgFile) || "";
                    }
                    fd.append('image_url', image_url);

                    const res = await addTemplateWithFile(fd);
                    if (res.success) {
                      toast.success("Şablon əlavə edildi!", { id: t });
                      (e.target as any).reset();
                      loadData();
                    } else {
                      toast.error(res.error || "Xəta baş verdi", { id: t });
                    }
                    setIsSubmitting(false);
                  }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Şablonun Adı *</label>
                      <input type="text" name="title" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" placeholder="Məs: Risk Qiymətləndirmə Forması" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Şəkil Yüklə (İstəyə bağlı)</label>
                      <input type="file" name="image_file" accept="image/*" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="text-xs font-bold text-dark-bg">Sənəd Faylı (PDF, DOCX, DOC) *</label>
                      <input type="file" name="file" accept=".pdf,.doc,.docx" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                    </div>
                    <div className="md:col-span-2">
                      <button disabled={isSubmitting} type="submit" className="bg-dark-bg text-white px-8 py-3 rounded-xl text-sm font-bold w-fit hover:bg-accent-hover transition-colors disabled:opacity-50">
                        {isSubmitting ? 'Yüklənir...' : 'Əlavə Et'}
                      </button>
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
                        <button onClick={async () => {
                          if(confirm("Silmək istədiyinizə əminsiniz?")) {
                            await deleteTemplate(t.id);
                            loadData();
                          }
                        }} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
`;

// Insert just before the end of the main column
code = code.replace('          </div>\n        )}\n      </div>', templatesUI + "\n          </div>\n        )}\n      </div>");

// 4. Rename "Ümumi Tənzimləmələr" to "Əlaqə və Tənzimləmələr" in tab list so the user finds it easier
code = code.replace("{id:'social', icon: LinkIcon, title: 'Ümumi Tənzimləmələr'},", "{id:'social', icon: Phone, title: 'Əlaqə və Tənzimləmələr'},");
if (!code.includes("Phone,")) {
  code = code.replace("LogOut,", "LogOut, Phone,");
}

fs.writeFileSync(file, code);
