# UI Refinement Plan (Phase 5)

We will execute the following meticulous refinements to elevate the UI to an ultra-premium state.

## 1. Interaction Mechanics (Copy & Bubble Destruction)
**Goal:** Selecting a player copies them to the right rather than removing them from the left. Deselecting destroys them with a fluid bubble animation.
- **Left List Behavior:** The Roster list will display the full array of players. Selected items will stay in the left list but will feature a subtle "selected" state (e.g., dimmed opacity or a checkmark).
- **Flight Animation (GSAP):** When a player is selected, the newly spawned card in the right container will animate its entrance *from* the exact screen coordinates of the original left-side card using GSAP bounds calculations, creating a seamless "copy and fly" effect.
- **Bubble Destruction:** When a player is removed, the card in the right list will scale down while emitting small GSAP SVG circular particles (bubbles) that float outward and fade.

## 2. Typography & Scrollbars
- **Plus Jakarta Sans Fix:** Next.js sets the CSS variable to `--font-plus-jakarta`, but Tailwind v4 expects `--font-sans`. I will remap the font variable in `layout.tsx` so the entire app correctly inherits the beautiful Jakarta font.
- **Premium Scrollbars:** Update `globals.css` to implement a minimalist, thin, semi-transparent scrollbar track with a highly polished white/gray rounded thumb.
- **Shadow Mask Fix:** Adjust the top padding of the list internal containers so that items rest *below* the gradient mask when scrolled to the absolute top. They will only fade into the shadow when actively scrolled upwards.

## 3. Premium Bento Grid Validation Dashboard
- **Bento Grid:** The squad metrics on the right panel will be restructured into a premium CSS **Bento Grid**. Instead of a uniform 2x3 grid, metrics will have varying sizes (e.g., the Total Squad Size card will span 2 columns, while smaller metrics occupy 1 column) to create a beautiful, magazine-like dashboard layout.

## 4. React Bits Border Glow
- **Border Glow Mechanism:** I will implement an animated, rotating gradient border glow (commonly found in premium component libraries like React Bits/Magic UI) using a conic-gradient pseudo-element. 
- **Application:** This fluid glow will be applied to:
  - The `PlayerCard` wrappers.
  - The internal position and cohort badges.
  - The main `Header` container.

## 5. Header Button Polish
- **Refinement:** The "Reset" and "Sample" buttons will be explicitly given equal widths (e.g., `w-24`) and evenly spaced to ensure perfect symmetry on the right side of the header.

## Open Questions for You
> [!IMPORTANT]
> 1. **Selection State on Left Card:** Since the card will no longer disappear from the left list when selected, how should we visually indicate it has been selected? I propose dimming the opacity slightly and turning the toggle into a solid green checkmark.
> 2. **Border Glow Intensity:** Should the rotating border glow be always active on all cards, or only active when you hover over them / select them? (Always active on all 40 cards can be visually overwhelming and heavy on performance).

Please review this plan and answer the open questions so I can proceed!
