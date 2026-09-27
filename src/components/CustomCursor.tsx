"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsMobile(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, isMobile, isVisible]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-accent pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          opacity: isVisible ? 1 : 0
        }}
      />
    </>
  );
}
