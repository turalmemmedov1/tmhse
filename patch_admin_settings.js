const fs = require('fs');
const file = 'src/app/adminpanel/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Rename 'social' to 'settings' in tabs
code = code.replace(/{id:'social', icon: LinkIcon, title: 'Sosial Şəbəkələr'}/, "{id:'social', icon: LinkIcon, title: 'Ümumi Tənzimləmələr'}");

// Expand the social tab form
const oldSocialForm = `<h3 className="font-bold text-lg text-dark-bg mb-6">Sosial Media Linkləri</h3>
                <form onSubmit={handleSaveSocial} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
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
                </form>`;

const newSocialForm = `<h3 className="font-bold text-lg text-dark-bg mb-6">Əlaqə və Sosial Media</h3>
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
                    <input type="email" name="email" defaultValue={settings?.contact_email || ""} className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" placeholder="info@tmhse.expert" />
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
                </form>`;
code = code.replace(oldSocialForm, newSocialForm);

// Remove handleSaveSocial function definition since we just inlined it
const handleSaveRegex = /const handleSaveSocial = async \(e: React\.FormEvent<HTMLFormElement>\) => \{[\s\S]*?loadData\(\);\n  \};/;
code = code.replace(handleSaveRegex, "");

fs.writeFileSync(file, code);
