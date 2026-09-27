"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex items-center justify-between py-6 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="flex items-center gap-3">
        {/* Placeholder for Logo - In a real app this would be an img or svg */}
        <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-hover rounded-full flex items-center justify-center text-dark-bg font-bold text-xl">
          HSE
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-wide uppercase">Tural Mammadov</span>
          <span className="text-[10px] text-text-muted tracking-[0.2em]">Health • Safety • Environment</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm">
        <Link href="#haqqinda" className="hover:text-accent transition-colors">Haqqında</Link>
        <Link href="#xidmetler" className="hover:text-accent transition-colors">Xidmətlər</Link>
        <Link href="#yanasma" className="hover:text-accent transition-colors">Yanaşma</Link>
        <Link 
          href="#elaqe" 
          className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
        >
          Əlaqə
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.nav>
  );
}
