# API Specification

## Base URL

http://localhost:8001/api

---

## POST /chat

Processes a user message and generates a mentor response.

### Request

```json
{
  "mentor": "career-mentor",
  "message": "I want to build an AI startup."
}
```

### Response

```json
{
  "reply": "Career Mentor's response..."
}
```

---

## GET /health

Health check endpoint.

Returns:

```json
{
  "status": "ok"
}
```

---

## Future API (Post-Hackathon)

The final vision of ConvoAI will introduce endpoints such as:

- POST /conversation/start
- POST /conversation/message
- POST /conversation/round
- GET /conversation/history

These will support true multi-agent conversations managed entirely by the backend.
