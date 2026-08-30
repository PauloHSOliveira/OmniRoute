# OmniRoute Design Direction

## Point of view

OmniRoute should feel like serious infrastructure, not an AI-themed consumer app. The interface is a quiet control surface for routing, observing, and operating a complex provider network.

## Visual world

- Minimal, editorial, and monochrome.
- White and near-black are the dominant materials.
- Warm off-white backgrounds separate the application from pure white content surfaces.
- Color is reserved for operational meaning: errors, healthy states, warnings, and occasional provider data visualization.
- Remove decorative gradients, saturated purple/coral accents, excessive rounded cards, and wallpaper-like visual noise.

## Typography

- Inter is the primary interface typeface for a crisp, neutral, technical voice.
- Use the system monospace stack for endpoints, IDs, code, and quantitative data.
- Prefer strong weight contrast and compact labels over oversized display treatments.

## Tokens

- Ink: `#111111`
- Paper: `#f7f7f5`
- Surface: `#ffffff`
- Subtle surface: `#efefec`
- Muted text: `#686862`
- Border: `rgba(17, 17, 17, 0.14)`
- Control radius: `7px`
- Card radius: `10px`

## Interaction

- Primary actions use solid near-black with white text.
- Secondary actions use white or subtle paper surfaces with a clear border.
- Focus remains high-contrast and keyboard-visible.
- Hover states use tonal shifts and borders before introducing color.

## Data visualization

Provider maps and operational charts remain because they communicate product value. Their surrounding chrome should be monochrome; semantic colors should be sparse, legible, and meaning-driven rather than decorative.

## Scope

This direction applies to the base web application and dashboard system. Product behavior, content, provider maps, operational data, and native affordances remain unchanged.
