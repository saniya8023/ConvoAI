"use client";

import { useState } from "react";
import { AlertCircle, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MENTORS } from "@/constants";
import { useConversationHall } from "@/hooks";
import { useConversationStore } from "@/stores";

/**
 * The Conversation Hall's one and only text input. There is one message
 * list, one input, and one send button for every mentor in the room — no
 * per-mentor composer instances. Sending a message hands off to
 * useConversationHall, which runs every selected mentor's reply
 * automatically, in order; this component just renders the shared thread
 * and disables itself while that sequence is running.
 */
export function MessageComposer() {
  const [draft, setDraft] = useState("");
  const { isRunning, respondingMentorId, error, sendMessage } =
    useConversationHall();

  const messages = useConversationStore((state) => state.messages);
  const selectedMentorIds = useConversationStore(
    (state) => state.selectedMentorIds
  );

  const respondingMentor = respondingMentorId
    ? MENTORS.find((mentor) => mentor.id === respondingMentorId)
    : null;

  async function handleSend() {
    if (!draft.trim() || isRunning || selectedMentorIds.length === 0) return;
    const text = draft;
    setDraft("");
    await sendMessage(text);
  }

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col gap-3">
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto rounded-lg border border-border bg-card p-3">
        {messages.length === 0 && !isRunning && (
          <p className="m-auto text-center text-xs text-muted-foreground">
            Send a message and every mentor in the room will respond, one
            after another, in this same thread.
          </p>
        )}

        {messages.map((message) => {
          // Every mentor turn is labeled with who said it — this is one
          // shared thread all mentors (and the user) speak into, not a
          // per-mentor view.
          const speakerLabel =
            message.role === "mentor"
              ? MENTORS.find((mentor) => mentor.id === message.mentorId)
                  ?.title
              : null;

          return (
            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "self-end rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground"
                  : "self-start rounded-lg bg-muted px-3 py-1.5 text-xs text-foreground"
              }
            >
              {speakerLabel && (
                <span className="mb-0.5 block text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                  {speakerLabel}
                </span>
              )}
              {message.content}
            </div>
          );
        })}

        {isRunning && (
          <div className="flex items-center gap-1.5 self-start px-3 py-1.5 text-xs text-muted-foreground">
            <Loader2 className="size-3 animate-spin" />
            {respondingMentor
              ? `${respondingMentor.title} is responding...`
              : "Thinking..."}
          </div>
        )}
      </div>

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
          placeholder={
            selectedMentorIds.length === 0
              ? "Add a mentor to start..."
              : "Type a message..."
          }
          disabled={isRunning || selectedMentorIds.length === 0}
          className="flex-1 rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
        />
        <Button
          size="icon"
          aria-label="Send message"
          onClick={handleSend}
          disabled={
            isRunning ||
            draft.trim().length === 0 ||
            selectedMentorIds.length === 0
          }
        >
          {isRunning ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
}