# ConvoAI
### AI Conversation Hall for Better Decisions

> **BuildByte Hackathon 2026 Submission**

---

# Team Information

**Team Name:** SoloFire

**Team Member:**
- Saniya Siddiqui

---

# Problem Statement

Every day, students make important decisions about their careers, studies, startups, and personal lives.

The internet gives endless advice. AI chatbots give one answer. Friends give another. Mentors often aren't available when we need them.

The biggest problem is that many students don't even have people around them with whom they can sit for hours, discuss an idea, challenge each other's thinking, and leave with clarity.

A single AI response also has limitations. One perspective is rarely enough for important life decisions.

People don't just need answers.

They need discussion.

They need different viewpoints.

They need a conversation.

---

# Inspiration

The idea for ConvoAI came from a simple conversation.

A few days before this hackathon, my friends and I spent almost two hours discussing our careers. Everyone looked at the same problem from a different perspective. One focused on opportunities, another pointed out risks, someone encouraged us emotionally, while another suggested practical next steps.

When that conversation ended, I realized something.

Not everyone has friends, seniors, or mentors they can sit with for hours and openly discuss important life decisions.

Many students and young professionals make career, education, and startup decisions completely alone.

Even when experienced mentors are available, they often have limited time, and one-on-one mentorship is expensive and not accessible to everyone.

As a result, many people rely on scattered internet advice or a single AI response, which often isn't enough for important decisions.

That inspired me to build ConvoAI.

Instead of replacing human mentors, ConvoAI recreates the experience of discussing an idea with multiple experts in one place, making thoughtful guidance more accessible to students and young professionals.
---

# Solution Overview

ConvoAI is an AI-powered Conversation Hall where users can consult multiple AI mentors without leaving the same conversation.

Instead of receiving one generic response, users can hear different viewpoints from specialized mentors, including:

- Career Mentor
- Therapist
- Startup Advisor
- Study Coach

Each mentor approaches the same problem from their own expertise, helping users think more critically before making decisions.

The platform also supports voice interaction, allowing users to speak naturally and receive spoken responses, making the experience feel closer to a real discussion than a traditional chatbot.

---

# How It Works

1. The user asks a question.
2. A mentor responds based on their area of expertise.
3. The user can switch to another mentor without starting over.
4. Every mentor understands the ongoing discussion and contributes their own perspective instead of treating it as a brand-new conversation.
5. The user continues the discussion naturally, just like talking to different experts in the same room.

Our vision is to make AI conversations feel like sitting around a table with knowledgeable mentors instead of chatting with isolated bots.

---

# Key Features

- Multiple specialized AI mentors
- Context-aware conversations
- Voice-to-text support
- AI text-to-speech responses
- Smooth mentor switching
- Modern responsive interface
- Real-time Gemini AI integration
- Fast and lightweight architecture

---

# Why ConvoAI is Different

Most AI assistants are designed as a one-on-one conversation.

ConvoAI introduces the idea of a **Conversation Hall**.

Instead of asking four different chatbots separately, users stay inside one discussion while listening to multiple expert perspectives.

The goal isn't simply to generate answers.

The goal is to help users make **better decisions**.

---

# Real-World Impact

ConvoAI can support:

- Students choosing careers
- Founders validating startup ideas
- Learners planning their studies
- Individuals seeking balanced guidance before making important decisions

It gives people access to thoughtful discussions even when they don't have experienced mentors around them.

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand

## Backend

- FastAPI
- Python
- HTTPX

## AI

- Google Gemini 2.5 Flash

## Voice

- Web Speech API
- Speech Synthesis API

---

## Quick Start

1. Clone the repository.
2. Add your Gemini API key to `Backend/.env`.
3. Start the backend.
4. Start the frontend.
5. Open `http://localhost:3000`.

# Complete Installation

## Clone the repository

```bash
git clone <repository-url>
cd ConvoAI
```

## Backend

```bash
cd Backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload --port 8001
```

Create a `.env` file inside the Backend directory.

```env
APP_NAME=ConvoAI API
APP_VERSION=0.1.0
ENVIRONMENT=development

CORS_ORIGINS=["http://localhost:3000"]

GEMINI_API_KEY=YOUR_API_KEY

GEMINI_MODEL=gemini-2.5-flash
```

---

## Frontend

```bash
Open another terminal

cd Frontend

npm install

npm run dev
```

Open:

```
http://localhost:3000
```

---

# Project Structure

```
ConvoAI/
│
├── Backend/
├── Frontend/
├── docs/
├── README.md
```

---

## Design

The interface was implemented directly during development without separate Figma design files.

---

# User Interface Guide

The interface is designed to feel like a real **Conversation Hall**, where multiple AI mentors collaborate in a single discussion instead of behaving like separate chatbots.

---

## Interface Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                       New Conversation                               │
├──────────────────────────────┬───────────────────────────────────────┤
│                              │                                       │
│      Mentor Workspace        │      Conversation Panel              │
│                              │                                       │
│   ○ Career Mentor            │  Mentor Selection                    │
│   ○ Therapist                │                                       │
│   ○ Startup Advisor          │  Shared Conversation                 │
│   ○ Study Coach              │                                       │
│                              │  Message Input                       │
│                              │                                       │
├──────────────────────────────┴───────────────────────────────────────┤
│        Undo Button   🎤 Voice Input   ➕ Add Mentor                  │
└──────────────────────────────────────────────────────────────────────┘
```

---

# Main Workspace
The center workspace initially displays a microphone, and member sign and then mentors are selected from the plus button.

Each mentor has:

- A unique icon
- A dedicated color
- Speaking animations during responses

This gives users a visual representation of the AI discussion panel.

---

# Shared Conversation Panel

The panel on the right contains **one shared conversation**.

Unlike traditional AI chat applications, mentors do **not** have separate chat windows.

Instead, every participant replies inside the same discussion.

Example:

```
You:
I want to build an AI startup.

Career Mentor:
...

Therapist:
...

Startup Advisor:
...

Study Coach:
...
```

This creates the experience of a collaborative panel discussion.

---

# Voice Input

The blue microphone button starts voice recording. Users are encouraged to mostly use the voice input feature but for any circumstance, the text message feature is also available.

Workflow:

Voice
↓

Speech-to-Text
↓

Shared Conversation
↓

Sequential Mentor Discussion
↓

Text-to-Speech Responses

During mentor responses:

- Microphone is temporarily disabled
- Text input is disabled
- Send button is disabled

Once every selected mentor has finished speaking, all controls become active again.

---

# Text Input

Users can also type their prompt instead of speaking.

There is **only one input box** for the entire discussion.

Every new prompt begins a new discussion round.

---

# Add Mentor

The **+** button opens the mentor selector.

Users can choose between **2 and 4 mentors** before beginning the discussion.

Each mentor contributes from a different area of expertise.

---

# ↺ Restart Conversation

The circular arrow button starts a fresh conversation.

It clears the current discussion and allows users to begin a completely new mentoring session.

---

# Notes Panel

The notes icon in the **top-right corner** opens the Notes panel.

Users can write personal notes while mentors are discussing.

Notes:

- are completely manual
- are not processed by AI
- are automatically saved locally inside the browser

This allows users to capture ideas, action items, and important recommendations during the conversation.

---

# How to Use ConvoAI

## Step 1 — Select Mentors

Click the **➕ Add Mentor** button.

Choose between **2 and 4 mentors** based on the guidance you need.

Examples:

- Career Mentor
- Therapist
- Startup Advisor
- Study Coach

---

## Step 2 — Ask Your Question

You can either:

- Type your question in the message box

or

- Click the 🎤 microphone and speak naturally

Example:

```
I want to transition into AI but I'm unsure where to start.
```

---

## Step 3 — Watch the Conversation

After sending your prompt:

- your message appears once
- mentors automatically respond one after another
- no additional clicks are required

Each mentor receives:

- your original prompt
- previous mentor responses
- complete conversation context

This allows mentors to build upon one another's ideas instead of repeating information.

---

## Step 4 — Continue the Discussion

After every selected mentor has finished:

- microphone becomes active again
- message input is enabled again
- you can ask your next question

The previous conversation remains visible so the discussion continues naturally.

However, to listen to other mentors and skip the current mentor, and to stop the voice, follow this:

Tap on the pause button, the other mentor's response will start, and on pressing the pause button the number of times the mentors are selected, the voice response will completely stop.

---

# 💡 Tips

- Use voice mode for the most natural experience.
- Choose mentors from different domains to receive diverse perspectives.
- Use the Notes panel to record useful advice during discussions.
- Start a new conversation using the ↺ button whenever you want to discuss a completely different topic.

---

# Important Notes

- There is **one shared conversation**, not multiple chat windows.
- One user prompt triggers responses from **all selected mentors**.
- Mentors automatically reply in sequence.
- Each mentor contributes a unique perspective while considering previous responses.
- Notes are stored locally in your browser and are never sent to the AI model.

# Future Vision

ConvoAI is more than a chatbot.

The long-term vision is to build an AI collaboration platform where users can brainstorm, learn, and make important decisions by interacting with multiple specialized AI experts in a single conversation.

As AI becomes part of everyday life, we believe people will need thoughtful discussions, not just instant answers.

ConvoAI is our first step toward that future.

---

# Future Enhancements

ConvoAI is only the beginning. Future versions will include:

- AI mentors talking to each other naturally before presenting a final recommendation.
- Create your own custom AI mentors with personalized roles, personalities, and expertise.
- Automatic meeting summary and note generation after every conversation.
- Actionable task lists and personalized roadmaps generated from discussions.
- Conversation memory so mentors remember previous sessions over time.
- Collaborative group discussions with multiple users and AI mentors together.
- Integration with calendars and productivity tools to turn advice into action.
- Support for multilingual conversations.
- Emotion-aware conversations that adapt responses based on user sentiment.
- Personalized mentor recommendations based on the user's goals and discussion history.

---

# Developed By

**Saniya Siddiqui**

**Team SoloFire**

BuildByte Hackathon 2026
