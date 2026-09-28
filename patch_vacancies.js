const fs = require('fs');
let code = fs.readFileSync('src/app/vakansiyalar/page.tsx', 'utf8');

const oldWrapper = `<div className="w-full flex flex-col gap-4 mt-4">`;
const newWrapper = `<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">`;

code = code.replace(oldWrapper, newWrapper);

const oldCard = `className="bg-white p-6 rounded-2xl shadow-sm border border-dark-bg/5 flex flex-col md:flex-row justify-between gap-6 group hover:shadow-md transition-shadow"`;
const newCard = `className="bg-white p-6 rounded-3xl shadow-sm border border-dark-bg/5 flex flex-col justify-between gap-6 group hover:shadow-md transition-shadow relative overflow-hidden h-full min-h-[300px]"`;
code = code.replace(oldCard, newCard);

const oldButtonArea = `<div className="flex flex-col items-start md:items-end justify-center shrink-0">
                  <a href={\`mailto:\${vac.contact_email}\`} className="bg-dark-bg text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl hover:bg-accent-hover transition-colors shadow-md">
                    Müraciət Et
                  </a>
                </div>`;
const newButtonArea = `<div className="flex flex-col items-start w-full shrink-0 mt-auto pt-4 border-t border-dark-bg/5">
                  <a href={\`mailto:\${vac.contact_email}\`} className="w-full text-center bg-dark-bg text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl hover:bg-accent-hover transition-colors shadow-md">
                    Müraciət Et
                  </a>
                </div>`;
code = code.replace(oldButtonArea, newButtonArea);

fs.writeFileSync('src/app/vakansiyalar/page.tsx', code);
