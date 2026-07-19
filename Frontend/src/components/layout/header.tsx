"use client";

import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConversationTitle } from "@/components/layout/conversation-title";
import { useUIStore } from "@/stores";

export function Header() {
  const notesOpen = useUIStore((state) => state.notesOpen);
  const toggleNotes = useUIStore((state) => state.toggleNotes);

  return (
    <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-border px-3">
      {/* Spacer keeps the centered title and right-hand button balanced
          now that the History toggle has been removed. */}
      <div className="size-8" aria-hidden="true" />

      <div className="absolute left-1/2 -translate-x-1/2">
        <ConversationTitle />
      </div>

      <Button
        variant="ghost"
        size="icon"
        aria-label={notesOpen ? "Close notes" : "Open notes"}
        aria-pressed={notesOpen}
        onClick={toggleNotes}
      >
        <NotebookText className="size-4" />
      </Button>
    </header>
  );
}