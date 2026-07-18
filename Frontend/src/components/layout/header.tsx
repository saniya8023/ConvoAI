"use client";

import { NotebookText, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConversationTitle } from "@/components/layout/conversation-title";
import { useUIStore } from "@/stores";

export function Header() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const notesOpen = useUIStore((state) => state.notesOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const toggleNotes = useUIStore((state) => state.toggleNotes);

  return (
    <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-border px-3">
      <Button
        variant="ghost"
        size="icon"
        aria-label={sidebarOpen ? "Collapse history" : "Expand history"}
        aria-pressed={sidebarOpen}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? (
          <PanelLeftClose className="size-4" />
        ) : (
          <PanelLeftOpen className="size-4" />
        )}
      </Button>

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