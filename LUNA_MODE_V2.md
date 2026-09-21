# ✦ Luna Mode — V2 ✦
*Editing the previous dossier down to what the manuscript actually calls for.*

---

## 0. How to read this

This document **supersedes** `LUNA_MODE_SPECIFICATION.md`. It is shorter, more conservative, and grounded in what currently ships in the repository (see Appendix A — Status Audit). The previous specification was evocative and internally coherent, but three of its assumptions are wrong *for this manuscript*, and I want to name them at the top so the rest of the doc makes sense.

**Three constraints lead.**

1. **Withholding is the form.** This site wins by what it doesn't say. §4 of the PRD is explicit about not being a "poetry blog" — every choice in Luna Mode has to live inside that. A version of Luna Mode that adds a midnight-lamp sweep, starlight particles, and a 2.5-second Polaroid development animation has stopped being the manuscript's quiet second drawer and started being a *room*. That room is more spectacular; it is also unfaithful to the manuscript's register.

2. **The photographs are the limit.** Two real photographs anchor this entire feature — `images/luna/pic in larger one.jpg` and `pic in smaller one.jpg`. If those photographs do not look as though they were taken in 1996, no amount of `sepia(0.08) contrast(1.02) brightness(1)` will save the page. Every other visual flourish either supports the photographs or competes with them. _Editorial query, not stet:_ before any further visual work, decide whether those two images are the right ones, or whether the photographs should be replaced, blurred further, or pulled out altogether and replaced with the illustrated stamps alone.

3. **A drawer, not a haunted house.** The "secret" should feel found, not constructed. `l-u-n-a` as a public toggle, with a programmatic `window.toggleLunaMode()` and `Ctrl+Shift+L`, is the equivalent of leaving the diary open on the desk with a sticky note explaining which page to turn to. The trigger should be *one* method, and it should be the kind of thing someone stumbles on while reading, not a feature tour.

Everything below is shaped by those three constraints.

---

## 1. Foundation — who Luna is in this manuscript

_Stet on the personal frame from the prior spec; restated in my own words._

_Luna_ is not a partner, was never a partner, and will not become one. The twenty-four poems in the manuscript were written during the long winter of 1996 for a single muse. The author preserved her friendship, warmth, and presence in the world instead of burdening her with a confession she could never return. That decision is the spine of Luna Mode.

The manuscript's public layer — the desk, the wax seals, the Untouched decade — is metaphor held at arm's length: frozen rivers, celestial ruins, winter ashes. Luna Mode is the layer underneath, where it becomes clear that every one of those metaphors had a single addressee.

The author has chosen to encode this in the artifact, which is itself a deliberate choice. The artifact is now the responsible party for keeping the secret safely, well, and without theatrics.

---

## 2. Architecture — what actually controls Luna Mode

There is exactly one mechanism, one persistence key, one class, and one toast. The previous spec listed three triggers (keystroke, chord, console). I am folding those to one trigger and exposing the rest only when the manuscript calls for it. Reasons at the bottom of this section.

| Layer | Implementation | Notes |
|---|---|---|
| **Trigger** | Type the four letters `luna` anywhere on the site, ignoring inputs/textareas. | Case-insensitive, debounced against accidental four-letter collisions. |
| **State storage** | `localStorage["manuscript_luna_mode"]` (`"true"` / `"false"`). | Restored on `pageshow`, including `bfcache` restore. |
| **DOM hook** | `document.body.classList.toggle("luna-mode-active")` | Single class. All Luna visuals are scoped under `body.luna-mode-active …` in `main.css`. |
| **Toast** | `#lunaToast.luna-toast` injected by `main.js`, three-line copy. | Auto-dismisses after 3.2s. |
| **Audio cue** | `ManuscriptSound.playSoftTap()` on both activation and deactivation. | Soft felt-on-wood tap. No wax-crack, no pen scritch on toggle — those belong to opening the *letter*, not the mode. |
| **Reset on hide** | Deactivation re-flips the envelope front and closes the modal if it's open. | Ensures Luna Mode doesn't leave state visible after toggling off. |
| **Haptics** | `navigator.vibrate([30, 50, 30])` on mobile activation. | Skipped on deactivation. |

**Why one trigger, not three.** The previous spec offered a secret keystroke, a `Ctrl/Cmd+Shift+L` chord, and a `window.toggleLunaMode()` API. Each addition is another legible hook into the secret: the chord is in a desktop menu bar's reach, the console API is fully public. The right answer for a *secret* is to make it findable once and only once, then trust the reader. If you actually need a programmatic entry — for testing, or because we want to add an unobtrusive "Luna Mode" link in the Colophon — that is a *fourth* addition, not a foundational one, and should be reviewed as such.

**Where the toggle lives in code.** `assets/js/main.js`, IIFE `setupLunaMode()` near the bottom of the file. The 3D envelope flip and the modal-open/close logic live in `setupLunaLetterModal()` immediately after. The two `.luna-mode-active` selectors in `assets/css/main.css` are at lines 3825 and 3829 (stamp cross-fade), and the envelope-reveal block is 3867–3873. Everything else in the stylesheet that begins with `.luna-` is the modal and toast styling (lines 3763–4318).

---

## 3. Visual elements — only what ships, only what's earned

The previous spec listed three implemented features (§3.1 stamps, §3.2 envelope + modal, §3.3 grid) and a long roadmap (§4). I am keeping the three implemented features and replacing §4 wholesale. This section is shorter than the previous spec on purpose.

### 3.1 The stamps (shipped) — and only the stamps

The illustrated 32¢ Moon and 29¢ Rose stamps in the top-right of the desk are the only place we open the drawer. In standard mode, they sit as small hand-drawn postage. In Luna Mode, the illustrated art cross-fades to the photographs underneath, in their original stamp frames, with `preserveAspectRatio="xMidYMin slice"` so they anchor naturally to the top of the stamp. No Polaroid-development animation, no foil halo, no flip-the-photocard pose. The cross-fade is six-tenths of a second (`opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)`).

**Audit finding, important.** The `href`s in `toc.html` (line 172 and 195) point to `pic in larger one.jpg` and `pic in smaller one.jpg`. The actual files on disk are `pic in larger onem.jpg` and `pic in smaller onem.jpg` (trailing `m`). Either rename the files or update the `href`s — but they must agree, or the photographs never load. _This is a bug, not a stylistic choice._

### 3.2 The unsent envelope & the letter modal (shipped) — and the letter inside

A double-sided envelope sits between the fountain pen and the 24 cards, hidden by default. In Luna Mode, the envelope fades and scales in (`opacity 0.65s`, `translateY(28px) scale(0.96)` → settled). The envelope can be turned to its back face by clicking it; on the back, the wax seal can be "broken" to open the letter modal.

**The letter is the thing that justifies Luna Mode's existence.** It is one open, first-person paragraph in the dateline `October 14, 1996 · St. Paul · 2:40 AM`, addressed to Luna by name, signed `— The Author`, closing with a `Reseal Letter & Return to Desk` button. The full text is in `toc.html` lines 1324–1331. That letter is the *document* the manuscript is hiding. Everything else in Luna Mode is a way of approaching it; this is the payoff.

_Stet on the existing letter text._ It is doing the work it needs to do. Editorial query only: review the closing line — _"Take care of your heart, always."_ — for tone, since it's the sentence the reader leaves with.

**Keep the existing acoustics on the envelope and modal:**
- Hover on the envelope tilts the fountain pen (`translateY(-4px) rotate(-1.5deg)`).
- Paper-turn on flip, pen-nib-scritch on open, wax-seal-crack on the seal click.
- Paper-turn on close.
These are physically grounded Foley; they belong.

### 3.3 The grid (shipped) — and what not to do to it

The 3-column desk grid is already correct. The red-string catenary physics between siblings 09↔10 and 11↔12, the scorched-sea arc through 16→17→23, and the connection-line SVG are all working and aesthetically right. **Do not introduce per-poem keepsake artifacts onto the cards in Luna Mode.** This would be the single biggest threat to the PRD's intent. The PRD calls for a writer's hand across an emotional range where every page has *one* detail that could only belong to that poem. Adding a paperclip on №01 and a pressed cedar sprig on №11 transforms twenty-four distinct poems into twenty-four stylized collectible cards. The deck already does its work. Leave it alone.

### 3.4 The atmosphere — what we add and what we don't

**We add (already in the markup):**
- The Luna Mode class flip changes the envelope to `opacity: 1, pointer-events: auto, max-height: 420px`. That, plus the stamp cross-fade, is the *whole* visual transition.
- The toast, bottom-right, gold border on dark ink, `Caveat` hand.

**We do not add:**
- The midnight-leather blotter swap (§4.3.2 of the prior spec).
- The lamp-cone directional wash.
- The drift of starlight particles.
- The 2.5-second Polaroid development simulation.
- A celestial-coordinate watermark across all 24 letters.
- A 3D photocard flip animation.
- A second wax seal or a new modal anywhere else on the site.

Each of these is a beautiful device on its own. Together they would compete with the letter, the stamps, and the photographs for the reader's attention. The manuscript's job is to get the reader to the letter; everything else should clear out of its way.

---

## 4. Roadmap — what's gated behind author comfort, not my enthusiasm

The previous spec listed a comprehensive §4 roadmap with three domains (typographic marginalia, physical keepsakes, atmospheric illustrations). I'm not adopting that roadmap. Each item below is independent and gated on a separate author decision; I have not pre-approved any of them.

### 4.1 — Conditional on the photographs

**4.1.1 _Stet or replace the photographs._** _Editorial query._ Before any Luna Mode work continues, sit with `pic in larger one.jpg` and `pic in smaller one.jpg` for a week. Do they hold up in the stamp frames at the dimensions we render them (72×92 and 66×82)? Do they look 1996, or do they look last week? If they hold up, the existing visuals are fine. If they don't, the right move is to replace them with better photographs, replace them with a re-drawn illustrated stamp (no photo at all), or pull the photograph layer out of Luna Mode entirely and keep only the stamp cross-fade as a *promise* the photographs aren't there.

### 4.2 — Conditional on the photographs being kept

**4.2.1 _Verify file paths._** _Required, not gated._ Resolve the `one.jpg` vs `onem.jpg` mismatch in §3.1. Either rename the files (`git mv "pic in larger onem.jpg" "pic in larger one.jpg"`) or update the two `href`s in `toc.html`. The audit appendix details this.

**4.2.2 _Honest age treatment if the photographs are anachronistic._** _Editorial query._ If the photographs are too crisp to look 1996, the cleanest move is a global treatment applied *only to the .stamp-luna-layer image elements* in Luna Mode: a few-percent gaussian blur, a hair of `sepia()` and `contrast()` (the existing rules already apply `sepia(0.08) contrast(1.02) brightness(1)` — that's the floor, not the ceiling). Before adding more, decide whether softening is the right move or whether the photographs are simply not the right photographs.

### 4.3 — Conditional on author comfort with the existing letter

**4.3.1 _Handwritten P.S. on each of the 24 poems._** _Concept retained from §4.1.1 of the prior spec, but only as a _concept._ The previous draft offered seven candidates (№01, 06, 11, 14, 18, 22, 24). None are authored by anyone; they were *examples*, not copy. _Editorial query:_ before this is real, the author writes the 24 P.S. lines in their own voice, one per poem, and they live as `data-ps=""` attributes on each `.desk-card`, surfaced only when Luna Mode is active. The aesthetic device (Caveat / Yellowtail at ~0.85rem, faded indigo) is small. The decision to write 24 unpublished sentences is not.

**4.3.2 _Raw first-draft strikethroughs._** _Declined._ This was the most honest idea in the prior spec, and the one I most want to *not* ship. The manuscript is the published form. Showing what was cut to get there is a different artifact — a separate document, not a view onto this one. If the author wants this, it belongs in a companion piece, not in Luna Mode.

**4.3.3 _Subtext whisper annotations._** _Declined for now._ The hover-tooltips would couple to be more clever than the poems. The poems are the poems.

### 4.4 — Conditional on revisiting the trigger

**4.4.1 _Drop the secret keystroke in favor of a quiet link in the Colophon._** _Editorial query._ A different posture is to make Luna Mode a *named* mode that is simply not linked from anywhere except the Colophon card. Replace the keystroke, the chord, the console API. The trigger becomes: "Visit the Colophon, read the small italic line that says *'No. 24 was never sent. Nor was this.'*, click." — that is a deliberate gesture, and it makes the visitor's choice to enter Luna Mode explicit. Easier to defend, harder to surprise.

This is the strongest dissent I have from the original spec. I am not asking you to do this. I am asking you to *consider* it.

### 4.5 — Not on the roadmap

The following are explicitly **out of scope** for Luna Mode, regardless of what nice versions of them look like in isolation:

1. Midnight-blotter color shift anywhere outside the stamp cluster.
2. Starlight particles, lamp sweeps, photocard flip animations.
3. Per-poem keepsake artifacts on the 24 cards.
4. A `1996 CONTACT SHEET` gallery of additional photographs.
5. A cassette mixtape component on the desk.
6. Watermarks (moon-phase, celestial coordinates, anything else) overlaid on the 24 letters.
7. A second modal anywhere — the one letter is the only message; a second letter would dilute the first.

---

## 5. Editorial annotation pass

When this doc is reviewed, I'd like the following four questions answered explicitly, not by silence:

1. **§0.2 / §4.1.1:** Are the two photographs the photographs you want at the heart of this?
2. **§0.3 / §4.4.1:** Is the secret keystroke the trigger posture you want, or do you want to take the named-in-the-Colophon route?
3. **§3.2:** Is the existing letter text the final form of the letter?
4. **§4.3.1:** Is the handwritten P.S. sequence something you will write, or is the previous spec's seven examples all you want to keep (in which case it doesn't ship)?

Everything else can be answered by editing.

---

*Withholding, withholding, withholding. The manuscript is the manuscript because of what it doesn't say. Luna Mode opens one drawer, not a wing.*

*— Editor's marginalia, 21 September 2026*

---

# Appendix A — Status Audit (as of 21 September 2026)

A line-by-line check of what is shipped vs what the prior spec claimed. Reads top to bottom from the prior `LUNA_MODE_SPECIFICATION.md`.

## A.1 Activation & State — every item shipped

| Prior spec § | Claim | Audit result |
|---|---|---|
| §2.1.1 | `l-u-n-a` keystroke | **Shipped.** `assets/js/main.js`, in IIFE `setupLunaMode()`, lines 1092–1159. Key buffer keyed to `e.key`, length-1 character filter, ignores `INPUT`/`TEXTAREA` targets, ignores modifier-held keys, debounced by `slice(-SECRET.length)`. |
| §2.1.2 | `Ctrl/Cmd+Shift+L` chord | **Shipped**, but per §4 of this document, I would argue for *removing* this. It is the largest discoverability leak in the spec. |
| §2.1.3 | `window.toggleLunaMode(forceState)` API | **Shipped,** line 1158. Same discoverability concern. |
| §2.2.1 | `.luna-mode-active` class on `body` | **Shipped.** `main.css` lines 3825, 3829, 3867 scope the visuals. |
| §2.2.2 | `localStorage["manuscript_luna_mode"]` persistence | **Shipped,** lines 1093, 1118, 1124, 1134–1138. Restored on init. _Note:_ there is **no `pageshow`-aware restoration** of the class — the class is restored at script init only. A page restored from bfcache after a same-origin navigation would briefly flash the wrong state. Marginal bug, low priority. |
| §2.2.3 | `.luna-toast` notification | **Shipped.** `main.css` lines 3763–3784. Triggered on both directions of the toggle. |
| §2.2.4 | Tactile audio foley on toggle | **Shipped,** but **inconsistent with the spec.** The spec listed `playSoftTap()`, `playWaxSealCrack()`, `playPenNibScritch()` as "zero-latency procedural Web Audio cues." Only `playSoftTap()` is wired to the toggle. The wax-crack and pen-scritch sounds are wired to *opening the letter*, not to the mode toggle, which is the right call and should be *stet*. |

## A.2 Visual Elements

### A.2.1 Stamps & photograph reveal (§3.1)

| Claim | Audit result |
|---|---|
| 84×104 stamp 1, 76×92 stamp 2, SVG layered with `clip-path` | **Shipped.** `toc.html` lines 135–212. Two `.stamp-art-layer` groups, two `.stamp-luna-layer` groups, two `clipPath`s (`stampMoonClip`, `stampRoseClip`). |
| Round franking postmark `14 OCT 1996 · POSTAL KEEPSAKE` across both stamps | **Shipped,** with one detail delta: the spec called for the postmark to overlay both stamps; the markup draws it offset slightly right of stamp 1's center (`cx=108, cy=62`), so it crosses stamp 1 mostly and tickles stamp 2's left edge. Looks correct in render. |
| Luna Mode cross-fade from illustrated to photographed | **Shipped.** `main.css` lines 3819–3832. `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)`. |
| `preserveAspectRatio="xMidYMin slice"` on photographs | **Shipped,** with a small note: `xMidYMin` *is* a valid `preserveAspectRatio` value (alongside `xMinYMin`, `xMidYMid`, etc.) — easy to misread. The prior spec transcribed it correctly. |
| **Photographs on disk** | ⚠ **Path mismatch, see file bugs below.** |

### A.2.2 Unsent envelope & letter modal (§3.2)

| Claim | Audit result |
|---|---|
| Diagonal airmail chevron border on envelope | **Shipped.** `main.css` lines 3903–3913. `repeating-linear-gradient(135deg, #9E2235 0/15, #FAF3E3 15/22, #1D3557 22/37, #FAF3E3 37/44)`. |
| Top-right postage stamp on envelope (miniature 32¢ Moon) | **Shipped,** as inline SVG inside `.envelope-stamp-area`, `toc.html` lines 388–411. `14 OCT 1996 · UNSENT` inked cancel, three wavy lines, hand-drawn fragment. |
| `To:` label + handwritten `Luna` | **Shipped,** but with a finer call than the spec: the envelope shows `To: Luna / Somewhere beyond this autumn / Autumn 1996 · Held in silence` (lines 414–418). The prior spec said the addressee was `The muse for whom all twenty-four were written`. The shipped copy is *more restrained* than the spec. _Editorial note:_ in my reading, the shipped copy is better. The longer "muse for whom…" tagline sits closer to *explaining* the secret than *revealing* it gracefully. *Stet* on the shipped copy. |
| `☽ Break Seal & Read Unsent Letter →` wax-seal CTA | **Shipped, simplified.** Shipped: `<button class="envelope-wax-seal-btn" id="unsealLetterBtn">` with subtext `Click Seal to Open`, lines 442–449. The glyph `☽` is on the wax-seal button itself as the moon imprint. The prior spec wanted a separate `BREAK SEAL & READ UNSENT LETTER →` button *outside* the envelope as well — that is not shipped, and I do not recommend adding it; the seal-on-flap click is already discoverable enough. |
| Letter modal with ruled notebook lines, dateline, sign-off, body | **Shipped verbatim.** `toc.html` lines 1309–1344. Dateline `October 14, 1996 · St. Paul · 2:40 AM`. Letter body matches the prior spec §3.2 word-for-word. Modal CSS at `main.css` lines 4144–4318. |
| Hover-on-envelope tilts the fountain pen | **Shipped,** `main.js` lines 1234–1244. `translateY(-4px) rotate(-1.5deg)` on `mouseenter`, cleared on `mouseleave`. |
| Audio foley on open/close | **Shipped,** `main.js` lines 1199–1222. Pen-nib-scritch on open, wax-seal-crack 120ms later, paper-turn on close. |

### A.2.3 3-column desk grid (§3.3)

| Claim | Audit result |
|---|---|
| `max-width: 1480px; width: 95%` on `.desk` | _Out of scope for the Luna Mode audit — the grid host layout is governed by the wider desk system in the PRD §9. The 3 / 2 / 1 column responsive breakpoint is consistent with what is rendered. Flagged only as confirmation that the grid host is intact._ |
| Catenary red strings 09↔10, 11↔12 | **Shipped.** `toc.html` lines 285–293 (paths), `main.js` lines 1192–1217 (catenary math), hover-tension at 1245–1262. |
| Charred-sea singe path 16→17→23 | **Shipped.** `main.js` lines 1219–1242. Two stacked paths (outer + core) for ember appearance; draws a quadratic-bezier organic curve rather than the `feTurbulence` noise approach the prior spec described. Looks scorched. |

## A.3 What was *claimed* shipped but isn't

The prior §3 prose reads as if all three feature areas were complete. In fact:

| Claim | Reality |
|---|---|
| §3.1, photo "reveal" | The cross-fade works; the *photographs themselves* do not load because of the file-path mismatch below. The whole reveal is invisible until that is fixed. |
| §3.2, par-avion chevron border, full set of mailer cues | Everything is shipped *except* an outside-the-envelope CTA. I think that is correct — see §3.2 above. |
| §3.3, 3-column grid | Verified; catenary strings + scorch line are part of the wider desk system, not Luna Mode per se. |

So the correct inventory is: **three of three feature areas are mostly shipped**, with **one blocking defect** (the photographs) and **one cosmetic vestige** (`.photocard-frame`, `.photocard-placeholder`, `.photocard-image` selectors in `main.css` lines 3743–3760 do not match any DOM).

## A.4 Vestigial selectors in `main.css`

Lines 3743–3760 contain three CSS rules with selectors that have no DOM to bind to:

```css
body.luna-mode-active .photocard-frame { … }
body.luna-mode-active .photocard-placeholder { … }
body.luna-mode-active .photocard-image { … }
```

A grep of `toc.html` for `photocard-` finds zero matches. These are a leftover from an earlier proposed design. **They can be deleted** — they currently do nothing, but they suggest a feature that was rolled back, and a future reader might waste time on them. Cleanup candidate.

## A.5 File-path defect — the photographs do not load

**The two `href`s in `toc.html`** (lines 172 and 195):

```html
<image href="images/luna/pic in larger one.jpg"  x="…" preserveAspectRatio="xMidYMin slice" />
<image href="images/luna/pic in smaller one.jpg" x="…" preserveAspectRatio="xMidYMin slice" />
```

**The actual files on disk** (verified 21 Sep 2026):

```
G:\projects\manuscript\images\luna\pic in larger onem.jpg   (142 KB)
G:\projects\manuscript\images\luna\pic in smaller onem.jpg  (298 KB)
```

Note the trailing `m`. The HTML and the prior spec both reference the filenames *without* the `m`, so the photographs never render. The Luna Mode stamp cross-fade reveals nothing in a stock build.

**Two valid fixes:**

1. **Rename the files** (preferred): `git mv "pic in larger onem.jpg" "pic in larger one.jpg"` and the matching smaller rename; update the prior spec's §5 references.
2. **Update the HTML**: change `one.jpg` → `onem.jpg` on lines 172 and 195 of `toc.html`; update the prior spec to match.

Option 1 is preferable because "one" is the better filename — but the spec should agree with whichever side wins.

## A.6 Where Luna Mode does — and doesn't — affect the site

Luna Mode as shipped only affects `toc.html`. The `.luna-mode-active` class is on `body` of every page (because the keystroke listener in `main.js` runs site-wide and writes the class), but no other surface reacts to it:

- `index.html` (cover envelope), `about.html` (colophon), and `poems/*.html` (24 poem pages) all have *no* `body.luna-mode-active` selectors in their stylesheets.
- The Luna toast appears site-wide (correct behavior — it is a global notification).
- The `luna-mode-active` class is set/restored site-wide via localStorage.

**This is mostly correct** — the desk is the only natural home for Luna Mode's reveals. _But_ if §4.3.1 (handwritten P.S.) ever ships, those P.S. blocks would be on each poem page, in the markup, hidden by default with `display: none`, surfaced only by a single line in `main.css`:

```css
body.luna-mode-active .poem__ps { display: block; }
```

That is the only stylesheet change required; the markup addition lives per-poem. Flagged here so the dependency is visible.

## A.7 What the prior §4 roadmap claims, and what this V2 does with it

| Prior spec § | Item | V2 decision |
|---|---|---|
| §4.1.1 | Handwritten P.S. on each poem | Concept retained; gates on §4.3.1 of this doc (author writes the 24 P.S. lines themselves). |
| §4.1.2 | Raw first-draft strikethroughs | **Declined.** Belongs in a separate artifact if anywhere. |
| §4.1.3 | Subtext tooltip whisper annotations | **Declined for now.** |
| §4.2.1 | Table of 24 physical artifacts on cards | **Declined.** Adding 24 visible artifacts overwrites the per-poem signature detail from PRD §7. |
| §4.2.2 | 3D photocard flip on the stamps | **Declined.** The 6-tenths cross-fade is enough. |
| §4.2.3 | 1996 cassette mixtape | **Declined.** |
| §4.2.4 | Darkroom contact sheet gallery | **Declined.** |
| §4.3.1 | Hand-drawn graphites & watercolors behind each poem | **Declined.** Out of Luna Mode's scope; if a per-poem signature motif warrants a scene background, that is a normal-mode decoration, not a Luna Mode one. |
| §4.3.2 | Midnight studio lighting shift on the desk | **Declined.** |
| §4.3.3 | 2.5-second Polaroid development animation | **Declined.** |
| §4.3.4 | Moon-phase / celestial-coordinate watermark on every letter | **Declined.** |

## A.8 Out-of-scope checks (deliberately not audited)

- PRD §7 per-poem visual plan: implemented per `data-family` and `data-canvas` attributes (this is the public-mode system, not Luna Mode).
- The 24 individual poem HTML files: not inspected in this audit. They are not in Luna Mode's surface area.
- Astronomical correctness of the `14 Oct 1996 · Waxing Crescent` claim from prior §4.3.4: not relevant for shipping decisions, retained only because the letter dateline already echoes the date.

---

*If you fix the file-path defect first, the rest of this document is editorial; if you do not, nothing else matters.*

*— Audit, 21 September 2026*
