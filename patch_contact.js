const fs = require('fs');
const file = 'src/app/elaqe/page.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("getSettings")) {
  code = code.replace('import { submitContactMessage } from "@/app/actions";', 'import { submitContactMessage, getSettings } from "@/app/actions";\nimport { useEffect } from "react";');
} else {
  code = code.replace('import { submitContactMessage } from "@/app/actions";', 'import { submitContactMessage } from "@/app/actions";\nimport { useEffect } from "react";');
}

const funcStart = 'export default function ContactPage() {';
const newVars = `export default function ContactPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  useEffect(() => {
    getSettings().then(s => setSettings(s || {}));
  }, []);`;
code = code.replace(funcStart, newVars);

fs.writeFileSync(file, code);
