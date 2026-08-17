# Product Requirements Document (PRD)

## Product Overview
The Sports Squad Constraint Checker is a web application designed for students organizing an inter-hostel futsal match. It allows users to validate a manually selected 7-player squad against a local roster of students, checking constraints such as squad size, positions, cohorts, and availability.

## Core Features
1. **Roster Display & Selection**
   - Display a fixed roster of players including: Player ID, Student Name, Position, Cohort, and Availability.
   - Allow the user to select players to form a squad.

2. **Validation Engine**
   - Validate the selected squad against the following constraints:
     - Exactly 7 players (`SQUAD_SIZE_MUST_BE_7`)
     - Exactly 1 Goalkeeper (`GOALKEEPER_COUNT_MUST_BE_1`)
     - At least 2 Defenders (`MINIMUM_DEFENDERS_NOT_MET`)
     - At least 2 Forwards (`MINIMUM_FORWARDS_NOT_MET`)
     - No unavailable player (`PLAYER_UNAVAILABLE: <ID>`)
     - Max 4 players from either cohort (`COHORT_LIMIT_EXCEEDED: <cohort> has <count>, maximum 4`)
     - Utility players count toward squad size and cohort totals, but not toward position minimums.
   - Output violations in the strict sequential order listed above.
   - Handle invalid/repeated IDs with `INVALID_SELECTION_REFERENCE`.

3. **Validation Summary Dashboard**
   - Display the current rule states, position counts (GK, DEF, FWD, UTIL), and cohort counts (YEAR_2, YEAR_3).
   - Display overall status as `VALID` or `INVALID` along with the list of errors.

4. **Action Controls**
   - "Validate Squad": Triggers the validation.
   - "Reset": Restores the roster to the built-in selection (S01 through S07).
   - "Sample Invalid": Replaces S07 with S08 to demonstrate a required one-change failure state.

5. **Formation View**
   - A visual, compact representation of the selected squad.

6. **Authentication**
   - A simple Google authentication login screen restricting access to the dashboard.

## Non-Functional Requirements
- **Decoupled Architecture**: Data fetching logic must be separated from business logic.
- **Premium UI**: Utilizing `shadcn/ui`, `Lenis`, `GSAP`, `Reactbits`, and `MagicUI`.
- **Modularity**: The validation system must not be tightly coupled to Next.js APIs or ORM implementations.
