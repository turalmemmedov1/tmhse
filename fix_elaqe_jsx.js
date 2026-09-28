const fs = require('fs');
let code = fs.readFileSync('src/app/elaqe/page.tsx', 'utf8');

const target = `              try {
                const response = await fetch("https://formsubmit.co/ajax/info@hsetms.com", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        name: formData.get("fullName"),
                        email: formData.get("email"),
                        message: formData.get("message")
                    })
                });
                
                setIsLoading(false);
                if (response.ok) {
                  setSuccess(true);
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setSuccess(false), 5000);
              } else {
                alert("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
              }
            }}`;

const fixed = `              try {
                const response = await fetch("https://formsubmit.co/ajax/info@hsetms.com", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        name: formData.get("fullName"),
                        email: formData.get("email"),
                        message: formData.get("message")
                    })
                });
                
                setIsLoading(false);
                if (response.ok) {
                  setSuccess(true);
                  (e.target as HTMLFormElement).reset();
                  setTimeout(() => setSuccess(false), 5000);
                } else {
                  alert("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
                }
              } catch (error) {
                setIsLoading(false);
                alert("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
              }
            }}`;

code = code.replace(target, fixed);
fs.writeFileSync('src/app/elaqe/page.tsx', code);
