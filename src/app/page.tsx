import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroFooter from "@/components/HeroFooter";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-dark-bg">
      <Navbar />
      <Hero />
      <HeroFooter />
      <About />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
