const fs = require('fs');
let code = fs.readFileSync('src/app/actions.ts', 'utf8');

// Filter out admin_credentials from getSettings
code = code.replace(
  'data.forEach(item => { settingsObj[item.setting_key] = item.setting_value });',
  'data.forEach(item => { if(item.setting_key !== "admin_credentials") { settingsObj[item.setting_key] = item.setting_value } });'
);

// Add verifyAdmin and updateAdminCredentials
const adminCredsFunctions = `
export async function verifyAdmin(email: string, pass: string) {
  const { data } = await supabase.from("settings").select("setting_value").eq("setting_key", "admin_credentials").single();
  const creds = data?.setting_value || "info@tmhse.expert:Tural2026";
  const [dbEmail, dbPass] = creds.split(":");
  return email === dbEmail && pass === dbPass;
}

export async function updateAdminCredentials(email: string, pass: string) {
  const creds = \`\${email}:\${pass}\`;
  const { error } = await supabase.from("settings").upsert({ setting_key: "admin_credentials", setting_value: creds }, { onConflict: 'setting_key' });
  return !error;
}
`;

if (!code.includes('verifyAdmin')) {
  code += adminCredsFunctions;
}

fs.writeFileSync('src/app/actions.ts', code);
