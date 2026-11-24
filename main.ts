import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// validateEntry checks the entry is exactly one non-empty line
// of at most 200 characters; throws on empty, multi-line, or over-long input.
function validateEntry(line: string, text: string): void {
  if (text.trim() === "" || line.includes("\n") || line.includes("\r")) {
    throw new Error("entry.txt must contain exactly one line.");
  }
  if (line.length > 200) {
    throw new Error(`entry is ${line.length} characters, max is 200.`);
  }
}

const dir = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(dir, "entry.txt"), "utf8");
const line = text.replace(/\r\n$/, "").replace(/\n$/, "");

try {
  validateEntry(line, text);
} catch (err) {
  console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
console.log(line);
