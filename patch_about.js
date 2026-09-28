const fs = require('fs');
let code = fs.readFileSync('src/components/About.tsx', 'utf8');

// Remove getSettings and useEffect
code = code.replace(/import \{ getSettings \} from "@\/app\/actions";\n?/, '');

// Add prop
code = code.replace('export default function About() {', 'export default function About({ bgImage }: { bgImage?: string }) {');

// Remove useState and useEffect
const hooks = `  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    getSettings().then(res => {
      if(res?.home_image_2) setImgUrl(res.home_image_2);
    });
  }, []);`;
code = code.replace(hooks, '');

// Replace imgUrl with bgImage
code = code.replace(/imgUrl/g, 'bgImage');

fs.writeFileSync('src/components/About.tsx', code);
