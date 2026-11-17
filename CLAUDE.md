# CLAUDE.md — Phishing Simulation Kit Generator

You are helping Dan Culhane build **security awareness training kits**. Each kit turns one real-world attack trend into a safe training simulation: a simulated email, a coaching page that teaches the red flags, and entries in a shared red-flag library. Kits are made in English and Spanish.

This file is the rulebook. Follow it every time you create or change a kit.

## Safety rules (never break these)
1. **Fictional brands only.** Use the brands in `brand/`. Never use a real company's name, logo, colors or domain.
2. **Reserved domains only.** Every web address and email address uses a `.example` domain (e.g. `docuvault-share.example`). Never a real or registerable domain.
3. **Collect nothing.** No `<form>`, `<input>`, `<textarea>`, login boxes, file downloads or tracking pixels. The coaching page teaches; it never asks for anything.
4. **Nothing runnable.** Never write real commands, scripts or payloads. When a lure tells people to paste or run something (ClickFix), show it as a **static, labeled picture of the trick**, never working code, and never touch the clipboard.
5. **Always labeled.** Every page carries a visible "Training example" banner (in its language).
6. Run `node scripts/check-kits.mjs` after every change. A kit is not done until it passes.

## What a kit contains
```
kits/<yyyy-mm>-<trend>-<lure>/
  kit.json          # metadata: trend, brief, difficulty, cues used, languages
  en/email.html     # the simulated email (inline styles, like real email HTML)
  en/coaching.html  # the "you clicked" teaching page
  es/email.html
  es/coaching.html
```
- Every red flag in the email is tagged with `data-cue="<INDICATOR-ID>"`, and the same IDs are listed in `kit.json` → `cues`.
- Every cue ID must exist in `indicators/library.json`. If a scenario needs a new one, add it to the library first (English and Spanish), then use it.
- The coaching page numbers each cue on a copy of the email, explains it in one or two plain sentences, and ends with what to do next (report it with the Report Phish button).

## Writing style for learner-facing text
- Plain, friendly and short. Coach, don't scold: the person who clicked is learning, not in trouble.
- Teach the habit, not just the trick ("hover before you click", "real sites never ask you to paste commands").
- Spanish versions are written for the reader, not translated word for word. Flag anything unsure in `kit.json` → `review_notes` for a native-speaker check.

## Difficulty
Rate each kit 1–3 in `kit.json`:
- **1 (easy):** many obvious cues, premise unrelated to the learner's job.
- **2 (moderate):** a few cues, believable work premise.
- **3 (hard):** few, subtle cues, premise closely matches the learner's daily work.
This follows the idea behind the NIST Phish Scale: fewer cues plus a better-fitting premise means a harder email.

## How to make a new kit
Use `prompts/new-kit.md`. Input is a short threat brief in `briefs/`, written from public reporting. Output is a complete kit that passes the checker, plus any new library entries.

## JavaScript policy
`index.html` (the gallery) and `assets/gallery.js` may use plain JavaScript for UI features such as filtering.
Kit pages (`email.html` and `coaching.html`) must remain completely script-free — the checker enforces this.
The gallery must not load anything from outside the project and must not collect any data.

## Visual quality
Emails should look like the real kind of message they imitate (layout, spacing, footer), built with table layout and inline CSS the way real email HTML is. Detail matters: the point is a simulation people can learn from because it looks real, while staying obviously fictional on inspection.
