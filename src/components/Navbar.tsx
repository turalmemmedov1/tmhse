"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex items-center justify-between py-6 px-6 md:px-16"
    >
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-accent/20">
          <Image 
            src="/ProLogo.png" 
            alt="TMHSE Logo" 
            fill 
            className="object-cover scale-[1.2]"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-2xl tracking-wider uppercase text-white drop-shadow-md">TMHSE</span>
          <span className="text-xs text-accent tracking-[0.3em] font-medium uppercase">Health • Safety • Environment</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-10 text-base font-medium">
        <Link href="#haqqinda" className="hover:text-accent transition-all duration-300 hover:scale-110">Haqqımızda</Link>
        <Link href="#xidmetler" className="hover:text-accent transition-all duration-300 hover:scale-110">Xidmətlər</Link>
        <Link href="#yanasma" className="hover:text-accent transition-all duration-300 hover:scale-110">Yanaşma</Link>
        <Link 
          href="#elaqe" 
          className="flex items-center gap-2 border border-accent/50 text-accent px-6 py-2.5 rounded-full hover:bg-accent hover:text-dark-bg transition-all duration-300 hover:scale-105"
        >
          Əlaqə
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
    </motion.nav>
  );
}
