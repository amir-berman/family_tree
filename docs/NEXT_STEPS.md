# family_tree — Next Steps (After Phase 1)

## Tree (interactive)
- Choose a graph approach:
  - lightweight custom canvas/SVG layout for initial UX control, or
  - adopt a maintained library if it improves maintainability (e.g. React Flow) *after* interaction requirements are clear.
- Implement:
  - node layout strategy (generations, spouses, siblings)
  - pan/zoom + inertia
  - focus mode + breadcrumb
  - live connection rendering (animated strokes, subtle pulse)
  - person panel with relations + media preview

## Feed (realistic)
- Add filter state (person/year/type) and a clean query model.
- Add media rendering placeholders (image/video) and item templates by type.
- Add a “composer” concept later (not in Phase 1).

## Profile (timeline-ready)
- Formalize timeline events (birth, wedding, migration, milestones, etc.).
- Add relations section (parents/spouse/children) driven by relationship graph.

## Data & integration readiness
- Define API contracts for:
  - persons
  - relationships
  - feed
  - media
- Add a minimal data access layer (fetcher + typed adapters).

## Product decisions needed
- How to represent multiple marriages, adoptions, guardians, and unknown parent links.
- Privacy model: visibility per person / per media item / per post.
- Editorial voice and naming system (Hebrew vs English display rules).

