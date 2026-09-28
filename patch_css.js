const fs = require('fs');
let code = fs.readFileSync('src/app/globals.css', 'utf8');

const newCSS = `
/* Absolute Force Hide Google Translate Logos and Widgets */
body > .skiptranslate {
  display: none !important;
}

.VIpgJd-Zvi9od-aZ2wEe-wOHMyf, 
.VIpgJd-Zvi9od-aZ2wEe-wOHMyf-ti6hGc,
.VIpgJd-Zvi9od-l4eHX-hSRGPd,
#goog-gt-, 
.goog-logo-link, 
.goog-te-gadget, 
.goog-te-gadget-simple, 
.goog-te-banner-frame,
iframe.goog-te-banner-frame,
iframe[id^=":1.container"],
.goog-te-balloon-frame {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
`;

code = code + newCSS;
fs.writeFileSync('src/app/globals.css', code);
