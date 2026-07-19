# ConvoAI - Technical Architecture

## Overview

ConvoAI follows a simple client-server architecture with a voice-first interaction model.

User Voice -> Speech-to-Text -> Frontend -> FastAPI Backend -> Conversation Manager -> Prompt Manager -> Gemini API -> Response -> SpeechSynthesis -> Voice Output

---

## Frontend

Framework:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- Framer Motion

Responsibilities:
- Voice recording
- Mentor selection
- Notes
- Conversation history
- UI animations
- Audio playback

---

## Backend

Framework:
- FastAPI

Responsibilities:
- API endpoints
- Context management
- Prompt generation
- Gemini communication
- Conversation management

---

## AI Layer

ConvoAI uses Google's Gemini 2.5 Flash model.

Instead of using multiple AI models, a single Gemini model dynamically adopts different mentor personalities through specialized system prompts.

This keeps the MVP lightweight while creating the experience of multiple experts collaborating in one discussion.

---

# Conversation Manager

Responsibilities

• Maintain one shared conversation history.
• Pass previous mentor responses as context.
• Preserve discussion order.
• Build context for the next mentor.
• Ensure mentors contribute unique perspectives.

---

## Prompt Manager

Responsible for loading mentor prompts.

Mentors:

- Career Strategist
- Tech & Innovation
- Industry Recruiter
- Wellbeing Coach

---

## Storage

Browser Local Storage

Stores:

• Notes
• Conversation titles
• Conversation history
• Selected mentors

No cloud database is used in the MVP.
