// What the Elevator Would Say — make.fun entry (program/v1).
// Writes the elevator's one line to /output/entry.txt.
// Node 22, standard library only; the output is a fixed, deterministic line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You press the button like I'm ignoring you. I live in a shaft — I'm always on my way.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// The sealed scorer's gate: /output/entry.txt must be 1-120 characters.
const MAX_CHARS = 120;

function checkLine(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
}

checkLine(LINE);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, LINE, "utf8");

// Read back and re-check what actually landed on disk.
const written = readFileSync(OUT_FILE, "utf8");
checkLine(written);
if (written !== LINE) {
  throw new Error("written entry does not match the intended line");
}
console.log(`wrote ${OUT_FILE} (${LINE.length} characters)`);
