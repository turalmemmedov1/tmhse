const fs = require('fs');
const file = 'src/components/Navbar.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace empty div with Logo and Name for Desktop
const desktopEmptyDiv = '<div className="flex-1"></div>';
const desktopLogo = `<Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center">
            <Image src="/LogoMain.jpeg" alt="TM&S Consulting Logo" fill className="object-cover rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className={\`font-black text-lg md:text-xl uppercase transition-colors leading-none \${textColorClass}\`}>
              TM&S
            </span>
            <span className={\`text-[9px] md:text-[10px] font-bold tracking-widest uppercase opacity-80 mt-1 transition-colors \${textColorClass}\`}>
              Consulting
            </span>
          </div>
        </Link>`;
code = code.replace(desktopEmptyDiv, desktopLogo);

// Replace empty div with Logo and Name for Mobile
const mobileEmptyDiv = '<div></div>';
const mobileLogo = `<Link href="/" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 mx-auto">
                <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
                  <Image src="/LogoMain.jpeg" alt="TM&S Consulting Logo" fill className="object-cover rounded-full" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-black text-lg uppercase text-white leading-none">
                    TM&S
                  </span>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-white/80 mt-1">
                    Consulting
                  </span>
                </div>
              </Link>`;
code = code.replace(mobileEmptyDiv, mobileLogo);

// Increase padding to push menu down slightly
code = code.replace('py-3 px-6 md:px-16 fixed top-0', 'py-4 md:py-5 px-6 md:px-16 fixed top-0');

fs.writeFileSync(file, code);
