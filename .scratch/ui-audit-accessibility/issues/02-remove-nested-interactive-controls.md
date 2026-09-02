# 02: Remove nested interactive controls

**What to build:** Clickable dashboard rows and cards remain fully usable while links, buttons, menus, and other controls inside them work independently without invalid nested-interactive markup.

**Blocked by:** 01: Repair shared shell accessibility.

**Status:** done

- [x] Dashboard, Providers, Combos, and Logs interactive regions have valid, non-nested semantics.
- [x] Row/card click behavior remains unchanged when clicking the container.
- [x] Inner links, buttons, selects, and menus remain independently operable.
- [x] Keyboard activation works for each interactive region.
- [x] Add regression coverage for the repaired interaction behavior.
