const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Remove getSettings and useEffect
code = code.replace(/import \{ getSettings \} from "@\/app\/actions";\n?/, '');

// Add prop
code = code.replace('export default function Hero() {', 'export default function Hero({ bgImage }: { bgImage?: string }) {');

// Remove useState and useEffect
const hooks = `  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    getSettings().then(res => {
      if(res?.home_image_1) setImgUrl(res.home_image_1);
    });
  }, []);`;
code = code.replace(hooks, '');

// Replace imgUrl with bgImage
code = code.replace(/imgUrl/g, 'bgImage');

fs.writeFileSync('src/components/Hero.tsx', code);
