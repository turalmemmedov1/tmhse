const fs = require('fs');
const file = 'src/app/adminpanel/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace addServicePdf with addServicePdfWithFile in import
code = code.replace("addServicePdf,", "addServicePdf, addServicePdfWithFile,");

// Update the Add PDF form
const oldForm = `                    {/* Add PDF */}
                    <form onSubmit={async(e)=>{
                      e.preventDefault(); 
                      const fd=new FormData(e.currentTarget); 
                      const t = toast.loading("Əlavə edilir...");
                      await addServicePdf(fd.get('service_id') as string, fd.get('title') as string, fd.get('drive_link') as string); 
                      toast.success('Əlavə edildi', { id: t }); 
                      (e.target as any).reset(); 
                      loadData();
                    }} className="flex flex-col gap-4">
                      <h4 className="text-sm font-bold text-dark-bg border-b pb-2">PDF (Drive Link) Əlavə Et</h4>
                      <select name="service_id" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent">
                        <option value="emeyin-muhafizesi">Əməyin Mühafizəsi</option>
                        <option value="yanqina-qarsi-mubarize">Yanğına Qarşı Mübarizə</option>
                        <option value="hundurlukde-is">Hündürlükdə İş</option>
                        <option value="etraf-muhitin-muhafizesi">Ətraf Mühitin Mühafizəsi</option>
                        <option value="texniki-tehlukesizlik">Texniki Təhlükəsizlik</option>
                        <option value="ilk-yardim">İlk Yardım</option>
                      </select>
                      <input type="text" name="title" required placeholder="PDF Adı (məs: Təlimat)" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                      <input type="url" name="drive_link" required placeholder="Drive Linki (https://drive...)" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                      <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold mt-2">Yadda Saxla</button>
                    </form>`;

const newForm = `                    {/* Add PDF */}
                    <form onSubmit={async(e)=>{
                      e.preventDefault(); 
                      const fd=new FormData(e.currentTarget); 
                      const t = toast.loading("PDF Google Drive-a Yüklənir...");
                      const res = await addServicePdfWithFile(fd); 
                      if (res.success) {
                        toast.success('Əlavə edildi', { id: t }); 
                        (e.target as any).reset(); 
                        loadData();
                      } else {
                        toast.error(res.error || "Xəta baş verdi", { id: t });
                      }
                    }} className="flex flex-col gap-4">
                      <h4 className="text-sm font-bold text-dark-bg border-b pb-2">PDF Yüklə</h4>
                      <select name="service_id" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent">
                        <option value="emeyin-muhafizesi">Əməyin Mühafizəsi</option>
                        <option value="yanqina-qarsi-mubarize">Yanğına Qarşı Mübarizə</option>
                        <option value="hundurlukde-is">Hündürlükdə İş</option>
                        <option value="etraf-muhitin-muhafizesi">Ətraf Mühitin Mühafizəsi</option>
                        <option value="texniki-tehlukesizlik">Texniki Təhlükəsizlik</option>
                        <option value="ilk-yardim">İlk Yardım</option>
                      </select>
                      <input type="text" name="title" required placeholder="PDF Adı (məs: Təlimat)" className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                      <input type="file" name="pdf_file" accept=".pdf" required className="w-full bg-background border border-dark-bg/10 rounded-lg px-4 py-2 text-sm focus:border-accent" />
                      <button type="submit" className="bg-dark-bg text-white px-6 py-2 rounded-lg text-sm font-bold mt-2">Yüklə və Yadda Saxla</button>
                    </form>`;

code = code.replace(oldForm, newForm);
fs.writeFileSync(file, code);
