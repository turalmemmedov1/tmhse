const fs = require('fs');
const file = 'src/app/adminpanel/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Add edit modal state
code = code.replace('const [monthlyVisits, setMonthlyVisits] = useState(0);', 
`const [monthlyVisits, setMonthlyVisits] = useState(0);
  const [editingItem, setEditingItem] = useState<any>(null);
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
`);

// Add edit button next to delete
code = code.replace(
  /<button onClick={async \(\) => { \\n *if\(confirm\("Silmək istədiyinizə/g,
  `<button onClick={() => { setEditingItem(item); setEditTitle(item.title); setEditContent(item.content); setEditTab(activeTab); }} className="text-blue-500 text-xs font-bold mt-2 mr-4 hover:underline">Düzəliş Et</button>
                          <button onClick={async () => { 
                            if(confirm("Silmək istədiyinizə`
);

// Add Home Images tab
code = code.replace(
  "{id:'menus', icon: LayoutDashboard, title: 'Menyular'}",
  "{id:'menus', icon: LayoutDashboard, title: 'Menyular'},\n            {id:'home_images', icon: Image, title: 'Ana Səhifə Şəkilləri'}"
);
// Make sure Image icon is imported
code = code.replace(
  "import { LayoutDashboard, LogOut, Link as LinkIcon",
  "import { LayoutDashboard, LogOut, Link as LinkIcon, ImageIcon as Image"
);

// Add Home Images UI block
const homeImagesBlock = `
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
                    {settings?.home_image_1 && <img src={settings.home_image_1} className="w-32 h-32 object-cover rounded-xl border mb-2" />}
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
                    <label className="text-sm font-bold text-dark-bg">2. "TMHSE" (Haqqımızda) Şəkli</label>
                    {settings?.home_image_2 && <img src={settings.home_image_2} className="w-32 h-32 object-cover rounded-xl border mb-2" />}
                    <input type="file" name="image_2" accept="image/*" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm" />
                  </div>
                  <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold w-fit hover:bg-accent-hover transition-colors">Yenilə</button>
                </form>
              </motion.div>
            )}
`;
code = code.replace("          </div>\n        )}\n      </div>\n    </main>\n  );\n}", homeImagesBlock + "          </div>\n        )}\n      </div>\n");

// Add Modal UI at the bottom
const modalBlock = `
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
`;
code = code.replace("    </main>\n  );\n}", modalBlock);

fs.writeFileSync(file, code);
