import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroFooter from "@/components/HeroFooter";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-y-auto bg-dark-bg">
      <Navbar />
      <Hero />
      <HeroFooter />
      <About />
      <Stats />
      <Services />
      <Process />
      <FaqSection />
      <Footer />
    </main>
  );
}
