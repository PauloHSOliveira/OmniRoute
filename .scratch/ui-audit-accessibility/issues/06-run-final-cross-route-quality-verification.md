# 06: Run final cross-route quality verification

**What to build:** The audited OmniRoute dashboard has a repeatable quality check confirming route health, accessibility, theming, keyboard behavior, responsive layout, and interaction integrity after the remediation work.

**Blocked by:** 01: Repair shared shell accessibility; 02: Remove nested interactive controls; 03: Fix shared contrast and theme consistency; 04: Make settings and data controls fully labeled; 05: Reduce UI motion and performance debt.

**Status:** in-progress

- [x] Dashboard, Providers, Combos, Analytics, Settings, Logs, and Health routes are covered by the cross-route Playwright suite.
- [x] Automated accessibility coverage remains enforced by `tests/e2e/a11y.spec.ts` with frozen axe baselines.
- [x] Desktop and mobile overflow checks are implemented.
- [x] Light and dark mode verification is implemented through the theme toggle.
- [x] Keyboard verification covers the shell and settings form controls.
- [ ] Execute the final homologation suite and record the audit result and any explicitly accepted residual findings.
