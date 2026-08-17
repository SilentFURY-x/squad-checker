# Sports Squad Constraint Checker

A Next.js application designed to validate a manually selected seven-player squad against a local roster. This project implements a clean, decoupled architecture using a generic repository pattern.

## Project Structure

```
├── docs/                      # Project documentation
│   ├── ARCHITECTURE.md        # Detailed architecture
│   ├── IMPLEMENTATION_PLAN.md # Execution plan
│   ├── PRD.md                 # Product Requirements Document
│   ├── PROMPT_LOG.md          # History of prompts and interactions
│   └── TEST_REPORT.md         # Final testing logs
├── src/
│   ├── app/                   # Next.js App Router (UI Layer)
│   │   ├── login/             # Google NextAuth Login
│   │   └── dashboard/         # Main application UI
│   ├── components/            # Reusable UI components (shadcn, MagicUI, etc.)
│   ├── core/                  # Business Logic Layer (Framework Agnostic)
│   │   └── validator.ts       # Standalone constraint checker logic
│   ├── data/                  # Static assets and hardcoded mock data
│   ├── repositories/          # Repository Layer
│   │   ├── interface.ts       # Repository abstractions
│   │   └── ...                # Concrete implementations
│   ├── services/              # Service Layer (Data Mapping)
│   │   └── ...                # ORM-to-Domain mappers
│   └── types/                 # Universal TypeScript Domain Models
├── prisma/                    # Prisma schema and migrations
└── public/                    # Public static assets
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
