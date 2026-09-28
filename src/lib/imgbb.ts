import { createClient } from "@supabase/supabase-js";

export async function uploadToImgbb(file: File): Promise<string | null> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase credentials missing for image upload");
      return null;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    // Upload into 'pdfs' bucket which we already configured for public access
    const filePath = `images/${timestamp}_${safeName}`;

    const { data, error } = await supabase.storage
      .from('pdfs')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error("Supabase Image Upload Error:", error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage.from('pdfs').getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Upload error", err);
    return null;
  }
}
