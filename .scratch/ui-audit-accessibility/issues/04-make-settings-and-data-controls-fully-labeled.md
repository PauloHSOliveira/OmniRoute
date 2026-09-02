# 04: Make settings and data controls fully labeled

**What to build:** Settings forms, selects, filters, and technical controls expose clear accessible names, helper text, validation errors, and required states without changing their data flow or configuration behavior.

**Blocked by:** 01: Repair shared shell accessibility; 03: Fix shared contrast and theme consistency.

**Status:** ready-for-agent

- [ ] Settings forms have programmatically associated labels for every input, select, and interactive control.
- [ ] Filters and technical controls have accessible names that describe their action or current state.
- [ ] Validation errors and helper text are associated with the relevant control and announced appropriately.
- [ ] Existing settings persistence, loading, disabled, and error behavior remains unchanged.
- [ ] Add regression coverage for the repaired form semantics.
