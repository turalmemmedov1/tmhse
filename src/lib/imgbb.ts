export async function uploadToImgbb(file: File): Promise<string | null> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    console.error("ImgBB API key is missing");
    return null;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    
    const data = await res.json();
    if (data.success) {
      return data.data.url;
    } else {
      console.error("ImgBB upload failed:", data);
      return null;
    }
  } catch (error) {
    console.error("ImgBB fetch error:", error);
    return null;
  }
}
