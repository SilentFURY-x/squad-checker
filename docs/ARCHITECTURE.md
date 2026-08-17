# Architecture Document

## Overview
The Sports Squad Constraint Checker follows a strict layered architecture pattern. This isolates the core validation logic (the "Business Logic") from the Next.js UI, and abstracts external data sources (e.g., PostgreSQL, Redis, Hardcoded files) behind a unified Service and Repository layer.

## Layers

### 1. Presentation Layer (UI)
- **Framework**: Next.js App Router.
- **Pages**:
  - `/login`: Google NextAuth login screen.
  - `/dashboard`: The main tool containing the roster selection, validation results, and formation view.
- **Libraries**:
  - `shadcn/ui` for standard components.
  - `Lenis` for smooth scrolling.
  - `GSAP` for animations.
  - `MagicUI` / `Reactbits` for premium interactive elements.

### 2. Business Logic Layer
- **Responsibility**: Houses the `SquadValidator`, which takes a generic array of `Player` domain models and returns a validation result.
- **Independence**: This layer operates strictly on TypeScript domain models. It has zero knowledge of Prisma, PostgreSQL, Redis, Next.js, or any HTTP routing. 

### 3. Repository Layer
- **Responsibility**: Provides a unified API for the business logic and UI to request player data. 
- **Implementation**: The `PlayerRepository` interface has methods like `getAllPlayers()` or `getPlayersByIds()`. We can swap implementations (e.g., `HardcodedPlayerRepository` vs `DatabasePlayerRepository`) without breaking the system.

### 4. Service Layer
- **Responsibility**: Acts as a mapper between the raw data models (e.g., Prisma models, Redis JSON objects) and our internal TypeScript Domain Data models.
- **Implementation**: The `PrismaPlayerService` translates Prisma ORM output into the `Player` domain type.

### 5. Data Layer
- **Sources**: 
  - PostgreSQL (via Prisma ORM).
  - Hardcoded local static data (for tests and fallbacks).
  - Designed to easily adopt Redis or Object DBs.

## Architectural Diagram

```mermaid
graph TB
    subgraph Presentation_Layer["1. Presentation Layer (Next.js App Router)"]
        UI_Page["Dashboard Page (Server Component)\nsrc/app/dashboard/page.tsx"]
        UI_Client["Dashboard Client (Client Component)\nsrc/app/dashboard/DashboardClient.tsx"]
        UI_Components["UI & Animation Components\n(AnimatedList, BorderGlow, SquadMetricsBento, PlayerCard)"]
        UI_Page -->|Props| UI_Client
        UI_Client --> UI_Components
    end

    subgraph Business_Logic["2. Business Logic Layer (Core Domain)"]
        Validator["SquadValidator\nsrc/core/validator.ts"]
        DomainModels["TypeScript Domain Models & Enums\nsrc/types/index.ts (Player, SquadValidationResult)"]
        Validator -->|Validates against| DomainModels
    end

    subgraph Repository_Layer["3. Repository Layer (Abstraction)"]
        RepoRouter["Repository Index / Router\nsrc/repositories/index.ts"]
        RepoInterface["PlayerRepository Interface\nsrc/repositories/player.repository.ts"]
        PrismaRepo["PrismaPlayerRepository\nsrc/repositories/prisma.repository.ts"]
        HardcodedRepo["HardcodedPlayerRepository\nsrc/repositories/hardcoded.repository.ts"]
        
        RepoRouter -->|DATA_PROVIDER toggle| PrismaRepo
        RepoRouter -->|DATA_PROVIDER toggle| HardcodedRepo
        PrismaRepo -.->|Implements| RepoInterface
        HardcodedRepo -.->|Implements| RepoInterface
    end

    subgraph Service_Layer["4. Service Layer (Data Mapping)"]
        PrismaService["PrismaPlayerService\nsrc/services/prisma-player.service.ts"]
        PrismaService -->|Transforms ORM output into| DomainModels
    end

    subgraph Data_Layer["5. Data Layer (Persistence & Fallbacks)"]
        PostgresDB[("PostgreSQL Database\n(Docker / Local)")]
        StaticData["Static Roster Data\nsrc/data/exampleRoster.ts"]
    end

    %% Cross-layer interactions
    UI_Page -->|Queries playerRepository| RepoRouter
    UI_Client -->|Validates squad selection| Validator
    PrismaRepo -->|Uses for mapping| PrismaService
    PrismaRepo -->|Prisma Client ORM| PostgresDB
    HardcodedRepo -->|Reads static mock| StaticData

    %% Class Styling
    classDef pres fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef logic fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef repo fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef service fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef data fill:#1e293b,stroke:#ef4444,stroke-width:2px,color:#fff;

    class UI_Page,UI_Client,UI_Components pres;
    class Validator,DomainModels logic;
    class RepoRouter,RepoInterface,PrismaRepo,HardcodedRepo repo;
    class PrismaService service;
    class PostgresDB,StaticData data;
```

## Data Flow
`Database / Static Data` ➔ `Service (Mapping)` ➔ `Repository Layer` ➔ `TypeScript Domain Model` ➔ `Next.js Server Component` ➔ `Client State & GSAP UI` ➔ `Business Logic (SquadValidator)`
