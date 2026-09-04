# OmniRoute Design Direction

## Point of view

OmniRoute is serious infrastructure software: precise, calm, fast, technical, and trustworthy. The interface is a quiet control surface for routing, observing, and operating a complex provider network — closer to a cloud infrastructure console or a modern SaaS analytics product than an AI-themed app.

## Visual world

- **White is the canvas, near-black is the ink.** The interface reads white → black → typography → spacing → structure before color is ever perceived.
- Monochromatic by default. Color is information, never decoration.
- Flat surfaces: 1px borders and whitespace separate sections instead of shadows, gradients, or floating panels.
- Restrained 8–10px radii; cards carry no elevation.
- No glassmorphism, neon, gradients, or 3D illustration on product screens. Illustrations are allowed only in empty states and onboarding, and even there kept quiet.

## Tokens

- Canvas: `#FFFFFF`
- Subtle surfaces: `#F7F7F7`, `#FAFAFA`
- Primary text: `#111111`
- Secondary text: `#5F6368`
- Muted text: `#8A8F98`
- Border: `#E5E7EB`
- Strong border / selected: `#D1D5DB`
- Accent: `#2563EB` (active nav, selected controls, links, charts, primary actions, focus)
- Success: `#16A34A` · Warning: `#D97706` · Danger: `#DC2626`
- Purple `#7C3AED` only for model/provider distinctions when necessary
- Control radius: `7px` · Card radius: `10px`
- Monospace reserved for model/provider IDs, API routes, tokens, request IDs, latency, and diagnostics

## Typography

- IBM Plex Sans (system sans fallback) as the primary interface face. Its slightly humanist, engineered character suits infrastructure software without falling into generic AI-product typography.
- Page titles 26–28px / 600, section titles 18–20px / 600, card titles 14–16px / 500–600, body 13–14px, metadata 12–13px.
- Headings are the main hierarchy mechanism; no kickers, no eyebrow labels.

## Interaction

- Primary actions are solid blue (`#2563EB`) with white text; secondary actions are white with a gray border; destructive actions are red only when destructive.
- Focus rings are high-contrast and keyboard-visible, blue-ringed.
- Hover states use tonal shifts and borders before color.
- Motion is functional only: hover, tab, and disclosure transitions plus loading states. No glowing, pulsing, or ornamental animation.

## Data visualization

- Charts are mostly neutral with one primary accent: main series → blue, success → green, warning → amber, failure → red. Multi-series categorical palettes lead with blue and stay muted.
- Provider status reads as subtle dot + label combinations (● Healthy / ● Degraded / ● Offline), never giant colored badges.

## Navigation

- A narrow, clean left sidebar, mostly icon-driven. Active item uses a pale blue background with dark text and a blue icon accent.
- The content area is white and spacious: page title, optional short description, primary actions aligned right, then tabs/filters, then the data area.

## Scope

This direction applies to the base web application and dashboard system. Product surfaces (dashboard, providers, routing, settings, logs, analytics) all share the same tokens and primitives.
