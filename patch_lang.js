const fs = require('fs');
let code = fs.readFileSync('src/components/LanguageSwitcher.tsx', 'utf8');

const oldChange = `const changeLanguage = (langCode: string, langName: string) => {
    setCurrentLang(langName);
    setIsOpen(false);
    
    // Set Google Translate cookie
    setCookie("googtrans", \`/az/\${langCode}\`);
    setCookie("googtrans", \`/az/\${langCode}\`, { domain: window.location.hostname });
    
    // Reload page to apply translation safely without bugs
    window.location.reload();
  };`;

const newChange = `import { deleteCookie } from "cookies-next";

  const changeLanguage = (langCode: string, langName: string) => {
    setCurrentLang(langName);
    setIsOpen(false);
    
    if (langCode === 'az') {
      deleteCookie("googtrans");
      deleteCookie("googtrans", { domain: window.location.hostname });
    } else {
      setCookie("googtrans", \`/az/\${langCode}\`);
      setCookie("googtrans", \`/az/\${langCode}\`, { domain: window.location.hostname });
    }
    
    window.location.reload();
  };`;

code = code.replace(oldChange, newChange.replace('import { deleteCookie } from "cookies-next";\n\n  const', 'const'));
if(!code.includes('deleteCookie')) {
    code = code.replace('setCookie } from "cookies-next"', 'setCookie, deleteCookie } from "cookies-next"');
}
fs.writeFileSync('src/components/LanguageSwitcher.tsx', code);
