const fs = require('fs');

async function test() {
    const formData = new FormData();
    const blob = new Blob(["test image content..."], { type: "image/png" });
    formData.append("image", blob, "test.png");
    
    try {
        const res = await fetch("https://api.imgbb.com/1/upload?key=20abda44a0d3884534125abafccaf556", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        console.log(data);
    } catch(e) {
        console.error(e);
    }
}
test();
