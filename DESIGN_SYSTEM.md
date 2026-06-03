# Design System: Gemini Portfolio

This document outlines the current design system foundation and proposed refinements for the Gemini Portfolio, focusing on professional enterprise SaaS aesthetics.

## 1. Typography

### Typefaces
- **Display:** [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) (Italic). Used for emotional storytelling, section headings, and emphasis.
- **Sans (UI/Body):** [Geist Sans](https://vercel.com/font/sans). Used for functional UI, body text, and structural labels.
- **Mono:** [Geist Mono](https://vercel.com/font/mono). Used for data, technical metadata, and small labels.

### Scale
| Level | Size (Mobile/Desktop) | Weight | Font | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `3rem` / `clamp(3rem, 8vw, 7rem)` | 400 (Italic) | Instrument | Main landing headline |
| **Section Heading** | `2rem` / `clamp(1.5rem, 3vw, 2.25rem)` | 400 (Italic) | Instrument | Primary section titles |
| **Subheading** | `text-lg` (18px) / `text-xl` (20px) | 500 | Geist Sans | Feature or block titles |
| **Body (Large)** | `text-base` (16px) / `text-lg` (18px) | 400 | Geist Sans | Hero subtext |
| **Body (Standard)** | `text-base` (16px) | 400 | Geist Sans | Main content paragraphs |
| **UI Small** | `text-sm` (14px) | 500 | Geist Sans | Meta data, cards, buttons |
| **Label / Caption** | `text-xs` (12px) | 500 | Geist Sans | Micro-copy, captions, labels |
| **Micro Label** | `text-[10px]` | 700 (Tracking 0.08em) | Geist Sans | Role pills, uppercase headers |

## 2. Color Palette

### Neutrals (Foundation)
- **Background:** `#F9F8F5` (`var(--color-warm-bg)`) - Warm, paper-like foundation.
- **Surface:** `#FFFFFF` (`var(--color-surface)`) - Pure white for cards and elevated panels.
- **Surface Tint:** `#F2F0EB` (`var(--color-surface-tinted)`) - Secondary panels/placeholders.
- **Border (Default):** `#E6E3DD` (`var(--color-border)`) - Subtle structural definition.
- **Border (Strong):** `#CECAC2` (`var(--color-border-strong)`) - Higher contrast structural elements.

### Text
- **Primary:** `#18171A` (`var(--color-text)`) - High contrast charcoal.
- **Secondary:** `#6A6764` (`var(--color-text-secondary)`) - Medium contrast gray-brown.
- **Muted:** `#9C9A95` (`var(--color-text-muted)`) - Low contrast labels and captions.

### Accent (Copper)
- **Primary:** `#C07B50` (`var(--color-accent)`) - Brand identity and primary actions.
- **Hover:** `#A8643C` (`var(--color-accent-hover)`) - Darker copper for interaction.
- **Light:** `#F5E8DC` (`var(--color-accent-light)`) - Backgrounds for pills or selections.

### Status (Enterprise)
- **Success (Green):** `#3a7a54` - Validated, Approved, Complete.
- **Warning (Red/Amber):** `#B85A48` - Rejected, Critical, Requires Action.
- **Info (Blue):** `#4A789C` (Proposed) - Pending, In Progress.

## 3. Spacing & Layout

### Grid & Max-Width
- **Site Container:** `max-w-[1280px]`
- **Case Study Content:** `max-w-[900px]` (with `lg:pl-[150px]` offset for navigation).
- **Mobile Margins:** `px-6` (24px)
- **Desktop Margins:** `px-10` (40px)

### Vertical Rhythm
- **Main Section Gap:** `py-24` (Mobile) / `py-36` (Desktop)
- **Block Gap:** `space-y-6`
- **Component Internal Gap:** `p-6` (Standard) / `p-7` (Large)

## 4. UI Patterns

### Cards
- **Radius:** `rounded-2xl` (16px)
- **Border:** `1px solid #E6E3DD`
- **Shadow:** `hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)]`
- **Transition:** `300ms ease`

### Buttons
- **Primary:** `rounded-full`, `bg-[#18171A]`, `text-[#F9F8F5]`, `font-medium`.
- **Secondary:** `rounded-full`, `border-[#E6E3DD]`, `text-[#6A6764]`, `hover:border-[#C07B50]`.
- **Sizing:** `min-h-[44px]` (Touch targets).

### Pills / Labels
- **Standard Pill:** `px-3 py-1.5`, `rounded-full`.
- **Role Pill:** `px-2 py-0.75`, `rounded-sm`, `text-[10px]`, `uppercase`.

## 5. Enterprise SaaS Rules

### Workflow Clarity
- **Module-Level Independence:** Visual indicators must distinguish between project-level state and module-level state.
- **Ownership:** Every actionable state must display the current owner (Role/Name).
- **Permissions:** Read-only states must be explicit (Lock icons, subtle background shifts).
- **Feedback:** Rejection feedback must be inline and distinct from general comments.

### Visual Hierarchy
- Use **Instrument Serif Italic** only for narrative/storytelling moments.
- Use **Geist Sans/Mono** for all functional, interactive, and data-driven elements.
- Maintain strict alignment between labels and their associated data/inputs.
