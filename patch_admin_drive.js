const fs = require('fs');
const file = 'src/app/adminpanel/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Add Drive icon
code = code.replace("ImageIcon as ImageIcon", "ImageIcon as ImageIcon, Folder as FolderIcon");

// Add Drive tab to menu
const oldTabs = `{id:'home_images', icon: ImageIcon, title: 'Ana Səhifə Şəkilləri'}`;
const newTabs = `{id:'home_images', icon: ImageIcon, title: 'Ana Səhifə Şəkilləri'},\n            {id:'drive', icon: FolderIcon, title: 'Google Drive İnteqrasiyası'}`;
code = code.replace(oldTabs, newTabs);

// Add Drive Tab UI
const driveUI = `
            {activeTab === 'drive' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5 max-w-xl">
                <h3 className="font-bold text-lg text-dark-bg mb-6">Google Drive İnteqrasiyası</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Vebsayta yüklənən CV-lərin (PDF) birbaşa Google Drive-a getməsi üçün hədəf qovluğun ID-sini bura yazın.
                </p>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const loadingToast = toast.loading("Yadda saxlanılır...");
                  const formData = new FormData(e.currentTarget);
                  await updateSetting("google_drive_folder_id", formData.get("folder_id") as string);
                  toast.success("Yadda saxlanıldı", { id: loadingToast });
                  loadData();
                }} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-dark-bg">Qovluq ID-si (Folder ID)</label>
                    <input type="text" name="folder_id" defaultValue={settings?.google_drive_folder_id || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" placeholder="1aBcDeFgHiJkLmNoPqRsTuVwXyZ" />
                  </div>
                  <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold w-fit mt-2 hover:bg-accent-hover transition-colors">Yadda Saxla</button>
                </form>
              </motion.div>
            )}
`;

code = code.replace("          </div>\n        )}\n      </div>", driveUI + "          </div>\n        )}\n      </div>");

fs.writeFileSync(file, code);
