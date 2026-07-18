"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const RECORDING_DURATION_MS = 2000;

export function MicButton() {
  const [isRecording, setIsRecording] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick() {
    if (isRecording) return;

    setIsRecording(true);
    timeoutRef.current = setTimeout(() => {
      setIsRecording(false);
    }, RECORDING_DURATION_MS);
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={isRecording ? "Recording" : "Start recording"}
      aria-pressed={isRecording}
      whileHover={{ scale: isRecording ? 1 : 1.04 }}
      whileTap={{ scale: isRecording ? 1 : 0.96 }}
      animate={
        isRecording
          ? {
              boxShadow: [
                "0 0 0 0 rgba(248,81,73,0.35)",
                "0 0 0 14px rgba(248,81,73,0)",
              ],
            }
          : { boxShadow: "0 0 0 0 rgba(248,81,73,0)" }
      }
      transition={
        isRecording
          ? { duration: 1.1, repeat: Infinity, ease: "easeOut" }
          : { duration: 0.15, ease: "easeOut" }
      }
      className="flex size-16 items-center justify-center rounded-full border border-border shadow-lg shadow-black/20 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50"
      style={{
        backgroundColor: isRecording ? "#F85149" : "var(--primary)",
        color: "var(--primary-foreground)",
      }}
    >
      <motion.span
        animate={isRecording ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={
          isRecording
            ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.15 }
        }
      >
        <Mic className="size-6" />
      </motion.span>
    </motion.button>
  );
}