import { getVacancies } from "@/app/actions";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, MapPin, Briefcase, Mail, Phone, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function VacancyDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const paramsId = resolvedParams.id;
  const vacancies = await getVacancies();
  const vac = vacancies.find(v => v.id.toString() === paramsId);

  if (!vac) {
    notFound();
  }

  const email = vac.contact_email?.includes(' | ') ? vac.contact_email.split(' | ')[0] : (vac.contact_email?.includes('@') ? vac.contact_email : null);
  const phone = vac.contact_email?.includes(' | ') ? vac.contact_email.split(' | ')[1] : (!vac.contact_email?.includes('@') ? vac.contact_email : null);

  return (
    <main className="flex min-h-screen flex-col w-full bg-background selection:bg-accent/30">
      <Navbar />
      
      <section className="flex-1 w-full max-w-3xl mx-auto px-6 md:px-16 pt-32 pb-20 flex flex-col gap-8">
        <Link href="/vakansiyalar" className="flex items-center gap-2 text-sm font-bold text-dark-bg bg-white px-5 py-2.5 rounded-xl shadow-sm border border-dark-bg/5 hover:border-accent-hover hover:text-accent-hover transition-all w-fit">
          <ChevronLeft className="w-4 h-4" /> Bütün Vakansiyalar
        </Link>
        
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col gap-6">
          
          <div className="flex flex-col gap-4 border-b border-gray-100 pb-8">
            <h1 className="text-2xl md:text-3xl font-black text-dark-bg">{vac.role}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-foreground/70 mt-2">
              <div className="flex items-center gap-2 text-lg">
                <Building2 className="w-5 h-5 text-accent-hover" /> {vac.company}
              </div>
              <div className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-accent-hover" /> {vac.location}
              </div>
              <div className="flex items-center gap-2 text-lg">
                <Briefcase className="w-5 h-5 text-accent-hover" /> {vac.type}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-dark-bg">Vakansiya Haqqında</h2>
            <div className="text-foreground/80 leading-relaxed text-base md:text-lg prose max-w-none" dangerouslySetInnerHTML={{ __html: vac.description }} />
          </div>
          
          <div className="flex flex-col gap-6 mt-6 border-t border-gray-100 pt-8">
            <h2 className="text-xl font-bold text-dark-bg">Müraciət Etmək Üçün</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {email && (
                <a href={`mailto:${email}`} className="flex items-center justify-center gap-3 bg-dark-bg text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-accent-hover transition-colors shadow-md flex-1">
                  <Mail className="w-5 h-5" /> E-poçtla Müraciət Et
                </a>
              )}
              {phone && (
                <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-[#20bd5a] transition-colors shadow-md flex-1">
                  <Phone className="w-5 h-5" /> WhatsApp ilə Müraciət Et
                </a>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
