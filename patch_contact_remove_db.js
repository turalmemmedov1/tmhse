const fs = require('fs');
let code = fs.readFileSync('src/app/elaqe/page.tsx', 'utf8');

const target = `              // 1. Save to Database (Admin Panel)
              const res = await submitContactMessage(formData);
              
              // 2. Send Email via FormSubmit
              try {
                await fetch("https://formsubmit.co/ajax/info@hsetms.com", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        name: formData.get("fullName"),
                        email: formData.get("email"),
                        message: formData.get("message")
                    })
                });
              } catch (err) {
                console.error("Email API xətası:", err);
              }
              
              setIsLoading(false);
              if (res.success) {
                setSuccess(true);`;

const newCode = `              
              try {
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
                  setSuccess(true);`;

code = code.replace(target, newCode);
fs.writeFileSync('src/app/elaqe/page.tsx', code);
