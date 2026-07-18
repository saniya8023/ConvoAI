# API Specification

## POST /conversation/start

Starts a new conversation.

---

## POST /conversation/message

Receives a user message.

Input:

- Conversation ID
- User message

Returns:

- Updated conversation

---

## POST /conversation/respond

Generates a mentor response.

Input:

- Conversation ID
- Mentor Role

Returns:

- Mentor response

---

## GET /conversation/history

Returns previous conversations.