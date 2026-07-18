import { apiClient } from "@/services/api-client";
import type { ChatRequestPayload, ChatResponsePayload } from "@/types";

export async function sendChatMessage(
  payload: ChatRequestPayload
): Promise<ChatResponsePayload> {
  return apiClient<ChatResponsePayload>({
    path: "/api/chat",
    method: "POST",
    body: JSON.stringify(payload),
  });
}