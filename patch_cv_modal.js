const fs = require('fs');
const file = 'src/app/cv-yukle/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Add modal open state
code = code.replace("const [selectedFile, setSelectedFile] = useState<File | null>(null);", "const [selectedFile, setSelectedFile] = useState<File | null>(null);\n  const [isModalOpen, setIsModalOpen] = useState(false);");

// Add button to open modal and wrap form in AnimatePresence
// Replace the entire left column
const regexLeftCol = /<div className="w-full lg:w-1\/3 flex flex-col gap-6">[\s\S]*?<\/div>(\s+)<div className="w-full lg:w-2\/3 flex flex-col gap-6">/;

// The form string
let formString = `<AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto relative"
              >
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-dark-bg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-2xl font-bold text-dark-bg mb-2">CV Yüklə</h2>
                <p className="text-sm text-gray-500 mb-6">Məlumatlarınızı daxil edin</p>
                
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Adınız *</label>
                      <input type="text" name="first_name" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="Tural" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Soyadınız *</label>
                      <input type="text" name="last_name" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="Məmmədov" />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">E-poçt ünvanınız *</label>
                      <input type="email" name="email" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="numune@email.com" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Əlaqə nömrəsi *</label>
                      <input type="tel" name="phone" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="+994 50 123 45 67" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Bacarıqlar / İxtisas *</label>
                      <textarea name="skills" required rows={3} className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm resize-none" placeholder="Məsələn: SƏTƏM mütəxəssisi, ISO standartları..."></textarea>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">CV Yüklə (PDF)</label>
                      <input type="file" name="pdf_file" accept=".pdf" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Profil Şəkli (İstəyə bağlı)</label>
                      <label className={\`w-full border-2 border-dashed \${selectedFile ? 'border-accent-hover bg-accent/5' : 'border-dark-bg/20'} rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent-hover hover:bg-accent/5 transition-colors\`}>
                        <UploadCloud className={\`w-5 h-5 \${selectedFile ? 'text-accent-hover' : 'text-foreground/40'}\`} />
                        <span className="text-xs font-medium text-foreground/60 text-center">
                          {selectedFile ? selectedFile.name : "Şəkil yükləmək üçün klikləyin"}
                        </span>
                        <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="hidden" />
                      </label>
                    </div>

                    <button disabled={isSubmitting} type="submit" className="w-full bg-accent-hover hover:bg-[#349b65] text-white font-bold py-3 rounded-lg transition-colors duration-300 text-sm mt-2 disabled:opacity-50">
                      {isSubmitting ? "Yüklənir..." : "CV Yerləşdir"}
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                    <h2 className="text-2xl font-bold text-dark-bg">Təşəkkürlər!</h2>
                    <p className="text-sm text-foreground/70">
                      Məlumatlarınız CV lövhəsinə uğurla əlavə edildi.
                    </p>
                    <button onClick={() => { setSubmitted(false); setIsModalOpen(false); }} className="mt-4 bg-dark-bg text-white px-6 py-2 rounded-lg">Bağla</button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full flex flex-col gap-6">`;

code = code.replace(regexLeftCol, formString);

// Add button to right column header
code = code.replace(
  `<h2 className="text-2xl font-bold text-dark-bg">Aktiv CV-lər / Elanlar</h2>`,
  `<h2 className="text-2xl font-bold text-dark-bg">Aktiv CV-lər / Elanlar</h2>
            <button onClick={() => setIsModalOpen(true)} className="bg-accent hover:bg-accent-hover text-dark-bg font-bold py-2 px-6 rounded-lg transition-colors text-sm">
              + CV Yüklə
            </button>`
);

// Add AnimatePresence to imports
if(!code.includes("AnimatePresence")) {
  code = code.replace('import { motion } from "framer-motion";', 'import { motion, AnimatePresence } from "framer-motion";');
}

fs.writeFileSync(file, code);
