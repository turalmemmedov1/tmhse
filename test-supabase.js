const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env', 'utf8');
let URL = "";
let KEY = "";
env.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) URL = line.split('=')[1];
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) KEY = line.split('=')[1];
});

const supabase = createClient(URL, KEY);

async function run() {
  const { data, error } = await supabase.storage.listBuckets();
  console.log("Buckets:", data);
  if (error) console.log("Error:", error);
}
run();
