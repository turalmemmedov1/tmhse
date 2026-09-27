const fs = require('fs');
const file = 'src/app/cv-yukle/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace addCv with submitCvWithFile
code = code.replace(/import { addCv, getCvs } from "@\/app\/actions";/, 'import { submitCvWithFile, getCvs } from "@/app/actions";');

// Update handleSubmit
const oldSubmit = `  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    let image_url = "";
    if (selectedFile) {
      const url = await uploadToImgbb(selectedFile);
      if (url) image_url = url;
    }

    const cvData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      skills: formData.get("skills") as string,
      cv_drive_link: formData.get("cv_drive_link") as string || "",
      image_url
    };

    const res = await addCv(cvData);
    if (res.success) {
      setSubmitted(true);
    } else {
      alert("Xəta baş verdi");
    }
    setIsSubmitting(false);
  };`;

const newSubmit = `  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    let image_url = "";
    if (selectedFile) {
      const url = await uploadToImgbb(selectedFile);
      if (url) image_url = url;
    }
    formData.append("image_url", image_url);

    const res = await submitCvWithFile(formData);
    if (res.success) {
      setSubmitted(true);
    } else {
      alert(res.error || "Xəta baş verdi");
    }
    setIsSubmitting(false);
  };`;

code = code.replace(oldSubmit, newSubmit);

// Update HTML form input for CV
const oldInput = `<div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">CV (Google Drive Linki)</label>
                <input type="url" name="cv_drive_link" className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="https://drive.google.com/..." />
              </div>`;

const newInput = `<div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-dark-bg">CV Yüklə (PDF)</label>
                <input type="file" name="pdf_file" accept=".pdf" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" />
              </div>`;

code = code.replace(oldInput, newInput);

fs.writeFileSync(file, code);
