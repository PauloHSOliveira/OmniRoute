# 06: Run final cross-route quality verification

**What to build:** The audited OmniRoute dashboard has a repeatable quality check confirming route health, accessibility, theming, keyboard behavior, responsive layout, and interaction integrity after the remediation work.

**Blocked by:** 01: Repair shared shell accessibility; 02: Remove nested interactive controls; 03: Fix shared contrast and theme consistency; 04: Make settings and data controls fully labeled; 05: Reduce UI motion and performance debt.

**Status:** ready-for-agent

- [ ] Dashboard, Providers, Combos, Analytics, Settings, Logs, and Health routes return successfully.
- [ ] Automated accessibility checks show no critical or serious regressions in the audited surfaces.
- [ ] Desktop and mobile checks confirm no unexpected horizontal overflow.
- [ ] Light and dark mode checks confirm readable text, controls, borders, and states.
- [ ] Keyboard checks cover the shell, forms, tables, filters, and primary actions.
- [ ] Record the final audit result and any explicitly accepted residual findings.
