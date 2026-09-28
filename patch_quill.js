const fs = require('fs');
let code = fs.readFileSync('src/components/QuillInput.tsx', 'utf8');

code = code.replace(/react-quill/g, 'react-quill-new');

fs.writeFileSync('src/components/QuillInput.tsx', code);
