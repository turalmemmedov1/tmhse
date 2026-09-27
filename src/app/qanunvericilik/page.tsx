"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLegislation } from "@/app/actions";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

export default function QanunvericilikPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    getLegislation().then(res => {
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
      
      <section className="pt-32 pb-24 px-6 md:px-16 w-full max-w-[1400px] mx-auto min-h-[70vh]">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-dark-bg border-b-2 border-dark-bg pb-4">Əməklə bağlı Qanunvericilik</h1>
        
        <div className="relative mt-8 mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Qanun və ya qayda axtarın..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-4 text-dark-bg font-medium shadow-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
        </div>

        {loading ? (
          <p className="mt-8 font-bold text-dark-bg">Yüklənir...</p>
        ) : filteredData.length === 0 ? (
          <p className="mt-8 text-foreground/70">Axtarışa uyğun qanunvericilik sənədi tapılmadı.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredData.map(item => (
              <article key={item.id} className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all">
                <button 
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-lg md:text-xl font-bold text-dark-bg pr-4">{item.title}</h2>
                  {expandedId === item.id ? <ChevronUp className="w-6 h-6 shrink-0 text-gray-400" /> : <ChevronDown className="w-6 h-6 shrink-0 text-gray-400" />}
                </button>
                
                {expandedId === item.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify text-sm md:text-base">
                      {item.content}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-bold text-gray-400">
                      Dərc edilmə tarixi: {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
