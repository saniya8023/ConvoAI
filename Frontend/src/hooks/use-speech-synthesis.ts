"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeNoop() {
  return () => {};
}

function getSupportSnapshot(): boolean {
  return "speechSynthesis" in window;
}

function getServerSupportSnapshot(): boolean {
  return false;
}

export function useSpeechSynthesis() {
  const isSupported = useSyncExternalStore(
    subscribeNoop,
    getSupportSnapshot,
    getServerSupportSnapshot
  );

  const [isSpeaking, setIsSpeaking] = useState(false);
  const lastTextRef = useRef<string>("");

  const speak = useCallback(
    (text: string): Promise<void> => {
      if (!isSupported || !text) return Promise.resolve();

      window.speechSynthesis.cancel();
      lastTextRef.current = text;

      // Resolving on end/error (rather than firing and forgetting) lets
      // voice mode await one mentor's speech before starting the next, so
      // mentors speak strictly in sequence instead of the next call's
      // cancel() cutting off whoever is still talking.
      return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          resolve();
        };
        utterance.onerror = () => {
          setIsSpeaking(false);
          resolve();
        };

        window.speechSynthesis.speak(utterance);
      });
    },
    [isSupported]
  );

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const replay = useCallback(() => {
    if (lastTextRef.current) speak(lastTextRef.current);
  }, [speak]);

  useEffect(() => {
    return () => {
      if (isSupported) window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  return { isSupported, isSpeaking, speak, stop, replay };
}