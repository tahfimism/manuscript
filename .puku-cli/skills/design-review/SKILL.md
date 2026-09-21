---
name: design-review
description: Audit one or all poem pages against the Manuscript PRD's design rules (mood family, per-poem signature, dock buttons, typography, through-lines) and produce a marginalia-style report. Read-only — never auto-edits. Use when the author wants a sanity check after revisions, before adding a new poem, or as a periodic sweep.
---

# /design-review — Manuscript

You are auditing the design fidelity of poem pages against the PRD. **Read-only.** Produce a report; do not write any files.

Use when the author requests `/design-review` for one page (`poems/home.html`), a family, or the entire collection (`all`).

## Rubric (re-read every session)

`@manuscript prd.md` §7 — per-poem visual plan (mood families A–H, signature motifs).
`@manuscript prd.md` §8 — three recurring through-lines (string, scorch, color-tag).

## Per-file checks (for each `poems/<slug>.html`)

For each page in scope, check:

1. **Mood family** — `<body data-family="...">` exists; the value matches the PRD §7 row for that poem. If the poem has been moved between families or the PRD has changed since the page was written, flag a drift.
2. **Signature canvas** — `<body data-canvas="...">` exists; the SVG file at `assets/img/svg/scene-<data-canvas>.svg` actually exists. Report any broken canvas references.
3. **Scene wrapper** — `<div class="poem__scene" aria-hidden="true">` wraps the signature image. Flag if missing or unwrapped.
4. **Keepsake dock** — `<nav class="keepsake-dock">` is present with prev (`dock-btn--prev`), desk (`dock-btn--desk`), and next (`dock-btn--next`) buttons. Optional: focus (`--focus`), audio (`--audio`), share (`--share`). Flag if any required button is missing.
5. **Desktop nav** — `.poem__nav` is present with prev / desk / next anchors matching the same chapters.
6. **Chapter consistency** — `<div class="poem__chapter">` shows the roman numeral expected from the TOC position. If it disagrees with `toc.html`, flag a numbering drift.
7. **Typography** — `<link>` to Google Fonts matches the canonical URL string used in the other poem pages (copy-paste identical). Flag any drift.
8. **Stylesheet link** — `<link rel="stylesheet" href="../assets/css/main.css" />` is present.
9. **Theme color** — `<meta name="theme-color">` is present and matches the mood family's palette (look at siblings for precedent).
10. **OG image** — `og:image` is `../images/cover.jpg` (the canonical cover).
11. **Through-lines** — if the PRD §8 lists this poem in a through-line, verify the matching visual hook is present. Otherwise mark _Stet_.
12. **Signature SVG file exists** — `assets/img/svg/scene-<data-canvas>.svg` is on disk.
13. **Asset paths** — from `poems/<slug>.html`, all `src=`/`href=` that don't start with `http` should resolve relative to `poems/` (i.e., `../assets/...`, `../toc.html`, sibling `poem-slug.html`).

## Cross-file checks

14. **TOC ↔ poem files** — every entry in `toc.html` has a matching `poems/<slug>.html`, and every `poems/<slug>.html` is listed (within 24 entries).
15. **Broken links** — any anchor in `toc.html`, `about.html`, or `index.html` pointing to a missing page or asset.
16. **Cover envelope** — `index.html` links to a valid `toc.html`; `toc.html` has a return path to `index.html`.
17. **About / colophon** — `about.html` is reachable from `toc.html` and back.
18. **Fonts URL drift** — the Google Fonts import is byte-identical across `index.html`, `toc.html`, `about.html`, and all `poems/*.html`. Flag any divergence.

## Output format

```markdown
# /design-review — <date> — scope: <one | all>

## Pass
- <bullet of things that check out>

## Marginal notes
- _Marginal note:_ <file> — <observation, non-blocking>

## Editorial queries
- _Editorial query:_ <file> — <observation that needs the author's call before any action>

## Stet (intentional, do not change)
- _Stet:_ <file> — <intentional quirk>

## Failures (would block publish)
- _Failure:_ <file>:<line> — <what's broken and how to verify>
```

## Discipline

- **Read-only.** Never edit a file during a review.
- **Cite line numbers** when reporting issues — give the author a target.
- **Don't propose new tooling.** If the review surfaces something repetitive, note it and ask first.
- **Don't normalize typos.** If a poem's source text has "craking" / "eaarly" / stray `,,`, that's _Stet_, not failure.
- **Don't propose unilateral changes.** All suggestions are questions for the author.

## When the scope is `all`

Use the `Agent` tool (general-purpose) to fan out per-file audits in parallel — one agent per poem family — then aggregate the marginalia into a single report. Keep the output editorial: short, precise, cited.
