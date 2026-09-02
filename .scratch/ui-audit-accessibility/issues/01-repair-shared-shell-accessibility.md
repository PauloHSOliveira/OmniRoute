# 01: Repair shared shell accessibility

**What to build:** Dashboard keyboard navigation works safely across the sidebar and header, with visible focus states and no focusable content trapped inside hidden regions.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] Sidebar and header controls expose correct accessible names, roles, and states.
- [ ] Keyboard focus never enters closed, hidden, or inert dashboard regions.
- [ ] Focus indicators remain visible in light and dark themes.
- [ ] Existing navigation, collapse, mobile menu, command palette, and logout behavior remain unchanged.
- [ ] Add regression coverage for the repaired focus behavior.
