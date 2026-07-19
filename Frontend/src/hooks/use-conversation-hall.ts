"use client";

import { useRef, useState } from "react";

import { sendChatMessage } from "@/services";
import { useConversationStore } from "@/stores";
import type { ChatHistoryMessage, MentorId } from "@/types";

export type MentorTurnResult = {
  mentorId: MentorId;
  reply: string;
};

/**
 * Drives the single Conversation Hall thread.
 *
 * There is exactly one user message per turn. Every currently selected
 * mentor then responds automatically, one at a time, in selection order.
 * Each mentor call is given the original user message plus every mentor
 * reply that came before it *in this same turn* — not just what's already
 * committed to the store — so mentors build on each other ("I agree with
 * Career Mentor...") instead of independently answering the same prompt.
 *
 * This intentionally replaces the old per-mentor `useMentorChat` hook,
 * which only ever sent a message to whichever single mentor was "active".
 * That's what caused mentor switching to look like it was reusing or
 * copying another mentor's answer: there was no sequencing at all, just
 * one shared history rendered from whichever mentor's perspective was
 * currently selected.
 */
export function useConversationHall() {
  const [isRunning, setIsRunning] = useState(false);
  const [respondingMentorId, setRespondingMentorId] = useState<MentorId | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // `isRunning` (React state) is what the UI reads to disable itself, but
  // it can't also be the re-entrancy guard: state only updates on the next
  // render, so a second trigger arriving in the same tick (e.g. Enter +
  // click, or the composer and mic firing close together) can read
  // `isRunning` as still `false` and start a second, overlapping round
  // before the first round's flag has actually committed. Two loops then
  // race over the same mentor queue and interleave their calls into the
  // shared history, which is exactly what made every round after the
  // first look like "only one mentor responds" — the rest were failing
  // silently on malformed, interleaved history and getting caught.
  //
  // A ref is synchronous and updates immediately, so it closes that gap.
  const roundLockRef = useRef(false);

  const messages = useConversationStore((state) => state.messages);
  const addMessage = useConversationStore((state) => state.addMessage);
  const selectedMentorIds = useConversationStore(
    (state) => state.selectedMentorIds
  );

  async function sendMessage(text: string): Promise<MentorTurnResult[]> {
    const trimmed = text.trim();
    if (!trimmed || roundLockRef.current || selectedMentorIds.length === 0) {
      return [];
    }

    // Lock immediately and synchronously — nothing else can start a round
    // until this one's `finally` block below clears it.
    roundLockRef.current = true;
    setError(null);
    setIsRunning(true);

    addMessage({
      id: `msg_${Date.now()}_user`,
      mentorId: null,
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    });

    // Everything below is scoped to THIS round only — the mentor queue,
    // the index walking it, and the running history are all fresh local
    // variables created here. None of it is stored on the hook, a ref, or
    // anywhere else that could leak into the next round, so every new
    // prompt always starts a brand new round from mentor #1 with a clean
    // queue, even though the conversation history itself keeps growing.
    const mentorQueue: MentorId[] = [...selectedMentorIds];
    const runningHistory: ChatHistoryMessage[] = messages.map((entry) => ({
      mentor: entry.mentorId,
      role: entry.role,
      content: entry.content,
    }));
    const results: MentorTurnResult[] = [];

    try {
      for (
        let currentMentorIndex = 0;
        currentMentorIndex < mentorQueue.length;
        currentMentorIndex++
      ) {
        const mentorId = mentorQueue[currentMentorIndex];
        setRespondingMentorId(mentorId);

        try {
          const response = await sendChatMessage({
            mentor: mentorId,
            message: trimmed,
            history: runningHistory,
          });

          addMessage({
            id: `msg_${Date.now()}_${mentorId}`,
            mentorId,
            role: "mentor",
            content: response.reply,
            createdAt: new Date().toISOString(),
          });

          runningHistory.push({
            mentor: mentorId,
            role: "mentor",
            content: response.reply,
          });

          results.push({ mentorId, reply: response.reply });
        } catch {
          // One mentor failing shouldn't freeze the rest of the panel
          // (the user can't do anything while a sequence runs), so note
          // it and move on to the next mentor rather than aborting the
          // whole round.
          setError(
            "Couldn't reach one of the mentors. Continuing with the rest."
          );
        }
      }
    } finally {
      // Guaranteed reset, even if something above throws unexpectedly:
      // the "currently speaking" indicator, the running/loading flag, and
      // the re-entrancy lock all clear the instant the round ends. The
      // queue and index above were local to this call and are discarded
      // automatically. Conversation history (the store's `messages`) is
      // untouched — only this round's execution state goes away.
      setRespondingMentorId(null);
      setIsRunning(false);
      roundLockRef.current = false;
    }

    return results;
  }

  return { isRunning, respondingMentorId, error, sendMessage };
}