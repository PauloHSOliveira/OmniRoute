# 01: Repair shared shell accessibility

**What to build:** Dashboard keyboard navigation works safely across the sidebar and header, with visible focus states and no focusable content trapped inside hidden regions.

**Blocked by:** None (can start immediately).

**Status:** done

- [x] Sidebar and header controls expose correct accessible names, roles, and states.
- [x] Keyboard focus never enters closed, hidden, or inert dashboard regions.
- [x] Focus indicators remain visible in light and dark themes.
- [x] Existing navigation, collapse, mobile menu, command palette, and logout behavior remain unchanged.
- [x] Add regression coverage for the repaired focus behavior.
