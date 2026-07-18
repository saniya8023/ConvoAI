import type { LucideIcon } from "lucide-react";

export type MentorId =
  | "career-mentor"
  | "therapist"
  | "startup-advisor"
  | "study-coach";

export type MentorDefinition = {
  id: MentorId;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export type MentorSlotPosition = {
  top: string;
  left: string;
};