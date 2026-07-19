"use client";

import { useState } from "react";

import { sendChatMessage } from "@/services";
import { useConversationStore } from "@/stores";
import type { MentorId } from "@/types";

export function useMentorChat(mentorId: MentorId | null) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messages = useConversationStore((state) => state.messages);
  const addMessage = useConversationStore((state) => state.addMessage);

  const mentorMessages = mentorId
    ? messages.filter((message) => message.mentorId === mentorId)
    : [];

  async function sendMessage(text: string): Promise<string | null> {
    const trimmed = text.trim();
    if (!trimmed || !mentorId || isSending) return null;

    setError(null);

    addMessage({
      id: `msg_${Date.now()}_user`,
      mentorId,
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    });

    setIsSending(true);

    try {
      const response = await sendChatMessage({
        mentor: mentorId,
        message: trimmed,
      });

      addMessage({
        id: `msg_${Date.now()}_mentor`,
        mentorId,
        role: "mentor",
        content: response.reply,
        createdAt: new Date().toISOString(),
      });

      return response.reply;
    } catch {
      setError("Couldn't reach the mentor. Please try again.");
      return null;
    } finally {
      setIsSending(false);
    }
  }

  return { mentorMessages, isSending, error, sendMessage };
}