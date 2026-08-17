# Dashboard UI Revamp (Phase 3)

Based on your explicit feedback, we will perform a deep visual polish on the dashboard layout, list items, header, and background layers.

## 1. List Item Refinement (`PlayerCard.tsx`)
- **Size Reduction**: Decrease the padding from `p-4` to `p-3` to make the list more compact. Reduce the text sizes slightly (e.g., `text-base` for names) to tighten the vertical rhythm.
- **Glass Glow & Opacity**: 
  - Increase the base opacity of the unselected state from `bg-white/5` to `bg-white/15` or `bg-white/20`.
  - Add a distinct, premium glass glow around the edges using a tailored box-shadow: `shadow-[0_0_20px_rgba(255,255,255,0.08)]`.
- **Toggle to Checkbox**: Replace the pill-switch with a sleek, polished, minimalist **checkbox**. When selected, it will feature a smooth checkmark icon and fill with a bright accent color.

## 2. Header Polish (`Header.tsx`)
- **Shape & Length**: Change the ultra-rounded pill shape (`rounded-[2rem]`) to a square shape with standard rounded corners (`rounded-2xl`). Increase the length to span most of the screen width (`w-full max-w-6xl`).
- **Glassmorphism & Glow**: Apply a stronger glass effect (`backdrop-blur-2xl bg-white/10`) and add the requested glass edge glow to match the list items.
- **Logo Adjustments**: 
  - Remove the SVG icon from the left side, leaving only the "Squad Up" text.
  - Import a high-quality SVG path for the GitHub logo and place it on the far right.
- **Buttons**: Modify the "Reset" and "Sample" buttons to be fully opaque (e.g., solid white/black combinations or solid accents). Space them evenly and ensure they are right-justified along with the GitHub logo.

## 3. Background Layer (`DashboardClient.tsx`)
- **Middle Glow Layer Removal**: The `FloatingLines` component defaults to rendering three wave layers (`top`, `middle`, `bottom`). We will explicitly pass `enabledWaves={['top', 'bottom']}` to remove the middle wave entirely, keeping the background less distracting and focusing attention on the UI.

## Execution
As per your instructions, I will proceed with this plan immediately without waiting for further approval.
