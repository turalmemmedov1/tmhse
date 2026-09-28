import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";

export default async function TemplateDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const { data: template } = await supabase.from('templates').select('*').eq('id', id).single();

  if (!template) {
    return (
      <main className="flex min-h-screen flex-col w-full bg-background text-foreground">
        <div className="bg-dark-bg"><Navbar /></div>
        <div className="pt-32 pb-24 px-6 flex justify-center items-center h-[50vh]"><p>Sənəd tapılmadı</p></div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col w-full bg-background text-foreground">
      <div className="bg-dark-bg"><Navbar /></div>
      
      <article className="pt-40 pb-24 px-6 md:px-16 w-full max-w-4xl mx-auto min-h-[70vh] flex flex-col gap-8">
        <Link href="/sablonlar" className="flex items-center gap-2 text-accent-hover hover:underline w-fit font-bold">
          <ArrowLeft className="w-4 h-4" /> Bütün şablonlara qayıt
        </Link>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-dark-bg/5 flex flex-col md:flex-row gap-8 items-start">
          {template.image_url ? (
            <img src={template.image_url} alt={template.title} className="w-full md:w-1/3 aspect-square object-cover rounded-2xl shadow-sm border border-gray-100" />
          ) : (
            <div className="w-full md:w-1/3 aspect-square bg-gray-50 flex items-center justify-center rounded-2xl border border-gray-100">
                <FileText className="w-16 h-16 text-gray-300" />
            </div>
          )}
          
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-dark-bg">{template.title}</h1>
            <span className="text-gray-400 font-bold text-sm mb-4">Əlavə edilib: {new Date(template.created_at).toLocaleDateString()}</span>
            
            {template.file_url ? (
              <a href={template.file_url} target="_blank" rel="noopener noreferrer" className="bg-dark-bg text-white px-8 py-4 rounded-xl font-bold hover:bg-accent-hover transition-colors flex items-center justify-center gap-3 w-fit shadow-md">
                <Download className="w-5 h-5" /> Sənədi Yüklə
              </a>
            ) : (
              <p className="text-gray-500 italic">Bu sənəd üçün yükləmə faylı təqdim edilməyib.</p>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
