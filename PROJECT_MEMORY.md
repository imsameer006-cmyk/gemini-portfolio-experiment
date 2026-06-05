# Project Memory: Gemini Portfolio

Last updated: 2026-06-05

## START HERE

Read this file first in future AI sessions. It is the source of truth for current portfolio status, branch workflow, Gemini case-study decisions, hero exploration, and design language.

Current priorities:
- Keep the Gemini case study production-ready and coherent.
- Preserve the finalized Gemini hero direction unless a new exploration is explicitly requested.
- Do future experimentation on `claude`, review it, then merge approved work into `main`.
- Do not modify production functionality unless the user explicitly asks.

Current branch structure:
- `main`: approved production branch and public portfolio source.
- `claude`: active experimentation branch.
- `gemini-cli-review`: older review/audit branch; do not use by default.

Current active work:
- Latest approved production commit: `14c8445 Finalize Gemini hero and diagram system`.
- Gemini hero has been promoted from lab exploration into the Gemini project page.
- Three Gemini flow diagrams have been visually aligned and exported.
- Local uncommitted state may include the recent `challenge-poc` annotation adjustment: annotation 2 moved down, connector shortened, node kept fixed. Review before committing.

Known constraints:
- This project uses Next.js 16.2.6. Read `node_modules/next/dist/docs/` before writing Next.js code, per `AGENTS.md`.
- Keep the production homepage hero separate from the Gemini project hero.
- Hero Lab is for isolated preview and exploration.
- Do not overcomplicate the hero. It should communicate workflow hierarchy and completion without becoming a game.
- Maintain the warm, premium, minimal portfolio tone.

Project goals:
- Present Sameer as a thoughtful product designer with strong enterprise/B2B UX judgment.
- Make the Gemini case study credible, specific, and senior.
- Show the shift from fragmented tooling/email coordination to visible workflow governance.
- Balance storytelling warmth with systems-design rigor.

Important positioning decisions:
- Gemini is a workflow-system case study, not only a UI redesign.
- The core narrative is: module customization existed, but ownership, approvals, feedback, editability, and next actions were invisible.
- Short Flow is an enterprise workflow layer that made module-level governance visible.
- The aesthetic should feel calm, premium, editorial, and enterprise-ready.

## Project Status

Current state:
- Next.js portfolio with a warm editorial visual language.
- Gemini Digital Twin is the primary and most developed case study.
- Main homepage hero remains in `components/sections/Hero.tsx`.
- Gemini project hero lives in `components/sections/GeminiProjectHero.tsx`.
- Hero Lab exists at `/hero-lab` for isolated preview.

Published status:
- `main` contains approved production work through commit `14c8445`.
- The project has been pushed to GitHub.
- Deployment appears connected to the pushed production branch, but verify Vercel when an exact live deploy state matters.

Current deployment status:
- Last verified production build passed after the Gemini hero and diagram updates.
- Build may need network access because `next/font` fetches Google fonts.
- Full lint currently reports unrelated existing issues in bundled Three.js files, screenshot scripts, `Work.tsx`, and `JumpToNav.tsx`.

Active branch strategy:
- Work on `claude`.
- Review.
- Approve.
- Merge into `main`.
- Push `main`.
- Deploy from `main`.

Main branch purpose:
- Stable, approved, production-ready portfolio.

Claude branch purpose:
- Active experimentation and iteration branch for visual exploration, copy refinement, and case-study polish.

## Gemini Case Study Status

What has already been improved:
- Repositioned around Short Flow as workflow governance.
- Overview clarifies Gemini as a digital twin platform for module customization, simulation, and engineering approval workflows.
- Challenge reframed around missing workflow infrastructure.
- Context explains governance complexity across FAE, PAE, PMG, and PJM.
- Research insight centers on status uncertainty after submission.
- Solution frames Short Flow as a structured approval lifecycle.
- Design decisions explain workflow grammar, self-assignment, parallel review, state clarity, ownership/editability, and structured rejection feedback.
- Architecture and interaction-flow diagrams reinforce module-level independence.
- Year corrected to `2025-2026`.

Governance improvements implemented:
- Role list for FAE, PAE, PMG, and PJM.
- Ownership and permission model.
- Module-level governance diagram.
- Architecture diagram showing independent module state, owner, editability, and feedback.
- Interaction flow showing project-level submission and module-level review.

Workflow-system positioning implemented:
- Short Flow is presented as an enterprise workflow layer.
- State, owner, permission, next action, and feedback are the core workflow grammar.
- Rejection is a structured state with visible feedback and revision path, not an email thread.

Enterprise UX framing implemented:
- Emphasis on role clarity, permissions, read-only states, review responsibility, and governance.
- Stronger B2B vocabulary: workflow state, ownership, feasibility assessment, commercial evaluation, module-level lifecycle, approval architecture.
- Diagrams use restrained enterprise colors and structured cards.

Approved visual audit findings:
- Warm neutral background and paper-like surfaces fit the portfolio tone.
- Instrument Serif is for editorial narrative; Geist is for functional UI/body.
- Gemini-specific teal is acceptable because it connects to the product UI.
- Teal should be warmed/muted and balanced with copper and warm neutrals.
- Green/red should be reserved mostly for success/rejection outcomes.
- Three flow diagrams should share card radius, border, shadow, connector stroke, icon style, and muted status palette.

Phase 1 completed:
- Portfolio foundation audited.
- Design system documented.
- Visual QA checklist created.
- Implementation roadmap created.
- Gemini narrative direction established.

Phase 2A completed:
- Gemini hero finalized and moved into the Gemini project page.
- Hero visual uses horizontal workflow hierarchy instead of random node placement.
- Four distinct nodes represent progression through workflow.
- Network branches and micro-lines add depth while staying subtle.
- Completion sweep and warm/teal color language tuned.
- Mobile/tablet behavior uses non-interactive/static visual approach.
- Diagram consistency pass completed for the three flow images.

Remaining improvements:
- Review/commit the latest uncommitted `challenge-poc` annotation update if approved.
- Decide whether to fix existing lint errors or scope lint to app code only.
- Consider replacing native `<img>` usage with `next/image` later, after checking layout implications.
- Continue copy tightening if stronger business metrics become available.
- Audit mobile rendering after future case-study image changes.

Known design decisions:
- Do not make the Gemini hero too playful.
- Interactions should symbolize workflow completion, not distract from content.
- Hero visual should stay mostly on the right and leave text breathable.
- Use restrained, warm, enterprise colors over saturated tech colors.
- Keep diagrams explanatory and consistent, not overly decorative.

Things intentionally not changed:
- Main homepage hero remains separate from Gemini project hero.
- Product claims were not inflated beyond known case-study facts.
- Hero Lab route remains available.
- Existing lint issues outside scope were not fixed.
- Production homepage was not redesigned during Gemini hero work.

## Hero Exploration Status

Hero Lab exists:
- Route: `/hero-lab`
- Current file: `app/hero-lab/page.tsx`
- Current hero component: `components/sections/GeminiProjectHero.tsx`

Purpose:
- Isolated preview area for the Gemini project hero.
- Tests hero ideas without accidentally changing the main homepage.
- Should remain a sandbox unless the user explicitly asks to promote a direction.

Current visual exploration direction:
- Abstract workflow network behind/around the Gemini hero.
- Horizontal progression communicates hierarchy and process.
- Four primary nodes represent staged completion.
- Secondary branches and micro-lines imply system complexity.
- Completion sweep communicates the process finishing.

Design rationale:
- The visual connects to Gemini's workflow, module governance, and system architecture.
- It hints at technical complexity without using literal product screenshots in the hero.
- It reinforces the thesis: clarity emerges from connected workflow states.

Concepts explored:
- Random node network.
- Comprehensive network with micro-lines.
- Radial glow and blur.
- Inverted screen segments.
- Gradient sweep left to right.
- Persistent hover/click halos.
- Horizontal node hierarchy.
- Distinct node shapes.
- Static tablet/mobile behavior.

Current preferred direction:
- Horizontal hierarchy with four distinct nodes.
- Warm muted teal/copper palette.
- Subtle micro-network behind main routes.
- Clear cue to interact on desktop.
- Static/non-interactive visual on tablet/mobile.

Constraints:
- Do not obscure project title, chips, or core text.
- Keep the left side calm and uncluttered.
- Avoid high-saturation green except where it signals completion or product UI connection.
- Motion must feel premium and subtle.
- Respect reduced-motion behavior.

Future exploration ideas:
- Add subtle labels only if they improve comprehension.
- Consider mapping node stages to actual Short Flow concepts.
- Explore a quiet completed network state instead of a dramatic burst.
- Consider capturing a static poster state for mobile/tablet if performance becomes an issue.

## Design Language

Typography philosophy:
- Instrument Serif Italic is for narrative, emotional emphasis, and section titles.
- Geist Sans is for body, UI labels, controls, and structured case-study content.
- Geist Mono is for technical metadata or compact data when needed.
- The contrast between editorial serif and functional sans should feel deliberate.

Spacing philosophy:
- Generous whitespace is part of the premium feel.
- Complex enterprise content needs room to breathe.
- Prefer clear vertical rhythm over dense stacking.
- Keep content blocks aligned to the case-study grid.

Visual hierarchy:
- Start with strong editorial headings.
- Support with concise body copy and structured evidence.
- Use cards, diagrams, and callouts to clarify complex workflows.
- Labels and captions should be muted but readable.

Motion language:
- Calm, smooth, and purposeful.
- Use Framer Motion sparingly for entrance, hover, and workflow progression.
- Avoid decorative motion that competes with reading.
- Reduced-motion behavior should remain supported.

Interaction principles:
- Interactions should communicate state, progression, or affordance.
- Click effects should leave meaningful state behind.
- Hover should be subtle and premium, not flashy.
- Mobile/tablet should not depend on hover.

Portfolio tone:
- Clear, thoughtful, senior, and systems-oriented.
- Avoid hype.
- Prefer precise enterprise language over generic design language.
- Let the work communicate maturity through structure and restraint.

Enterprise positioning:
- Emphasize governance, ownership, permissions, workflow visibility, and measurable coordination improvements.
- Show that design decisions map to operational clarity.
- Make multi-role complexity understandable.

Premium/minimal aesthetic decisions:
- Warm paper background: `#F9F8F5`.
- Charcoal text: `#18171A`.
- Muted secondary text: `#6A6764`.
- Subtle borders: `#E6E3DD`.
- Copper accent: `#C07B50`.
- Muted teal for Gemini/product-system cues: `#477C6C` / `#405F56`.
- Status green: `#3A7A54`.
- Rejection red: `#B85A48`.

## Workflow Documentation

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

Recommended session flow:
1. `git status --short`
2. `git branch --show-current`
3. If experimentation is needed: `git switch claude`
4. Pull latest if network access is available and desired.
5. Make changes.
6. Verify.
7. Review.
8. Merge approved work into `main`.

## Git Knowledge

Check current branch:
```bash
git branch --show-current
```
Shows which branch is active.

Check status:
```bash
git status --short
```
Shows modified, deleted, staged, and untracked files.

Create a branch:
```bash
git switch -c branch-name
```
Creates and switches to a new branch.

Switch branch:
```bash
git switch claude
```
Moves to an existing branch.

See changes:
```bash
git diff
```
Shows unstaged changes.

See staged changes:
```bash
git diff --cached
```
Shows what will be committed.

Stage changes:
```bash
git add path/to/file
```
Adds selected files to the next commit.

Commit:
```bash
git commit -m "Describe the change"
```
Creates a local checkpoint.

Push:
```bash
git push origin branch-name
```
Sends local commits to GitHub.

Merge approved work:
```bash
git switch main
git merge claude
```
Brings approved experiment work into production.

Push production:
```bash
git push origin main
```
Updates the production branch and triggers deployment if Vercel is connected.

Check recent commits:
```bash
git log --oneline -5
```
Shows the last five commits.

