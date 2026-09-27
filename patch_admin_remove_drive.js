const fs = require('fs');
const file = 'src/app/adminpanel/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Remove Drive tab from menu
code = code.replace(/,\n\s*\{id:'drive', icon: FolderIcon, title: 'Google Drive İnteqrasiyası'\}/g, "");

// Remove Drive Tab UI
const driveUIRegex = /\{activeTab === 'drive' && \([\s\S]*?\}\)\}\n/g;
code = code.replace(driveUIRegex, "");

fs.writeFileSync(file, code);
