"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLightPage = ["/xidmetler", "/elaqe", "/cv-yukle", "/vakansiyalar", "/siyasetler", "/tecrube", "/qanunvericilik", "/xeberler", "/suallar"].some(p => pathname.startsWith(p));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBgClass = scrolled 
    ? (isLightPage ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-dark-bg/5" : "bg-dark-bg/95 backdrop-blur-md shadow-lg border-b border-white/5")
    : "bg-transparent";

  const textColorClass = isLightPage ? "text-dark-bg" : "text-white";

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full flex items-center justify-between py-3 px-6 md:px-16 fixed top-0 left-0 right-0 z-[60] transition-colors duration-500 ${navBgClass}`}
      >
        <Link 
          href="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center gap-3 group"
        >
          <div className="relative w-12 h-12 overflow-hidden rounded-full flex items-center justify-center">
            <Image 
              src="/ProLogo.png" 
              alt="TMHSE Logo" 
              fill 
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-black text-xl tracking-[0.2em] uppercase transition-colors leading-none ${textColorClass}`}>
              TMHSE
            </span>
            <span className={`text-[8px] font-bold tracking-wider uppercase opacity-70 mt-1 transition-colors ${textColorClass} hidden sm:block`}>
              Tural Məmmədov &bull; Health Safety Environment
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className={`hidden lg:flex items-center gap-6 text-sm font-bold transition-colors ${textColorClass}`}>
          <Link href="/xidmetler" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname.startsWith('/xidmetler') ? 'text-accent' : ''}`}>Xidmətlər</Link>
          <Link href="/tecrube" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname === '/tecrube' ? 'text-accent' : ''}`}>Təcrübə Proqramı</Link>
          <Link href="/qanunvericilik" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname === '/qanunvericilik' ? 'text-accent' : ''}`}>Qanunvericilik</Link>
          <Link href="/xeberler" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname === '/xeberler' ? 'text-accent' : ''}`}>Xəbərlər</Link>
          <Link href="/vakansiyalar" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname === '/vakansiyalar' ? 'text-accent' : ''}`}>Vakansiyalar</Link>
          <Link href="/cv-yukle" className={`transition-all duration-300 hover:text-accent hover:scale-105 ${pathname === '/cv-yukle' ? 'text-accent' : ''}`}>CV Yüklə</Link>
          <Link 
            href="/elaqe" 
            className="flex items-center gap-2 bg-accent/10 border border-accent/50 text-accent px-5 py-2.5 rounded-full hover:bg-accent hover:text-dark-bg transition-all duration-300 hover:scale-105 ml-2"
          >
            Əlaqə
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className={`lg:hidden p-2 transition-colors ${textColorClass}`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-7 h-7" />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-dark-bg flex flex-col w-full h-full p-6 lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-12 mt-2 w-full">
              <Link 
                href="/" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="flex items-center gap-3 mx-auto"
              >
                <div className="relative w-12 h-12 overflow-hidden rounded-full flex items-center justify-center">
                  <Image src="/ProLogo.png" alt="TMHSE Logo" fill className="object-cover rounded-full" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl tracking-[0.2em] uppercase text-white leading-none">
                    TMHSE
                  </span>
                  <span className="text-[8px] font-bold tracking-wider uppercase text-white/70 mt-1">
                    Tural Məmmədov &bull; HSE
                  </span>
                </div>
              </Link>
              <button 
                className="text-white p-2 absolute right-6 top-8"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-lg font-bold text-white mb-auto text-center mt-8">
              <Link href="/xidmetler" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-3 active:text-accent">Xidmətlər</Link>
              <Link href="/tecrube" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-3 active:text-accent">Təcrübə Proqramı</Link>
              <Link href="/qanunvericilik" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-3 active:text-accent">Qanunvericilik</Link>
              <Link href="/xeberler" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-3 active:text-accent">Xəbərlər</Link>
              <Link href="/vakansiyalar" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-3 active:text-accent">Vakansiyalar</Link>
              <Link href="/cv-yukle" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-3 active:text-accent">CV Yüklə</Link>
              <Link href="/elaqe" onClick={() => setMobileMenuOpen(false)} className="text-accent border-b border-white/10 pb-3">Əlaqə</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
