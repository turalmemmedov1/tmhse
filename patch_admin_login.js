const fs = require('fs');
let code = fs.readFileSync('src/app/adminpanel/page.tsx', 'utf8');

// Imports
code = code.replace(
  'import { deleteTemplate, getMessages, deleteMessage',
  'import { deleteTemplate, verifyAdmin, updateAdminCredentials'
);

// State
code = code.replace('const [messages, setMessages] = useState<any[]>([]);\n', '');
code = code.replace('setMessages(await getMessages());\n', '');

// Menu Tab
code = code.replace("{id:'messages', icon: MessageSquare, title: 'Gələn Mesajlar'},\n", '');

// Messages UI - remove entirely. It starts with {activeTab === 'messages' and ends before activeTab === 'social'
code = code.replace(/\{activeTab === 'messages' && \([\s\S]*?(?=\{activeTab === 'social')/, '');

// Login logic
const oldLogin = `if (email === "info@tmhse.expert" && password === "Tural2026") {
      setIsLoggedIn(true);
      localStorage.setItem("tmhse_admin_logged_in", "true");
      setError("");
      toast.success("Uğurla daxil oldunuz!");
    } else {
      setError("Email və ya şifrə yanlışdır.");
      toast.error("Email və ya şifrə yanlışdır.");
    }`;

const newLogin = `const isValid = await verifyAdmin(email, password);
    if (isValid) {
      setIsLoggedIn(true);
      localStorage.setItem("tmhse_admin_logged_in", "true");
      setError("");
      toast.success("Uğurla daxil oldunuz!");
    } else {
      setError("Email və ya şifrə yanlışdır.");
      toast.error("Email və ya şifrə yanlışdır.");
    }`;

code = code.replace('const handleLogin = (e: React.FormEvent) => {', 'const handleLogin = async (e: React.FormEvent) => {');
code = code.replace(oldLogin, newLogin);

// Add credential update form in social tab
const socialFormEnd = `<div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-dark-bg">Instagram Linki</label>
                    <input type="text" name="instagram" defaultValue={settings?.instagram_url || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                  </div>
                  <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold w-fit mt-2 hover:bg-accent-hover transition-colors">Yadda Saxla</button>
                </form>
              </motion.div>
            )}`;

const credForm = `<div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-dark-bg">Instagram Linki</label>
                    <input type="text" name="instagram" defaultValue={settings?.instagram_url || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                  </div>
                  <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold w-fit mt-2 hover:bg-accent-hover transition-colors">Yadda Saxla</button>
                </form>

                <h3 className="font-bold text-lg text-dark-bg mt-12 mb-6 border-t pt-8">Giriş Məlumatlarını Yenilə</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const newEmail = fd.get("new_email");
                  const newPass = fd.get("new_password");
                  if(newEmail && newPass) {
                    const t = toast.loading("Yenilənir...");
                    const success = await updateAdminCredentials(newEmail.toString(), newPass.toString());
                    if(success) toast.success("Giriş məlumatları dəyişdirildi!", { id: t });
                    else toast.error("Xəta baş verdi", { id: t });
                  }
                }} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-dark-bg">Yeni E-poçt (Login üçün)</label>
                    <input type="email" name="new_email" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-dark-bg">Yeni Şifrə</label>
                    <input type="password" name="new_password" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                  </div>
                  <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-bold w-fit mt-2 hover:bg-red-700 transition-colors">Məlumatları Yenilə</button>
                </form>

              </motion.div>
            )}`;

code = code.replace(socialFormEnd, credForm);

fs.writeFileSync('src/app/adminpanel/page.tsx', code);
