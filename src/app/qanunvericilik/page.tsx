"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function QanunvericilikPage() {
  return (
    <main className="flex min-h-screen flex-col w-full max-w-[100vw] overflow-x-hidden overflow-y-auto bg-background text-foreground">
      <div className="bg-dark-bg">
        <Navbar />
      </div>
      
      <section className="pt-32 pb-24 px-6 md:px-16 w-full max-w-[1920px] mx-auto min-h-[70vh]">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-dark-bg">Qanunvericilik</h1>
        <p className="text-lg text-foreground/70 max-w-2xl">Qanunvericiliklə bağlı yeniliklər və dəyişikliklər burada yerləşdiriləcək.</p>
      </section>

      <Footer />
    </main>
  );
}
