# Prompt: make a new kit

Paste this into Claude Code from the project folder, filling in the brackets.

---

Read CLAUDE.md, indicators/library.json and brand/fictional-brands.md.

Make a new training kit from the threat brief at `briefs/[brief-file].md`.

- Lure idea: [e.g. a PayLedger invoice that "needs approval"]
- Difficulty: [1, 2 or 3]
- Learners: Fernhollow Outfitters employees in [team or role]

Create `kits/[yyyy-mm]-[trend]-[lure]/` with kit.json, and email.html + coaching.html in en/ and es/. Copy the structure and quality of `kits/2026-11-clickfix-docshare/`. Tag every red flag with data-cue, add any new indicators to the library in both languages, then run `node scripts/check-kits.mjs` and fix anything it reports. Finish by listing the cues you used and anything a native Spanish speaker should check.

---

## Other useful prompts
- "Make a harder (difficulty 3) version of kit [name] with only two subtle cues."
- "Add a Mac Terminal variant of the ClickFix kit."
- "Rebuild index.html so it lists every kit."
