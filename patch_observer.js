const fs = require('fs');
let code = fs.readFileSync('src/components/LanguageSwitcher.tsx', 'utf8');

const observerCode = `
    // Ultimate weapon against Google Translate visual artifacts
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node: any) => {
          if (node.nodeType === 1) { // Element node
            const className = node.className || "";
            const id = node.id || "";
            if (
              typeof className === "string" && (
                className.includes("goog-te-spinner") || 
                className.includes("VIpgJd") || 
                className.includes("skiptranslate")
              )
            ) {
              node.style.display = "none";
              node.style.opacity = "0";
              node.style.visibility = "hidden";
              node.style.width = "0px";
              node.style.height = "0px";
              if(node.parentNode) node.parentNode.removeChild(node);
            }
            if (typeof id === "string" && id.includes("goog-gt-")) {
              node.style.display = "none";
              if(node.parentNode) node.parentNode.removeChild(node);
            }
          }
        });
      });
      
      // Also forcefully hide the body > .skiptranslate that might exist
      document.querySelectorAll('.skiptranslate, .goog-te-spinner-pos, .goog-te-spinner, iframe.goog-te-banner-frame').forEach((el: any) => {
        if(el.id !== 'google_translate_element') {
            el.style.display = 'none';
            el.style.opacity = '0';
        }
      });
      if(document.body.style.top !== '0px') {
        document.body.style.top = '0px';
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
`;

if (!code.includes('MutationObserver')) {
    code = code.replace('if (!document.getElementById("google-translate-script")) {', observerCode + '\n    if (!document.getElementById("google-translate-script")) {');
    fs.writeFileSync('src/components/LanguageSwitcher.tsx', code);
}
