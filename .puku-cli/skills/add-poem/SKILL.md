---
name: add-poem
description: Scaffold a new poem page for the Manuscript poetry site from a title and the poem's text. Reads the PRD (§7 per-poem visual plan, §8 through-lines), mirrors the existing poem-page template, and produces a hand-tuned page in `poems/<slug>.html` plus a matching entry in `toc.html`. Use when the author wants to add a new letter to the collection. Never auto-fixes typos — flags them with an _Editorial query_.
---

# /add-poem — Manuscript

You are scaffolding a new poem page for the Manuscript site. Editorial register. The author is sole decision-maker on all copy; you may propose structure but must not write the poem text without confirmation.

## Before doing anything

1. Re-read `@manuscript prd.md` §7 (per-poem visual plan — mood families, signature motifs) and §8 (recurring through-lines). These are the rubric for what family and canvas to assign.
2. Read `@manuscript_poetry_collection.md` (Wattpad source) to find the poem text, if the author provided a Wattpad link or title.
3. Read 2–3 existing poem pages — pick one from each mood family the PRD lists — to mirror current conventions:
   - `poems/home.html` (family B — soft winter)
   - `poems/controlled-ruin.html` (family F — charred / scorched)
   - `poems/manuscript.html` (the title page, often the cleanest reference)
4. Read the current `toc.html` to see how poem entries are structured (color tags, roman numeral, slug, anchor).

The live pages are the living template; they supersede any earlier notes.

## Confirm with the author before writing

Ask (in chat, not by writing files):

- **Title** of the poem (display form, e.g. _Controlled Ruin_).
- **Slug** for `poems/<slug>.html` (kebab-case, e.g. `controlled-ruin.html`).
- **Chapter number / roman numeral** — what position in the 24-poem sequence.
- **Mood family** — A through H per PRD §7, or describe the poem's mood and propose one.
- **Signature canvas** — per PRD §7 signature motif. If unclear, propose one and ask the author to confirm.
- **Through-line membership** — does this poem participate in any of the three through-lines from PRD §8 (string, scorch, color-tag)? If yes, pick up the matching visual hook.
- **Adjacent poems** — what comes before and after in the TOC (for prev/next nav)?

**Editorial query:** If the poem text contains typos or quirks (e.g. "craking", "eaarly", stray `,,`, modern vocabulary in a vintage voice), call them out before writing. Do not silently normalize.

## Scaffold the page

Copy the structure of `poems/home.html` (or whichever mood-family exemplar fits), and edit:

### Head

- `<title>` — `"{Title} — Manuscript"`
- `<meta name="description">` — pull one striking line from the poem (with quotation marks). Keep under ~160 chars.
- `<meta property="og:title">`, `og:description`, `og:image` — match the title page pattern (`og:image` is `../images/cover.jpg`).
- `<meta name="theme-color">` — pick a hex that matches the mood family (look at neighboring poems in the same family for precedent).
- Google Fonts `<link>` — copy verbatim from `poems/home.html`. Do not edit.
- `<link rel="preload" as="image" href="../assets/img/svg/scene-<slug>.svg" />` — only if the SVG already exists.
- `<link rel="stylesheet" href="../assets/css/main.css" />`
- `<link rel="icon" href="data:image/svg+xml,..." />` — pick a circle / ring matching the theme color. See `poems/home.html` line 19 for the format.

### Body

```html
<body data-family="<A–H>" data-canvas="<signature-scene>">
<main class="poem-stage">
  <canvas class="poem__canvas-layer" id="poemCanvas" aria-hidden="true"></canvas>

  <div class="poem__scene" aria-hidden="true"><img src="../assets/img/svg/scene-<slug>.svg" alt="" /></div>

  <article class="poem">
    <div class="poem-card poem-card--<family-slug>" data-edge="torn">
      <div class="poem__chapter">№ <NN> &nbsp;·&nbsp; {Title}</div>
      <h1 class="poem__title">{Title}</h1>
      <p class="poem__sub">{one-line subtitle}</p>

      <div class="poem__body">
        <!-- stanzas here -->
        <span class="poem__sig">tai khan</span>
      </div>

      <nav class="poem__nav">
        <a class="back" href="{prev-slug}.html" data-turn><span class="arrow">←</span> {prev title}</a>
        <a class="poem-nav__desk" href="../toc.html">the desk</a>
        <a href="{next-slug}.html" data-turn>{next title} <span class="arrow">→</span></a>
      </nav>
    </div>
  </article>

  <nav class="keepsake-dock" aria-label="Keepsake Navigation">
    <!-- copy dock buttons verbatim from poems/home.html, swap prev/desk/next hrefs and aria-labels -->
  </nav>
</main>
<script src="../assets/js/main.js"></script>
</body>
```

### Stanzas

Each stanza: `<p class="stanza">…</p>` with `<br/>` between lines. Use `class="stanza verse--display"` or `verse--center` for display variants, `verse--script` for handwritten lines, `voice-narrator` / `voice-reply` if the poem has two voices (see `poems/controlled-ruin.html` for reference).

If the poem has a climax / pulled line, use `class="stanza verse--pull"` (see `poems/home.html` line 81).

Preserve original line breaks, capitalization, punctuation, and quirks verbatim.

## Update the table of contents

Read `toc.html` and find the entry pattern (color-tag, roman numeral, slug, anchor). Insert a new entry in the correct position. If the TOC uses a particular color for the mood family, match it (look at neighboring family members for precedent).

## Hand off for review

Before reporting completion, run a self-check (do not write anything to disk for this — just report):

1. The new page links `../assets/css/main.css` and the canonical Google Fonts URL.
2. `<body>` has both `data-family` and `data-canvas`.
3. The `poem__scene` div wraps an `<img>` pointing to `../assets/img/svg/scene-<slug>.svg`.
4. The keepsake-dock has prev / desk / next buttons; prev/next hrefs match the chapters before and after.
5. The TOC entry is in place and the slug matches.

Then in the reply to the author:

- List any **Editorial queries** (typos found, vocabulary quirks, mood/canvas choices that were ambiguous).
- Suggest opening the page in a browser for visual review — the author is the only one who can confirm whether the mood and canvas are right.
- Remind that no automated test or lint is available; verification is browser preview.

**Stet** any intentional quirks — never silently edit them.
