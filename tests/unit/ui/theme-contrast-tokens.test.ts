import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const globalsCss = fs.readFileSync(
  new URL("../../../src/app/globals.css", import.meta.url),
  "utf8"
);
const badge = fs.readFileSync(
  new URL("../../../src/shared/components/Badge.tsx", import.meta.url),
  "utf8"
);
const button = fs.readFileSync(
  new URL("../../../src/shared/components/Button.tsx", import.meta.url),
  "utf8"
);

const lightTokens = Object.fromEntries(
  [...globalsCss.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((match) => [
    match[1],
    match[2],
  ])
);

function luminance(hex: string) {
  const channels = [0, 2, 4].map((offset) => parseInt(hex.slice(offset + 1, offset + 3), 16) / 255);
  return channels.reduce((sum, channel) => {
    const linear = channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    return sum + linear;
  }, 0);
}

test("light theme text tokens meet WCAG AA against the light surface", () => {
  const surface = luminance(lightTokens.surface);
  for (const token of ["text-main", "text-secondary", "text-muted", "link"]) {
    const ratio =
      (Math.max(luminance(lightTokens[token]), surface) + 0.05) /
      (Math.min(luminance(lightTokens[token]), surface) + 0.05);
    assert.ok(ratio >= 4.5, `${token} contrast is ${ratio.toFixed(2)}`);
  }
});

test("shared semantic components use theme tokens", () => {
  assert.match(badge, /bg-success\/10 text-success/);
  assert.match(badge, /bg-warning\/10 text-warning/);
  assert.match(badge, /bg-error\/10 text-error/);
  assert.match(button, /bg-warning text-white/);
  assert.match(button, /bg-error text-white/);
});

test("light and dark themes define the shared text token set", () => {
  for (const token of [
    "text-secondary",
    "text-muted",
    "text-placeholder",
    "text-disabled",
    "link",
  ]) {
    assert.equal((globalsCss.match(new RegExp(`--color-${token}:`, "g")) ?? []).length, 2);
  }
});
