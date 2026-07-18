"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import { MentorSelectModal } from "@/components/features/conversations/mentor-select-modal";
import { useConversationStore } from "@/stores";

export function AddMentorButton() {
  const openModal = useConversationStore((state) => state.openMentorModal);

  return (
    <>
      <motion.button
        type="button"
        aria-label="Add mentor"
        onClick={openModal}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md shadow-black/10 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Plus className="size-5" />
      </motion.button>

      <MentorSelectModal />
    </>
  );
}