"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex items-center justify-between py-4 px-6 md:px-16 absolute top-0 left-0 right-0 z-[60] bg-transparent"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-full border-2 border-white/20 bg-white group-hover:border-accent transition-colors duration-500 flex items-center justify-center p-1">
            <Image 
              src="/ProLogo.png" 
              alt="TMHSE Logo" 
              fill 
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl tracking-wider uppercase text-white drop-shadow-md">TMHSE</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link href="/haqqimizda" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname === '/haqqimizda' ? 'text-accent' : 'text-white'}`}>Haqqımızda</Link>
          <Link href="/xidmetler" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname === '/xidmetler' ? 'text-accent' : 'text-white'}`}>Xidmətlər</Link>
          <Link href="/vakansiyalar" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname === '/vakansiyalar' ? 'text-accent' : 'text-white'}`}>Vakansiyalar</Link>
          <a href="mailto:hr@tmhse.expert" className="transition-all duration-300 text-white hover:text-accent hover:scale-105">CV Göndər</a>
          <Link 
            href="/elaqe" 
            className="flex items-center gap-2 bg-white/5 border border-accent/30 text-accent px-5 py-2.5 rounded-full hover:bg-accent hover:text-dark-bg transition-all duration-300 hover:scale-105 ml-4"
          >
            Əlaqə
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-8 h-8" />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[70] bg-dark-bg flex flex-col w-full h-full p-6 lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-12 mt-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-accent bg-white p-1">
                  <Image src="/ProLogo.png" alt="TMHSE Logo" fill className="object-cover rounded-full" />
                </div>
                <span className="font-bold text-xl tracking-wider uppercase text-white">TMHSE</span>
              </Link>
              <button 
                className="text-white p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-xl font-bold text-white mb-auto">
              <Link href="/haqqimizda" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-4 active:text-accent">Haqqımızda</Link>
              <Link href="/xidmetler" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-4 active:text-accent">Xidmətlər</Link>
              <Link href="/vakansiyalar" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-4 active:text-accent">Vakansiyalar</Link>
              <Link href="/elaqe" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-4 active:text-accent">Əlaqə</Link>
              <a href="mailto:hr@tmhse.expert" onClick={() => setMobileMenuOpen(false)} className="text-accent border-b border-white/10 pb-4">CV Göndər</a>
            </div>

            <div className="mt-12 flex flex-col gap-6">
              <span className="text-text-muted text-sm tracking-widest uppercase">Bizi İzləyin</span>
              <div className="flex items-center gap-6">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white active:border-accent active:text-accent transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white active:border-accent active:text-accent transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
