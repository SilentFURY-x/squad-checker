# UI Refinement Plan (Phase 6)

Based on your exact approvals, we will execute the final layer of ultra-premium polish, perfectly integrating the official React Bits components and GSAP mechanics.

## 1. React Bits Integration
- **SpotlightCard (Border Glow):** I have successfully fetched the official `SpotlightCard` component directly from the React Bits registry (`https://reactbits.dev/r/SpotlightCard-TS-TW`). This provides the exact dynamic, cursor-following gradient illumination you requested. 
  - **Application:** We will wrap the `Header`, individual `PlayerCard` components, and the right-panel metrics inside this `SpotlightCard`. As requested, the intense dynamic glow will activate *only on hover*, while the resting state will feature a highly polished, static glass-glow border.
- **Bento Grid Dashboard:** I will construct the Right Panel metrics using a sleek, asymmetrical CSS Grid (the exact "Bento" layout popularized by React Bits templates). Larger metrics (e.g., Total Squad Size) will span two columns, while granular metrics (e.g., specific positions) will occupy single slots. Every Bento box will be a `SpotlightCard`.

## 2. Interaction Mechanics (Copy & GSAP Bubbles)
- **Left List (Copy Mechanic):** Selecting a player no longer removes them from the left roster. Instead, they will remain in the list, their opacity will slightly dim, and the toggle will transition into a solid green checkmark.
- **GSAP Flight & Destruction:**
  - **Flight (Selection):** A cloned card will spawn and fluidly fly from the left roster into the Bento Dashboard using GSAP Flip.
  - **GSAP Bubble Destruction:** I will build a custom GSAP particle animation. When a player is deselected, their card in the right container will instantly shatter into 5-6 small circular SVG "bubbles" that float outward and fade away.

## 3. Global Polish & Refactoring
- **Font Fix:** The Plus Jakarta Sans font is currently failing because Tailwind v4 handles variables differently than v3. I will explicitly map `--font-plus-jakarta` into the Tailwind theme configuration to ensure it successfully overrides the system default.
- **Header Buttons:** The "Reset" and "Sample" buttons will be perfectly uniform in size (`w-24`), evenly spaced, and cleanly right-justified.
- **Minimalist Scrollbars:** The scrollbars will be heavily restyled into ultra-thin, premium translucent tracks that only appear upon hovering the list.
- **Separation of Concerns:** I will refactor the bloated `DashboardClient.tsx` by extracting the Bento Grid metrics and the Ordered Checklist into their own dedicated, clean components (`SquadMetricsBento.tsx` and `ViolationChecklist.tsx`).

## Open Questions
> [!IMPORTANT]
> 1. **Bubble Colors:** When a card shatters into bubbles upon deselection, should the bubbles be a neutral white/gray, or should they match the color of the player's position (e.g., Rose for Forwards, Emerald for Defenders)?

Please review this detailed plan and let me know your thoughts on the bubble colors!
