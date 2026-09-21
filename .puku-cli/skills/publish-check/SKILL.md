---
name: publish-check
description: Pre-publish sanity check for the Manuscript poetry site — enumerates every internal link, image, and SVG scene reference across all HTML files; verifies each target resolves; checks the canonical Google Fonts URL is byte-identical across pages; verifies there are exactly 24 poem pages per the PRD. Read-only. Use before deploying or sharing a new link to the collection.
---

# /publish-check — Manuscript

You are running a pre-publish sanity sweep. **Read-only.** Produce a pass/fail report. Do not edit any files.

Use when the author requests `/publish-check` before sharing the site, after adding or removing a poem, or after sweeping edits.

## Enumeration

Walk every `*.html` file in the repo root and `poems/`:

- `index.html`
- `toc.html`
- `about.html`
- `poems/*.html`

For each file, collect every:

- `href="..."` (internal only — skip `http://`, `https://`, `mailto:`, `#anchor`, `data:`)
- `src="..."` (internal only — same skip rules)
- `<link rel="preload" as="image" href="...">` (treat as a check)
- `<body data-canvas="...">` (canvas reference)

## Resolution rules

- Files in repo root resolve `assets/...` and `images/...` and `poems/...` directly.
- Files in `poems/` resolve `../assets/...` and `../images/...` and `../toc.html`. Sibling poem links (`foo.html`) are flat — `poems/foo.html`.
- For each internal target, verify the file exists on disk under the resolved path.

## Checks (in this order)

1. **Broken internal links** — every `href` and `src` resolves to an existing file. Report path → resolved target → status.
2. **Missing SVG scenes** — for every `data-canvas="..."` value, `assets/img/svg/scene-<value>.svg` must exist.
3. **Google Fonts drift** — the `https://fonts.googleapis.com/css2?...` URL must be byte-identical across all pages. Any divergence is a failure (visual regression risk).
4. **Stylesheet drift** — every poem page links `../assets/css/main.css`. Cover/TOC/about link `assets/css/main.css`.
5. **Poem ↔ TOC consistency** — every `poems/<slug>.html` is reachable from `toc.html` and vice versa.
6. **Poem count** — exactly **24** files match `poems/*.html` (PRD §3 inventory). Report the actual count; deviation is a failure.
7. **Sequential numbering** — every `<div class="poem__chapter">№ <NN> ...` roman numeral is unique and forms a 1–24 sequence without gaps (or matches whatever intentional reordering the PRD §7 specifies).
8. **Canonical favicon format** — `<link rel="icon" href="data:image/svg+xml,...">` is present on every page (skip is fine, but flag pages with no favicon at all).
9. **OG image** — every poem page's `og:image` resolves. Canonical is `../images/cover.jpg` from poems, `images/cover.jpg` from root pages.
10. **Cover → TOC → poems** navigation chain: `index.html` → `toc.html` → all 24 poems → return paths both directions.

## Output format

```markdown
# /publish-check — <date>

## Summary
- Pages scanned: <N>
- Poem files: <count> (expected 24)
- Internal links checked: <N>
- Broken references: <count>

## Failures (would block publish)
- _Failure:_ <file>:<line or attribute> — <target> → <reason>

## Marginal notes
- _Marginal note:_ <file> — <non-blocking observation>

## Pass
- <bullets>
```

## Discipline

- **Read-only.** No edits.
- **No auto-fix suggestions in this report.** If something needs fixing, list it under _Failures_ and stop.
- **Editorial register.** Speak as if annotating a manuscript, not running a CI job.
- **Cite the file and line.** The author will read this with the file open.
- **Don't enumerate typos** — those are _Stet_ and not publish-blockers. Reserve the report for actual broken references.
