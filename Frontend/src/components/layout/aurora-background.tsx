"use client";

import { motion } from "framer-motion";

/**
 * Soft, ambient aurora effect for the top of the app shell.
 * Purely decorative: fixed, non-interactive, and kept subtle
 * per the project's "no heavy gradients / no flashy animation" rule.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[60vh] overflow-hidden"
    >
      <motion.div
        className="absolute -top-1/3 left-1/4 h-[26rem] w-[26rem] rounded-full bg-[#58A6FF] opacity-[0.10] blur-[120px]"
        animate={{
          x: [0, 60, -20, 0],
          y: [0, 30, -10, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -top-1/4 right-1/4 h-[22rem] w-[22rem] rounded-full bg-[#79C0FF] opacity-[0.08] blur-[120px]"
        animate={{
          x: [0, -50, 20, 0],
          y: [0, 20, -20, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-0 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-[#388BFD] opacity-[0.07] blur-[130px]"
        animate={{
          x: [0, 30, -30, 0],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Fade the aurora into the background so it never hard-edges. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}