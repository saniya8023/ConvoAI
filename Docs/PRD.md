# Product Requirements Document (PRD)

# ConvoAI

**Version:** 1.0
**Status:** Frozen
**Project Type:** AI-Powered Voice-First Multi-Mentor Platform
**Development Approach:** MVP (24-Hour Hackathon)

---

# 1. Project Overview

ConvoAI is a voice-first AI platform that enables users to receive guidance from multiple specialized AI mentors within a single conversation.

Unlike traditional AI assistants that generate one generalized response, ConvoAI creates a collaborative mentoring experience where different AI mentors contribute unique professional perspectives based on their expertise.

The platform aims to simulate natural conversations with multiple experienced mentors, making mentorship more accessible for students, young professionals, and communities.

---

# 2. Problem Statement

Students and young professionals often need guidance from multiple experts before making important academic, career, or project-related decisions.

However,

* Experienced mentors are difficult to access.
* Scheduling sessions is time-consuming.
* Professional guidance is often expensive.
* People usually require opinions from multiple domains instead of relying on a single advisor.

Existing AI assistants generally provide one generalized response rather than multiple expert perspectives.

---

# 3. Proposed Solution

ConvoAI provides a virtual panel of AI mentors.

Users select the mentors they wish to consult and communicate through voice.

Each mentor analyzes the user's query from their own professional perspective while considering the ongoing conversation.

This creates a collaborative discussion similar to consulting multiple experts in real life.

---

# 4. Objectives

The primary objectives of ConvoAI are:

* Provide accessible AI mentorship.
* Encourage natural voice-based communication.
* Simulate real-life expert discussions.
* Help users make better-informed decisions.
* Deliver a clean and intuitive user experience.
* Build a functional MVP suitable for a 24-hour hackathon.

---

# 5. Target Users

* University students
* Fresh graduates
* Young professionals
* Hackathon participants
* Freelancers
* Early-stage founders

---

# 6. Core Features

## Voice-First Interaction

Users interact primarily through voice instead of text.

Speech is converted into text for AI processing.

Responses are converted back into speech.

---

## Multi-Mentor Conversations

Users may select between **2 and 4 mentors** before starting a conversation.

Each mentor has:

* a predefined role
* unique responsibilities
* specialized system prompt
* consistent personality

---

## Mentor Selection

Users choose mentors using the "+" button.

Selected mentors animate into fixed positions within the workspace.

Mentor positions remain constant throughout the conversation.

Mentors cannot be added or removed after the conversation begins.

---

## Guided Expert Discussion

Users decide which mentor should respond by clicking the mentor's circle.

Mentors respond sequentially based on user interaction rather than automatically.

Each mentor contributes only within their area of expertise.

Mentors may reference previous mentor responses when relevant but should primarily add new insights rather than repeating existing advice.

---

## Conversation Title

Each conversation automatically receives a generated title.

Users may rename the conversation at any time.

---

## Notes

A simple notes panel allows users to manually type personal notes.

Notes are independent from AI processing.

No AI summarization or suggestions are provided.

Notes are automatically saved locally.

---

## Conversation History

Users may access previous conversations through a collapsible sidebar.

---

# 7. Mentor Roles

## Career Strategist

Responsibilities:

* Career planning
* Learning roadmap
* Skill development
* Certifications
* Higher education guidance

---

## Tech & Innovation Mentor

Responsibilities:

* Software projects
* Artificial Intelligence
* Technical implementation
* MVP planning
* Product architecture
* Hackathon guidance

---

## Industry Recruiter

Responsibilities:

* Resume reviews
* Interview preparation
* ATS optimization
* LinkedIn guidance
* Industry expectations

---

## Wellbeing & Productivity Coach

Responsibilities:

* Motivation
* Confidence
* Productivity
* Burnout prevention
* Sustainable work habits

---

# 8. User Journey

1. User opens ConvoAI.
2. User selects mentors using the "+" button.
3. Selected mentors appear in the workspace.
4. User starts voice recording.
5. Speech is converted into text.
6. Transcript is displayed for review.
7. User sends the message.
8. User selects a mentor to respond.
9. Mentor generates and speaks a response.
10. User may consult additional mentors.
11. User records another message to begin the next discussion round.
12. Conversation continues until the user ends the session.

---

# 9. Functional Requirements

The system shall:

* Support voice recording.
* Convert speech into text.
* Display the generated transcript before sending.
* Allow users to choose mentor response order.
* Maintain complete conversation history during the session.
* Generate mentor responses using Gemini.
* Convert responses into speech.
* Animate the active mentor while speaking.
* Allow manual note-taking.
* Allow conversation renaming.
* Maintain previous conversations in local storage.

---

# 10. Non-Functional Requirements

The system should:

* Be responsive across desktop and laptop devices.
* Maintain a clean and modern interface.
* Minimize response latency.
* Provide smooth animations.
* Handle API failures gracefully.
* Maintain stable conversation context.
* Deliver consistent mentor personalities.

---

# 11. Out of Scope (MVP)

The following features are intentionally excluded:

* User authentication
* User accounts
* Cloud database
* Internet search
* File uploads
* Image generation
* Custom mentor creation
* Group collaboration
* Long-term memory
* Multi-language support
* Streaming multi-agent debate

---

# 12. Voice Interaction Flow

Voice Recording

↓

Speech-to-Text

↓

Transcript Review

↓

User Confirmation

↓

Gemini Processing

↓

Mentor Response

↓

Text-to-Speech

↓

Audio Playback

↓

Next User Turn

---

# 13. Conversation Flow

Each user message starts a new discussion round.

Users choose which mentor to consult during that round.

Mentors use:

* the latest user message
* previous conversation history
* previous mentor responses

to generate contextual responses.

Starting a new user message closes the previous discussion round.

---

# 14. Technical Overview

Frontend:

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion

Backend:

* FastAPI
* Python
* Pydantic
* Uvicorn

Artificial Intelligence:

* Google Gemini (Free Tier)

Voice:

* Browser Web Speech API
* Browser SpeechSynthesis API

State Management:

* Zustand

Storage:

* Browser Local Storage

Deployment:

* Frontend: Vercel
* Backend: Render

---

# 15. Success Metrics

The MVP will be considered successful if users can:

* Select mentors successfully.
* Complete an end-to-end voice conversation.
* Receive distinct mentor responses.
* Hear AI-generated voice responses.
* Maintain conversation context across multiple discussion rounds.
* Take notes during conversations.
* Access previous conversations.
* Complete the experience without application crashes.

---

# 16. Future Enhancements

Potential future improvements include:

* Custom mentor creation
* Team conversations
* Live mentor debates
* Cloud synchronization
* User authentication
* AI-generated meeting summaries
* Voice cloning
* Emotion detection
* Multi-language support
* Personalized mentor memory

---

# 17. Assumptions

* Users have access to a supported browser with microphone permissions enabled.
* The Gemini free-tier API quota is sufficient for hackathon demonstrations.
* Speech recognition accuracy depends on browser capabilities and environmental noise.
* The MVP prioritizes reliability and usability over advanced AI features.

---

# 18. Constraints

* The project must be completed within a 24-hour hackathon.
* The system must rely on free-tier technologies wherever possible.
* The architecture should remain simple, modular, and maintainable.
* The MVP must prioritize a stable end-to-end experience over feature quantity.
