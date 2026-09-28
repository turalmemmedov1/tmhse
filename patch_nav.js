const fs = require('fs');
const file = 'src/components/Navbar.tsx';
let code = fs.readFileSync(file, 'utf8');

// Add "Ana Səhifə" to the links
const desktopLinks = `{menuSettings.menu_xidmetler !== "false" && <Link href="/xidmetler"`;
code = code.replace(desktopLinks, `<Link href="/" className={\`transition-all duration-300 hover:text-accent hover:scale-105 \${pathname === '/' ? 'text-accent' : ''}\`}>Ana Səhifə</Link>\n          {menuSettings.menu_xidmetler !== "false" && <Link href="/xidmetler"`);

const mobileLinks = `{menuSettings.menu_xidmetler !== "false" && <Link href="/xidmetler" onClick={() => setMobileMenuOpen(false)}`;
code = code.replace(mobileLinks, `<Link href="/" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-3 active:text-accent">Ana Səhifə</Link>\n              {menuSettings.menu_xidmetler !== "false" && <Link href="/xidmetler" onClick={() => setMobileMenuOpen(false)}`);

// Remove visual logo and name from desktop/mobile
const desktopLogoRegex = /<Link \n          href="\/" \n          onClick=\{\(\) => window.scrollTo\(\{ top: 0, behavior: 'smooth' \}\)\} \n          className="flex items-center gap-3 group"\n        >[\s\S]*?<\/Link>/;
code = code.replace(desktopLogoRegex, `<div className="flex-1"></div>`);

const mobileLogoRegex = /<Link \n                href="\/" \n                onClick=\{\(\) => \{\n                  setMobileMenuOpen\(false\);\n                  window.scrollTo\(\{ top: 0, behavior: 'smooth' \}\);\n                \}\} \n                className="flex items-center gap-3 mx-auto"\n              >[\s\S]*?<\/Link>/;
code = code.replace(mobileLogoRegex, `<div></div>`);

fs.writeFileSync(file, code);
