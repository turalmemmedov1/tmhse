"use server";

import { supabase } from "@/lib/supabase";

export async function submitContactMessage(formData: FormData) {
  const full_name = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const content = formData.get("message") as string;

  if (!full_name || !email || !content) {
    return { success: false, error: "Bütün xanaları doldurun." };
  }

  const { error } = await supabase.from("messages").insert([
    { full_name, email, content }
  ]);

  if (error) {
    console.error("Error inserting message:", error);
    return { success: false, error: "Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın." };
  }

  return { success: true };
}
