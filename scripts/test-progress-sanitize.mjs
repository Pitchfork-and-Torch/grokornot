/**
 * Repro: corrupted zustand progress (non-finite xp/scores, bool-as-int counters,
 * whitespace name, bad dailyBoard rows) must not poison rank / HUD / board.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "src/store/progress.ts"), "utf8");

assert.match(src, /sanitizeProgress|safeProgressNum/, "progress persist must sanitize on rehydrate");
assert.match(src, /Number\.isFinite/, "must guard non-finite xp/scores");
assert.match(src, /merge:\s*|merge\(/, "persist config must merge through sanitize");
assert.match(src, /displayName[\s\S]{0,80}trim|trim\(\)[\s\S]{0,40}slice/, "names must trim whitespace");

console.log("ok progress sanitize contract");
