// Safety and quality checks for every kit. Run: node scripts/check-kits.mjs
// No dependencies. Exits with code 1 if any check fails.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const passes = [];
const fail = (where, msg) => problems.push(`✗ ${where}: ${msg}`);

// 1. Red-flag library: every entry needs English and Spanish text
const lib = JSON.parse(readFileSync(join(root, 'indicators/library.json'), 'utf8'));
const ids = new Set();
for (const ind of lib.indicators) {
  if (ids.has(ind.id)) fail('library', `duplicate id ${ind.id}`);
  ids.add(ind.id);
  for (const field of ['name', 'tell', 'habit'])
    for (const lang of ['en', 'es'])
      if (!ind[field]?.[lang]) fail('library', `${ind.id} is missing ${field}.${lang}`);
}

// Rules every page must follow
const FORBIDDEN = [
  [/<form\b/i, 'contains a <form> (kits must collect nothing)'],
  [/<input\b|<textarea\b|<select\b/i, 'contains an input field'],
  [/<script\b/i, 'contains a <script> (pages must not run code)'],
  [/<iframe\b|<object\b|<embed\b/i, 'embeds external content'],
  [/clipboard/i, 'mentions the clipboard API'],
  [/\bdownload\s*=/i, 'offers a file download'],
];
const HOST_RE = /(?:https?:\/\/|@)([a-z0-9.-]+\.[a-z]{2,})/gi;

const kitsDir = join(root, 'kits');
const kits = readdirSync(kitsDir).filter(d => statSync(join(kitsDir, d)).isDirectory());

for (const kit of kits) {
  const dir = join(kitsDir, kit);
  const metaPath = join(dir, 'kit.json');
  if (!existsSync(metaPath)) { fail(kit, 'missing kit.json'); continue; }
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));

  if (![1, 2, 3].includes(meta.difficulty)) fail(kit, 'difficulty must be 1, 2 or 3');
  for (const cue of meta.cues || []) if (!ids.has(cue)) fail(kit, `cue ${cue} is not in indicators/library.json`);

  for (const lang of meta.languages || []) {
    const pages = ['email.html', 'coaching.html'];
    const seenCues = new Set();
    for (const page of pages) {
      const where = `${kit}/${lang}/${page}`;
      const file = join(dir, lang, page);
      if (!existsSync(file)) { fail(where, 'file missing'); continue; }
      const html = readFileSync(file, 'utf8');

      for (const [re, msg] of FORBIDDEN) if (re.test(html)) fail(where, msg);
      if (!/class="training-banner"/.test(html)) fail(where, 'missing the "Training example" banner');
      if (!new RegExp(`<html[^>]*lang="${lang}"`).test(html)) fail(where, `<html lang> should be "${lang}"`);

      for (const m of html.matchAll(HOST_RE)) {
        const host = m[1].toLowerCase();
        if (!host.endsWith('.example')) fail(where, `uses a real-looking domain "${host}" (use .example only)`);
      }
      for (const m of html.matchAll(/data-cue="([A-Z-]+)"/g)) {
        seenCues.add(m[1]);
        if (!(meta.cues || []).includes(m[1])) fail(where, `data-cue ${m[1]} is not listed in kit.json`);
      }
    }
    for (const cue of meta.cues || [])
      if (!seenCues.has(cue)) fail(`${kit}/${lang}`, `cue ${cue} is never tagged with data-cue`);
  }
  passes.push(`${kit} (${(meta.languages || []).join(', ')}; ${meta.cues?.length || 0} cues; difficulty ${meta.difficulty})`);
}

if (problems.length) {
  console.log(problems.join('\n'));
  console.log(`\n${problems.length} problem(s) found.`);
  process.exit(1);
}
console.log(`Library OK: ${ids.size} indicators.`);
for (const p of passes) console.log(`✓ ${p}`);
console.log('All kits passed the safety and quality checks.');
