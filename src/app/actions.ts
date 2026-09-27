"use server";

import { supabase } from "@/lib/supabase";

// --- MESSAGES ---
export async function submitContactMessage(formData: FormData) {
  const full_name = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const content = formData.get("message") as string;

  if (!full_name || !email || !content) return { success: false, error: "Bütün xanaları doldurun." };

  const { error } = await supabase.from("messages").insert([{ full_name, email, content }]);
  if (error) return { success: false, error: "Xəta baş verdi." };
  return { success: true };
}

// --- VACANCIES ---
export async function getVacancies() {
  const { data, error } = await supabase.from("vacancies").select("*").order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function addVacancy(formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const description = formData.get("desc") as string;
  const contact_email = formData.get("contact") as string;

  if (!company || !role || !description || !contact_email) return { success: false, error: "Məlumatları tam daxil edin." };

  const { error } = await supabase.from("vacancies").insert([{ company, role, location, type, description, contact_email }]);
  if (error) return { success: false, error: "Xəta baş verdi." };
  return { success: true };
}

export async function deleteVacancy(id: number) {
  const { error } = await supabase.from("vacancies").delete().eq("id", id);
  return { success: !error };
}

// --- CVS ---
export async function getCvs() {
  const { data, error } = await supabase.from("cvs").select("*").order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function addCv(data: { first_name: string, last_name: string, email: string, phone: string, skills: string, image_url: string, cv_drive_link: string }) {
  const { error } = await supabase.from("cvs").insert([data]);
  if (error) return { success: false, error: "Xəta baş verdi." };
  return { success: true };
}

export async function deleteCv(id: number) {
  const { error } = await supabase.from("cvs").delete().eq("id", id);
  return { success: !error };
}

// --- SETTINGS (SOCIAL LINKS) ---
export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*");
  if (error) return {};
  const settingsObj: Record<string, string> = {};
  if (data) {
    data.forEach(item => { settingsObj[item.setting_key] = item.setting_value });
  }
  return settingsObj;
}

export async function updateSetting(key: string, value: string) {
  const { error } = await supabase.from("settings").upsert({ setting_key: key, setting_value: value }, { onConflict: "setting_key" });
  return { success: !error };
}

// --- NEWS ---
export async function getNews() {
  const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function addNews(title: string, content: string, image_url: string) {
  const { error } = await supabase.from("news").insert([{ title, content, image_url }]);
  return { success: !error };
}

export async function deleteNews(id: number) {
  const { error } = await supabase.from("news").delete().eq("id", id);
  return { success: !error };
}

// --- LEGISLATION ---
export async function getLegislation() {
  const { data, error } = await supabase.from("legislation").select("*").order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function addLegislation(title: string, content: string, image_url: string) {
  const { error } = await supabase.from("legislation").insert([{ title, content, image_url }]);
  return { success: !error };
}

export async function deleteLegislation(id: number) {
  const { error } = await supabase.from("legislation").delete().eq("id", id);
  return { success: !error };
}

// --- INTERNSHIPS ---
export async function getInternships() {
  const { data, error } = await supabase.from("internships").select("*").order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function addInternship(title: string, content: string, image_url: string) {
  const { error } = await supabase.from("internships").insert([{ title, content, image_url }]);
  return { success: !error };
}

export async function deleteInternship(id: number) {
  const { error } = await supabase.from("internships").delete().eq("id", id);
  return { success: !error };
}

// --- SERVICES MEDIA (PDFs and Videos) ---
export async function getServicePdfs() {
  const { data, error } = await supabase.from("service_pdfs").select("*").order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function addServicePdf(service_id: string, title: string, drive_link: string) {
  const { error } = await supabase.from("service_pdfs").insert([{ service_id, title, drive_link }]);
  return { success: !error };
}

export async function deleteServicePdf(id: number) {
  const { error } = await supabase.from("service_pdfs").delete().eq("id", id);
  return { success: !error };
}

export async function getServiceVideos() {
  const { data, error } = await supabase.from("service_videos").select("*").order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function addServiceVideo(service_id: string, title: string, youtube_link: string) {
  const { error } = await supabase.from("service_videos").insert([{ service_id, title, youtube_link }]);
  return { success: !error };
}

export async function deleteServiceVideo(id: number) {
  const { error } = await supabase.from("service_videos").delete().eq("id", id);
  return { success: !error };
}

// --- STATISTICS ---
export async function recordVisit() {
  await supabase.from("page_visits").insert([{}]);
  return { success: true };
}

export async function getMonthlyVisits() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0,0,0,0);
  
  const { count, error } = await supabase.from("page_visits")
    .select("*", { count: "exact", head: true })
    .gte("visited_at", startOfMonth.toISOString());
    
  if (error) return 0;
  return count || 0;
}


export async function updateNews(id: number, title: string, content: string) {
  // using imported supabase
  const { error } = await supabase.from('news').update({ title, content }).eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateLegislation(id: number, title: string, content: string) {
  // using imported supabase
  const { error } = await supabase.from('legislation').update({ title, content }).eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateInternship(id: number, title: string, content: string) {
  // using imported supabase
  const { error } = await supabase.from('internships').update({ title, content }).eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

import { uploadFileToSupabase } from "@/lib/storage";

export async function submitCvWithFile(formData: FormData) {
  try {
    const file = formData.get("pdf_file") as File | null;
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const skills = formData.get("skills") as string;
    
    // Get the configured Google Drive Folder ID from settings
    const settings = await getSettings();
    const folderId = settings?.google_drive_folder_id;

    let cv_drive_link = "";
    
    if (file && file.size > 0) {
      
      
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${first_name}_${last_name}_CV.pdf`;
      const link = await uploadFileToSupabase(buffer, fileName, file.type);
      
      if (!link) {
        return { success: false, error: "Fayl sistemə yüklənərkən xəta baş verdi. Zəhmət olmasa Supabase-də 'pdfs' adlı Storage qovluğunu (Bucket) yaratdığınıza əmin olun." };
      }
      cv_drive_link = link;
    }

    const cvData = {
      first_name,
      last_name,
      email,
      phone,
      skills,
      image_url: formData.get("image_url") as string || "",
      cv_drive_link
    };

    const { error } = await supabase.from("cvs").insert([cvData]);
    if (error) throw new Error(error.message);
    
    return { success: true };
  } catch (err: any) {
    console.error("submitCvWithFile error:", err);
    return { success: false, error: err.message || "Xəta baş verdi" };
  }
}

export async function addServicePdfWithFile(formData: FormData) {
  try {
    const file = formData.get("pdf_file") as File | null;
    const service_id = formData.get("service_id") as string;
    const title = formData.get("title") as string;
    
    // Get the configured Google Drive Folder ID from settings
    const settings = await getSettings();
    const folderId = settings?.google_drive_folder_id;

    if (!file || file.size === 0) {
      return { success: false, error: "Fayl seçilməyib!" };
    }
    
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${service_id}_${title}.pdf`;
    const link = await uploadFileToSupabase(buffer, fileName, file.type);
    
    if (!link) {
      return { success: false, error: "Fayl sistemə yüklənərkən xəta baş verdi. Zəhmət olmasa Supabase-də 'pdfs' adlı Storage qovluğunu (Bucket) yaratdığınıza əmin olun." };
    }

    const { error } = await supabase.from("service_pdfs").insert([{ service_id, title, drive_link: link }]);
    if (error) throw new Error(error.message);
    
    return { success: true };
  } catch (err: any) {
    console.error("addServicePdfWithFile error:", err);
    return { success: false, error: err.message || "Xəta baş verdi" };
  }
}
