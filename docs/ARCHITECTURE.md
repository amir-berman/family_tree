# family_tree — Architecture (Phase 1)

## Goals
- Production-grade Next.js foundation (App Router, TypeScript strict, Tailwind).
- Premium UI shell that is RTL-aware and componentized.
- Mock data + types that can later be replaced with backend data.
- Avoid premature backend complexity.

## App Router structure
- `src/app/layout.tsx`: global HTML setup (lang=he, dir=rtl), font, metadata.
- `src/app/page.tsx`: home entry experience.
- `src/app/tree/page.tsx`: tree screen shell.
- `src/app/feed/page.tsx`: feed screen shell.
- `src/app/person/[personId]/page.tsx`: placeholder person profile route.

## Component structure
- `src/components/app/*`: application shell components (navigation + frame).
- `src/components/home/*`: home-specific components (hero/entry).
- `src/components/ui/*`: small reusable UI primitives (button/card).
- `src/components/tree/*`: interactive tree canvas, nodes, and person panel.

## Data model (mock-first)
- `src/mock/family.ts` holds:
  - `Person`, `Relationship`, `MediaItem`, `FeedItem`
  - mock arrays and a small selector helper

This file is intentionally shaped like a future backend response, but kept simple to avoid overengineering.

## Styling system
- Tailwind CSS v3
- Custom palette for “ink/pearl” premium dark theme
- Global cinematic background (radials + subtle noise overlay)
- No external UI framework yet (kept lightweight); can adopt shadcn/ui once patterns stabilize

## Tree rendering (Phase 2)
- Custom pan/zoom canvas (no graph library yet) to keep the experience cinematic and non-flowchart.
- Nodes are positioned in a curated “family map” layout (manual positions now; layout engine later).

## Tree layout (Phase 3)
- Added a deterministic generation-based layout engine:
  - parent → child vertical hierarchy
  - spouse pairing via grouping
  - stable spacing + row centering
- Rendering consumes the layout output (world bounds + node positions), keeping interactions independent of layout.

## i18n readiness
- Hebrew-first and RTL now.
- Names include optional EN fields.
- Future step: introduce locale routing and message catalogs once English is scheduled.

