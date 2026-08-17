# Goal Description

The goal is to implement the next phase of the UI (Step 5) by creating a sleek header, establishing a split layout, and implementing an animated list of player cards using modern UI components (shadcn/ui, framer-motion, lucide-react).

## User Review Required

> [!IMPORTANT]
> Please review the component choices below. I will be installing `framer-motion` to handle the list animations and toggles, and utilizing `shadcn/ui` for the standard accessible components (Cards, Badges, Switches).

## Proposed Changes

### UI Architecture & Layout

#### [MODIFY] `src/app/dashboard/page.tsx`
- Implement a two-column responsive grid layout (1 column on mobile, 2 columns on `lg` screens) below the header.
- Ensure proper paddings (`p-4 md:p-8`) and full reactivity across screen sizes.
- The background `FloatingLines` will remain intact behind the content.

### Header Component

#### [NEW] `src/components/ui/Header.tsx`
- A sleek, glassmorphic card (using `backdrop-blur` and semi-transparent backgrounds).
- Center text: **"Squad Up"** with a premium gradient text effect.
- **System Status**: A glowing "Online" badge indicating live validation.
- **Quick Controls**: Fluid, animated buttons (using `framer-motion` scale and hover effects) for "Reset" (clears squad) and "Sample" (restores baseline S01–S07).
- Right-aligned GitHub icon (using `lucide-react`) linking to the repository.

### Player List & Components

#### [NEW] `src/components/ui/AnimatedList.tsx`
- A wrapper component utilizing `framer-motion` (`AnimatePresence` and `motion.ul`) to provide stagger animations and smooth entry/exit for list items.

#### [NEW] `src/components/ui/PlayerCard.tsx`
- An individual list item representing a player in the roster.
- **Selection**: An animated toggle switch (`shadcn/ui` Switch or Framer Motion custom toggle) to select/deselect the player.
- **Details**:
  - Player Name (`Student` field).
  - Position Badge (e.g., `GOALKEEPER`, `DEFENDER`) using `shadcn/ui` Badge with distinct colors.
  - Cohort Pill (`YEAR_2`, `YEAR_3`) using a secondary style Badge.
  - Availability Badge (`AVAILABLE`, `UNAVAILABLE`) with a green/red visual indicator.
- Will be styled as a glass card to fit the premium aesthetic.

## Verification Plan

### Automated Tests
- N/A for UI components (we rely on visual verification).

### Manual Verification
- Verify the header renders correctly and the GitHub icon is functional.
- Ensure the layout switches from 1 column on mobile to 2 columns on desktop.
- Verify the player list renders the hardcoded data correctly.
- Test the animated toggle and the staggered entry of the animated list.
- Check that all badges have the correct styling based on the player data.
