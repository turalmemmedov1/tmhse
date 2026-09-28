const fs = require('fs');
let code = fs.readFileSync('src/app/haqqimizda/page.tsx', 'utf8');

// Remove "use client" from top
code = code.replace('"use client";\n', '');
code = code.replace(/import { useState, useEffect } from "react";\n?/, '');

// Rename function and add props
code = code.replace('export default function AboutPage() {', 'export default async function AboutPage() {\n  const settings = await getSettings();\n  return <AboutPageClient settings={settings} />;\n}\n\n"use client"; // Need to create a client component below\nimport { useState, useEffect } from "react";\n\nfunction AboutPageClient({ settings }: { settings: Record<string, string> }) {');

// Remove useEffect inside the new client component
const oldHooks = `  const [settings, setSettings] = useState<Record<string, string>>({});
  useEffect(() => {
    getSettings().then(s => setSettings(s || {}));
  }, []);`;
code = code.replace(oldHooks, '');

// Since we can't have both use client and server component in the same file in Next.js app router easily,
// wait! We CANNOT have server component in the same file as "use client"!
// I must separate them.
