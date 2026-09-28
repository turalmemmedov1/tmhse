import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function InternshipDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const { data: internship } = await supabase.from('internships').select('*').eq('id', id).single();

  if (!internship) {
    return (
      <main className="flex min-h-screen flex-col w-full bg-background text-foreground">
        <div className="bg-dark-bg"><Navbar /></div>
        <div className="pt-32 pb-24 px-6 flex justify-center items-center h-[50vh]"><p>Təcrübə proqramı tapılmadı</p></div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col w-full bg-background text-foreground">
      <div className="bg-dark-bg"><Navbar /></div>
      
      <article className="pt-40 pb-24 px-6 md:px-16 w-full max-w-4xl mx-auto min-h-[70vh] flex flex-col gap-8">
        <Link href="/tecrube" className="flex items-center gap-2 text-accent-hover hover:underline w-fit font-bold">
          <ArrowLeft className="w-4 h-4" /> Bütün proqramlara qayıt
        </Link>
        
        {internship.image_url && <img src={internship.image_url} alt={internship.title} className="w-full aspect-video object-cover rounded-2xl shadow-md border border-dark-bg/10" />}
        
        <div className="pb-6 border-b border-gray-100">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-dark-bg">{internship.title}</h1>
          <span className="text-gray-400 font-bold text-sm">{new Date(internship.created_at).toLocaleDateString()}</span>
        </div>
        
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: internship.content }} />
        </div>
      </article>

      <Footer />
    </main>
  );
}
