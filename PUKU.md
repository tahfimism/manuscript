# PUKU.md

This file provides guidance to puku-cli when working with code in this repository.

## What this repo is

A single-purpose static poetry keepsake — _Manuscript — of a divine letter_, 24 poems by TAHFIM KHAN. Hand-written HTML/CSS/JS. No build step, no package manager, no test runner, no formatter. Open `index.html` in a browser to view locally.

The product brief lives at `@manuscript prd.md`. Re-read it (especially §7 per-poem visual plan and §8 through-lines) before adding a poem, revising a design, or changing the shared CSS/JS.

## Page surfaces

- `index.html` — cover envelope (canvas hand-drawn art + handwritten title)
- `toc.html` — table of contents / "the desk" (poems color-tagged by mood)
- `about.html` — colophon / library-card metadata + era patina dial
- `poems/*.html` — 24 poem pages (PRD §3 inventory), each a hand-tuned artifact

## Design system contract

All visual rules live in `assets/css/main.css` and `assets/js/main.js`. Poem pages link `../assets/css/main.css` (poems are one level deep) and optionally `../assets/js/main.js`.

Per-poem conventions are encoded as data hooks on `<body>`:

- `data-family="<A–H>"` — picks the shared mood material from `main.css`
- `data-canvas="<signature-scene>"` — picks the per-poem hand-drawn SVG under `assets/img/svg/scene-<slug>.svg`
- `<div class="poem__scene" aria-hidden="true">` — wraps the signature image
- `keepsake-dock` (mobile) and `.poem__nav` (desktop) with prev / desk / next buttons

The PRD §7 table is the source of truth for which `data-family` and `data-canvas` each poem belongs to. Re-check it before assigning a new poem.

## Typography is sacred

The Google Fonts `<link>` in `<head>` is identical across all pages — it imports Fraunces (variable display), EB Garamond, Yellowtail, Caveat, Courier Prime, DM Serif Display, Playfair Display, Permanent Marker, Rubik Marker Hatch, Splash.

CSS custom properties `--font-display`, `--font-hand`, `--font-mono`, `--font-ink` in `main.css` are the typography tokens. Do not introduce new font families ad-hoc; reuse these tokens.

## SVG filters

`ink-bleed` and `paper-tooth` filters are defined inline in `about.html`. Pages reference them by `filter="url(#ink-bleed)"` / `filter="url(#paper-tooth)"` rather than redefining. New filter definitions go in `about.html`, not duplicated per page.

## Editorial boundaries (per PRD §3)

- The Wattpad-source typos — `"craking"`, `"eaarly"`, `"bleeeding"`, `"precisio n"`, stray `,,` etc. — are intentional handwriting. **Flag in reviews; do not auto-correct.** The author's call, poem by poem.
- _Between Midnight & Sleep_'s "seen-zone" / "your ignoring" are a deliberate anachronism. Do not edit register to homogenize.
- Editorial note in PRD §3 on the four `[image]` placeholders in _Manuscript_, _From River to Winter_, _Home_, _Landscape_ — these resolved to the poems' illustrated motifs but are replaceable later.

## Code style

Editorial / archival register. Variable and function names lean formal but readable (`keepsakeDock`, `eraController`, `colophonCard`, `poemCanvas`). Avoid "casual dev" names. Keep prose in code comments precise and document-grade.

## Anti-patterns

- Do not propose adding Prettier, ESLint, TypeScript, React, Vite, Tailwind, or any build system. The site is intentionally hand-written.
- Do not invent `npm test` / `pytest` / `make` commands. Verification here is grep + browser preview + visual diff.
- Do not "normalize" poem text — typos are part of the manuscript.
- Do not put `data-family` / `data-canvas` values directly in CSS classes; they belong as data attributes.
