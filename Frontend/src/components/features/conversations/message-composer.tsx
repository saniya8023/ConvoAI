"use client";

import { useState } from "react";
import { AlertCircle, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMentorChat } from "@/hooks";
import type { MentorId } from "@/types";

type MessageComposerProps = {
  mentorId: MentorId;
};

export function MessageComposer({ mentorId }: MessageComposerProps) {
  const [draft, setDraft] = useState("");
  const { mentorMessages, isSending, error, sendMessage } =
    useMentorChat(mentorId);

  async function handleSend() {
    if (!draft.trim() || isSending) return;
    const text = draft;
    setDraft("");
    await sendMessage(text);
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