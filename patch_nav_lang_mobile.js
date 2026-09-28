const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// 1. Remove from Desktop Menu
code = code.replace('<div className="ml-2"><LanguageSwitcher /></div>\n          \n        </div>', '\n        </div>');
code = code.replace('<div className="ml-2"><LanguageSwitcher /></div>', ''); // Just in case

// 2. Wrap hamburger with flex and insert LanguageSwitcher
const oldHamburger = `{/* Mobile Hamburger Toggle */}
        <button 
          className={\`lg:hidden p-2 transition-colors \${textColorClass}\`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-7 h-7" />
        </button>`;

const newHamburger = `<div className="flex items-center gap-2 lg:gap-4 ml-4">
          <LanguageSwitcher />
          {/* Mobile Hamburger Toggle */}
          <button 
            className={\`lg:hidden p-2 transition-colors \${textColorClass}\`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>`;

code = code.replace(oldHamburger, newHamburger);

fs.writeFileSync('src/components/Navbar.tsx', code);
