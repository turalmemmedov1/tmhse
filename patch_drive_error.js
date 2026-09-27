const fs = require('fs');
const file = 'src/lib/drive.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /catch \(error\) {\n\s*console\.error\("Google Drive Upload Error:", error\);\n\s*return null;\n\s*}/g,
  \`catch (error: any) {
    console.error("Google Drive Upload Error:", error);
    throw new Error(error.message || JSON.stringify(error));
  }\`
);

fs.writeFileSync(file, code);

const actionsFile = 'src/app/actions.ts';
let actionsCode = fs.readFileSync(actionsFile, 'utf8');

actionsCode = actionsCode.replace(
  /if \(!link\) {\n\s*return { success: false, error: "Fayl Google Drive-a yüklənərkən xəta baş verdi." };\n\s*}/g,
  ""
);

fs.writeFileSync(actionsFile, actionsCode);
