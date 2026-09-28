const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const importSettings = `import { getSettings } from "@/app/actions";`;
if (!code.includes('getSettings')) {
    code = code.replace('import Footer from "@/components/Footer";', 'import Footer from "@/components/Footer";\n' + importSettings);
}

const functionStart = `export default async function Home() {
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
}`;

code = code.replace(/export default function Home\(\) \{[\s\S]*?\}/, functionStart);
fs.writeFileSync('src/app/page.tsx', code);
