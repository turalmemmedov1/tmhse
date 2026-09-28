const fs = require('fs');
let code = fs.readFileSync('src/app/adminpanel/page.tsx', 'utf8');

// 1. Add 'account' tab to sidebar map
const socialTab = `{id:'social', icon: Phone, title: 'Əlaqə və Tənzimləmələr'},`;
code = code.replace(socialTab, socialTab + "\n            {id:'account', icon: Settings, title: 'Hesab Tənzimləmələri'},");

if(!code.includes("Settings,")) {
    code = code.replace('Phone,', 'Phone, Settings,');
}

// 2. Add 'account' UI block just before social tab or after it
const socialUI = `{activeTab === 'social' && (`;
const accountUI = `
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

`;

code = code.replace(socialUI, accountUI + socialUI);

fs.writeFileSync('src/app/adminpanel/page.tsx', code);
