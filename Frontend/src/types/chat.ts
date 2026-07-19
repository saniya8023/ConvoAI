import type { MentorId } from "./mentor";

export type ChatHistoryMessage = {
  mentor: MentorId | null;
  role: "user" | "mentor";
  content: string;
};

export type ChatRequestPayload = {
  mentor: MentorId;
  message: string;
  // Full shared Conversation Hall history so far (all mentors, oldest
  // first). Does not include `message` itself.
  history: ChatHistoryMessage[];
};

export type ChatResponsePayload = {
  reply: string;
};