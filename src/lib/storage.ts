import { supabase } from "@/lib/supabase";

export async function uploadFileToSupabase(fileBuffer: Buffer, fileName: string, mimeType: string) {
  try {
    const timestamp = Date.now();
    const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filePath = `${timestamp}_${safeName}`;

    const { data, error } = await supabase.storage
      .from('pdfs')
      .upload(filePath, fileBuffer, {
        contentType: mimeType,
        upsert: false
      });

    if (error) {
      console.error("Supabase Storage Error:", error.message);
      throw new Error(error?.message || 'Bilinməyən xəta');
    }

    const { data: publicUrlData } = supabase.storage.from('pdfs').getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  } catch (error: any) {
    console.error("Supabase Upload Error:", error.message || error);
    throw new Error(error?.message || 'Bilinməyən xəta');
  }
}
