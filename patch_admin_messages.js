const fs = require('fs');
const file = 'src/app/adminpanel/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Imports
code = code.replace('deleteTemplate\n} from', 'deleteTemplate, getMessages, deleteMessage\n} from');
if (!code.includes("MessageSquare")) {
  code = code.replace('import { LayoutDashboard', 'import { LayoutDashboard, MessageSquare');
}

// State
code = code.replace('const [templates, setTemplates] = useState<any[]>([]);', 'const [templates, setTemplates] = useState<any[]>([]);\n  const [messages, setMessages] = useState<any[]>([]);');

// Load Data
code = code.replace('setTemplates(await getTemplates());', 'setTemplates(await getTemplates());\n    setMessages(await getMessages());');

// Tabs
const oldTabs = `{id:'templates', icon: FileText, title: 'Şablonlar'},`;
code = code.replace(oldTabs, oldTabs + "\n            {id:'messages', icon: MessageSquare, title: 'Gələn Mesajlar'},");

// UI Block
const messagesUI = `
            {activeTab === 'messages' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-dark-bg/5">
                  <h3 className="font-bold text-lg text-dark-bg mb-6">Saytdan Gələn Mesajlar</h3>
                  <div className="flex flex-col gap-4">
                    {messages.length === 0 ? <p className="text-sm text-gray-500">Heç bir mesaj yoxdur.</p> : messages.map(m => (
                      <div key={m.id} className="border border-dark-bg/10 rounded-xl p-6 flex flex-col gap-3 relative group">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-dark-bg">{m.full_name}</h4>
                            <a href={\`mailto:\${m.email}\`} className="text-accent text-sm font-medium hover:underline">{m.email}</a>
                          </div>
                          <span className="text-xs text-gray-400">{new Date(m.created_at).toLocaleString('az-AZ')}</span>
                        </div>
                        <div className="bg-background p-4 rounded-lg text-sm text-foreground/80 mt-2 whitespace-pre-wrap">
                          {m.content}
                        </div>
                        <button onClick={async () => {
                          if(confirm("Silmək istədiyinizə əminsiniz?")) {
                            await deleteMessage(m.id);
                            loadData();
                          }
                        }} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
`;

code = code.replace('          </div>\n        )}\n      </div>', messagesUI + "\n          </div>\n        )}\n      </div>");

fs.writeFileSync(file, code);
