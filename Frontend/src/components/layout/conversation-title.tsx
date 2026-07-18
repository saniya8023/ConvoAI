"use client";

import { useRef, useState } from "react";
import { Pencil } from "lucide-react";

import { cn } from "@/lib/utils";

const DEFAULT_TITLE = "New Conversation";

export function ConversationTitle() {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function startEditing() {
    setIsEditing(true);
    requestAnimationFrame(() => inputRef.current?.select());
  }

  function commit() {
    setIsEditing(false);
    if (title.trim().length === 0) {
      setTitle(DEFAULT_TITLE);
    }
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") inputRef.current?.blur();
          if (event.key === "Escape") {
            setTitle(title);
            setIsEditing(false);
          }
        }}
        autoFocus
        className="w-full max-w-xs rounded-md border border-border bg-transparent px-2 py-1 text-center text-sm font-medium text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      className={cn(
        "group/title inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-foreground",
        "transition-colors hover:bg-muted"
      )}
    >
      <span className="max-w-xs truncate">{title}</span>
      <Pencil className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover/title:opacity-100" />
    </button>
  );
}