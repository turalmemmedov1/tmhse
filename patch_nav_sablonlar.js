const fs = require('fs');
const file = 'src/components/Navbar.tsx';
let code = fs.readFileSync(file, 'utf8');

const desktopVakansiya = `{menuSettings.menu_vakansiyalar !== "false" && <Link href="/vakansiyalar" className={\`transition-all duration-300 hover:text-accent hover:scale-105 \${pathname === '/vakansiyalar' ? 'text-accent' : ''}\`}>Vakansiyalar</Link>}`;
const newDesktopSablon = `<Link href="/sablonlar" className={\`transition-all duration-300 hover:text-accent hover:scale-105 \${pathname === '/sablonlar' ? 'text-accent' : ''}\`}>Şablonlar</Link>`;
code = code.replace(desktopVakansiya, desktopVakansiya + "\n          " + newDesktopSablon);

const mobileVakansiya = `{menuSettings.menu_vakansiyalar !== "false" && <Link href="/vakansiyalar" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-3 active:text-accent">Vakansiyalar</Link>}`;
const newMobileSablon = `<Link href="/sablonlar" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-3 active:text-accent">Şablonlar</Link>`;
code = code.replace(mobileVakansiya, mobileVakansiya + "\n              " + newMobileSablon);

// Also add "/sablonlar" to isLightPage
code = code.replace('"/vakansiyalar"', '"/vakansiyalar", "/sablonlar"');

fs.writeFileSync(file, code);
