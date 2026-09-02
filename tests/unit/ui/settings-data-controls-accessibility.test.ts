import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const root = process.cwd();

function source(path: string) {
  return readFileSync(`${root}/${path}`, "utf8");
}

test("settings and data controls have accessible names", () => {
  const page = source("src/app/(dashboard)/dashboard/combos/page.tsx");

  for (const id of [
    "combo-manual-model",
    "combo-max-retries",
    "combo-retry-delay",
    "combo-target-timeout-ms",
    "combo-reasoning-transport-fallback",
    "combo-max-set-retries",
    "combo-set-retry-delay",
    "combo-concurrency-per-model",
    "combo-queue-timeout",
    "combo-sticky-limit",
    "combo-sticky-weighted-limit",
    "combo-nested-combo-mode",
    "combo-disable-session-stickiness",
    "combo-handoff-threshold",
    "combo-max-messages-for-summary",
    "combo-summary-model",
    "combo-fusion-judge-model",
    "combo-fusion-min-panel",
    "combo-fusion-straggler-grace",
  ]) {
    assert.ok(page.includes(`id=\"${id}\"`), `${id} should have an id`);
    assert.ok(page.includes(`htmlFor=\"${id}\"`), `${id} should have a label`);
  }

  assert.ok(page.includes('aria-label={getI18nOrFallback(t, "weightPercent", "Weight percent")}'));

  const connectionRow = source(
    "src/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow.tsx"
  );
  const importModal = source(
    "src/app/(dashboard)/dashboard/providers/components/ImportProvidersFromFileModal.tsx"
  );
  const logs = source(
    "src/app/(dashboard)/dashboard/providers/services/components/ServiceLogsPanel.tsx"
  );

  assert.ok(connectionRow.includes("aria-label={`Select connection ${displayName}`}"));
  assert.ok(importModal.includes('aria-label="Select all imported providers"'));
  assert.ok(importModal.includes("aria-label={`Select imported provider ${entry.name}`}"));
  assert.ok(logs.includes('aria-label={t("filterLogs")}'));

  const payloadRules = source(
    "src/app/(dashboard)/dashboard/settings/components/PayloadRulesTab.tsx"
  );
  assert.ok(
    payloadRules.includes(
      'aria-describedby={parsedEditor.error ? "payload-rules-editor-error" : undefined}'
    )
  );
  assert.ok(payloadRules.includes("aria-invalid={!!parsedEditor.error}"));
});
