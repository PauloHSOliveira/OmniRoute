# 05: Reduce UI motion and performance debt

**What to build:** Dashboard interactions retain useful feedback while avoiding broad transitions, decorative effects, and unnecessary rendering work that can slow operational screens.

**Blocked by:** 01: Repair shared shell accessibility; 02: Remove nested interactive controls; 03: Fix shared contrast and theme consistency.

**Status:** ready-for-agent

- [ ] Retain purposeful loading, disclosure, navigation, and state-change feedback.
- [ ] Replace broad or expensive transitions with targeted properties where practical.
- [ ] Remove decorative motion or effects that do not communicate state.
- [ ] Respect reduced-motion preferences without hiding important state changes.
- [ ] Verify key dashboard routes remain responsive during normal interaction.
