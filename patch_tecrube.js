const fs = require('fs');
let code = fs.readFileSync('src/app/tecrube/page.tsx', 'utf8');

if (!code.includes('import Link')) {
  code = code.replace('import { Search } from "lucide-react";', 'import { Search } from "lucide-react";\nimport Link from "next/link";');
}

const cardOld = `<div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col md:flex-row">
                {item.image_url && <img src={item.image_url} alt={item.title} className="w-full md:w-48 h-48 md:h-auto object-cover" />}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-dark-bg mb-2">{item.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 flex-1 whitespace-pre-wrap">{item.content}</p>
                  <span className="text-xs font-bold text-gray-400 mt-auto">{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              </div>`;

const cardNew = `<Link href={\`/tecrube/\${item.id}\`} key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col md:flex-row group hover:shadow-md transition-shadow">
                {item.image_url && <img src={item.image_url} alt={item.title} className="w-full md:w-48 h-48 md:h-auto object-cover" />}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-dark-bg mb-2 group-hover:text-accent-hover transition-colors">{item.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{item.content}</p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-400">{new Date(item.created_at).toLocaleDateString()}</span>
                    <span className="text-xs font-bold text-accent group-hover:underline">Ətraflı oxu</span>
                  </div>
                </div>
              </Link>`;

code = code.replace(cardOld, cardNew);

fs.writeFileSync('src/app/tecrube/page.tsx', code);
