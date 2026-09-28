const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function run() {
    const { data } = await sb.from("settings").select("*");
    console.log(data.filter(d => d.setting_key.includes("image")));
}
run();
