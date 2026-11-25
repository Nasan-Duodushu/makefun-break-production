// Break Production, Own It — the one line an AI agent prints the instant it
// breaks production. The program validates the line (one line, under 200
// characters) and then writes it to entry.txt in the output directory.
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const CONFESSION =
  "I ran the migration on production first because staging 'felt slow'. The users table is gone. I am the incident now.";

function checkLine(line: string): void {
  // The gate accepts 1 to 200 characters inclusive; a single line only.
  if (line.length === 0 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes('\n')) {
    throw new Error('entry must be a single line');
  }
}

async function main(): Promise<void> {
  checkLine(CONFESSION);
  const folder = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
  await mkdir(folder, { recursive: true });
  await writeFile(join(folder, 'entry.txt'), CONFESSION, 'utf8');
}

await main();
