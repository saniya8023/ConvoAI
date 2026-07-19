"use client";

import { useState } from "react";
import { AlertCircle, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { sendChatMessage } from "@/services";
import { useConversationStore } from "@/stores";
import type { MentorId } from "@/types";

type MessageComposerProps = {
  mentorId: MentorId;
};

export function MessageComposer({ mentorId }: MessageComposerProps) {
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messages = useConversationStore((state) => state.messages);
  const addMessage = useConversationStore((state) => state.addMessage);

  const mentorMessages = messages.filter(
    (message) => message.mentorId === mentorId
  );

  async function handleSend() {
    const trimmed = draft.trim();
    if (!trimmed || isSending) return;

    setError(null);
    setDraft("");

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
    } catch {
      setError("Couldn't reach the mentor. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {mentorMessages.length > 0 && (
        <div className="flex max-h-48 flex-col gap-2 overflow-y-auto rounded-lg border border-border bg-card p-3">
          {mentorMessages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "self-end rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground"
                  : "self-start rounded-lg bg-muted px-3 py-1.5 text-xs text-foreground"
              }
            >
              {message.content}
            </div>
          ))}
          {isSending && (
            <div className="flex items-center gap-1.5 self-start px-3 py-1.5 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" />
              Thinking...
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" />
          {error}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSend();
          }}
          placeholder="Type a message..."
          disabled={isSending}
          className="flex-1 rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
        />
        <Button
          size="icon"
          aria-label="Send message"
          onClick={handleSend}
          disabled={isSending || draft.trim().length === 0}
        >
          {isSending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
}