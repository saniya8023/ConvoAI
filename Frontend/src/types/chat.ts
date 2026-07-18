import type { MentorId } from "./mentor";

export type ChatRequestPayload = {
  mentor: MentorId;
  message: string;
};

export type ChatResponsePayload = {
  reply: string;
};