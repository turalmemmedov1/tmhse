const fs = require('fs');
const file = 'src/app/actions.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /Fayl sistemə yüklənərkən xəta baş verdi\. Zəhmət olmasa Supabase-də 'pdfs' adlı Storage qovluğunu \(Bucket\) yaratdığınıza əmin olun\./g,
  "Fayl yüklənərkən xəta baş verdi. "
);

fs.writeFileSync(file, code);

const storageFile = 'src/lib/storage.ts';
let storageCode = fs.readFileSync(storageFile, 'utf8');
storageCode = storageCode.replace(/return null;/g, "throw new Error(error?.message || 'Bilinməyən xəta');");
fs.writeFileSync(storageFile, storageCode);
