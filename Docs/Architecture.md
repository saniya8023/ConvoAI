# ConvoAI - Technical Architecture

## Overview

ConvoAI follows a simple client-server architecture with a voice-first interaction model.

User Voice
↓
Speech-to-Text
↓
Frontend
↓
FastAPI Backend
↓
Conversation Manager
↓
Prompt Manager
↓
Gemini API
↓
Response
↓
SpeechSynthesis
↓
Voice Output

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

Model:
- Gemini (Free Tier)

One model is shared across all mentors.

Different mentor personalities are created using different system prompts.

---

## Conversation Manager

Responsibilities:

- Maintain conversation history
- Track current discussion round
- Pass previous mentor responses
- Prepare context for Gemini

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

LocalStorage

Stores:

- Notes
- Conversation titles
- Conversation history

No cloud database is used in MVP.

---

## Deployment

Frontend:
- Vercel

Backend:
- Render