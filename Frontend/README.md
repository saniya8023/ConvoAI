# ConvoAI Frontend

Next.js App Router frontend for the ConvoAI voice-first mentoring platform.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Zustand
- Lucide React

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/              # Next.js routes, layout, global styles
├── components/
│   ├── ui/           # shadcn/ui primitives
│   ├── layout/       # shared layout components
│   └── features/     # feature-specific components
├── constants/        # app-wide constants
├── hooks/            # shared React hooks
├── lib/              # utilities and shared config
├── services/         # API client and external integrations
├── stores/           # Zustand state stores
└── types/            # shared TypeScript types
```
