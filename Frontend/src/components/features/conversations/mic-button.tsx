"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, MicOff, RotateCcw, Square } from "lucide-react";

import { useConversationHall, useSpeechRecognition, useSpeechSynthesis } from "@/hooks";
import { useConversationStore } from "@/stores";

/**
 * The Conversation Hall's one and only microphone. Speaking once triggers
 * every selected mentor to respond automatically, same as typing a
 * message. The mic (and, via useConversationHall, the text input) stay
 * disabled for the whole sequence, and mentors are spoken in strict order
 * — each speak() call is awaited before the next mentor's reply starts —
 * so voice mode can't overlap or interrupt itself mid-panel.
 */
export function MicButton() {
  const selectedMentorIds = useConversationStore(
    (state) => state.selectedMentorIds
  );
  const { sendMessage, isRunning } = useConversationHall();

  const {
    isSupported: isRecognitionSupported,
    isListening,
    interimTranscript,
    error: recognitionError,
    start,
    stop,
  } = useSpeechRecognition();

  const {
    isSupported: isSynthesisSupported,
    isSpeaking,
    speak,
    stop: stopSpeaking,
    replay,
  } = useSpeechSynthesis();

  const [lastReply, setLastReply] = useState<string | null>(null);

  async function handleFinalTranscript(transcript: string) {
    const results = await sendMessage(transcript);
    if (results.length === 0) return;

    setLastReply(results[results.length - 1].reply);

    if (isSynthesisSupported) {
      // Await each mentor's speech in turn so the room speaks in the same
      // sequence it responded in, instead of the next mentor's speak()
      // cutting off whoever is still talking.
      for (const result of results) {
        await speak(result.reply);
      }
    }
  }

  function handleMicClick() {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    if (isListening) {
      stop();
      return;
    }

    if (selectedMentorIds.length === 0 || isRunning || !isRecognitionSupported)
      return;

    start(handleFinalTranscript);
  }

  const canStartListening =
    selectedMentorIds.length > 0 && !isRunning && isRecognitionSupported;
  const isDisabled = !isSpeaking && !canStartListening;

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {isListening && interimTranscript && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-12 max-w-64 truncate rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm"
          >
            {interimTranscript}
          </motion.div>
        )}

        {!isListening && recognitionError && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-12 max-w-64 truncate rounded-full border border-destructive/40 bg-card px-3 py-1.5 text-xs text-destructive shadow-sm"
          >
            {recognitionError}
          </motion.div>
        )}

        {!isListening && !recognitionError && !isRecognitionSupported && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-12 max-w-64 truncate rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm"
          >
            Voice input isn&apos;t supported in this browser.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end gap-3">
        {lastReply && !isSpeaking && isSynthesisSupported && (
          <motion.button
            type="button"
            aria-label="Replay last response"
            onClick={replay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-4" />
          </motion.button>
        )}

        <motion.button
          type="button"
          onClick={handleMicClick}
          disabled={isDisabled}
          aria-label={
            isSpeaking
              ? "Stop AI speech"
              : isListening
                ? "Stop listening"
                : "Start listening"
          }
          aria-pressed={isListening}
          whileHover={{ scale: isDisabled ? 1 : 1.04 }}
          whileTap={{ scale: isDisabled ? 1 : 0.96 }}
          animate={
            isListening || isSpeaking
              ? {
                  boxShadow: [
                    `0 0 0 0 ${isSpeaking ? "rgba(88,166,255,0.35)" : "rgba(248,81,73,0.35)"}`,
                    "0 0 0 14px rgba(0,0,0,0)",
                  ],
                }
              : { boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
          }
          transition={
            isListening || isSpeaking
              ? { duration: 1.1, repeat: Infinity, ease: "easeOut" }
              : { duration: 0.15, ease: "easeOut" }
          }
          className="flex size-16 items-center justify-center rounded-full border border-border shadow-lg shadow-black/20 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            backgroundColor: isSpeaking
              ? "#58A6FF"
              : isListening
                ? "#F85149"
                : "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          <motion.span
            animate={
              isListening || isSpeaking ? { scale: [1, 1.15, 1] } : { scale: 1 }
            }
            transition={
              isListening || isSpeaking
                ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.15 }
            }
          >
            {isSpeaking ? (
              <Square className="size-6" />
            ) : !isRecognitionSupported ? (
              <MicOff className="size-6" />
            ) : (
              <Mic className="size-6" />
            )}
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}