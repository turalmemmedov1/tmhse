const fs = require('fs');
const file = 'src/components/Navbar.tsx';
let code = fs.readFileSync(file, 'utf8');

// Remove Ana Səhifə desktop
const regexAnaDesk = /<Link href="\/" className=\{\`transition-all duration-300 hover:text-accent hover:scale-105 \$\{pathname === '\/' \? 'text-accent' : ''\}\`\}>Ana Səhifə<\/Link>/;
code = code.replace(regexAnaDesk, "");

// Remove Ana Səhifə mobile
const regexAnaMob = /<Link href="\/" onClick=\{\(\) => setMobileMenuOpen\(false\)\} className="border-b border-white\/10 pb-3 active:text-accent">Ana Səhifə<\/Link>/;
code = code.replace(regexAnaMob, "");

// Remove Əlaqə desktop
const regexElaqeDesk = /<Link \n            href="\/elaqe" \n            className="flex items-center gap-2 bg-accent\/10 border border-accent\/50 text-accent px-5 py-2\.5 rounded-full hover:bg-accent hover:text-dark-bg transition-all duration-300 hover:scale-105 ml-2"\n          >\n            Əlaqə\n            <ArrowUpRight className="w-4 h-4" \/>\n          <\/Link>/;
code = code.replace(regexElaqeDesk, "");

// Remove Əlaqə mobile
const regexElaqeMob = /<Link href="\/elaqe" onClick=\{\(\) => setMobileMenuOpen\(false\)\} className="text-accent border-b border-white\/10 pb-3">Əlaqə<\/Link>/;
code = code.replace(regexElaqeMob, "");

fs.writeFileSync(file, code);
