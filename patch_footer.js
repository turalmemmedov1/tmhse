const fs = require('fs');
const file = 'src/components/Footer.tsx';
let code = fs.readFileSync(file, 'utf8');

// Remove Logo & Title button
const logoRegex = /<button onClick=\{scrollToTop\} className="flex items-center gap-4 mb-1 text-left hover:opacity-80 transition-opacity">[\s\S]*?<\/button>/;
code = code.replace(logoRegex, "");

// Remove email
const emailRegex = /<a href="mailto:info@tmhse\.expert" className="text-text-muted hover:text-white transition-colors w-fit text-sm font-medium">info@tmhse\.expert<\/a>/;
code = code.replace(emailRegex, "");

fs.writeFileSync(file, code);
