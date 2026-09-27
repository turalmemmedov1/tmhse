const fs = require('fs');
const file = 'src/app/cv-yukle/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Find everything from "const cvData = {" up to "setIsSubmitting(false);" and replace it with submitCvWithFile(formData)
const regex = /const cvData = \{[\s\S]*?setIsSubmitting\(false\);\n  \};/g;

code = code.replace(regex, `formData.append("image_url", image_url);
    const res = await submitCvWithFile(formData);
    if (res.success) {
      setSubmitted(true);
    } else {
      alert(res.error || "Xəta baş verdi");
    }
    setIsSubmitting(false);
  };`);

fs.writeFileSync(file, code);
