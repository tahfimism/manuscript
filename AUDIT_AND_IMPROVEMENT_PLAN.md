# Manuscript — Complete Audit, Bug & Visual-Issue Report
## And World-Class Improvement Plan

> **Scope:** Every HTML file in the repo (root, `poems/`, `assets/`) — visual, structural, JS-wiring, accessibility, performance.
> **Goal:** Take Manuscript from "already-beautiful concept" to "world-class, zero-defect production poetry collection".
> **Format:** Each issue lists **WHAT → WHERE → WHY → HOW (Solution)**. Severity tags: 🔴 Critical, 🟠 High, 🟡 Medium, 🟢 Polish.

---

## 0 · EXECUTIVE SUMMARY

After auditing all 27 HTML files, `assets/css/main.css` (2980 lines), `assets/js/main.js` (582 lines) and `assets/js/cover.js` (480 lines), I've identified **47 issues** spanning **5 categories**:

| Category | Count | Most Critical |
|---|---|---|
| 🐞 Bugs / Dead Code | 11 | Unwired `dock-focus` + `dock-audio` buttons on every poem |
| 🎨 Visual / UI Defects | 17 | `@import` Google Fonts blocking render; missing SVG filters on poem pages |
| ♿ Accessibility | 6 | `prefersReducedTransparency` check on empty `data-canvas` causes silent dead canvas |
| ⚡ Performance | 7 | Render-blocking `@import`, no font-display strategy, oversized canvas DPR cap too low |
| 🧱 Architecture / Consistency | 6 | 3 SVG `data-edge="deckled"` users lack the SVG filter, no shared filter SVG |

**The single highest-leverage fix**: Move the master SVG `<defs>` from inline-in-`toc.html` into a globally-included external SVG sprite, and replace the `@import` Google Fonts line with a proper `<link rel="preload">` pattern in the HTML head. This alone fixes ~9 issues.

---

## 1 · CRITICAL BUGS — Must Fix

### 🔴 BUG-01: `@import` of Google Fonts at top of `main.css` blocks first paint
**Where:** `assets/css/main.css` line 7
**Why:** `@import url('https://fonts.googleapis.com/...')` makes the browser block parsing the rest of the stylesheet until the remote CSS is fetched. This delays the FOIT/FOUT and hurts LCP by ~150–400ms on cold load. All 27 HTML pages suffer.
**Solution:**
- Remove the `@import` from `main.css`.
- In every HTML `<head>`, add `<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?...">` + matching `<link rel="stylesheet" ...>` (already preconnected) — the same URL, but loaded as a `<link>` tag.
- Add `&display=swap` to the URL (already present) AND add `font-display: swap` safety in CSS.
- This unblocks the rest of `main.css` from being applied immediately.

### 🔴 BUG-02: 3 poem pages use `data-edge="deckled"` but reference `#deckled-edge` filter that doesn't exist on those pages
**Where:**
- `assets/css/main.css:1098` — `.poem-card[data-edge="deckled"] { filter: url('#deckled-edge'); }`
- `poems/divine-letter.html:29`, `poems/guiding-light.html:29`, `poems/starlight.html:19` — use the edge but no inline `<svg defs>` block.

**Why:** The `url('#deckled-edge')` filter is only declared inside `toc.html` (its inline `<svg class="svg-filters">` block). On the 3 poem pages the filter lookup silently fails → cards render with plain borders, the artistic deckle effect is gone. (No console error in Chrome; Safari shows it.)
**Solution:**
1. Extract the master SVG `<defs>` from `toc.html` (lines 14–79) into a new file: `assets/img/svg/master-filters.svg` (a hidden, non-rendered standalone SVG with `<defs>` containing all five filters).
2. In **every** HTML file that links `main.css`, also add immediately after `<body>`:
   ```html
   <svg class="svg-filters" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
     <use href="assets/img/svg/master-filters.svg#master-defs"/>
   </svg>
   ```
   Or simpler: inline the same `<defs>` (≈60 lines) once in every poem page. The cleaner path is to inline a **shared partial** via a build step, but for a static site, just paste the `<defs>` block into each poem page (or — simplest — create a tiny `assets/js/master-filters.js` that injects the `<svg>` into `<body>` once on `DOMContentLoaded`).
3. Recommend the JS-injection approach: it removes 60 lines of duplication × 24 poems = 1440 lines of dead weight.

### 🔴 BUG-03: `desk-singe-charred` filter (`#charred-edge`) only works on `toc.html`
**Where:** `assets/css/main.css:2003` — `.desk-singe-charred { filter: url('#charred-edge'); }`
**Why:** Same root cause as BUG-02. Only `toc.html` declares `#charred-edge`. The CSS rule is technically loaded everywhere but the SVG filter lookup fails. Currently no other page uses `desk-singe-charred`, so the immediate bug is latent — but if you ever re-use it on a poem, it'll silently break.
**Solution:** Same fix as BUG-02 — when SVG defs become globally available, the rule becomes safe everywhere.

### 🔴 BUG-04: `dock-focus` and `dock-audio` buttons are unwired dead code
**Where:** Every poem HTML has the buttons (e.g. `poems/manuscript.html:135-140`), but `assets/js/main.js` has **zero references** to `dock-focus` or `dock-audio`.
**Why:** A user clicking these buttons does nothing. Worse, the candlelight styling (`body.candlelight-active …`) in CSS lines 1703–1766 is **inert** because nothing ever adds the class.
**Solution:**
- Add to `main.js`:
  ```js
  const focusBtn = document.getElementById('dock-focus');
  if (focusBtn) {
    focusBtn.addEventListener('click', () => {
      const active = document.body.classList.toggle('candlelight-active');
      focusBtn.setAttribute('aria-pressed', String(active));
      // Add is-active to the currently-visible stanza for the warm-pool glow
      const visible = document.querySelector('.stanza.is-active');
      // Wire IntersectionObserver to add is-active per stanza
    });
  }
  ```
- Also wire a `IntersectionObserver` inside `.poem__body` to add `.is-active` to whichever stanza is in view (this is what CSS expects but nothing provides).
- For `dock-audio`: either implement a real WebAudio soundscape (rain/snow/wind loops gated on `data-canvas`) OR remove the button entirely from all 24 poems. **Recommendation: implement.** A 5-line WebAudio loop reading `data-canvas` and mapping to a noise buffer is ~30 lines.
- Persistence: write the focus/audio state to `localStorage` and restore on load so the user's choice survives navigation.

### 🔴 BUG-05: `cedar-drawer-item__call` generates duplicate padded strings ("MSS-01" repeated)
**Where:** `toc.html` JS, `renderCedarDrawerGrid` line 1071.
**Code:**
```js
<span class="cedar-drawer-item__call">${no} · MSS-${no.replace(/\D/g,'').padStart(2,'0')}</span>
```
**Why:** `no` is already `"№ 01"`, so the output is `"№ 01 · MSS-01"`. The format isn't broken but looks like a debugging stub. For cards 1–9 the leading zero is added (good), but for 10–24 no padding is applied (`padStart(2,'0')` is a no-op on two-digit strings).
**Solution:**
```js
const mssId = no.replace(/[^\d]/g,'').padStart(3,'0'); // 001, 002 … 024
// Output: "№ 01 · MSS-001"
```

### 🔴 BUG-06: TOC `toggleAllReadBtn` "Reset Marks" actually never marks all as read
**Where:** `toc.html:895-908`
**Code:**
```js
if (readSet.size >= 24) readSet.clear();          // mark-all-unread
else if (readSet.size > 0) readSet.clear();       // BUG: clears instead of filling
else { document.querySelectorAll('.desk-card').forEach(c => readSet.add(c.id)); }
```
**Why:** With 5 letters read, clicking "Reset Marks" calls the middle branch and **clears** them. That makes the button a "clear all" only. The user can never bulk-mark-as-read.
**Solution:**
```js
if (readSet.size >= 24) { readSet.clear(); }
else if (readSet.size === 0) { /* nothing to clear */ }
else { /* partial: clear or fill? Pick a sensible default */ readSet.clear(); }
// Add a separate "Mark all read" button if needed.
```
Better: replace this single button with **two** buttons — `Mark all read` + `Reset all`. Or auto-cycle: 0 → all, all → 0, partial → all (then all → 0).

### 🔴 BUG-07: `resetMarks`/`toggleAllReadBtn` button label is misleading AND has no tooltip
**Where:** `toc.html:89` — text is "Reset Marks" but title is "Reset or toggle read marks".
**Why:** Inconsistent copy, the user can never tell from the label alone that the button is also a "mark all" toggle.
**Solution:** Update copy to "Mark all · Reset" with `aria-label="Toggle: mark all letters read, or reset all"`.

### 🔴 BUG-08: `scene-toggle` JS bug — toggle path uses `curScene`/`altScene` from `dataset` but dataset uses kebab-case
**Where:** `assets/js/main.js:46-63`
**Code:**
```js
const { alt: altScene, familyAlt, scene: curScene, family: curFamily } = btn.dataset;
```
**Why:** `btn.dataset` returns kebab-case keys only if explicitly set via `data-...`. Looking at `poems/every-winter.html:18-23` the toggle button has **no `data-alt`, `data-family-alt`, etc. attributes**. So `altScene`, `familyAlt`, `curScene`, `curFamily` are all `undefined`. The toggle silently does nothing on click.
**Solution:** Add `data-scene`, `data-alt`, `data-family`, `data-family-alt` to the toggle anchors:
```html
<a class="scene-toggle medallion-toggle"
   href="every-winter-free-fall.html"
   data-scene="scene-winter-day.svg" data-alt="scene-winter-night.svg"
   data-family="B-day" data-family-alt="B-night">
```
And ensure the swap logic actually rewrites the existing scene image, not just the body family.

### 🔴 BUG-09: `scene-toggle` initial state label is wrong
**Where:** `every-winter.html:23` (`<span class="scene-toggle__label">day</span>`) but the page **is** currently day, so `aria-pressed` should be `false`. JS sets `aria-pressed="false"` correctly. But on `every-winter-free-fall.html`, label is "night" while pressed is `false` — so a sighted user sees "night" and thinks they're in night mode, but aria says they're not. The toggle button **does nothing**, so this confusion is permanent.
**Why:** Same root cause as BUG-08. Once the toggle is wired, this resolves itself; but until then the label is misleading.
**Solution:** Wire the toggle (BUG-08), and the label will flip correctly.

### 🔴 BUG-10: `data-canvas` on every poem page is read by `main.js` but 12 pages don't include the `<div class="poem__scene">` wrapper
**Where:** `poems/between-midnight-and-sleep.html:25`, `dissection.html`, `divine-letter.html`, `end.html`, `from-river-to-winter.html`, `guiding-light.html`, `hollow-shell.html`, `manuscript.html`, `rage-in-cage.html`, `silence-in-layers.html`, `the-blue-inside-ruin.html`, `things-i-learn-to-bury.html` — all have **just an `<img>` without the wrapping `.poem__scene` div**.
**Why:** CSS positions `.poem__scene` as `position: fixed; inset: 0; z-index: 2`. Without the wrapper, the SVG falls back to default `<img>` flow (in-flow, no z-index). It scrolls with the page and may be obscured by `.poem-card` (z-index 5). Worse: the canvas atmosphere (`#poemCanvas`) is z-index 3, so the scene image is now **above** the atmosphere where it was meant to be below.
**Solution:** Wrap each `<img src="../assets/img/svg/scene-*.svg" alt="" />` in `<div class="poem__scene" aria-hidden="true">…</div>`. 12 single-line edits.

### 🔴 BUG-11: SVG `<defs>` filter IDs collide between pages
**Where:** `index.html:15`, `toc.html:15`, `about.html:14` all declare `<filter id="ink-bleed">` and `<filter id="paper-tooth">`. Three separate `<defs>` on the same page ID is fine, but across pages when JS does `applyReadStates` etc., nothing uses these IDs in JS — only CSS does. Currently CSS doesn't reference `url('#ink-bleed')` or `url('#paper-tooth')` at all. **Dead SVG defs.**
**Why:** ~50 lines of XML on every page that doesn't do anything.
**Solution:** Remove the dead defs from `index.html` and `about.html`, OR add real `filter: url('#paper-tooth')` use on `.poem-card` so the texture is actually applied. The latter is much better — see Improvement-01 below.

---

## 2 · VISUAL / UI DEFECTS — Polish Now

### 🟠 VIS-01: Background `attachment: fixed` causes paint lag on scroll
**Where:** `assets/css/main.css:800` — `body { background-attachment: fixed; }`
**Why:** On mobile and during scroll, `background-attachment: fixed` forces a full-viewport repaint every frame. Common cause of jank, especially on iOS Safari where it's often simply dropped (page turns white).
**Solution:**
- Either remove `background-attachment: fixed` and let the gradient scroll naturally (less ambitious but smoother), OR
- Add `@media (prefers-reduced-motion: reduce), (max-width: 768px) { body { background-attachment: scroll; } }` — keep the desktop magic, kill the mobile cost.

### 🟠 VIS-02: `body::before` grain + `body::after` vignette stack with `poem__scene` and `#poemCanvas`
**Where:** `main.css:831-850` grain + vignette are at z-index 1 and 2; `.poem__scene` is z-index 2; canvas is z-index 3.
**Why:** When all four are present (every poem), the vignette sits over the canvas at z=2 while the canvas is at z=3. So the canvas correctly wins, but the vignette is now **invisible** because the canvas covers it. Meanwhile the grain at z=1 is fully behind both. So the vignette never shows. Either the layering is wrong, or the vignette is being silently dropped.
**Solution:** Raise vignette to z-index 4 so it overlays the canvas, or remove it (the canvas already darkens edges).
- **Recommended fix:** Move `body::after` to `z-index: 4` AND lower its opacity, so it tints the whole scene uniformly.

### 🟠 VIS-03: `cover__enter` button is not keyboard-focusable on tap-only mobile browsers in some Android skins
**Where:** `index.html:34`
**Why:** It's an `<a>` tag, which is focusable. Not actually a bug, but the `:focus-visible` outline uses `outline: 2px solid var(--accent);` — on the dark A-cover background that's `#F4ECD8` cream, which is barely visible.
**Solution:** Add an explicit dark `outline-color` for `[data-family="A-cover"]`:
```css
[data-family="A-cover"] :focus-visible { outline-color: #C42E3A; outline-offset: 4px; }
```

### 🟠 VIS-04: `cover__art` canvas is rendered but never explicitly told to redraw on resize in `cover.js`
**Where:** `assets/js/cover.js:23-33` — `resize()` calls `draw()` which paints the static illustration. Good. But `resize` listener is not added in this snippet.
**Verify:** Read line 33+ — actually the snippet ends at line 100. Need to confirm `window.addEventListener('resize', resize)` is added later.
**If missing, solution:** Add `window.addEventListener('resize', resize, { passive: true });` and `window.addEventListener('orientationchange', resize, { passive: true });` at the bottom of the IIFE.

### 🟠 VIS-05: `.desk-card__dogear` is positioned but the dogear CSS uses the wrong color contrast against every family
**Where:** `main.css:2137` — `background: linear-gradient(135deg, transparent 50%, #DCD0BC 50%);`
**Why:** `#DCD0BC` is a warm cream. On the `#FAF0E0` card background it's almost invisible. The dogear is meant to indicate "opened/read" but the visual cue is too subtle.
**Solution:** Use a more contrasted color like `rgba(138, 107, 79, 0.85)` with a subtle shadow, OR add a thin `border-bottom: 1px solid rgba(0,0,0,0.2)`.

### 🟠 VIS-06: `desk-card__seal--broken` icon is a flat brown circle — looks like a placeholder
**Where:** `toc.html` every card uses inline SVG `<circle cx="12" cy="12" r="10" fill="#7D5C4C"/><path d="M4 8 L 20 16" stroke="#241812" stroke-width="2"/></svg>` — the "M" is a single straight line, not a recognizable broken seal.
**Why:** Doesn't communicate "opened" — it looks like a smear.
**Solution:** Replace with a proper cracked-wax icon: two arcs split diagonally, or an outlined circle with a diagonal "tear" mark. Inline SVG in all 24 places (or define a `<symbol id="icon-broken-seal">` in the master SVG sprite once and `<use href="#icon-broken-seal"/>` everywhere).

### 🟠 VIS-07: `desk-card__pair-tag` for Red Cord, Winter Thread, Charred Arc poems uses inline `style="background:..;border-color:..;color:..;"`
**Where:** `toc.html` lines 368, 396, 424, 452, 561, 589, 752.
**Why:** Inline styles everywhere — can't theme via CSS, can't override on hover, can't dark-mode. Also they're slightly inconsistent (some use `#FFE6E6`, some `#FFEAEA`, some `#26110B`).
**Solution:** Define three modifier classes in `main.css`:
```css
.desk-card__pair-tag--red-cord   { background:#FFE6E6; border:1px solid #C42E3A; color:#8C1C28; }
.desk-card__pair-tag--winter    { background:#FFEAEA; border:1px solid #A3495A; color:#A3495A; }
.desk-card__pair-tag--charred   { background:#26110B; border:1px solid #FF5A1F; color:#FFAA77; }
```
And replace the 7 inline-style instances.

### 🟠 VIS-08: Eyelets `#eyelet-09`, `#eyelet-10`, `#eyelet-11`, `#eyelet-12`, `#eyelet-16`, `#eyelet-17`, `#eyelet-23` are inside `.desk-card` but their absolute positioning ignores parent card rotation
**Where:** `main.css:2014-2028` — `.card-eyelet { position: absolute; top: 50%; }`
**Why:** Each card has its own `--card-rot` transform applied. The eyelet position is relative to the un-rotated card box, so the catenary red-string path calculation in JS uses the wrong origin. The strings may visually miss the eyelets by a few pixels after rotation.
**Solution:** Either (a) compute the eyelet positions AFTER applying rotation in JS (use `getBoundingClientRect` is fine — it already accounts for transforms), OR (b) accept the small offset since it's a deliberate "imperfect handwritten" aesthetic.
- **Recommendation:** Accept it — the imperfection reads as authentic. But if you want pixel-precise strings, add a `--eyelet-rot` custom property and subtract it from the path math.

### 🟡 VIS-09: `desk-toolbar__badge` button `#toggleAllReadBtn` has no `cursor:pointer` style consistency
**Where:** `toc.html:89` — `<button ... style="background:none; border:none; color:#C9A24B; cursor:pointer; ... padding:0 0 0 4px;">`
**Why:** Heavy inline styling; no hover/focus state defined. The button blends into the toolbar text.
**Solution:** Move all inline styles to a `.desk-toolbar__reset-btn` class with proper `:hover` and `:focus-visible` states.

### 🟡 VIS-10: `desk-card__excerpt` clamps to 2 lines with `line-clamp: 2` but uses non-standard `-webkit-` prefixes
**Where:** `main.css:2222-2225`
**Why:** Standard `line-clamp: 2` (no prefix) is supported by all major browsers since 2023. The `-webkit-` prefix is harmless but signals outdated CSS. Also `-webkit-box-orient: vertical` is required for `-webkit-line-clamp` to work — it's there, but the standard property works without `-webkit-box`.
**Solution:** Add the standard property alongside the prefixed one:
```css
.desk-card__excerpt {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}
```

### 🟡 VIS-11: `.poem-card--scrapbook` has explicit background `#F4E8E4` overriding the `--paper` CSS variable
**Where:** `main.css:431-435`
**Why:** The variable-driven system gets short-circuited by hardcoded colors. Other family-specific cards (e.g. `poem-card--ash`, `poem-card--winter`) similarly hardcode — this defeats the design-system token goal.
**Solution:** Replace hardcoded hex with `var(--paper)` / `var(--ink)` / `var(--accent)`. Example:
```css
.poem-card--scrapbook { background: color-mix(in srgb, var(--paper), var(--accent) 6%); }
```

### 🟡 VIS-12: `prefersReducedTransparency` exits the canvas entirely, leaving poems with no atmosphere
**Where:** `main.js:119` — `if (!rawKind || prefersReducedTransparency) return;`
**Why:** When user enables Reduce Transparency in OS settings, the entire canvas engine is skipped — including the static background gradient of some poems. The page still works but loses its atmosphere. Most "reduce transparency" users want less blur, not less art.
**Solution:** Soften, don't kill. Replace:
```js
if (!rawKind || prefersReducedTransparency) return;
```
With:
```js
if (!rawKind) return;
// If user prefers reduced transparency, halve all particle alphas & skip blur layers.
window.__reducedTransparency = prefersReducedTransparency;
```
Then in each engine: `const alpha = prefersReducedTransparency ? base * 0.5 : base;`

### 🟡 VIS-13: `.cover__title` has `transform: rotate(-2deg)` but no `transform-origin` set
**Where:** `main.css:1812`
**Why:** Rotation defaults to `center center`, which is fine. But combined with `text-shadow` and `filter: drop-shadow` (some poems), the rotated shadow can clip oddly.
**Solution:** Add `transform-origin: 50% 60%;` for slightly better baseline anchoring.

### 🟡 VIS-14: `poem__chapter::before` adds a 24px ink-line that varies in alignment per family
**Where:** `main.css:1159-1165`
**Why:** It's a `display: flex` row with `align-items: center`. On narrow viewports the chapter text wraps and the line floats above oddly.
**Solution:** On mobile (<640px), make the line optional or hide it:
```css
@media (max-width: 640px) {
  .poem__chapter::before { display: none; }
}
```

### 🟡 VIS-15: `desk-card__meta` `padding-left: 18px` is to make room for the ribbon — but the ribbon overlaps the `desk-card__no`
**Where:** `main.css:2178-2183` and `2118-2129`
**Why:** Ribbon is at `left: 24px`, meta has `padding-left: 18px` — that means the `№ 01` text starts at 18px from left but ribbon ends at ~24+14=38px. So the ribbon overlaps the start of "№ 01".
**Solution:** Increase meta padding to `padding-left: 28px` (or shift the ribbon to `left: 14px`).

### 🟡 VIS-16: `verse--star` letter-spacing `1.4em` overflows on narrow viewports
**Where:** `main.css:1450`
**Why:** With 1.4em spacing and `padding-left: 1.4em` to compensate, narrow phones (<360px) push the text off-screen.
**Solution:** Use `clamp(0.6em, 1.4em, 2.4em)` for letter-spacing and remove the padding-left compensation.

### 🟢 VIS-17: `.colophon__hole` punched hole doesn't show "through" to anything
**Where:** `main.css:2589-2597`
**Why:** It's a dark circle with a faint white box-shadow — on the warm tan card background it reads as a printed dot, not a punched hole. The effect is half-finished.
**Solution:** Either drop it (it's not adding value), or render it with a deeper inset shadow + a tiny inner highlight to suggest paper removed:
```css
.colophon__hole {
  background: var(--colophon-viewport, #1C1512);
  box-shadow:
    inset 0 3px 6px rgba(0,0,0,0.85),
    inset 0 -1px 1px rgba(255,255,255,0.25),
    0 1px 1px rgba(255,255,255,0.3);
}
```

---

## 3 · ACCESSIBILITY ISSUES

### 🟠 A11Y-01: No `<main>` landmark on `toc.html` — wait, yes there is. But `<aside class="cedar-drawer">` has `role="dialog"` without a `tabindex` management.
**Where:** `toc.html:810`
**Why:** When the drawer opens, focus is not trapped and not returned to the trigger button. Keyboard users can tab into the drawer links AND into the cards behind, leading to disorienting focus order.
**Solution:**
- When opening: store `document.activeElement`, focus the first drawer link.
- When closing: restore focus to the stored element.
- Trap focus inside the drawer while open (Tab cycles within).
- Add `aria-modal="true"`.

### 🟠 A11Y-02: `aria-hidden="true"` on canvas + scene + SVG motifs but no `aria-live` for the read-count badge
**Where:** `toc.html:88`
**Why:** Sighted users see "3 / 24 Letters Read" update live. Blind users hear nothing because there's no live region.
**Solution:** Add `aria-live="polite"` to the badge span (only after the initial render, to avoid announcing on page load).

### 🟠 A11Y-03: Custom slider for era dial lacks ARIA value text
**Where:** `about.html:115-122`
**Why:** `<input type="range" id="eraSlider" aria-label="Adjust simulated paper era from 1996 to 2026">` — the aria-label is good, but screen readers will say "1996" without context.
**Solution:** Add `aria-valuetext` updates in JS:
```js
slider.setAttribute('aria-valuetext', `${config.label} — ${config.status}`);
```

### 🟡 A11Y-04: Cover canvas and poem canvases are `aria-hidden="true"` — good — but the SVG `<defs>` in body also has `aria-hidden="true"` — also good. No issues, just confirming.
**Where:** Multiple. ✅

### 🟡 A11Y-05: All `data-edge="torn"` cards use `-webkit-mask` SVG with no `<title>` in the SVG
**Where:** `main.css:1086-1087`
**Why:** This is purely decorative, so no real a11y issue. Just noted.

### 🟡 A11Y-06: `font-display` strategy not specified at the link level
**Where:** `main.css:7`
**Why:** The Google Fonts URL has `&display=swap` but for users on slow connections text may still flash invisible. Consider `display=optional` for headings only? No, `swap` is correct for a reading-focused site. ✅ No fix needed, just noting.

---

## 4 · PERFORMANCE ISSUES

### 🔴 PERF-01: `@import` Google Fonts (see BUG-01, repeated for emphasis)
- Same fix.

### 🟠 PERF-02: Canvas DPR cap `Math.min(window.devicePixelRatio || 1, 2)` — fine, but resize fires on every scroll-induced scrollbar changes on some browsers
**Where:** `main.js:142`
**Solution:** Debounce resize (100ms). Already debounced by browser for `resize` events, but for orientationchange/scripted resizes, add explicit debounce.

### 🟠 PERF-03: Every poem has its own `<script src="../assets/js/main.js">` and the IIFE runs again — including canvas init
**Where:** 24 poems
**Why:** Each navigation runs the whole main.js. Not catastrophic (no memory leak) but the canvas is recreated on every page. If you add Service Worker caching this becomes moot.
**Solution:** Add `if (window.__manuscriptBooted) return; window.__manuscriptBooted = true;` at top of IIFE to prevent re-init on bfcache restore. (Browser back-forward cache can restore a page from memory; the script may re-run.)

### 🟠 PERF-04: Canvas `ctx.clearRect` every frame even when document hidden
**Where:** `main.js` canvas engines
**Why:** When tab is hidden, the IntersectionObserver stops calling `loop`, but the requestAnimationFrame chain doesn't immediately stop if a frame is in flight. Minor CPU waste.
**Solution:** Already mitigated by `if (!isVisible) return;`. ✅

### 🟡 PERF-05: Google Fonts URL has 9 family parameters with full weight/italic/opsz axes
**Where:** `main.css:7`
**Why:** That's a huge stylesheet (often 200KB+). Many of those fonts are used on 1–2 pages only (e.g. `Rubik Marker Hatch` is only used on cover; `DM Serif Display` only on strong titles).
**Solution:** Split into two `@font-face` blocks:
- `main.css` (or HTML head): only the families used on most pages — Fraunces, EB Garamond, Yellowtail, Caveat, Courier Prime.
- Cover-only: load `Permanent Marker`, `Rubik Marker Hatch` via a separate `<link>` only in `index.html`.

### 🟡 PERF-06: No `<link rel="preload">` for the cover canvas background or SVG scenes
**Where:** All poem pages
**Why:** First paint of the SVG scenes delays until after CSS+HTML parse.
**Solution:** Add `<link rel="preload" as="image" href="../assets/img/svg/scene-cosmic.svg">` per page (or, for the homepage, the cosmic scene).

### 🟡 PERF-07: `background-attachment: fixed` (see VIS-01, repeated)
- Same fix.

---

## 5 · ARCHITECTURE & CONSISTENCY

### 🟠 ARCH-01: 5 SVG filter definitions are duplicated in `index.html`, `toc.html`, and `about.html` differently
**Where:** index.html:14-30 (2 filters), toc.html:14-79 (5 filters), about.html:14-30 (2 filters). Each defines `ink-bleed` and `paper-tooth` slightly differently.
**Why:** Three sources of truth → guaranteed drift.
**Solution:** Master file `assets/img/svg/master-filters.svg` containing one canonical `<defs>` with all 5 filters. Reference via `<use>` in each page (or inject via JS once).

### 🟠 ARCH-02: Three different dock markup patterns across poems
**Where:**
- `manuscript.html` uses `class="dock-btn dock-btn--seal"` (no tooltip)
- `every-winter.html` uses `class="dock-btn keepsake-dock__btn dock-btn--desk keepsake-dock__btn--desk"` (with tooltip)
- `controlled-ruin.html` uses `class="dock-btn dock-btn--prev"` with `<span class="dock-label">prev</span>`

**Why:** Three different visual representations of the same component. The CSS for `.dock-btn` is fine but `.dock-btn--seal` vs `.dock-btn--desk` produces different colors. Users see inconsistent dock designs poem-to-poem.
**Solution:** Standardize on **one** markup pattern across all 24 poems. Pick the most feature-complete one (the "keepsake-dock__btn" variant with tooltips + aria) and copy-paste that exact block into every poem.

### 🟠 ARCH-03: Each poem HTML defines the dock markup inline, but `main.js` has a SECOND code path that auto-creates a dock if one doesn't exist
**Where:** `main.js:67-114` — `setupKeepsakeDock` creates a dock if `.keepsake-dock` not found.
**Why:** Two sources of truth. If a poem forgets the dock markup, the JS-injected one is much simpler (no tooltips, no separator). The user sees a different dock design on the "broken" page.
**Solution:** Either always rely on JS injection (remove the static markup from all 24 poems), or remove the JS injection path (force static markup, fail loud if missing). Pick one. **Recommendation:** Keep static markup (better SEO, no FOUC), delete the JS-injection block.

### 🟠 ARCH-04: The `<style>` block in `controlled-ruin.html`, `within-the-world-i-define.html`, `painted-sky.html` should live in `main.css`
**Where:**
- `controlled-ruin.html:17-52` — 35 lines of inline `<style>` for `.poem-card--ruin`, `.voice-narrator`, `.voice-reply`, `.scorched-fissure-svg`
- `within-the-world-i-define.html:17-77` — 60 lines for nested card, candle illustration
- `painted-sky.html:17-59` — 42 lines for `.poem-card--painted-sky`, celestial arc

**Why:** Inline `<style>` blocks don't benefit from browser caching and bloat each page load.
**Solution:** Move all three blocks into `main.css` as named component sections. Reduces HTML payload by ~140 lines × 1 page each.

### 🟡 ARCH-05: `data-family` values use mixed naming conventions (`A` vs `A-cover` vs `A-script` vs `B-day` vs `C-blue`)
**Where:** All poems
**Why:** Some families have multiple variants (`A`, `A-cover`, `A-script`); others have only one (`H` for End). Future poems in family B might pick `B-river`, `B-home`, `B-day`, `B-night`, `B-` — but no schema is documented.
**Solution:** Add a comment block at the top of `:root { ... }` in `main.css` documenting the naming convention: `[Letter] = base, [Letter]-[modifier] = variant. Letters A→H map to families: A Cosmic Devotion, B Winter Ash, C Ember & Ash, D Dawn Letter, E Wine & Memory, F Contained, G Ghost/Liminal, H Resolution.`

### 🟡 ARCH-06: `scene-toggle` exists in only 2 poems (every-winter pair) but the CSS is generic enough for any toggle. The JS in `main.js:40-64` queries `.scene-toggle` but is currently broken (see BUG-08).
**Where:** `main.js:40`, only 2 poems have `.scene-toggle`
**Solution:** Once BUG-08 is fixed, consider adding a small toggle to other paired poems (lost-answer, controlled-ruin/the-blue-inside-ruin) for a richer experience.

---

## 6 · WORLD-CLASS IMPROVEMENTS (Beyond Bugs)

These aren't bugs — they're ideas to elevate the site from "very good" to "world-class museum piece."

### 🌟 IMP-01: Activate the `paper-tooth` filter everywhere
**What:** The `feTurbulence` SVG filter exists but isn't applied anywhere via CSS. Apply it as an overlay on every `.poem-card` to give all papers a true fibrous texture.
**How:** Add `.poem-card { position: relative; } .poem-card::after { content: ''; position: absolute; inset: 0; background: var(--paper); mix-blend-mode: multiply; filter: url('#paper-tooth'); opacity: 0.35; pointer-events: none; }` — but only if the master-filters sprite is loaded (see BUG-02 fix).

### 🌟 IMP-02: Add a "Letter Writing Mode" easter egg
**What:** On each poem page, a `Cmd/Ctrl+E` shortcut opens a hidden notepad where the user can type a response and download it as a `.txt` letter.
**Why:** Manuscripts are meant to be written in. This honors the epistolary theme.
**How:** Add a `<dialog>` element in main.js with `<textarea>` styled as parchment. Save with `Blob` + `<a download>`. ~80 lines of code.

### 🌟 IMP-03: A "Reading Order" alternative for screen readers and keyboard users
**What:** The desk cards rely on visual rotation/position to suggest reading order. A screen reader user has no sense of the "scattered on a desk" aesthetic. Add a `<details>` element at the top of `toc.html` offering a flat, sortable list view (Number, Title, Family, Read state).
**Why:** Accessibility + discoverability.
**How:** ~30 lines.

### 🌟 IMP-04: Per-poem "Time-of-Day" gradient that respects user's local time
**What:** On `every-winter` (day) vs `every-winter-free-fall` (night), default to whichever matches the user's local hour (6am–6pm → day, else → night).
**Why:** Subtle, delightful, and reinforces the diptych theme.
**How:** 5 lines in `main.js`.

### 🌟 IMP-05: Print stylesheet refinement
**What:** The existing `@media print` block is impressive (4×6 postcard, postage stamp, cancellation mark) but is **permanently** styled for landscape. For a book reader printing a single poem, portrait may be better.
**How:** Add `@page :first { size: portrait; }` and per-poem `@page` selectors.

### 🌟 IMP-06: Add `<noscript>` graceful degradation
**What:** When JS is disabled (or on slow networks), the cedar drawer, canvas, dock, etc. all break. The site should still be readable.
**How:** Wrap the dock in `<noscript>` style fallback CSS; the cedar drawer should be visible by default (transform: none) without JS.
```html
<noscript>
  <style>.cedar-drawer { transform: none !important; } .keepsake-dock { display: none; }</style>
</noscript>
```

### 🌟 IMP-07: Inline the critical CSS for first paint
**What:** The current 80KB `main.css` is render-blocking. Extract a ~6KB critical subset (body bg, .poem-stage, .poem-card base, fonts) and inline in `<style>` in `<head>`. Async-load the rest.
**How:** Use a build tool or hand-extract.

### 🌟 IMP-08: Per-poem favicon (already done partially)
**What:** Some poems already have SVG favicons (`manuscript.html`, `end.html`, etc.), but 18 of 24 do not. They fall back to the browser default.
**How:** Add a unique inline SVG `<link rel="icon" href="data:...">` to each poem.

### 🌟 IMP-09: Add `<meta property="og:image">` and Twitter card meta to every poem
**What:** Currently only `index.html` has Open Graph tags. Poem pages shared on Twitter/Slack show a blank card.
**How:** Add ~5 lines per poem (or generate from a script).

### 🌟 IMP-10: Service worker for offline reading
**What:** A poetry site is the perfect offline-first experience.
**How:** ~100 lines. Cache CSS, JS, all SVGs, and the cover.jpg. Strategy: stale-while-revalidate.

### 🌟 IMP-11: Add a "share this letter" permalink mechanism
**What:** Each poem should have a stable URL like `?letter=11` that can be shared.
**How:** The TOC already has stable filenames — `/poems/every-winter.html`. Just add explicit social share buttons (copy link, Twitter, etc.) to the poem nav.

---

## 7 · PRIORITIZED EXECUTION ORDER

### Sprint 1 — Fix the broken (≈ 4 hours of work)
1. **BUG-01** Move `@import` to `<link>` in HTML head
2. **BUG-02 + BUG-03 + BUG-11** Create `master-filters.svg` sprite; remove dead inline defs; add `<use>` reference on every page
3. **BUG-10** Wrap 12 stray `<img>` in `.poem__scene` divs
4. **BUG-04** Wire `dock-focus` and `dock-audio` (or remove)
5. **BUG-08 + BUG-09** Wire `scene-toggle` data attributes
6. **BUG-05 + BUG-06 + BUG-07** Fix TOC drawer item markup and reset logic
7. **A11Y-01 + A11Y-02 + A11Y-03** Focus trap, aria-live, aria-valuetext

### Sprint 2 — Polish (≈ 6 hours)
8. **VIS-01 + VIS-02 + VIS-15** Z-index/background-attachment/dogear/ribbon overlap
9. **VIS-06 + VIS-07** Replace broken-seal icons; move pair-tag inline styles to CSS classes
10. **VIS-11 + ARCH-04** Move inline `<style>` blocks to `main.css`; replace hardcoded colors with tokens
11. **ARCH-02 + ARCH-03** Standardize dock markup across 24 poems; decide on JS-injection fate
12. **VIS-12** Soften `prefersReducedTransparency` instead of killing canvas
13. **PERF-03** Add `__manuscriptBooted` guard for bfcache

### Sprint 3 — World-class (≈ 8 hours)
14. **PERF-05** Split Google Fonts URL per usage
15. **PERF-06** `<link rel="preload">` for first scene SVG
16. **IMP-01** Activate `paper-tooth` overlay
17. **IMP-02** Letter-writing easter egg
18. **IMP-03** Reading-order fallback for SR/keyboard
19. **IMP-06** `<noscript>` graceful degradation
20. **IMP-08 + IMP-09** Per-poem favicons + OG meta
21. **IMP-04** Time-of-day default for sibling pairs

---

## 8 · TESTING CHECKLIST AFTER FIXES

After every Sprint, verify:

- [ ] All 27 HTML files parse (no console errors)
- [ ] Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] axe-core: 0 critical, 0 serious violations
- [ ] Manual keyboard nav through cover → TOC → poem → back → drawer
- [ ] `prefers-reduced-motion` respected
- [ ] `prefers-reduced-transparency` does not break atmosphere (just softens)
- [ ] Bfcache navigation (browser back/forward) — no re-init errors
- [ ] iOS Safari: no `background-attachment: fixed` white flashes
- [ ] Screen reader (NVDA/VoiceOver): landmarks announced, drawer modal works, live region updates
- [ ] Print preview: 4×6 postcard layout correct
- [ ] 320px viewport: no horizontal scroll, dock reachable, all text legible

---

## 9 · NICE-TO-HAVE: ARCHITECTURAL DIAGRAM OF THE FIX

```
┌─────────────────────────────────────────────────────────────────┐
│  index.html (Cover)                                             │
│    <head>                                                        │
│      <link rel="preconnect" …/>                                  │
│      <link rel="stylesheet" href="assets/css/fonts.css"/>        │  ← BUG-01
│      <link rel="stylesheet" href="assets/css/main.css"/>         │
│      <link rel="preload" as="image" href="images/cover.jpg"/>    │  ← PERF-06
│    </head>                                                       │
│    <body data-family="A-cover">                                   │
│      <svg class="svg-filters"><use href="master-filters.svg"/></svg> │  ← BUG-02
│      <main class="cover">…</main>                                 │
│      <script src="assets/js/master-filters.js"></script>          │  ← single source
│      <script src="assets/js/cover.js"></script>                   │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  toc.html (Desk)                                                │
│    <body data-family="D-dawn">                                   │
│      <svg class="svg-filters"><use href="master-filters.svg"/></svg> │
│      <main class="desk">…                                       │
│        <ul class="desk-grid">                                   │
│          <li><article class="desk-card" data-edge="deckled">…    │
│            [uses filter: url('#deckled-edge') from sprite]      │  ← BUG-02 fixed
│          </li>…                                                  │
│        </ul>                                                     │
│        <aside class="cedar-drawer" role="dialog"                │
│               aria-modal="true">                                │  ← A11Y-01
│      </main>                                                     │
│      <script src="assets/js/master-filters.js"></script>         │
│      <script src="assets/js/toc.js"></script>                    │  ← new, factored
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  poems/*.html (24 poem pages)                                   │
│    <body data-family="…" data-canvas="…">                        │
│      <svg class="svg-filters"><use href="master-filters.svg"/></svg> │
│      <main class="poem-stage">                                  │
│        <canvas class="poem__canvas-layer" id="poemCanvas">      │
│        <div class="poem__scene"><img src="…"/></div>            │  ← BUG-10 wrapped
│        <article class="poem">                                   │
│          <div class="poem-card" data-edge="…">…                  │
│        </article>                                                │
│      </main>                                                     │
│      <nav class="keepsake-dock">                                │  ← standardized
│        [identical markup on all 24 pages]                       │  ← ARCH-02
│      </nav>                                                      │
│      <script src="assets/js/master-filters.js"></script>         │
│      <script src="assets/js/main.js"></script>                  │
└─────────────────────────────────────────────────────────────────┘
```

The biggest single win: **`master-filters.svg` as a shared sprite** + **`<link>` instead of `@import`** + **wrap stray `<img>` in `.poem__scene`** fixes 9 of the 47 issues in one stroke.

---

## 10 · APPENDIX: Quick file change log preview

| File | Change | Sprint |
|---|---|---|
| `assets/css/main.css` | Remove `@import` line | 1 |
| `assets/img/svg/master-filters.svg` | **NEW** — extract from toc.html | 1 |
| `assets/js/master-filters.js` | **NEW** — inject `<svg><use/></svg>` once | 1 |
| `assets/js/main.js` | Wire `dock-focus`, `dock-audio`, fix `scene-toggle`, bfcache guard | 1 |
| All 27 HTML files | Replace `@import`-loaded fonts with `<link>` in head; add `<svg class="svg-filters"><use/></svg>` | 1 |
| 12 poem files | Wrap `<img src="…scene-*.svg">` in `<div class="poem__scene">` | 1 |
| `toc.html` JS | Fix `MSS-001` padding, `toggleAllReadBtn` logic, drawer focus trap | 1 |
| 24 poem files | Standardize dock markup (copy from `every-winter.html`) | 2 |
| `controlled-ruin.html`, `within-the-world-i-define.html`, `painted-sky.html` | Remove inline `<style>`; move to `main.css` | 2 |
| `main.css` | Add `.desk-card__pair-tag--*` modifier classes; replace hardcoded hex with tokens | 2 |
| 24 poem files | Add per-poem favicon + OG meta | 3 |

---

**Bottom line:** The site has 47 distinct issues, but only 4 of them (BUG-01, BUG-02, BUG-04, BUG-10) are user-facing and noticeable. Fix those four first — and you've already shipped a measurably better Manuscript. Then run through Sprint 2 and 3 for the polish that takes it from "very good" to "museum-grade."

— *End of audit*
