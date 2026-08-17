# UI Polish & Refinement Plan (Phase 7)

We will execute the following meticulous refinements to finalize the exact ReactBits aesthetic and resolve the layout bugs.

## 1. True "Border Glow" (Conic Gradient)
The current implementation used a Spotlight effect. I will completely rewrite `BorderGlow.tsx` to precisely match the ReactBits **Border Glow** component. 
- **Mechanic:** It will use an infinitely rotating `conic-gradient` embedded in a pseudo-element (`::before`), hidden behind an inner solid-colored mask. 
- **Behavior:** The glowing border will seamlessly rotate around the edges of the component. As requested, it will activate on hover for `PlayerCard` list items, but will be permanently visible on the `Header` and specific Badges.

## 2. "Magic Bento" Dashboard
I will refactor `SquadMetricsBento.tsx` to perfectly mimic the **Magic Bento** styling from ReactBits.
- **Styling:** Soft glassmorphic backgrounds (`bg-white/[0.02]`), ultra-smooth border radii (`rounded-3xl`), inner subtle rings (`ring-1 ring-white/5`), and a slight floating hover effect.
- **Layout:** A polished, asymmetrical CSS grid where major metrics (like Total Squad Size) command visual hierarchy with larger spans, creating an authentic magazine-style Bento layout.

## 3. Layout Fixes (Shadow Padding & Scrollbars)
- **Shadow Bleed:** The list items are currently hiding behind the CSS gradient shadow at the top. I will restructure the list's scrolling container (`overflow-y-auto`) by applying a `margin-top` offset paired with a high `padding-top` inside the scroll area. This guarantees the first item rests *below* the top shadow boundary when fully scrolled up, only disappearing into the shadow when actively scrolled up.
- **Scrollbar Overflow:** I will adjust the scrollbar CSS (using `scrollbar-gutter: stable`) and padding offsets so the scrollbar sits cleanly inside the container without causing horizontal overflow or misalignment.

## 4. Header Polish & GitHub Integration
- **Button Hover:** I will add a premium "pop" hover state to the Reset and Sample buttons (slight scale up, brighter background, crisp text contrast).
- **GitHub Link:** I will wire up the GitHub icon in the Header with a sleek hover transition (opacity and scale) directly linked to this specific repository URL.

## 5. Database Sorting (S10 vs S100)
- **The Issue:** `ORDER BY PlayerID ASC` sorts alphanumerically, so `S10`, `S100`, `S11` is the standard database result when numbers aren't zero-padded correctly.
- **The Fix:** I will update the `prisma/seed.ts` generation loop to pad IDs to 3 digits (`S001`, `S010`, `S100`). This completely resolves the sorting issue at the database level. I will then drop and re-seed the DB.

## Open Questions
> [!IMPORTANT]
> 1. **Database Reset:** To fix the sorting (S100 vs S10), I need to wipe the database and re-run the seed script with the new 3-digit padded IDs (`S010`, `S100`). Is it okay if I run `npx prisma db push --force-reset` and re-seed?
> 2. **Border Glow Color:** Should the rotating border glow be a neutral white/silver, or a dynamic color (e.g., cyan/emerald)?

Please review this plan and answer the open questions so I can proceed with the ultimate UI polish!
