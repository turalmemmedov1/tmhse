"use client";

import { motion } from "framer-motion";

export default function LedLight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-accent/20 rounded-full blur-[100px] mix-blend-screen"
        style={{ transformOrigin: "center center" }}
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-green-500/10 rounded-full blur-[120px] mix-blend-screen"
        style={{ transformOrigin: "center center" }}
      />
    </div>
  );
}
