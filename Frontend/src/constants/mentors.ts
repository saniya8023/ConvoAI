import { Briefcase, GraduationCap, HeartHandshake, Rocket } from "lucide-react";

import type { MentorDefinition, MentorSlotPosition } from "@/types";

export const MENTORS: MentorDefinition[] = [
  {
    id: "career-mentor",
    title: "Career Mentor",
    icon: Briefcase,
    color: "#58A6FF",
  },
  {
    id: "therapist",
    title: "Therapist",
    icon: HeartHandshake,
    color: "#3FB950",
  },
  {
    id: "startup-advisor",
    title: "Startup Advisor",
    icon: Rocket,
    color: "#F0883E",
  },
  {
    id: "study-coach",
    title: "Study Coach",
    icon: GraduationCap,
    color: "#A371F7",
  },
];

export const MAX_SELECTED_MENTORS = 4;

/**
 * Fixed workspace positions, assigned by selection order (slot 0 = first
 * mentor selected, slot 1 = second, etc). Positions stay constant for the
 * lifetime of the selection — mentors never reflow within the workspace.
 */
export const MENTOR_SLOT_POSITIONS: MentorSlotPosition[] = [
  { top: "34%", left: "32%" },
  { top: "34%", left: "68%" },
  { top: "62%", left: "32%" },
  { top: "62%", left: "68%" },
];