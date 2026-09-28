import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroFooter from "@/components/HeroFooter";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { getSettings } from "@/app/actions";

export default async function Home() {
  const settings = await getSettings();
  
  return (
    <main className="flex min-h-screen flex-col w-full bg-dark-bg">
      <Navbar />
      <Hero bgImage={settings.home_image_1} />
      <HeroFooter />
      <About bgImage={settings.home_image_2} />
      <Stats />
      <Services />
      <Process />
      <FaqSection />
      <Footer />
    </main>
  );
}
