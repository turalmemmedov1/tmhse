import { getSettings } from "@/app/actions";
import AboutPageClient from "@/components/AboutPageClient";

export default async function AboutPage() {
  const settings = await getSettings();
  return <AboutPageClient settings={settings} />;
}
