# Product Requirements Document (PRD)

# ConvoAI

- **Version:** 1.0
- **Status:** Frozen
- **Project Type:** AI-Powered Voice-First Multi-Mentor Platform
- **Development Approach:** MVP (24-Hour Hackathon)

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

Users first select the mentors they want in the discussion.

After submitting a single prompt, ConvoAI automatically coordinates a structured conversation where every selected mentor contributes in sequence while sharing the same conversation context.

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

## Guided Multi-Mentor Discussion

The user submits a single prompt.

ConvoAI automatically orchestrates a structured discussion between the selected mentors.

Each mentor receives:

• the user's prompt
• previous mentor responses
• the shared conversation context

Every mentor builds upon the discussion, contributing new insights instead of repeating earlier responses.

The interaction feels like a collaborative panel discussion rather than isolated chatbot replies.

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

# User Journey 

1. User opens ConvoAI.
2. User selects mentors.
3. User starts voice recording or types a prompt.
4. Speech is converted into text (if voice is used).
5. User sends a single prompt.
6. The first selected mentor begins responding.
7. Remaining mentors automatically continue the discussion in sequence.
8. Each mentor builds upon the previous responses while adding unique insights.
9. Responses are displayed and spoken using Text-to-Speech.
10. After the discussion round ends, the user may submit another prompt.
    
---

# 9. Functional Requirements

The system shall:

* Support voice recording.
* Convert speech into text.
* Display the generated transcript before sending.
* Automatically orchestrate mentor responses in a predefined sequence.
* Maintain complete conversation history during the session.
* Generate mentor responses using Gemini.
* Convert responses into speech.
* Animate the active mentor while speaking.
* Allow manual note-taking.
* Allow conversation renaming.

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
* Persistent conversation history

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

Sequential Mentor Responses

↓

Text-to-Speech

↓

Audio Playback

↓

Next User Turn

---

# 13. Conversation Flow

Each user prompt begins a new discussion round.

Selected mentors respond automatically in sequence.

Every mentor receives:

• the original user prompt
• previous mentor responses
• complete discussion context

Each response expands the conversation with new insights, creating a natural multi-expert discussion.

After the final mentor finishes speaking, the user may begin the next discussion round.
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

• Browser LocalStorage

Currently stores:

- Personal Notes

Conversation history persistence is planned for a future version.

Deployment:

Not implemented for the hackathon but will be deployed as follows:

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
* Complete the experience without application crashes.
* Complete an uninterrupted multi-mentor discussion.
* Receive context-aware mentor responses.
* Experience a realistic AI panel discussion.

---

# 16. Future Enhancements

• AI mentors debating each other naturally
• Real-time streaming conversations
• Custom mentor creation
• Persistent long-term memory
• AI-generated meeting notes
• Action plan generation
• Calendar integration
• Team collaboration rooms
• Cloud synchronization
• Authentication
• Multi-language support
• Emotion-aware responses
• Voice cloning
• Conversation history and searchable sessions

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
