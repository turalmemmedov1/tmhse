const fs = require('fs');
const file = 'src/app/elaqe/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Add getSettings to imports
if (!code.includes("getSettings")) {
  code = code.replace('import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";', 'import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";\nimport { getSettings } from "@/app/actions";');
}

// Convert component to use async settings state
const regexFunc = /export default function ElaqePage\(\) \{/;
code = code.replace(regexFunc, `export default function ElaqePage() {\n  const [settings, setSettings] = useState<Record<string, string>>({});\n  useEffect(() => {\n    getSettings().then(s => setSettings(s || {}));\n  }, []);\n`);

// Replace email
code = code.replace(/<a href="mailto:info@tmhse\.expert" className="text-accent-hover font-medium hover:underline text-sm">info@tmhse\.expert<\/a>/, `<a href={\`mailto:\${settings.contact_email || 'info@tmhse.expert'}\`} className="text-accent-hover font-medium hover:underline text-sm">{settings.contact_email || 'info@tmhse.expert'}</a>`);

// Replace phone (if it exists, let's see what it is)
// If it is hardcoded as "+994" something, I need to find it.
fs.writeFileSync(file, code);
