const fs = require('fs');
const file = 'src/app/adminpanel/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Import Phone
code = code.replace('import { LayoutDashboard, FileText, MessageSquare', 'import { LayoutDashboard, FileText, MessageSquare, Phone');

// Add isSubmitting state
code = code.replace('const [loading, setLoading] = useState(true);', 'const [loading, setLoading] = useState(true);\n  const [isSubmitting, setIsSubmitting] = useState(false);');

fs.writeFileSync(file, code);
