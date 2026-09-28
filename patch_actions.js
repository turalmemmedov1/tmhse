const fs = require('fs');
let code = fs.readFileSync('src/app/actions.ts', 'utf8');

code = code.replace(
  /export async function updateNews\(id: number, title: string, content: string\) \{\n  \/\/ using imported supabase\n  const \{ error \} = await supabase\.from\('news'\)\.update\(\{ title, content \}\)\.eq\('id', id\);\n  return \{ success: !error \};\n\}/g,
  `export async function updateNews(id: number, title: string, content: string, image_url?: string) {
  const updateData: any = { title, content };
  if (image_url) updateData.image_url = image_url;
  const { error } = await supabase.from('news').update(updateData).eq('id', id);
  return { success: !error };
}`
);

code = code.replace(
  /export async function updateInternship\(id: number, title: string, content: string\) \{\n  const \{ error \} = await supabase\.from\('internships'\)\.update\(\{ title, content \}\)\.eq\('id', id\);\n  return \{ success: !error \};\n\}/g,
  `export async function updateInternship(id: number, title: string, content: string, image_url?: string) {
  const updateData: any = { title, content };
  if (image_url) updateData.image_url = image_url;
  const { error } = await supabase.from('internships').update(updateData).eq('id', id);
  return { success: !error };
}`
);

fs.writeFileSync('src/app/actions.ts', code);
