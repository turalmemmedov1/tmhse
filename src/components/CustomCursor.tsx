"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth, springy animation for outer circle
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

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
      {/* Outer animated ring */}
      <motion.div
        className="fixed w-10 h-10 rounded-full border border-accent pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          opacity: isVisible ? 1 : 0
        }}
      />
      {/* Inner sharp dot */}
      <motion.div
        className="fixed w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block shadow-[0_0_10px_rgba(174,226,132,0.8)]"
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
