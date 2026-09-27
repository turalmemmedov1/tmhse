"use client";

import { motion } from "framer-motion";

export default function LedLight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[10%] left-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-accent/20 rounded-full blur-[80px] md:blur-[120px]"
        style={{ transformOrigin: "center center", WebkitTransform: "translateZ(0)" }}
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-green-500/10 rounded-full blur-[80px] md:blur-[120px]"
        style={{ transformOrigin: "center center", WebkitTransform: "translateZ(0)" }}
      />
    </div>
  );
}
