const fs = require('fs');
const file = 'src/app/vakansiyalar/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Add modal open state
code = code.replace("const [isSubmitting, setIsSubmitting] = useState(false);", "const [isSubmitting, setIsSubmitting] = useState(false);\n  const [isModalOpen, setIsModalOpen] = useState(false);");

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
                <h2 className="text-2xl font-bold text-dark-bg mb-2">Vakansiya Yerləşdir</h2>
                <p className="text-sm text-gray-500 mb-6">Şirkətiniz üçün SƏTƏM mütəxəssisi axtarırsınız?</p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Şirkətin adı *</label>
                      <input type="text" name="company" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="Məs: SOCAR" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Vəzifə (Rol) *</label>
                      <input type="text" name="role" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="SƏTƏM Mühəndisi" />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Ünvan / Şəhər *</label>
                      <input type="text" name="location" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="Bakı" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">İş qrafiki</label>
                      <select name="type" className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm">
                        <option>Tam ştat</option>
                        <option>Yarım ştat</option>
                        <option>Təcrübə proqramı</option>
                        <option>Müqavilə əsasında</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Tələblər / Təsvir *</label>
                      <textarea name="desc" required rows={3} className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm resize-none" placeholder="Vakansiya barədə məlumat..."></textarea>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-dark-bg">Əlaqə E-poçtu *</label>
                      <input type="email" name="contact" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-hover text-sm" placeholder="hr@sirket.az" />
                    </div>

                    <button disabled={isSubmitting} type="submit" className="w-full bg-dark-bg hover:bg-accent-hover text-white font-bold py-3 rounded-lg transition-colors duration-300 text-sm mt-2 disabled:opacity-50">
                      {isSubmitting ? "Yüklənir..." : "Elan Əlavə Et"}
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                    <h2 className="text-xl font-bold text-dark-bg">Uğurla Yerləşdirildi!</h2>
                    <p className="text-sm text-foreground/70">Elanınız vakansiyalar siyahısına əlavə olundu.</p>
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
  `<h2 className="text-2xl font-bold text-dark-bg">Aktiv Vakansiyalar</h2>`,
  `<h2 className="text-2xl font-bold text-dark-bg">Aktiv Vakansiyalar</h2>
            <button onClick={() => setIsModalOpen(true)} className="bg-accent hover:bg-accent-hover text-dark-bg font-bold py-2 px-6 rounded-lg transition-colors text-sm">
              + Vakansiya Yerləşdir
            </button>`
);

// Add AnimatePresence to imports
if(!code.includes("AnimatePresence")) {
  code = code.replace('import { motion } from "framer-motion";', 'import { motion, AnimatePresence } from "framer-motion";');
}

fs.writeFileSync(file, code);
