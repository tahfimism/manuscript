# Product Requirements Document

## _Manuscript_ — a poetry collection, kept like a letter

**Source material:** 24 poems by tai_khan, exported from Wattpad ("a whisper exceeding the shadows"), plus an "About" page. **Format:** Single-purpose reading site. No blog, no comments, no monetization — a keepsake object you hand someone a link to. **Author of this document:** written to be handed directly to a build agent (e.g. Claude Code) as an implementation brief.

**v2 note:** this revision replaces the earlier 8-cluster-only treatment with a full per-poem visual plan (§7). The 8 mood families still exist — they're the shared material system so the site reads as one hand, not 24 random skins — but every poem now has its own signature detail pulled from its actual lines, and three recurring visual **through-lines** connect specific poems to each other the way the text itself does (§8).

---

## 1. Vision

Not a "poetry blog." An **object** — the feeling of finding a box of old letters in a drawer: off-white paper gone slightly warm with age, ink that's browned a little, a pressed flower that crumbles if you touch it wrong, a red wax seal, string tied around a bundle. 90s-analog, hand-made, imperfect on purpose.

The core idea: **the poems are not visually uniform, and neither are poems within the same mood.** _Every Winter_ and _Home_ are both winter poems, but one is about frost creeping in and the other is about footprints and rain on glass — they shouldn't look identical just because they're both "cold." The site should feel like a single person's handwriting across a real emotional range, where every page has one detail that could only belong to _that_ poem.

**Non-goals:** generic "SaaS card" poetry-app look, uniform rounded-corner grid, glossy hero gradient, tracked-out all-caps labels, stock literary-site serif-on-cream-with-one-accent template, 24 pages that are secretly the same template with the hex codes swapped and nothing else.

---

## 2. Audience & use

One reader persona: someone sent the link, sitting with a handful of poems for a few minutes, most likely on a phone, at night. Secondary: the author revisiting their own work. No discovery/SEO goal, no CMS — a fixed, hand-tuned artifact.

---

## 3. Content inventory & editorial decisions

25 chapters map to: cover (new), About, table of contents, 24 poem pages.

**Confirm with the author before build:**

1. The source has small typos ("craking," "eaarly," "bleeeding," "precisio n," a stray double comma). Recommendation: **preserve as written** — it reads as an authentic handwritten manuscript rather than a copyedited publication. Author's call, poem by poem if they want exceptions.
2. Four chapters (_Manuscript_, _From River to Winter_, _Home_, _Landscape_) had a Wattpad `[image]` placeholder — open slots, resolved by default to that poem's illustrated motif (§7), replaceable later with a real photo/scan.
3. _Between Midnight & Sleep_ uses distinctly modern vocabulary ("seen-zone," "your ignoring") inside an otherwise vintage-letter voice. Recommendation: **lean into it, don't smooth it over** — treat it as one deliberate anachronism (a phone-glow detail worked into the moonlight accent, §7) rather than editing the register to match. Confirm the author wants that read.

---

## 4. Information architecture

```
Cover (sealed envelope / folded letter)
   └─ tap/click to unfold
        │
        ▼
Table of Contents ──────────────► About
   (poems as loose letters on a desk,      (author, summary, status,
    color-tagged by mood, with string        source link — kept small)
    and scorch-line through-lines, §8)
        │
        ▼
Poem page (1 of 24)
   ◄── prev / next ──► (page-turn between poems, TOC order)
        │
        └─ "back to the desk" returns to Table of Contents
```

No hamburger menu, no nav bar. Wayfinding is physical.

---

## 5. Design system — shared materials

**Base "keepsake" palette** (every theme is built from this):

|Token|Hex|Use|
|---|---|---|
|`paper`|`#F1E8D8`|base page color|
|`paper-shadow`|`#E3D5BC`|deckled-edge shading, card recess|
|`ink`|`#3C2A1E`|primary text|
|`ink-faded`|`#6B5340`|secondary text, captions|

**The 60-30-10 rule, literally assigned per theme:** each theme names which material owns 60/30/10 — e.g. "paper 60, night-sky 30, gold foil 10." Only the cosmic pair inverts it so night becomes dominant (§7A); that inversion stays meaningful _because_ it's the only one.

**Typography:**

|Role|Typeface|Notes|
|---|---|---|
|Display (titles, drop caps, cover)|**Fraunces** (variable)|dial up `opsz`/`wonk` for irregular, hand-set letterpress feel|
|Body (poem text)|**Cormorant Garamond** or **EB Garamond**|line-height generous, <65 characters/line|
|Marginalia (used sparingly — never body text)|**Caveat** or **Homemade Apple**|one handwritten annotation per page, max|
|Metadata (chapter no., footer)|**Courier Prime**|typewriter register, ties to the "manuscript" conceit|

**Texture, not flat color.** Faint grain on every paper surface (SVG `feTurbulence`, ~3–4% opacity), soft edge vignette, torn/deckled card edges via SVG mask — never a straight border-radius standing in for it.

**Shared motif kit** (the vocabulary every per-poem detail in §7 draws from, recolored per theme): hand-drawn brush-stroke stanza dividers, paper-cutout flowers (Matisse-cutout simplicity, not literal botanical art), torn-paper edges, red string (used only for the explicit sibling pairs, §8), a small illustrated corner motif per poem (specified individually below — this is the part that used to be "per cluster" and is now "per poem").

---

## 6. The eight mood families

The umbrella palettes (unchanged from v1, restated briefly — full per-poem detail is §7):

|#|Family|60 / 30 / 10|Poems|
|---|---|---|---|
|A|Cosmic devotion|night `#1B1A2E` / paper `#F1E8D8` / gold `#C9A24B` _(inverted ratio)_|Manuscript, Divine Letter|
|B|Winter ash|frost `#EDEAE2` / slate `#46545C` / dried rose `#A3495A`|From River to Winter, Every Winter, Every Winter: Free Fall, Home|
|C|Ember & ash|charred `#201B18` / ash-cream `#E7DCC9` / ember `#B4432A`|Hollow Shell, Dissection, Within the World I Define, Controlled Ruin, The Blue Inside Ruin, Painted Sky|
|D|Dawn letter|paper `#F1E8D8` / coral `#D98B6B` / ink `#3C2A1E`|Guiding Light, Starlight, Memoirs, Landscape|
|E|Wine & memory|paper `#F1E8D8` / burgundy `#5C2A2E` / candle gold `#C9A24B`|Lost Answer: Ghost of Warmth, Lost Answer: Truth known|
|F|Contained|grey-cream `#DCD6CB` / iron grey `#4A4740` / hairline red `#8B2E2E`|Things I Learn to Bury, Rage in cage|
|G|Ghost / liminal|grey-lavender `#E5E1E4` / faded grey `#6A6470` / moonlight `#A9B4C2`|Out of frame, Silence in layers, Between Midnight & Sleep|
|H|Resolution|paper `#F1E8D8` / ink `#3C2A1E` / near-empty|End|

---

## 7. Per-poem visual plan

Every entry: the line(s) the visual is grounded in, the palette note (base family unless flagged), the signature detail unique to that page, and any structural device that breaks from its siblings on purpose.

### A — Cosmic devotion

**Manuscript.** Grounded in: _"For you, I'll burn every flower / also for you, I can make it bloom again"_ — an oath of destruction-and-creation in one breath. Signature detail: a hand-drawn star-chart constellation whose dot-to-dot line, followed to the end, resolves into the outline of a single flower — destruction and creation as the same shape, seen two ways. Structural device: a gold, illuminated-manuscript-style drop cap on "For," and a small foil-stamped seal at the poem's end (it functions as a signed vow, so it gets a signature mark the way a letter would). 60/30/10 fully inverted — night dominant, this is the one page on the whole site where the paper card is the minority element.

**Divine Letter.** Grounded in: _"a manuscript of a divine letter"_ — direct address, litany form, warmer and more settled than _Manuscript_'s oath. Palette note: same family, dialed back — closer to a plum-indigo `#2A2340` than _Manuscript_'s near-black, and paper reclaims slightly more of the page (55/35/10-ish), because this poem is the letter itself arriving, not the vow that preceded it. Signature detail: scattered stardust as fine ink-spatter flecks rather than _Manuscript_'s plotted constellation — looser, closer to handwriting than to a chart.

### B — Winter ash

**From River to Winter.** Grounded in: _"the river flows, a promise to the sea"_, _"the truth, a viper coiled."_ Signature detail: a single hand-drawn river line runs along the bottom edge of the page like a physical fold in the paper — this poem is the only one in the cluster that gets the river device (others get frost or branch); a very fine coiled thread near the "viper" stanza, easy to miss unless you're looking. This is one of the four `[image]`-slot chapters — the river line is the default resolution for that slot.

**Every Winter** _(sibling 1 of 2, see §8)_. Grounded in: _"sun hid away, winter's hold"_, _"silent room, no laughter near."_ Signature detail: frost creeping in from one corner (a fine crystalline SVG pattern), a bare-branch shadow cast faintly across the card as if from an unseen window.

**Every Winter: Free Fall** _(sibling 2 of 2)_. Grounded in: _"moonless night, tears freely fall"_, _"diamond drops"_, _"raise the drink."_ Signature detail: same frost palette, but the motif shifts from corner-frost to a light vertical scatter of small diamond/teardrop marks falling down the page — literalizing "free fall" as the one variation between the pair.

**Home.** Grounded in: _"footprints in the frosted sand"_, _"rain on a window pane"_, _"in letting go, she finds her own home."_ Signature detail: a faint trail of footprints fading toward the card's torn edge (they leave, they don't arrive), and three or four thin rain-streak brushstrokes down one side, like rain on glass. The other `[image]`-slot chapter — resolves to the footprints-and-rain treatment by default.

### C — Ember & ash

**Hollow Shell.** Grounded in: _"cracked reflection in the glass"_, _"coffee cup dreams, still warm in my grip / your name on the mug."_ Signature detail: a translucent coffee-ring stain as the corner motif — more intimate and domestic than the cluster's usual ember/smoke, because this poem's central image is a mug, not a fire. A single fine crack line through one corner, like a cracked photograph in a frame.

**Dissection.** Grounded in: _"is bravery a scalpel, sharp and cold"_ — surgical, precise, cold rather than chaotic. Structural device: **the one exception to the cluster's torn/burnt edge.** This card gets a clean, single straight-cut edge instead of a ragged burn — precision instead of ruin. Signature detail: one fine incision-line motif, not a crack, not a flame.

**Within the World I Define.** Grounded in: _"a twisted flame that burns bright"_, _"a world that only I define."_ Signature detail: a single flickering candle-flame brush stroke. Structural device: the poem's text sits on a smaller inner card nested within the outer torn-paper sheet — a page within a page, visualizing a private, self-contained world inside the larger manuscript.

**Controlled Ruin.** Grounded in: _"the sea burned long before we spoke — still, black, unmoving"_, _"I scorch the edges, slow, exact"_, and it's the one poem in the collection written partly as dialogue. Signature detail: a flat, still, dark horizon line near the bottom of the card — the "charred sea," first appearance (see the through-line in §8). Structural device: the quoted lines ("You don't need to destroy it all," etc.) are set in the Caveat marginalia hand, distinct from the poem's own Cormorant Garamond voice — two hands on one page, because it's a two-voice poem.

**The Blue Inside Ruin.** Grounded in: the poem is a long catalogue of blues (ocean, evening sky, glaciers, moonlight on rivers, stained glass, Earth from space), closing on _"the blue of charred sea."_ Signature detail — the most ambitious single-page treatment on the site: the page background is a slow vertical gradient that shifts through each named blue as the stanzas go, ending in the cluster's charred black at the very last line, where the "charred sea" horizon line from _Controlled Ruin_ reappears, now drowned in blue. This is a fixed painted gradient sized to the page, not a scroll-triggered animation — it doesn't move, it's just tall (see §9). Corner motif: small faceted shard shapes in blue, for "the blue of stained glass in cathedrals." Third stop on the charred-sea through-line (§8).

**Painted Sky.** Grounded in: _"the sun bleeds out, a crimson tear"_, _"the moon paints paths that meet."_ Signature detail: unlike the rest of the cluster's static charred-black field, this card's background is a sunset-to-night gradient — ember red at the top fading to slate-blue at the bottom, sun and moon suggested as a single thin arc line. The one ember-cluster poem that ends somewhere gentler, so it's the one that visibly isn't all black.

### D — Dawn letter

**Guiding Light.** Grounded in: _"hope like stars, guiding each day."_ Signature detail: a trail of small star-dots that actually guides the eye down the page toward the next stanza — a wayfinding line built from the poem's own image, brighter (larger, gold) at a single "north star" point.

**Starlight.** Grounded in: _"moonlit nights... hearts may meet, beneath moonlit souls entwine."_ Palette note: a bridge treatment — dusk-indigo at the top blending into the family's coral toward the bottom, since this poem is nocturnal but hopeful, sitting between the cosmic and dawn families tonally. Signature detail: two thin thread-lines that cross and braid once, then continue separate — "souls entwine," briefly.

**Memoirs.** Grounded in: _"for a new beginning... nurture the soul, find the freedom."_ This is the shortest poem in the collection — treat the brevity as a design fact, not a gap to fill. Mostly open paper, one small sprouting-seedling cutout in a corner, nothing else added to compensate for the white space.

**Landscape.** Grounded in: _"soar on wings, reach the skies... find the landscape, enjoy the views."_ Structural device: the only card on the site that's letterboxed — noticeably wider than tall, instead of the standard portrait letter shape — because the poem is, on the nose, about a landscape. Signature detail: a paper-cutout wing silhouette, low in one corner, and a single horizon brushstroke running the width of the card. Third `[image]`-slot-adjacent chapter (not an original placeholder, but pairs naturally with the letterbox treatment if the author later wants a photo here).

### E — Wine & memory

**Lost Answer: Ghost of Warmth** _(sibling 1 of 2, see §8)_. Grounded in: _"I raise the wine to memories that pass"_, _"I trace the lines where constellations lie."_ Signature detail: a wine-glass ring stain with a few faint gold dots inside it, like starlight caught in the glass — a small callback to the cosmic family (constellations), since this poem is the one place they're mentioned outside _Manuscript_/_Divine Letter_.

**Lost Answer: Truth known** _(sibling 2 of 2)_. Grounded in: _"in the ashes, stories start to rise"_, _"the heart crumbles for what the soul has sown."_ Signature detail: same wine-ring motif, but empty and dried now — the glass has been finished — with a few fine ash-fleck marks drifting up and out of the ring instead of the gold "stars." The aftermath of the first poem's glass.

### F — Contained

**Things I Learn to Bury.** Grounded in: _"grief is acceptable only in controlled quantities"_, _"oceans trapped beneath ice, visible only through fractures."_ Signature detail: tight, ruled notebook lines — no flowers, no brush strokes, the least decorated page on the site on purpose. The single permitted mark: one barely-visible hairline crack in a corner, for "fractures."

**Rage in cage.** Grounded in: _"it calcifies... like ash inside the lungs"_, _"stars collapsing inward from their own gravity."_ Signature detail: same ruled restraint, but the cluster's one hairline red thread is drawn taut and straight, like a bar rather than a loose string — and one small tight spiral mark in a corner, for the collapsing star. The only other permitted mark on this page. Implicit pair with _Things I Learn to Bury_ — not titled as a "part 2" the way _Every Winter_ is, but the only two poems in this family, and the two most explicitly about suppression. Connected on the TOC (§8), just not with the same red-string device used for the named pairs.

### G — Ghost / liminal

**Out of frame.** Grounded in: _"close enough to map your days, far enough to never exist inside them"_, _"only part of what it looked like from outside."_ Signature detail: empty photo-corner mounts (the little triangle brackets used to hold a photograph in a scrapbook) — but no photo between them, and the mounts sit slightly off from where the eye expects a centered frame. The absence and the misalignment do the work the title names.

**Silence, in layers.** Grounded in: the title, plus _"even silence wasn't clean, it came in layers."_ Signature detail: the cluster's double-exposure device at its most literal here — two, sometimes three, translucent paper layers stacked with a small offset, each a slightly different shade of the family's grey-lavender. This is the one page where that device is the _whole_ visual idea, not a background detail.

**Between Midnight & Sleep.** Grounded in: _"the pause between midnight & sleep"_, and the poem's modern vocabulary — _"your seen-zone, your ignoring."_ Signature detail: a hand-drawn clock with its hands stopped at an ambiguous hour (the "pause"), and — the deliberate anachronism from §3 — a small pale rectangle of cool blue-white light worked quietly into the moonlight accent, like a phone screen half-visible among the ink. Old letter, modern heartbreak, on the same page.

### H — Resolution

**End.** Grounded in: _"And so I choose the unknown, a home I carve for myself alone."_ Structural device: physically the smallest card on the site — not full page width like every other poem, a small folded note centered in open paper. Near-empty 10% slot: one small line-drawn door, slightly ajar, and nothing else. Closure as scale and absence, not another flourish.

### About

Not part of the mood system — treated like the inside cover or colophon of a book, plain paper, no motif. Author, the one-line summary, status, and the original Wattpad link rendered small, like a return address stamp.

---

## 8. Recurring through-lines

Three connective devices, used _only_ where the text itself connects poems — this is what stops the per-poem specificity in §7 from reading as 24 disconnected ideas.

1. **Red string (explicit named pairs).** _Every Winter_ ↔ _Every Winter: Free Fall_, and _Lost Answer: Ghost of Warmth_ ↔ _Lost Answer: Truth known_ — on the Table of Contents, a short length of red string visually ties each pair's cards together. Reserved for pairs the titles themselves announce as two parts.
2. **Charred-sea arc (three poems, one motif, evolving).** _Within the World I Define_ → _Controlled Ruin_ → _The Blue Inside Ruin_ all reference the same "charred sea" image, so the flat dark horizon-line motif appears in all three and changes state across them: a flame, alone, in the first; scorched and cracking, with dialogue, in the second; drowned in the blue-gradient catalogue of the third. On the TOC, these three are connected by a thin scorched/singed line rather than red string — same idea, different material, so it doesn't get confused with the literal sibling pairs.
3. **Implicit pair (unmarked).** _Things I Learn to Bury_ and _Rage in cage_ sit next to each other on the desk and share the "Contained" family's restraint, but get no string — the point of that family is that it doesn't reach for connective flourishes either.

---

## 9. Page specs

**Cover.** Sealed envelope or folded letter, centered on a plain desk field. One interaction: tap/click to unfold — the single big orchestrated motion moment for the whole site.

**Table of contents.** Loose index cards/letters on a desk, gentle varied rotation (±2–4°), not a grid. Each card: title, small color tag from its family (§6), chapter number in Courier Prime. Red string on the two named pairs; a thin scorched line on the charred-sea arc (§8). Tapping opens that poem.

**Poem page.** One torn-edge card, centered, <65-character lines. Title in Fraunces at top, the poem's individual signature motif (§7) placed once, quietly. Stanza breaks marked with a brush stroke. Footer: chapter number, prev/next as physical page-corners, triggering a page-turn into the next poem's theme.

**About.** Small, unadorned, as described in §7.

---

## 9a. On the _Blue Inside Ruin_ background gradient

Worth flagging explicitly since it's the one page whose background is doing something none of the others do: it's a **fixed, pre-painted gradient the height of the full page**, not something that animates as the reader scrolls. The reader scrolling past it is just scrolling past a tall image, the same as scrolling past a tall photograph — it doesn't violate the "no scroll-triggered motion" rule in §10 because nothing is moving; the gradient is simply large. Contrast must be checked at every band, in case a lighter mid-poem blue band sits too close to `ink` for AA (see §12).

---

## 10. Motion

One rule: motion either **opens the site** (cover unfold) or **answers a click** (page turn, card tap). Nothing scroll-triggered fires automatically, nothing loops. Everything respects `prefers-reduced-motion` — a straight cut instead of a page-turn, an already-open envelope instead of an unfold.

1. **Cover → contents:** unfold, ~600–800ms, once per visit.
2. **Poem → poem:** page-turn (outgoing card slides/rotates off, incoming theme slides in) — navigation, so it's allowed to repeat.

No hover flourishes on every card, no auto-playing particles, no cursor-follow effects.

---

## 11. Build approach

Recommend a small **Astro** static site: each poem as one content file (markdown + frontmatter — `family`, `signature_motif`, `pair`/`arc` keys drawn straight from §7–8), rendered through one `PoemPage` template. A plain hand-rolled HTML/CSS/vanilla-JS build works the same way with zero build tooling, if preferred — the per-poem detail is still just a small metadata block per page either way.

- **Texture & shapes:** hand-authored SVGs (brush strokes, torn edges, cutout flowers, the specific per-poem motifs in §7), recolored via CSS variables per family, not photographic textures. `feTurbulence` for paper grain.
- **Fonts:** Fraunces, Cormorant Garamond (or EB Garamond), Caveat, Courier Prime.
- **No animation framework needed** — CSS transitions/keyframes cover both motion moments; a few lines of vanilla JS sequence the page-turn.

---

## 12. Accessibility & quality floor

- Contrast checked per page, not just per family — the darker cosmic/ember pages and every band of the _Blue Inside Ruin_ gradient (§9a) need their own check, not an inherited assumption from the base `ink` token.
- Decorative SVGs `aria-hidden`; poem text stays real, selectable, screen-reader-readable HTML — never text-as-image.
- Responsive down to phone width (§2's primary viewport) without torn edges or the letterboxed _Landscape_ card collapsing into clutter.
- Visible keyboard focus on every interactive card/arrow.
- `prefers-reduced-motion` fallback mandatory.

---

## 13. Review checklist

- [ ]  Does every one of the 24 pages have a detail that's specific to _that poem's own lines_, not just its family's default kit?
- [ ]  Is the cosmic pair still the only ratio inversion?
- [ ]  Does _Contained_ (family F) still look less decorated than everything else — not quietly picking up flowers along the way?
- [ ]  Does the charred-sea arc actually read as one evolving image across three pages, or does it look like three unrelated ember poems that happen to be near each other?
- [ ]  Dissection's clean-cut edge and End's small-card scale — are these still the _only_ exceptions to the standard torn edge / full-width card, respectively? A third exception would dilute both.
- [ ]  Motion audit: nothing on scroll, nothing loops, reduced-motion tested, including the _Blue Inside Ruin_ gradient (confirm it reads as static, not as an animation someone's waiting to finish).
- [ ]  The three open questions in §3 (typos, `[image]` slots, the _Between Midnight & Sleep_ anachronism) — confirmed with the author, not silently decided.

---

## 14. Open questions for the author

1. Typos: preserve as-is everywhere, or clean up specific ones?
2. The `[image]` placeholders — theme-motif illustration by default (as specified per poem in §7), or hold slots for real photos/scans to be added later?
3. _Between Midnight & Sleep_'s modern slang ("seen-zone") — keep as a deliberate anachronism (phone-glow detail, §7) or smooth the language to match the rest of the collection's register?
4. Any hard preference on build tooling (Astro vs. plain static HTML/CSS/JS) before work starts?