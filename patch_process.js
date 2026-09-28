const fs = require('fs');
const file = 'src/components/Process.tsx';
let code = fs.readFileSync(file, 'utf8');

// Import icons
code = code.replace('import LedLight from "./LedLight";', 'import LedLight from "./LedLight";\nimport { Search, ClipboardCheck, GraduationCap, TrendingUp } from "lucide-react";');

// Update steps array
const oldSteps = /const steps = \[\s*\{\s*id: "01",[\s\S]*?\}\s*\];/;
const newSteps = `const steps = [
  {
    icon: Search,
    title: "Tanışlıq və təhlil",
    desc: "Fəaliyyətin, iş mühitinin və ilkin ehtiyacların öyrənilməsi."
  },
  {
    icon: ClipboardCheck,
    title: "Planlaşdırma",
    desc: "Prioritetlərin və tətbiq ediləcək təhlükəsizlik tədbirlərinin müəyyənləşdirilməsi."
  },
  {
    icon: GraduationCap,
    title: "Tətbiq və təlim",
    desc: "Razılaşdırılmış tədbirlərin həyata keçirilməsi və komandanın məlumatlandırılması."
  },
  {
    icon: TrendingUp,
    title: "İzləmə və inkişaf",
    desc: "Nəticələrin nəzərdən keçirilməsi və yanaşmanın davamlı təkmilləşdirilməsi."
  }
];`;
code = code.replace(oldSteps, newSteps);

// Update render
const oldRender = /<span className="text-accent font-bold text-xl mb-4 group-hover:scale-110 origin-left transition-transform duration-500">\{step\.id\}<\/span>/;
const newRender = `<div className="text-accent mb-4 group-hover:scale-110 origin-left transition-transform duration-500">
                <step.icon className="w-8 h-8" />
              </div>`;
code = code.replace(oldRender, newRender);

// Replace key={step.id} with key={step.title}
code = code.replace(/key=\{step\.id\}/, "key={step.title}");

fs.writeFileSync(file, code);
