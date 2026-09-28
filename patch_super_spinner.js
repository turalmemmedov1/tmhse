const fs = require('fs');
let code = fs.readFileSync('src/app/globals.css', 'utf8');

// Find the existing spinner CSS and replace it with an absolute nuke
const target = /\/\* Aggressively hide all Google Translate loading spinners \*\/[\s\S]*?z-index: -9999 !important;\n}/;

const nukeCSS = `/* NUCLEAR OPTION for Google Translate Spinner and Artifacts */
.goog-te-spinner-pos,
.goog-te-spinner-animation,
.goog-te-spinner-margin,
.goog-te-spinner,
[class*="goog-te-spinner"],
[class*="VIpgJd-Zvi9od"],
[id*="goog-gt-"],
.goog-logo-link,
.goog-te-gadget-simple img,
img[src*="translate.googleapis.com"],
img[src*="translate.google.com"],
img[src*="gstatic.com/images/branding/googlelogo"],
.skiptranslate iframe,
body > .skiptranslate,
#google_translate_element * {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    width: 0 !important;
    height: 0 !important;
    min-width: 0 !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    animation: none !important;
    transition: none !important;
    pointer-events: none !important;
    z-index: -999999 !important;
    background: transparent !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
    border: none !important;
    transform: scale(0) !important;
    clip-path: circle(0) !important; 
    clip: rect(0,0,0,0) !important;
}

#google_translate_element {
    position: absolute !important;
    top: -9999px !important;
    left: -9999px !important;
    width: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
    opacity: 0 !important;
    z-index: -9999 !important;
    clip: rect(0,0,0,0) !important;
    clip-path: inset(100%) !important;
}

body {
    top: 0 !important;
    position: static !important;
}`;

if (code.match(target)) {
    code = code.replace(target, nukeCSS);
} else {
    code += "\n" + nukeCSS;
}

fs.writeFileSync('src/app/globals.css', code);
