const fs = require('fs');
const file = 'src/app/actions.ts';
let code = fs.readFileSync(file, 'utf8');

// Replace drive import
code = code.replace(/import { uploadToDrive } from "@\/lib\/drive";/g, 'import { uploadFileToSupabase } from "@/lib/storage";');

// Update submitCvWithFile
const oldUploadCv = /const link = await uploadToDrive\(buffer, fileName, file\.type, folderId\);/g;
code = code.replace(oldUploadCv, "const link = await uploadFileToSupabase(buffer, fileName, file.type);");

// Remove folderId checks in submitCvWithFile
const folderCheckCv = /if \(\!folderId\) \{\n\s*return \{ success: false, error: "Admin paneldə Google Drive qovluq ID-si təyin edilməyib!" \};\n\s*\}/g;
code = code.replace(folderCheckCv, "");

// Update addServicePdfWithFile
const oldUploadService = /const link = await uploadToDrive\(buffer, fileName, file\.type, folderId\);/g;
code = code.replace(oldUploadService, "const link = await uploadFileToSupabase(buffer, fileName, file.type);");

// Remove folderId checks in addServicePdfWithFile
const folderCheckService = /if \(\!folderId\) \{\n\s*return \{ success: false, error: "Admin paneldə Google Drive qovluq ID-si təyin edilməyib!" \};\n\s*\}/g;
code = code.replace(folderCheckService, "");

fs.writeFileSync(file, code);
