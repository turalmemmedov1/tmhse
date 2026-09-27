"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getInternships } from "@/app/actions";
import { Search } from "lucide-react";

export default function TecrubePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getInternships().then(res => {
      setData(res || []);
      setLoading(false);
    });
  }, []);

  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex min-h-screen flex-col w-full bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-32 pb-24 px-6 md:px-16 w-full max-w-7xl mx-auto min-h-[70vh]">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-dark-bg border-b-2 border-dark-bg pb-4">Təcrübə Proqramı</h1>
        
        <div className="relative mt-8 mb-8 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Təcrübə proqramlarında axtarın..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-dark-bg font-medium shadow-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
        </div>

        {loading ? (
          <p className="mt-8 font-bold text-dark-bg">Yüklənir...</p>
        ) : filteredData.length === 0 ? (
          <p className="mt-8 text-foreground/70">Axtarışa uyğun təcrübə proqramı tapılmadı.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredData.map(item => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col md:flex-row">
                {item.image_url && <img src={item.image_url} alt={item.title} className="w-full md:w-48 h-48 md:h-auto object-cover" />}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-dark-bg mb-2">{item.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 flex-1 whitespace-pre-wrap">{item.content}</p>
                  <span className="text-xs font-bold text-gray-400 mt-auto">{new Date(item.created_at).toLocaleDateString()}</span>
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
