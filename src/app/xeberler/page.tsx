"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNews } from "@/app/actions";

export default function XeberlerPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews().then(res => {
      setData(res || []);
      setLoading(false);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col w-full max-w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-32 pb-24 px-6 md:px-16 w-full max-w-7xl mx-auto min-h-[70vh]">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-dark-bg border-b-2 border-dark-bg pb-4">Xəbərlər</h1>
        
        {loading ? (
          <p className="mt-8 font-bold text-dark-bg">Yüklənir...</p>
        ) : data.length === 0 ? (
          <p className="mt-8 text-foreground/70">Hazırda heç bir xəbər yoxdur.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.map(item => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col">
                {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-dark-bg mb-2">{item.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{item.content}</p>
                  <span className="text-xs font-bold text-gray-400 mt-auto pt-4 border-t">{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
