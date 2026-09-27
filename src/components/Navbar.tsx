"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex items-center justify-between py-6 px-6 md:px-16 absolute top-0 left-0 right-0 z-50 bg-transparent"
    >
      <Link href="/" className="flex items-center gap-4 group">
        {/* Smaller Logo */}
        <div className="relative w-16 h-16 overflow-hidden rounded-full border border-white/10 group-hover:border-accent transition-colors duration-500">
          <Image 
            src="/ProLogo.png" 
            alt="TMHSE Logo" 
            fill 
            className="object-contain p-1"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-wider uppercase text-white drop-shadow-md">TMHSE</span>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-10 text-sm font-medium">
        <Link href="/haqqimizda" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname === '/haqqimizda' ? 'text-accent' : 'text-white'}`}>Haqqımızda</Link>
        <Link href="/xidmetler" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname === '/xidmetler' ? 'text-accent' : 'text-white'}`}>Xidmətlər</Link>
        <Link href="/vakansiyalar" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname === '/vakansiyalar' ? 'text-accent' : 'text-white'}`}>Vakansiyalar</Link>
        <Link 
          href="/elaqe" 
          className="flex items-center gap-2 bg-white/5 border border-accent/30 text-accent px-5 py-2.5 rounded-full hover:bg-accent hover:text-dark-bg transition-all duration-300 hover:scale-105"
        >
          Əlaqə
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.nav>
  );
}
