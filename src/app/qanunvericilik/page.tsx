"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLegislation } from "@/app/actions";

export default function QanunvericilikPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLegislation().then(res => {
      setData(res || []);
      setLoading(false);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col w-full max-w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-32 pb-24 px-6 md:px-16 w-full max-w-4xl mx-auto min-h-[70vh]">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-dark-bg border-b-2 border-dark-bg pb-4">Qanunvericilik Aktları və Qaydalar</h1>
        
        {loading ? (
          <p className="mt-8 font-bold text-dark-bg">Yüklənir...</p>
        ) : data.length === 0 ? (
          <p className="mt-8 text-foreground/70">Hazırda heç bir qanunvericilik sənədi tapılmadı.</p>
        ) : (
          <div className="mt-12 flex flex-col gap-12">
            {data.map(item => (
              <article key={item.id} className="prose prose-sm md:prose-base max-w-none w-full bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-dark-bg uppercase tracking-wide border-b border-gray-100 pb-4 mb-6">{item.title}</h2>
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-justify">
                  {item.content}
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100 text-xs font-bold text-gray-400">
                  Dərc edilmə tarixi: {new Date(item.created_at).toLocaleDateString()}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
