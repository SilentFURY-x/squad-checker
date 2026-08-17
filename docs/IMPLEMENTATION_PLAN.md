# Implementation Plan for the Sports Squad Constraint Checker

This document outlines the detailed architecture and implementation plan for the Sports Squad Constraint Checker, a Next.js web application designed to validate a manually selected seven-player squad against a local roster using a decoupled repository pattern.

## Proposed Architecture

Based on the diagram, we will adopt a strict layered architecture:

1. **Data Sources**: PostgreSQL (via Prisma), Redis, Object DB, Hardcoded Data.
2. **Services Layer (`/src/services/`)**: Maps external data structures to our unified internal TypeScript domain models (`Player`, `Squad`).
3. **Repository Layer (`/src/repositories/`)**: Abstracts data fetching. Implements a common interface `PlayerRepository`.
4. **Domain / Business Logic (`/src/core/`)**: Contains the `SquadValidator`, which takes a `Squad` and `Roster` to produce validation results. 
5. **UI Layer (`/src/app/`, `/src/components/`)**: Next.js App Router for the Dashboard and Login pages, consuming the Business Logic and Repository data. `shadcn/ui`, `Lenis` (for smooth scroll), `GSAP`, and `MagicUI` will be used here.

## Step-by-Step Implementation

### Step 1: Project Setup and Documentation
- Scaffold out the documentation files: `README.md`, `PRD.md`, `ARCHITECTURE.md`, and `PROMPT_LOG.md`.
- Persist the implementation plan as `docs/IMPLEMENTATION_PLAN.md`.
- **Note:** Wait for user validation after this step.

### Step 2: Domain Types & Core Validation Logic
- Define TypeScript domain models (`PlayerID`, `Student`, `Position`, `Cohort`, `Availability`, `Selected`).
- Implement the `SquadValidator` class in `/src/core/validator.ts` to execute all constraints in the exact order specified:
  - Reference checking (`INVALID_SELECTION_REFERENCE`)
  - `SQUAD_SIZE_MUST_BE_7`
  - `GOALKEEPER_COUNT_MUST_BE_1`
  - `MINIMUM_DEFENDERS_NOT_MET`
  - `MINIMUM_FORWARDS_NOT_MET`
  - `PLAYER_UNAVAILABLE` (roster order)
  - `COHORT_LIMIT_EXCEEDED` (YEAR_2, YEAR_3 order)
- Wait for user validation.

### Step 3: Database & Seed
- Initialize Prisma with PostgreSQL.
- Create the schema (`Player` table).
- Write a seed script to populate 100 sample student records (including S01-S09).
- Wait for user validation.

### Step 4: Repository & Services
- Create `PrismaPlayerService` to adapt Prisma data to Domain data.
- Create `PlayerRepository` that utilizes `PrismaPlayerService`.
- Create a `HardcodedPlayerRepository` as a fallback or for testing with the exact built-in squad.
- **Implement a toggle flag (e.g., via environment variable) to switch between DB and Hardcoded data for demonstration purposes.**
- Wait for user validation.

### Step 5: UI & Dashboard
- **Wait for user-provided React components.** The user will provide the components for integration.
- **Do NOT start UI development until explicit confirmation.**
- Create the Login Screen with Google NextAuth.
- Create the Dashboard with:
  - **Roster Selection**: A table/list of players with selection toggles.
  - **Validation Summary**: Displays rule statuses, position counts, and cohort counts dynamically.
  - **Formation View**: A compact visual representation of the squad on a pitch.
  - **Controls**: "Validate Squad", "Reset", "Sample Invalid" controls.
- Integrate Lenis, GSAP, MagicUI, and Reactbits for a premium feel (using provided components).
- Wait for user validation.

### Step 6: Testing
- Implement unit tests for `SquadValidator` in `/src/core/validator.test.ts` to ensure 100% compliance with the constraint rules, including all edge cases mentioned in the prompt.
- Wait for user validation.
