# Squad Checker Data Pipeline

This document details the architectural data flow for the Sports Squad Checker, illustrating how player data originates from the source and securely travels through the layered architecture to the front-end user interface.

## Core Architectural Principles

The data pipeline relies heavily on the **Dependency Inversion Principle**. Our front-end application (Dashboard) does not know—and does not care—whether the data originates from a local hardcoded JSON file, a remote PostgreSQL database, or a third-party API. 

The application only communicates with the `playerRepository` interface.

## Flow Diagram

The following Mermaid diagram visualizes the flow of data from the provider to the end-user on the Dashboard.

```mermaid
    flowchart TD
    %% Define Nodes
    subgraph Data_Sources["Data Sources"]
        DB[("PostgreSQL Database\n(Docker / Local)")]
        HC["Hardcoded Mock Data\n(src/data/exampleRoster.ts)"]
    end

    subgraph Repository_Layer["Repository Layer"]
        PR["PrismaPlayerRepository\n(src/repositories/prisma.repository.ts)"]
        HR["HardcodedPlayerRepository\n(src/repositories/hardcoded.repository.ts)"]
        Index["Repository Index Router\n(src/repositories/index.ts)"]
    end

    subgraph Server_Layer["Next.js Server Layer"]
        SC["DashboardPage Server Component\n(src/app/dashboard/page.tsx)"]
    end

    subgraph Client_Layer["Client Interactive UI Layer"]
        CC["DashboardClient\n(src/app/dashboard/DashboardClient.tsx)"]
        Val["SquadValidator (Domain Engine)\n(src/core/validator.ts)"]
        UI_Widgets["Interactive UI Components\n(AnimatedList, BentoGrid, PlayerCard)"]
    end

    %% Define Connections
    DB -->|Prisma Pg Adapter| PR
    HC -->|Direct Import| HR
    
    PR -.->|if DATA_PROVIDER = DB| Index
    HR -.->|if DATA_PROVIDER = HARDCODED| Index
    
    Index -->|Returns generic Player[]| SC
    
    SC -->|Passes players array as props| CC
    CC -->|Validates selected squad in real-time| Val
    CC -->|Renders & animates GSAP transitions| UI_Widgets

    %% Styling
    classDef source fill:#1e293b,stroke:#ef4444,stroke-width:2px,color:#fff;
    classDef repo fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef server fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef client fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;

    class DB,HC source;
    class PR,HR,Index repo;
    class SC server;
    class CC,Val,UI_Widgets client;
```

## Step-by-Step Data Flow

### 1. The Environment Toggle (Data Sources)
The application determines its data source via the `.env` variable `DATA_PROVIDER`. 
- If set to `DB`, the application initializes Prisma to connect to PostgreSQL.
- If set to `HARDCODED` (the current default), the application reads from `src/data/exampleRoster.ts`.

### 2. The Repository Layer (`src/repositories`)
Both data sources have a dedicated class (`PrismaPlayerRepository` and `HardcodedPlayerRepository`). Both classes implement the exact same `PlayerRepository` interface (which requires the `getAllPlayers()` method).

The `index.ts` file acts as a router. It reads the environment variable and exports a generic `playerRepository` object holding the correct initialized class.

### 3. Next.js Server Component (`src/app/dashboard/page.tsx`)
When a user visits the dashboard, Next.js executes this Server Component securely on the backend. 
```typescript
const players = await playerRepository.getAllPlayers();
```
The Server Component queries the repository router. The router delegates to the active class, which fetches the `Player[]` array. Because this runs on the server, database credentials and Prisma queries are never exposed to the client's browser.

### 4. Next.js Client Component (`src/app/dashboard/DashboardClient.tsx`)
The Server Component passes the retrieved `players` array down as a React prop to the `DashboardClient` component. 

```typescript
<DashboardClient players={players} />
```

This acts as the boundary where server-side logic transitions into client-side interactivity. The `DashboardClient` handles all browser-specific functionality: managing the `selectedIds` state, rendering the interactive Framer Motion animations, and painting the Floating Lines canvas. 

### Conclusion
By strictly adhering to this pipeline, you can confidently switch to a live database tomorrow without altering a single line of React UI code. The Dashboard only ever sees the final `Player[]` array.
