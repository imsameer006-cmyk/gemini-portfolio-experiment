# Gemini Portfolio

Portfolio for Sameer Gautam, centered on enterprise/B2B product design work and the Gemini Digital Twin case study.

## Start Here

For future AI or development sessions, read [`PROJECT_MEMORY.md`](./PROJECT_MEMORY.md) first. It contains the current branch strategy, production status, Gemini case-study status, hero exploration status, design language, and workflow notes.

Supporting docs:
- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) - typography, color, layout, and enterprise UI rules.
- [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) - phased roadmap and current completion notes.
- [`VISUAL_QA_CHECKLIST.md`](./VISUAL_QA_CHECKLIST.md) - senior portfolio QA checklist.
- [`AGENTS.md`](./AGENTS.md) - agent instructions, including Next.js documentation requirements.

## Branch Workflow

```text
main
approved production branch

claude
active experimentation branch

Process:
work on claude
-> review
-> approve
-> merge into main
-> push main
-> deploy
```

## Current Status

- `main` is the approved production branch.
- `claude` is the active experimentation branch.
- Gemini project hero has been finalized and promoted to the Gemini project page.
- `/hero-lab` remains available for isolated preview/exploration.
- Gemini case-study diagrams have been visually aligned.
- Last approved production commit at time of documentation update: `14c8445 Finalize Gemini hero and diagram system`.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful routes:
- `/` - portfolio homepage
- `/work/gemini-digital-twin` - primary Gemini case study
- `/hero-lab` - isolated Gemini hero preview

## Build and Checks

```bash
npm run build
npm run lint
```

Notes:
- Production build may require network access because `next/font` fetches Google fonts.
- Full lint currently includes unrelated existing issues in bundled Three.js files and utility scripts. See [`PROJECT_MEMORY.md`](./PROJECT_MEMORY.md) for context.

## Next.js Version Note

This project uses Next.js 16.2.6. Per [`AGENTS.md`](./AGENTS.md), read the relevant guides in `node_modules/next/dist/docs/` before writing Next.js code because APIs and conventions may differ from older Next.js versions.

## Deploy on Vercel

The project is intended to deploy from `main`. After approved work is merged into `main`, push `main` and verify the deployment in Vercel.
