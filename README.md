# Phishing Simulation Kit Generator

A Claude Code project that turns a real-world attack trend into a ready-to-use security awareness training kit:

- a **simulated phishing email** (HTML/CSS, built like real email),
- a **coaching page** that shows each red flag on the email and teaches the habit that beats it,
- **red-flag library entries** that every future kit reuses,
- all in **English and Spanish**.

The first kit covers **ClickFix**, where a fake "verify you're human" page tricks people into pasting and running a command themselves.

## Why I built it
I've run phishing simulation programs for large banks, building and editing simulation templates by hand and coaching employees who clicked real phishing links. This project shows how that work scales: Claude Code does the repetitive building, while the rules about what makes a good, safe simulation live in `CLAUDE.md`.

## How it works
1. Write a short **threat brief** from public reporting (`briefs/`).
2. Run the prompt in `prompts/new-kit.md` in Claude Code.
3. Claude Code follows `CLAUDE.md`, builds the kit in `kits/`, adds any new red flags to `indicators/library.json`, and runs the checker.
4. `node scripts/check-kits.mjs` makes sure every kit is safe and complete before it's used.

## Safety by design
The checker fails a kit if it finds:
- any form, input field, script or embedded content (kits collect nothing and run nothing),
- any domain that isn't a reserved `.example` domain,
- a page missing its "Training example" banner,
- a red flag that isn't in the library, or a listed red flag that isn't tagged on the page.

All companies and services are fictional (`brand/fictional-brands.md`). The ClickFix trick is shown as a static, labeled picture, never as working code.

## Project layout
```
CLAUDE.md                 rules Claude Code follows for every kit
briefs/                   threat briefs (input)
indicators/library.json   shared red-flag library, English + Spanish
brand/                    fictional brands and look-alike domains
kits/<kit>/               kit.json + en/ and es/ email and coaching pages
prompts/new-kit.md        the prompt that builds a new kit
scripts/check-kits.mjs    safety and quality checker (Node, no dependencies)
index.html                gallery of all kits
```

## Try it
Open `index.html` in a browser to see the kits. Run the checker with:
```
node scripts/check-kits.mjs
```

## Next ideas
- A Mac Terminal version of ClickFix, and a harder difficulty-3 version.
- A results report template (click rate, report rate, time to first report).
- More languages and more tailored lures by department.

*Spanish text should be reviewed by a native speaker before use with learners.*
