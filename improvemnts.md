# MANUSCRIPT: THE MASTER IMPROVEMENT & ART DIRECTION PLAN
## A Comprehensive Architectural, Typographic, and Visual Specification for a 90s Vintage Keepsake Poetry Collection

> **Document Context:** Definitive visual, structural, and interactive blueprint for the 24-poem collection *Manuscript* by `tai_khan`.  
> **Source Material:** 24 poems exported from Wattpad (*"a whisper exceeding the shadows"*), Table of Contents ("The Desk"), Cover Envelope, and Colophon ("About").  
> **Design Thesis:** To transform the collection into a world-class analog keepsake—the experience of discovering a forgotten box of letters, cards, and personal artifacts from the 1990s on an aged cedar writing desk. Every poem is visually unique, hand-crafted from the text itself, while bound together by an uncompromising material design system, authentic SVG hand-drawn linework, organic HTML5 canvas procedural atmospheres, and tactile typography.

---

## TABLE OF CONTENTS

1. [Master Philosophy & The 90s Keepsake Aesthetic](#1-master-philosophy--the-90s-keepsake-aesthetic)
2. [Visual Inspiration Analysis (The `images/` Archive)](#2-visual-inspiration-analysis-the-images-archive)
3. [Global Architectural & Procedural Rendering Engine](#3-global-architectural--procedural-rendering-engine)
   - 3.1 Hand-Drawn Kinematics & Organic Nib Physics
   - 3.2 Master SVG Filter Matrix (`#ink-bleed`, `#deckled-edge`, `#paper-tooth`)
   - 3.3 The 15 Procedural Canvas Atmospheric Engines
   - 3.4 Procedural Web Audio Acoustics & Tactility
4. [Master Typographic & Color System (60-30-10)](#4-master-typographic--color-system-60-30-10)
5. [The Gateways: Cover & Table of Contents](#5-the-gateways-cover--table-of-contents)
   - 5.1 The 3D Origami Folded Envelope Cover
   - 5.2 The Antique Writing Desk & Verlet-Physics Red String TOC
6. [Granular Per-Poem Mega-Plans (Chapters 01 – 24)](#6-granular-per-poem-mega-plans-chapters-01--24)
   - [№ 01 · Manuscript (Cosmic Devotion Inversion)](#poem-01-manuscript)
   - [№ 02 · Divine Letter (The Framed Celestial Letter)](#poem-02-divine-letter)
   - [№ 03 · From River to Winter (Icy Current & Viper Coil)](#poem-03-from-river-to-winter)
   - [№ 04 · Hollow Shell (Coffee Ring & Cracked Glass)](#poem-04-hollow-shell)
   - [№ 05 · Guiding Light (The Minimal Coastal Beacon)](#poem-05-guiding-light)
   - [№ 06 · Dissection (Surgical Precision & Straight Razor Cut)](#poem-06-dissection)
   - [№ 07 · Memoirs (The Die-Cut Scrapbook Keepsake)](#poem-07-memoirs)
   - [№ 08 · Starlight (Glowing Script & Cascading Constellations)](#poem-08-starlight)
   - [№ 09 · Lost Answer: Ghost of Warmth (Twilight Shoreline & Wine Ring)](#poem-09-lost-answer-ghost-of-warmth)
   - [№ 10 · Lost Answer: Truth Known (The Dried Ash Aftermath)](#poem-10-lost-answer-truth-known)
   - [№ 11 · Every Winter (Paper-Cutout Mountain & Morning Frost)](#poem-11-every-winter)
   - [№ 12 · Every Winter: Free Fall (Nocturnal Blizzard & Falling Diamonds)](#poem-12-every-winter-free-fall)
   - [№ 13 · Painted Sky (Sunset Watercolor Bleed & Celestial Arc)](#poem-13-painted-sky)
   - [№ 14 · Home (Footprints Leaving & Rain on Glass)](#poem-14-home)
   - [№ 15 · Landscape (16:9 Letterboxed Panoramic Card)](#poem-15-landscape)
   - [№ 16 · Within the World I Define (Nested Sanctuary Card & Candle)](#poem-16-within-the-world-i-define)
   - [№ 17 · Controlled Ruin (Two-Hand Dialogue & Scorched Fissures)](#poem-17-controlled-ruin)
   - [№ 18 · Out of Frame (Sun-Bleached Silhouette & Photo Mounts)](#poem-18-out-of-frame)
   - [№ 19 · Silence, in layers (3-Tier Translucent Vellum Stack)](#poem-19-silence-in-layers)
   - [№ 20 · Things I Learn to Bury (Ruled Ledger Notebook Page)](#poem-20-things-i-learn-to-bury)
   - [№ 21 · Rage in cage (Taut Red String Wire Cage)](#poem-21-rage-in-cage)
   - [№ 22 · Between Midnight & Sleep (Stopped Clock & Phosphor Phone Glow)](#poem-22-between-midnight--sleep)
   - [№ 23 · The Blue Inside Ruin (Full-Height 9-Stage Blue Gradient)](#poem-23-the-blue-inside-ruin)
   - [№ 24 · End (Miniature Folded Pocket Note & Door Ajar)](#poem-24-end)
7. [The Colophon (About Page)](#7-the-colophon-about-page)
8. [Cross-Cutting Through-Lines Verification Matrix](#8-cross-cutting-through-lines-verification-matrix)
9. [Accessibility, Contrast & Performance Standards](#9-accessibility-contrast--performance-standards)
10. [Mobile Ergonomics & Gesture Kinematics Architecture](#10-mobile-ergonomics--gesture-kinematics-architecture)
    - 10.1 The Keepsake Dock (Mobile Thumb Zones)
    - 10.2 Real-Time 3D Page-Turn Peel Kinematics (RK4 Spring Model)
    - 10.3 Natural Sheet Gestures (Pinch-to-Fold & Pull-to-Desk)
    - 10.4 Spatial Memory & Desk State Machine (Dog-Ears, Wax Seals & Ribbons)
    - 10.5 In-Poem Reading Experience (Candlelight Focus Mode, Marginalia Reveal & Loupe)
11. [Micro-Typography, OpenType & Poetic Metre Master Rules](#11-micro-typography-opentype--poetic-metre-master-rules)
    - 11.1 Master OpenType Feature Suite & Sub-Pixel Kerning Pairs
    - 11.2 Optical Margin Alignment (Hanging Punctuation)
    - 11.3 Metre-Based Modular Vertical Rhythm Scale
    - 11.4 Widow, Orphan & Poetic Line-Break Algorithm
    - 11.5 Authorial Revision Typography (Graphite Scribbles & Ink Strikes)
12. [Print-Grade Editorial Design & Keepsake Postcard Engine](#12-print-grade-editorial-design--keepsake-postcard-engine)
    - 12.1 4×6″ Archival Postcard `@media print` Stylesheet
    - 12.2 Philatelic Cancellation Stamp & Airmail Chevron Border
    - 12.3 Registration Targets & Crop Bleed Specs
13. [Advanced GLSL Shaders & Material Physics Engines](#13-advanced-glsl-shaders--material-physics-engines)
    - 13.1 `paper_surface.frag`: Oren-Nayar Rough Diffuse & Anisotropic Fibers
    - 13.2 `wet_ink_simulation.frag`: Cook-Torrance Microfacet Meniscus & Evaporation
    - 13.3 `wax_seal_medallion.frag`: Subsurface Scattering & Gyroscope Specular Tilt
    - 13.4 `paper_aging_engine.frag`: Procedural Foxing, Suntan Rims & UV Decay
    - 13.5 Dynamic Mechanical Simulations (`FrostThawEngine`, `PaperCardPhysics`, `CandleWaxEngine`, `EraSliderController`)
14. [Sensory Synesthesia: Spatial Web Audio & Multi-Stage Haptics](#14-sensory-synesthesia-spatial-web-audio--multi-stage-haptics)
    - 14.1 Procedural Spatial Desk Acoustics (Stereo Pan & Air Absorption)
    - 14.2 The 5 Generative Stanza Synthesizers (Zero MP3 Assets)
    - 14.3 The Interactive Brass Quill & Inkstand Controller
    - 14.4 Multi-Stage Tactile Haptic Vibration Profiles (`navigator.vibrate`)
15. [Hardware E-Ink, Reading Sanctuary & Cognitive Accessibility Modes](#15-hardware-e-ink-reading-sanctuary--cognitive-accessibility-modes)
    - 15.1 Hardware E-Ink & Low-Power Halftone Mode (`@media (update: slow)`)
    - 15.2 Reading Sanctuary Mode (The Pure Solitary Vigil)
    - 15.3 Cognitive & Vision Adaptations (Atkinson Hyperlegible & Bionic Guided Fixation)
    - 15.4 Three-Tier Motion Sensitivity Profiles (Levels 0, 1, 2)

---

## 1. MASTER PHILOSOPHY & THE 90s KEEPSAKE AESTHETIC

The current implementation of *Manuscript* relies on flat CSS backgrounds, geometric vector SVGs placed into a fixed bottom shelf (`.poem__scene`), and identical card templates. This reads as a standard web application skin rather than a cherished physical artifact.

### Core Aesthetic Pillars:
1. **The Physical Keepsake Object:** The reader is not visiting a website; they are opening a bundle of letters found inside a cedar desk drawer. Every page possesses material weight, paper thickness, texture, and marks of physical history: dried ink pooling, coffee-cup ring stains, razor incisions, wax seal stamps, folded creases, and sunlight fading.
2. **Hand-Drawn Imperfection over Geometric Rigidity:** Nature and human hands do not draw mathematically perfect circles or vector bezier curves. Every stroke in the illustrations, dividers, and motifs must carry micro-perturbations, variable ink flow, pen angle dynamics, and paper tooth friction.
3. **The 60-30-10 Design Discipline:** Visual balance is governed strictly by the 60-30-10 rule across 8 emotional mood families. Dominant base fields (60%) anchor the atmosphere; secondary structural materials (30%) define the reading surface; and delicate, intentional focal marks (10%) carry the emotional weight of specific lines.
4. **Emotional Architecture over Decorative SaaS Grids:** Standard cards, symmetrical margins, and uniform layouts are banned. Sibling poems communicate via physical cords; wide horizons demand letterboxed panoramic sheets; internal dialogue splits into two distinct handwritten scripts; and private self-containment requires a physical card nested inside another.

---

## 2. VISUAL INSPIRATION ANALYSIS (THE `images/` ARCHIVE)

A thorough examination of the workspace inspiration assets reveals the precise artistic soul intended by the author:

| Inspiration Asset | Dominant Aesthetic & Key Elements | Translation into Master Plan |
|---|---|---|
| `images/cover.jpg` | Deep crimson watercolor wash, boxed title with diamond corners, hand-drawn Saturn with dry-brush ring hatching, radiant 4-point diamond sparkles, author name "TAHFIM KHAN". | Informs the **Cover Experience** and **Poem 01 (*Manuscript*)**: deep crimson night field, astronomical celestial charts, Saturn linework with organic pencil hatching, and illuminated gold drop caps. |
| `images/Divine letter.png` | Warm golden-cream paper, title *"Divine letter"* in fluid crimson brush calligraphy breaking out of a delicate wireframe box, large tilted Saturn in salmon linework, top-right spiral galaxy watermark. | Informs **Poem 02 (*Divine Letter*)**: abandons the current dark red screen; uses warm parchment stationery with salmon/coral celestial linework watermark floating directly behind stanzas. |
| `images/Divine letter (1).png` | Soft dusty blush-rose background, embossed die-cut paper sticker of a cupcake with cream frosting and crimson border, script title *"Memoirs"*, clean modern text with underlined keywords *memoirs* and *landscape*. | Informs **Poem 07 (*Memoirs*)**: scraps the cartoon restaurant vector; transforms the page into a 90s scrapbook memo sheet with an embossed sticker badge, washi tape mounts, and authentic pen underlinings. |
| `images/Divine letter (2).png` | Deep velvet espresso/black background, glowing golden neon script title *"Starlight"*, cascading diagonal shower of 4-point stars sweeping across the page, gentle rounded humanist lettering. | Informs **Poem 08 (*Starlight*)**: shifts the generic blue into deep velvet black, adds golden title glow, diagonal star cascade, and twin braided silk threads. |
| `images/guiding light.png` | Pale warm eggshell sky, red-and-white banded lighthouse on clean sand spit, rippling zigzag cast shadow spilling into dark slate sea, high-contrast swashed serif title. | Informs **Poem 05 (*Guiding Light*)**: scraps the cartoon 2.5D cottage; implements the minimalist horizon with sweeping beacon spotlight and rippling shadow. |
| `images/every winter final.png` | Frosted celadon sky fading into snow, tracked serif title *"EVERY WINTER"*, paper-cutout mountain cluster with scalloped snowcaps, notched triangular pine trees, pill clouds. | Informs **Poem 11 (*Every Winter · Day*)**: replaces the suburban house with the authentic paper-cutout mountain peak cluster and pine silhouettes. |
| `images/free fall final.png` | Moonlit slate-blue sky, overlapping curved snowdrift ridges, notched teal/slate pine trees, tracked header *"EVERY WINTER: FREE FALL"*. | Informs **Poem 12 (*Every Winter: Free Fall · Night*)**: companions Poem 11 with nocturnal paper-cutout snow ridges and a vertical cascade of diamond teardrops. |
| `images/loat ans.png` & `lost ans 2 truth.png` | Pale lavender-blue winter shoreline, horizontal bands of blush sand and slate water, lone figure walking in a long coat with cast shadow, uncial-antique lettering. | Informs **Poems 09 & 10 (*Lost Answer* Pair)**: removes the floating cartoon wine glass from the sky; implements the serene shoreline with physical wine ring stains on the letter card. |
| `images/backgrounds images/butterfly-flower...` | Continuous single-line ink contour stroke of butterfly and bloom with offset organic pastel Morandi/Matisse watercolor wash blobs. | Informs the **Hand-Drawn Single-Line Art Engine**: used for stanza dividers, floral watermarks, and marginalia linework across the collection. |
| `images/backgrounds images/winter-landscape-house...` | Solitary snow-covered cabin on snowbank, mirror water reflection, misty pine forest slope silhouette, drifting snow dots. | Informs **Poem 14 (*Home*)** and **Poem 03 (*From River to Winter*)**: reflective water horizons and distant cabin window glows. |

---

## 3. GLOBAL ARCHITECTURAL & PROCEDURAL RENDERING ENGINE

To eliminate sterile vector lines and robotic CSS animations, the site deploys a specialized rendering pipeline combining mathematics, SVG filter physics, HTML5 Canvas, and procedural Web Audio.

### 3.1 Hand-Drawn Kinematics & Organic Nib Physics
Human handwriting and dip-pen drawing exhibit continuous variance due to neuromuscular micro-tremors, pen speed, and paper friction.
1. **Fractional Brownian Motion (fBm) Stroke Jitter:** Every path $C(t) = (x(t), y(t))$ is discretized into 3px micro-segments. At each vertex, the normal vector $\mathbf{N}$ is perturbed by 3 octaves of Simplex noise:
   $$\mathbf{C}^*(t_i) = \mathbf{C}(t_i) + \mathbf{N}_i \cdot \sum_{k=1}^{3} A_0 \gamma^{-k} \mathcal{N}(f_0 \cdot 2^k \cdot s_i)$$
   where $A_0 = 1.2\text{px}$ and $f_0 = 0.08\text{px}^{-1}$. This produces the authentic microscopic tooth of a steel nib catching on fibrous paper.
2. **Kinematic Velocity-Pressure Transfer:** Fountain pen nibs widen under pressure and narrow when drawn rapidly:
   $$W(v, \theta) = W_0 \cdot (1 + 1.8 \cdot |\sin(\theta - \pi/4)|) \cdot e^{-0.04 v}$$
   Downstrokes pulled toward the writer deposit rich, wide ink tracks; rapid cross-strokes taper to hairlines.
3. **Capillary Bleed Diffusion:** Ink bleeding into porous cotton rag paper is modeled as a 2D reaction-diffusion front, producing dendritic feathering spikes at paper rough spots.

---

### 3.2 Master SVG Filter Matrix
Injected into the root layout DOM once, these global filters transform standard SVG shapes into authentic analog materials:

```html
<svg class="svg-filters" style="position: absolute; width: 0; height: 0; overflow: hidden;" aria-hidden="true">
  <defs>
    <!-- 1. Authentic Ink Bleed & Capillary Feathering -->
    <filter id="ink-bleed" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.09 0.12" numOctaves="4" seed="74" result="fiber" />
      <feDisplacementMap in="SourceGraphic" in2="fiber" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="feathered" />
      <feGaussianBlur in="feathered" stdDeviation="0.45" result="absorbed" />
      <feComponentTransfer in="absorbed" result="density">
        <feFuncA type="linear" slope="1.4" intercept="-0.08" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="density" />
        <feMergeNode in="SourceGraphic" opacity="0.65" />
      </feMerge>
    </filter>

    <!-- 2. Deckled & Torn Paper Edge Filter -->
    <filter id="deckled-edge" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="turbulence" baseFrequency="0.018 0.035" numOctaves="5" seed="19" result="tear" />
      <feTurbulence type="fractalNoise" baseFrequency="0.15 0.25" numOctaves="3" seed="42" result="fringe" />
      <feComposite in="tear" in2="fringe" operator="arithmetic" k1="0.6" k2="0.6" k3="0" k4="0" result="combinedTear" />
      <feDisplacementMap in="SourceGraphic" in2="combinedTear" scale="8.5" xChannelSelector="R" yChannelSelector="B" result="tornCard" />
      <feGaussianBlur in="tornCard" stdDeviation="1.5" result="tearBlur" />
      <feColorMatrix in="tearBlur" type="matrix" values="0 0 0 0 0.15  0 0 0 0 0.11  0 0 0 0 0.08  0 0 0 0.4 0" result="tornShadow" />
      <feOffset in="tornShadow" dx="0" dy="2" result="offsetShadow" />
      <feMerge>
        <feMergeNode in="offsetShadow" />
        <feMergeNode in="tornCard" />
      </feMerge>
    </filter>

    <!-- 3. Fibrous Paper Tooth (Vellum Grain) -->
    <filter id="paper-tooth" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.75 0.75" numOctaves="4" stitchTiles="stitch" result="tooth" />
      <feColorMatrix in="tooth" type="matrix" values="0 0 0 0 0.22  0 0 0 0 0.16  0 0 0 0 0.11  0 0 0 0.04 0" result="tintedTooth" />
    </filter>
  </defs>
</svg>
```

---

### 3.3 The 15 Procedural Canvas Atmospheric Engines
Canvas overlays run at native DPR (`Math.min(window.devicePixelRatio, 2)`), decoupled using delta-time, paused when offscreen via `IntersectionObserver`, and rendered as a single static ink frame under `prefers-reduced-motion: reduce`.

1. **`rain` (Home, From River to Winter):** 3-layer parallax raindrops with motion blur, plus condensation glass droplets that accumulate and meander down the viewport.
2. **`snow` (Every Winter):** 6-fold radial dendritic Koch fractals drifting on curl-noise drafts, accumulating onto ground mounds.
3. **`diamond-fall` (Every Winter: Free Fall):** Slanted vertical fall of diamond-sparkle drops with cross-shaped specular glints.
4. **`embers` (Painted Sky, Controlled Ruin):** Irregular polygonal soot flakes cooling along thermodynamic curves ($T > 1400\text{K}$ white to dark cinder), trailing curl-noise smoke.
5. **`smoke` (Hollow Shell):** Multi-scale Navier-Stokes curl-noise wisps curling from coffee cups and dying embers.
6. **`stars` (Manuscript, Starlight):** Astronomical magnitude distribution (Harvard spectral classes O to M) with independent chromatic scintillation and ionized magnesium shooting stars.
7. **`shimmer` (Landscape):** Multi-wave Gerstner water superposition with solar glitter caustics flashing at specular angles.
8. **`candle` (Within the World I Define):** Dual-core teardrop flame modulated by draft noise, casting dynamic radiative glow onto the card.
9. **`fog` (Silence in layers):** 4 multiscale horizontal strata with Gaussian splat blending and subtle parallax drift.
10. **`aurora` (Liminal):** Ray-marched vertical light curtains oscillating along simulated geomagnetic field lines.
11. **`fireflies` (Guiding Light):** Craig Reynolds 3D boid flocking with luciferase enzymatic flash-decay cycles.
12. **`shore-drift` (Lost Answer: Ghost of Warmth):** Ground-hugging pastel sea-mist rolling across the tidal flat.
13. **`ash-drift` (Lost Answer: Truth Known):** Micro-ash particles curling upward from the dry wine ring.
14. **`calcified-ash` (Rage in cage):** Ash flakes whose horizontal velocity dampens as they near the taut red string cage bars, clinging to them.
15. **`clock-pulse` (Between Midnight & Sleep):** Volumetric breathing cyan backlight from a smartphone combined with deadbeat clock escapement recoil ticks.

---

### 3.4 Procedural Web Audio Acoustics & Tactility
Zero MP3 audio files. All soundscapes are procedurally synthesized in real time via the **Web Audio API** in under 3KB of code, opt-in by default:
- **Soft Paper Rustle:** Filtered white noise passed through a bandpass filter (`850Hz, Q=1.8`) with an exponential envelope on page turn (`350ms`).
- **Fountain Pen Scritch-Scratch:** Granular high-frequency sawtooth bursts (`2400Hz–3200Hz`) passed through a highpass filter (`1800Hz`) on heading reveal and interactive links (`90ms`).
- **Wax Seal Snap:** Low-frequency triangular thump (`140Hz -> 35Hz`) combined with crisp white-noise click on cover seal break (`90ms`).
- **Haptic Cues (`navigator.vibrate`):** `[12, 40, 25]ms` dual snap on seal break; `8ms` micro-tap on card touch.

---

## 4. MASTER TYPOGRAPHIC & COLOR SYSTEM (60-30-10)

### 4.1 The 60-30-10 Palette Architecture Across the 8 Mood Families

| Family | Theme Name | 60% Dominant Base Field | 30% Structural Material | 10% Focal Accents | Allocation Rule |
|---|---|---|---|---|---|
| **A** | **Cosmic devotion** *(Sole Inversion)* | Deep Night Sky `#1B1A2E` | Aged Vellum Card `#F4ECD8` | Celestial Gold `#C9A24B` | Inverted ratio: 60% viewport night, 30% floating letter sheet, 10% gold leaf drop cap and seal. |
| **B** | **Winter ash** | Frost Cream `#EDEAE2` | Slate Pine `#46545C` | Dried Rose `#A3495A` | 60% frosty room atmosphere, 30% slate mountain/tree cutouts, 10% dried rose/celadon accents. |
| **C** | **Ember & ash** | Charred Carbon `#201B18` | Ash Vellum `#E7DCC9` | Molten Ember `#B4432A` | 60% scorched room field, 30% ash-stained letter, 10% glowing ember sparks and singed edges. |
| **D** | **Dawn letter** | Kept Paper `#F1E8D8` | Terracotta Coral `#D98B6B` | Iron-Gall Ink `#3C2A1E` | 60% warm morning desk letter, 30% coral dawn horizon and dividers, 10% crisp dark brown text. |
| **E** | **Wine & memory** | Warm Vellum `#F1E8D8` | Port Burgundy `#5C2A2E` | Candle Gold `#C9A24B` | 60% antique card, 30% burgundy headings and wine ring stains, 10% gold constellation flecks. |
| **F** | **Contained** | Grey-Cream `#DCD6CB` | Cast Iron `#4A4740` | Hairline Crimson `#8B2E2E` | 60% unadorned notebook page, 30% rigid ruled ledger lines, 10% solitary taut red wire/crack. |
| **G** | **Ghost / liminal** | Mist Lavender `#E5E1E4` | Faded Sepia `#6A6470` | Phosphor Cyan `#A9B4C2` | 60% lavender room field, 30% stacked translucent vellum offset layers, 10% cold phone-screen glow. |
| **H** | **Resolution** | Virgin Parchment `#F1E8D8` | Deep Carbon `#2A1F18` | Golden Dawn Light `#FFE680` | 60% expansive empty paper field, 30% solitary verse, 10% tiny line-drawn open doorway. |

---

### 4.2 Master Typographic Scale & Exact Fluid Clamps
Four historical registers combine to create a layered manuscript voice:
1. **Fraunces (Variable):** Display titles, illuminated drop caps, major pull quotes.
2. **EB Garamond & Cormorant Garamond:** Body stanzas, quiet reflections, classic book cadences.
3. **Caveat & Yellowtail:** Expressive marginalia, dialogue hands, intimate signatures, cursive brush script.
4. **Courier Prime:** Chapter numbers, typewriter registration marks, ledger headers, postal stamps.

```css
:root {
  /* Fluid Typographic Clamps */
  --type-display: clamp(2.4rem, 1.8rem + 2.8vw, 4.8rem);
  --type-title: clamp(1.85rem, 1.4rem + 1.9vw, 3.2rem);
  --type-sub: clamp(1.05rem, 0.95rem + 0.45vw, 1.45rem);
  --type-body: clamp(1.05rem, 0.96rem + 0.32vw, 1.25rem);
  --type-body-small: clamp(0.92rem, 0.88rem + 0.2vw, 1.05rem);
  --type-marginalia: clamp(1.15rem, 1.05rem + 0.55vw, 1.55rem);
  --type-meta: clamp(0.65rem, 0.62rem + 0.15vw, 0.78rem);

  /* Leading & Measure */
  --leading-tight: 1.05;
  --leading-title: 1.2;
  --leading-body: 1.88;
  --leading-marginalia: 1.4;
  --measure-poem: 54ch;
}
```

---

## 5. THE GATEWAYS: COVER & TABLE OF CONTENTS

### 5.1 The 3D Origami Folded Envelope Cover (`index.html`)
The entry to the collection abandons standard web buttons. The reader encounters a **sealed physical parchment envelope** resting on a dark cedar desk.
- **Physical Geometry:** Built with CSS 3D transforms (`perspective: 1400px; transform-style: preserve-3d`). Four distinct triangular folding flaps with ambient contact shadows and linen paper tooth.
- **The Twine Wrap:** Procedural SVG dual-strand hemp cord wrapped in a cross-knot around the letter.
- **The Wax Seal:** Deep crimson embossed medallion (`#7A121D`, `48px` diameter) stamped with Saturn and Flower crest, highlighted with multi-stop radial lighting and organic wax splatter droplets.
- **The 4-Stage Unfolding Choreography (680ms):**
  1. *0–120ms:* Seal click triggers audio fracture snap; seal splits along organic fissure.
  2. *100–280ms:* Twine loops slacken and glide offscreen with spring physics.
  3. *240–480ms:* Top flap swings open (`transform: rotateX(-180deg)`), casting dynamic shadow.
  4. *400–680ms:* Inner manuscript card slides out from pocket, unfolds from tri-fold crease, and scales up into Table of Contents.

---

### 5.2 The Antique Writing Desk & Verlet-Physics Red String TOC (`toc.html`)
- **Desk Materiality:** Dark aged walnut desktop (`#1F1610`) fitted with an embossed deep hunter-green leather blotter pad with gold leaf filigree corner borders.
- **The 24 Loose Letter Cards:** The 24 poems sit as physical loose cards with deterministic organic rotational scatter derived from poem index:
  $$\theta_i = \left(\sin(i \cdot 12.98) \times 4.2\right)^{\circ}, \quad \Delta x_i = \cos(i \cdot 7.14) \times 6\text{px}, \quad \Delta y_i = \sin(i \cdot 4.31) \times 8\text{px}$$
  Hovering lifts the card (`translateY(-8px) rotate(0deg) scale(1.03)`).
- **Interactive Verlet-Physics Red String (Sibling Pairs):**
  - Connects Poem 09 ↔ 10 (*Lost Answer*) and Poem 11 ↔ 12 (*Every Winter*).
  - 24-point particle chain solving distance constraints with gravity and damping.
  - Resting in catenary sags on the desk; hovering or dragging one card pulls the thread taut, vibrating with transverse harmonics ($45\text{Hz}$) and tugging the sibling card!
- **The Singed Scorch Trail (Charred Sea Trilogy):**
  - A scorched trail burnt directly into the leather desk surface connecting Poem 16 (*Within the World I Define*), Poem 17 (*Controlled Ruin*), and Poem 23 (*The Blue Inside Ruin*), pulsing with faint ember sparks.

---

## 6. GRANULAR PER-POEM MEGA-PLANS (CHAPTERS 01 – 24)

---

### Poem 01: Manuscript
*“an oath of destruction and creation”*
- **File:** `poems/manuscript.html` | **Family:** `A` (Cosmic Devotion · Inverted)
- **Thematic Grounding:** *“For you, I will destroy the universe / also for you, I can restore it / burn every flower / make it bloom again.”* Direct alignment with `images/cover.jpg`.
- **60-30-10 Color Tokens:**
  - 60% Deep Midnight Sky: `#121124` to `#1E1B38`
  - 30% Aged Parchment Sheet: `#F5ECD7`
  - 10% Celestial Gold Leaf & Crimson: `#C9A24B` / `#D04848`
- **Card & Structural Anatomy:**
  - Portrait letter format (`width: min(580px, 92vw)`), angled at `-0.5deg`.
  - Gold-leaf foil edging on top-right torn corner (`box-shadow: inset 1px 1px 0px rgba(201,162,75,0.4)`).
  - Heavy linen-fiber paper tooth with directional grain.
- **Micro-Details & Keepsake Artifacts:**
  - **Illuminated Renaissance Drop Cap:** Medieval drop cap **“F”** (*“For you”*), height `3.6em`, with hand-drawn botanical briars and gold celestial sparkles intertwined through the stem.
  - **Signet Wax Seal:** Circular deep crimson wax seal (`#5A0A12`) stamped beside signature with embossed Saturn-and-Flower gold foil crest.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, wght 400, WONK 1, SOFT 45`), `clamp(2.5rem, 5.5vw, 3.6rem)`, line-height `1.02`, color `#1B1A2E`.
  - Subtitle: `Caveat` (`wght 500`), `clamp(1.1rem, 2vw, 1.3rem)`, color `#7A6038`.
  - Stanza 1 (Overture): `DM Serif Display` italic, `clamp(1.35rem, 2.2vw, 1.65rem)`, line-height `1.65`, color `#2A1F18`.
  - Stanzas 2–6: `EB Garamond`, `clamp(1.05rem, 1.6vw, 1.18rem)`, line-height `1.85`, color `#382A20`.
  - Final Pull Verse: `DM Serif Display` italic, `1.45rem`, centered between gold hairline rules.
  - Signature: `Caveat`, `1.45rem`, color `#8A6820`, rotated `-2deg`.
- **Artwork & SVG Spec:**
  - Astronomical coordinate grid with hand-drawn dashed lines (`rgba(201,162,75,0.18)`).
  - **The Metamorphosis Line:** Continuous quill line connecting star coordinates that spirals across the background, resolving at the margin into the single-line contour of an open wild rose (`stroke: #C9A24B`, `stroke-width: 1.1px`).
  - Saturn sphere with dry-brush ring hatching inclined at 24°.
- **Canvas FX & Motion:**
  - `data-canvas="stars"`. Golden stardust particles attracted gently to the cursor; SVG constellation line draws itself on entrance (`1400ms stroke-dashoffset`).

---

### Poem 02: Divine Letter
*“litany, in your name”*
- **File:** `poems/divine-letter.html` | **Family:** `A-script`
- **Thematic Grounding:** *“You are the universe in ecstatic motion, / a manuscript of a divine letter.”* Direct 1:1 match to `images/Divine letter.png`.
- **60-30-10 Color Tokens:**
  - 60% Warm Cream Stationery: `#FFF3DD`
  - 30% Deep Walnut Ink: `#2E221B`
  - 10% Crimson Brush Ink & Salmon Saturn: `#D81E34` / `#F09686`
- **Card & Structural Anatomy:**
  - Replaces current dark red screen with warm cream stationary (`width: min(560px, 90vw)`).
  - Authentic envelope tri-fold creases at 33% and 66% height.
  - Sepia postal cancellation stamp at top right.
- **Micro-Details & Keepsake Artifacts:**
  - **The Framed Title Box:** Pen-drawn wireframe rectangle (`stroke: #4A3A2A`, `0.85px`). The crimson brush script of *“Divine Letter”* breaks energetically out of the box boundaries, surrounded by micro-crosses and star specks.
  - **Watermark Celestial Art:** Large line-art Saturn and spiral galaxy in soft salmon (`#F09686`, `opacity: 0.22`, `mix-blend-mode: multiply`) floating behind stanzas 3–5.
- **Exact Typography:**
  - Title: `Yellowtail` / cursive brush script, `clamp(3.2rem, 7vw, 4.4rem)`, rotated `-1.5deg`, color `#D81E34`.
  - Subtitle: `Caveat`, `1.05rem`, color `#8A5A40`.
  - Stanzas 1–4: `EB Garamond`, `clamp(1.05rem, 1.8vw, 1.2rem)`, line-height `1.95`, color `#2E221B`.
  - Pull Verse: `Fraunces` italic, `1.25rem`, color `#1F1410`.
  - Signature: `Caveat`, `1.3rem`, signed in crimson ink (`#D81E34`).
- **Artwork & SVG Spec:**
  - Top-right spiral galaxy with orbital nodes; bottom tilted ringed Saturn with nested concentric orbital arcs and 4-point hand-drawn stars.
- **Canvas FX & Motion:**
  - `data-canvas="stars"`. Title box draws itself via stroke animation; red title fills via ink-flow mask. Hovering background Saturn triggers starburst shimmer.

---

### Poem 03: From River to Winter
*“a long current, freezing at the edges”*
- **File:** `poems/from-river-to-winter.html` | **Family:** `C-river`
- **Thematic Grounding:** *“The river flows, a promise to the sea... The truth, a viper coiled.”* Original Wattpad `[image]` slot.
- **60-30-10 Color Tokens:**
  - 60% Frosted River Mist: `#E4E8E8`
  - 30% Deep River Slate: `#3A5660` / `#5C7884`
  - 10% Winter Rose & Viper Thread: `#A3495A` / `#46545C`
- **Card & Structural Anatomy:**
  - Narrow vertical letter format (`min(540px, 88vw)`).
  - Water-wrinkled, cockled bottom edge simulating paper that dried after touching ice water.
  - Faint brownish-grey watermark tide line along lower third.
- **Micro-Details & Keepsake Artifacts:**
  - **The Coiled Viper Thread:** Ultra-fine single-line fountain pen coil (`stroke: #46545C`, `0.75px`) winding down the right margin near stanza 3.
  - **Crystalline Frost Needles:** Dendritic ice ferns creeping in from top-left corner onto letterhead.
  - **Lone Swing Motif:** Fine-line ink drawing of a tilted, empty park swing.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, wght 350, SOFT 0, WONK 1`), `clamp(2.2rem, 5vw, 3.2rem)`, color `#2C424D`.
  - Subtitle: `Courier Prime` italic, `0.85rem`, tracked `0.12em`, color `#6C7D82`.
  - Stanza 1: `Fraunces` italic, `1.35rem`, line-height `1.7`, color `#2A3A3E`.
  - Stanzas 2–6: `EB Garamond`, `1.12rem`, line-height `1.9`, color `#233136`.
  - Pull Quote: `DM Serif Display` italic, `1.35rem`, framed by double-line ice rules.
  - Signature: `Caveat`, `1.25rem`, color `#5C7884`.
- **Artwork & SVG Spec:**
  - Multi-layered Bézier splines depicting turbulent winter river current; pine silhouettes with hand-brushed foliage.
- **Canvas FX & Motion:**
  - `data-canvas="rain"`. Canvas frost crystallization: algorithmic growth of ice crystals across bottom boundary on page entry.

---

### Poem 04: Hollow Shell
*“a mug, a name, a silent scream”*
- **File:** `poems/hollow-shell.html` | **Family:** `C-ash`
- **Thematic Grounding:** *“Cracked reflection in the glass... Coffee cup dreams, still warm in my grip / Your name on the mug.”*
- **60-30-10 Color Tokens:**
  - 60% Aged Ash-Cream Desk: `#F0E2CC`
  - 30% Roasted Coffee & Bistre Ink: `#2A1F18` / `#4A2E1B`
  - 10% Terracotta Ember: `#B4432A`
- **Card & Structural Anatomy:**
  - Rectangular desk note (`width: min(580px, 90vw)`).
  - Diagonal glass fracture cutting through top-right corner with physical offset (`0.8px`) and shadow.
- **Micro-Details & Keepsake Artifacts:**
  - **Dried Coffee Ring Stain:** Overlapping bottom-left corner of the card, dark burnt-umber outer rim (`#4A2E1B`, `opacity: 0.65`, irregular wobble) with translucent watercolor puddle and 4 micro-droplets.
  - **Handwritten Name:** The word *“you”* scribbled in shaky ballpoint pen in the margin, half-erased.
  - **Airmail Edge:** Vintage 1990s red-and-indigo chevron airmail stripe peeking from beneath paper edge.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, wght 400, WONK 1`), `clamp(2.4rem, 5vw, 3.4rem)`, color `#2A1F18`.
  - Subtitle: `Caveat`, `1.15rem`, color `#7A5844`.
  - Stanza 1 (Mirror): `DM Serif Display` italic, `1.35rem`, color `#1F1610`.
  - Stanza 3 (Coffee Dreams): `Caveat` handwriting, `1.38rem`, color `#B4432A` (ember ink).
  - Body Stanzas: `EB Garamond`, `1.15rem`, line-height `1.85`, color `#38281E`.
  - Signature: `Caveat`, `1.3rem`, color `#6B5340`.
- **Artwork & SVG Spec:**
  - Ceramic mug rim casting long afternoon shadow on woodgrain; diagonal hairline crack path across frame.
- **Canvas FX & Motion:**
  - `data-canvas="smoke"`. Replaces embers with 3 multi-scale wisps of coffee steam drifting upward and dissipating.

---

### Poem 05: Guiding Light
*“hope, like stars, guiding each day”*
- **File:** `poems/guiding-light.html` | **Family:** `D-dawn`
- **Thematic Grounding:** *“Amidst the sunrise is gentle bliss / Hope like stars, guiding each day.”* Direct match to `images/guiding light.png`.
- **60-30-10 Color Tokens:**
  - 60% Pale Eggshell Mist Sky: `#EFECE6`
  - 30% Deep Slate Sea & Sand: `#4D6360` / `#DEB393`
  - 10% Beacon Vermilion & Sunbeam Gold: `#D83232` / `#FFE680`
- **Card & Structural Anatomy:**
  - Maritime postcard sheet (`width: min(560px, 90vw)`).
  - Circular postal cancellation mark: *“COASTAL LIGHTHOUSE STATION · DAWN · 1996”*.
- **Micro-Details & Keepsake Artifacts:**
  - **The Constellation Guide Trail:** Delicate dotted line (`#C9A24B`, `stroke-dasharray: 3 5`) leading from stanza 2 down the margin directly to the lighthouse lantern.
  - **Rippling Zigzag Shadow:** Distinctive stylized shadow of the tower rippling into the slate water band.
- **Exact Typography:**
  - Title: `Fraunces` / `Playfair Display` with high-contrast swashes, `clamp(2.6rem, 5.5vw, 3.6rem)`, color `#1E2B2A`.
  - Subtitle: `Caveat`, `1.1rem`, color `#6C7D82`.
  - Stanza 1: `Fraunces` italic, `1.25rem`, line-height `1.75`, color `#233230`.
  - Body Stanzas: `EB Garamond`, `1.15rem`, line-height `1.9`, color `#2E3D3B`.
  - Final Triplet: `DM Serif Display` italic, `1.3rem`, color `#14201E`.
  - Signature: `Caveat`, `1.25rem`, color `#7A8E92`.
- **Artwork & SVG Spec:**
  - Horizontal sand shelf at `y=280`, deep slate sea at `y=310`, slender 5-banded red-and-white lighthouse tower at `x=620`, small keeper's cottage with red gabled roof.
- **Canvas FX & Motion:**
  - `data-canvas="fireflies"`. Beacon light cone slowly sweeps horizon ($8\text{s}$ cycle); sun glitter sparkles on water surface.

---

### Poem 06: Dissection
*“precision, not ruin”*
- **File:** `poems/dissection.html` | **Family:** `C-char`
- **Thematic Grounding:** *“Is bravery a scalpel, sharp and cold / Dissecting hope, leaving stories old?”*
- **60-30-10 Color Tokens:**
  - 60% Surgical Carbon Black: `#1A1208`
  - 30% Bone Parchment Card: `#F4ECD8`
  - 10% Arterial Scalpel Crimson: `#D04848`
- **Card & Structural Anatomy:**
  - **The Scalpel Incision:** The sole exception to deckled edges—100% mathematically straight guillotine edge on the right margin, with an actual horizontal razor slice extending 40px into the paper body revealing crimson substrate behind it.
- **Micro-Details & Keepsake Artifacts:**
  - **Metric Ruler Calibrations:** Fine surgical millimeter tick marks (10, 20, 30, 40mm) along the left margin in 6px Courier Prime.
  - **Surgical Suture Knot:** Two tiny cross-stitched suture knots (`#D04848`) holding the parted paper cut together.
  - Total absence of floral or organic flourishes.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, wght 300, SOFT 0, WONK 0`), `clamp(2.5rem, 5.2vw, 3.5rem)`, letter-spacing `0.04em`, color `#1A1208`.
  - Subtitle: `Courier Prime`, `0.8rem`, uppercase, tracked `0.2em`, color `#7A6A5A`.
  - Stanzas 1 & 2: `Courier Prime` / `EB Garamond` cold italic, `1.05rem`, line-height `2.0`, color `#2A2018`.
  - Couplet: `Fraunces`, `1.25rem`, flanked by a vertical 1.5px crimson arterial rule.
  - Signature: `Courier Prime`, `0.85rem`, tracked `0.15em`, lowercase: `tai khan`.
- **Artwork & SVG Spec:**
  - Multi-layered incision trench: dark carbon base, arterial crimson subcutaneous glow, and surgical steel highlight.
- **Canvas FX & Motion:**
  - Replaces chaotic lightning with **`data-canvas="scalpel-glint"`**: A 120px ray of razor-sharp white light sweeps along the incision line every 9 seconds.

---

### Poem 07: Memoirs
*“nurture the soul, find the freedom”*
- **File:** `poems/memoirs.html` | **Family:** `D-script`
- **Thematic Grounding:** *“Mighty dreams within, / Underneath the memoirs... In the landscape, over the horizon.”* Direct match to `images/Divine letter (1).png`.
- **60-30-10 Color Tokens:**
  - 60% Dusty Blush Rose Paper: `#F4E8E4`
  - 30% Sepia Diary Ink: `#2A1F18`
  - 10% Keepsake Raspberry Red: `#D8334A`
- **Card & Structural Anatomy:**
  - Compact scrapbook memo sheet (`width: min(500px, 86vw)`).
  - Two angled semi-translucent washi tape strips securing top corners.
- **Micro-Details & Keepsake Artifacts:**
  - **The Die-Cut Keepsake Sticker:** Embossed paper sticker of a cupcake with a bold crimson outline (`#D8334A`, 3px) and cream frosting at top center.
  - **Thematic Underlines:** A single-stroke crimson fountain pen underline under the word **“memoirs”** in stanza 1 and **“landscape”** in stanza 2 (connecting to Poem 15).
  - Pressed translucent cherry blossom petal in lower corner.
- **Exact Typography:**
  - Title: `Yellowtail` / energetic brush script, `clamp(3rem, 6.5vw, 4.2rem)`, rotated `-2deg`, color `#D81E34`.
  - Subtitle: `Caveat`, `1.05rem`, color `#A05858`.
  - Stanzas: `Fraunces` book regular, `clamp(1.1rem, 1.8vw, 1.25rem)`, line-height `1.85`, color `#2A1F18`.
  - Signature: `tai khan` in dusty rose-taupe (`#B88C88`) at bottom right.
- **Artwork & SVG Spec:**
  - SVG die-cut cupcake sticker with pleated wrapper lines and scalloped frosting profile.
- **Canvas FX & Motion:**
  - `data-canvas="memory-motes"`. 3D perspective tilt on hover; floating golden sunlit dust motes.

---

### Poem 08: Starlight
*“a bridge between night and morning”*
- **File:** `poems/starlight.html` | **Family:** `D-stars`
- **Thematic Grounding:** *“Moonlit nights, with / A symphony of stars... Beneath the moonlit, souls entwine.”* Direct match to `images/Divine letter (2).png`.
- **60-30-10 Color Tokens:**
  - 60% Nocturnal Espresso Velvet: `#161414`
  - 30% Luminous Starlight Gold: `#FFE082` / `#F8B85C`
  - 10% Twilight Rose Horizon: `#E8A88A`
- **Card & Structural Anatomy:**
  - Black archival cotton paper sheet with raw deckled edge (`width: min(560px, 90vw)`).
  - Embedded gold-leaf flecks in paper pulp.
- **Micro-Details & Keepsake Artifacts:**
  - **Cascading Diagonal Star Shower:** Sweeping diagonal trail of hand-drawn 4-point and 8-point gold stars flowing from top-right corner across the stanzas.
  - **Two Braided Silk Threads:** Gold and twilight-rose threads crossing in a figure-eight heart knot beneath stanza 2 ("souls entwine").
- **Exact Typography:**
  - Title: `Yellowtail` script with glowing golden aura (`text-shadow: 0 0 14px rgba(255,224,130,0.7)`), `clamp(3.2rem, 7vw, 4.5rem)`, color `#FFE082`.
  - Subtitle: `Caveat`, `1.15rem`, color `#D4C4A8`.
  - Stanzas: Rounded handwriting / humanist sans (`Fraunces SOFT 100` or `Caveat`), `clamp(1.2rem, 2vw, 1.45rem)`, line-height `1.75`, color `#F7F5F0`.
  - Signature: `Caveat`, `1.35rem`, color `#FFE082` with golden glow.
- **Artwork & SVG Spec:**
  - Diamond starbursts (`polygon points="0,-10 2.5,-2.5 10,0 2.5,2.5 0,10 -2.5,2.5 -10,0 -2.5,-2.5"`), braided silk curves.
- **Canvas FX & Motion:**
  - `data-canvas="stars"`. Algorithmic shooting stars traversing at 28°; interactive ripple wave of golden stardust on card tap.

---

### Poem 09: Lost Answer: Ghost of Warmth
*Sibling: Lost Answer Pair · Part 1*
- **File:** `poems/lost-answer-ghost-of-warmth.html` | **Family:** `E` (Wine & Memory)
- **Thematic Grounding:** *“For the ghost of warmth / in a cooling glass / I raise the wine / to memories that pass.”* Direct match to `images/loat ans.png`.
- **60-30-10 Color Tokens:**
  - 60% Pale Icy Periwinkle Shore: `#DDE8EF`
  - 30% Slate-Blue Sea Band & Ink: `#5C7C84` / `#2A1F18`
  - 10% Port Wine Tannin & Gold: `#7A1A28` / `#C9A24B`
- **Card & Structural Anatomy:**
  - Upright vintage letter (`min(580px, 90vw)`), top-right corner features a punctured eyelet with dangling crimson silk thread.
- **Micro-Details & Keepsake Artifacts:**
  - **Translucent Wine Ring Watermark:** Upper-right margin features a watercolor wine glass ring stain (`#7A1A28`, opacity 0.22). Inside the ring: 4 tiny golden star constellation dots ("where constellations lie").
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, WONK 1, SOFT 40`), `clamp(2.1rem, 4.5vw, 2.9rem)`, color `#2A1A1E`.
  - Body: `EB Garamond`, `1.18rem`, line-height `1.85`, color `#2A1F18`, left-aligned.
  - Signature: `Yellowtail`, `1.45rem`, color `#677279`.
- **Artwork & SVG Spec:**
  - Removes the floating sky wine glass; creates the exact shoreline from `loat ans.png`: distant water ribbon `#6D92A0`, blush sand `#DEB9A7`, lavender snow shore `#E8E3EE`, and lone walking figure in coat with cast shadow.
- **Canvas FX & Motion:**
  - `data-canvas="shore-drift"`. Slow ground mist; starlight dots in wine ring gently pulse.

---

### Poem 10: Lost Answer: Truth Known
*Sibling: Lost Answer Pair · Part 2*
- **File:** `poems/lost-answer-truth-known.html` | **Family:** `E` (The Aftermath)
- **Thematic Grounding:** *“But in the ashes, stories start to rise... For in the letting go, a truth is known.”* Direct match to `images/lost ans 2 truth.png`.
- **60-30-10 Color Tokens:**
  - 60% Cold Slate Mist: `#D2DFE8`
  - 30% Darkened Sea Ridge & Iron Gall: `#4A606A` / `#281D18`
  - 10% Ash Charcoal & Dried Rose: `#4A3B32` / `#A3495A`
- **Card & Structural Anatomy:**
  - Companion sheet to Poem 09; top-left red thread knot; right edge has charred/frayed tear.
- **Micro-Details & Keepsake Artifacts:**
  - **Dried Hollow Wine Ring:** The wine ring from Poem 09 is now dry and cracked (`#5C453A`, opacity 0.16) with fine ash flecks drifting out of it instead of stars.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, WONK 1`), `clamp(2.1rem, 4.5vw, 2.9rem)`, color `#221612`.
  - Body: `EB Garamond`, `1.18rem`, line-height `1.85`, color `#281D18`.
  - Climax Stanza: `Fraunces` italic, `1.28rem`, centered between hairline rules.
  - Signature: `Caveat`, `1.3rem`, color `#70584B`.
- **Artwork & SVG Spec:**
  - Continuous shoreline with Poem 09; figure has walked further rightward, leaving fading footprints.
- **Canvas FX & Motion:**
  - `data-canvas="ash-drift"`. 20 micro-ash particles slowly curling upward with organic sine wobble.

---

### Poem 11: Every Winter
*Sibling: Every Winter Pair · Part 1 (Day)*
- **File:** `poems/every-winter.html` | **Family:** `B-day` (Winter Ash)
- **Thematic Grounding:** *“Sun hid away, winter's hold / Silent room, no laughter near.”* Direct match to `images/every winter final.png`.
- **60-30-10 Color Tokens:**
  - 60% Frosted Daylight Mist Sky: `#E5EDEE`
  - 30% Mountain Pine Slate: `#446E77` / `#2C3E44`
  - 10% Glacial Teal Heading & Snow: `#7CA4AC` / `#FFFFFF`
- **Card & Structural Anatomy:**
  - Crisp cold letter sheet (`width: min(590px, 90vw)`).
  - Embedded vintage sun medallion toggle top-right (swaps to night mode).
  - Braided blue thread graphic at bottom leading to Poem 12.
- **Micro-Details & Keepsake Artifacts:**
  - **Corner Frost Growth:** SVG crystalline fern frost (`#7CA4AC`, opacity 0.35) creeping inward from top-left.
  - **Birch Shadow:** Faint bare birch branch shadow cast across card (`mix-blend-mode: multiply`, opacity 0.04).
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 120, wght 500`), tracked `0.22em uppercase`, `clamp(1.8rem, 4vw, 2.4rem)`, color `#7CA4AC`.
  - Body: `EB Garamond`, `clamp(1.15rem, 2.2vw, 1.25rem)`, line-height `1.95`, color `#2C3E44`, left-aligned.
  - Divider: Hand-drawn pine needle path (`#7CA4AC`, 0.75px).
  - Signature: `Yellowtail`, `1.4rem`, color `#7CA4AC`.
- **Artwork & SVG Spec:**
  - Purges the cartoon house. Rebuilds the centered paper-cutout mountain cluster with scalloped snowcaps, notched triangular pine trees, and pill clouds from `every winter final.png`.
- **Canvas FX & Motion:**
  - `data-canvas="snow"`. 60 slow-drifting flakes accumulating onto bottom snow mound.

---

### Poem 12: Every Winter: Free Fall
*Sibling: Every Winter Pair · Part 2 (Night)*
- **File:** `poems/every-winter-free-fall.html` | **Family:** `B-night` (Winter Ash)
- **Thematic Grounding:** *“Moonless night, tears freely fall / Diamond drops, without a scheme.”* Direct match to `images/free fall final.png`.
- **60-30-10 Color Tokens:**
  - 60% Deep Winter Night Indigo: `#1E2D3D`
  - 30% Moonlit Snow Ridges: `#9AB8C7` / `#1A2530`
  - 10% Diamond Tear Sparkle: `#EAF4F8` / `#4D97A8`
- **Card & Structural Anatomy:**
  - Companion sheet to Poem 11. Nocturnal background inversion; card remains warm paper with dark indigo ink.
  - Crescent moon toggle medallion top-right.
- **Micro-Details & Keepsake Artifacts:**
  - **Vertical Scatter of Diamond Teardrops:** 7 hand-drawn diamond drop glyphs (`◇`, `#2C6A78`, opacity 0.35) drifting down the right margin.
- **Exact Typography:**
  - Title: `Fraunces`, tracked `0.2em uppercase`, `clamp(1.7rem, 3.8vw, 2.3rem)`, color `#2C6A78`.
  - Body: `EB Garamond`, `1.2rem`, line-height `1.95`, color `#1A2530`.
  - Signature: `tai khan` in cursive (`#2C6A78`).
- **Artwork & SVG Spec:**
  - Overlapping curved snowdrift ridges and paper-cutout notched pine trees from `free fall final.png`.
- **Canvas FX & Motion:**
  - `data-canvas="diamond-fall"`. Vertical falling teardrops with cross-shaped specular glints.

---

### Poem 13: Painted Sky
*“the sun bleeds out, a crimson tear”*
- **File:** `poems/painted-sky.html` | **Family:** `C-sky` (Ember Bridge)
- **Thematic Grounding:** *“The sun bleeds out, a crimson tear / The moon paints paths that meet.”*
- **60-30-10 Color Tokens:**
  - 60% Sunset Crimson to Midnight Gradient: `#7A2B3A` to `#241828`
  - 30% Card Watercolor Wash: `#F7ECD8` with diffused `#D04848` top wash
  - 10% Sun Gold & Crimson Bleed: `#F5B868` / `#B4432A`
- **Card & Structural Anatomy:**
  - The card itself carries a hand-painted watercolor sunset wash gradient from top to bottom.
  - Singed upper edge with charcoal dusting.
- **Micro-Details & Keepsake Artifacts:**
  - **Sun-to-Moon Celestial Arc:** Continuous hairline golden arc (`#F5B868`, dashed) connecting bleeding sun to crescent moon.
  - **Crimson Tear Drip:** Hand-painted watercolor tear bleeding downward from the sun disk.
  - Gold mica spatter specks near stanza 3.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, WONK 1`), `clamp(2.2rem, 5vw, 3.1rem)`, color `#2A0F18`.
  - Body: `EB Garamond`, `1.18rem`, line-height `1.9`, color `#2A1820`.
  - Moon Path Climax: `Fraunces` italic, `1.25rem`, framed by gold dawn rules.
  - Signature: `Caveat`, `1.3rem`, color `#B88870`.
- **Artwork & SVG Spec:**
  - Bleeding watercolor sun disk, crescent moon, windswept pine silhouettes on glowing horizon.
- **Canvas FX & Motion:**
  - `data-canvas="embers"`. 30 glowing ember sparks floating upward on thermal updrafts.

---

### Poem 14: Home
*“in letting go, she finds her own home”*
- **File:** `poems/home.html` | **Family:** `B-home` (Winter Ash)
- **Thematic Grounding:** *“Footprints in the frosted sand / Rain on a window pane / In letting go, she finds her own home.”* Wattpad `[image]` slot.
- **60-30-10 Color Tokens:**
  - 60% Rain-Washed Mist: `#D6DFDC`
  - 30% Frosted Sand & Slate Wash: `#5C7884` / `#2A3A3E`
  - 10% Earth Warmth & Rose Mark: `#C8A878` / `#A3495A`
- **Card & Structural Anatomy:**
  - Right margin features a vertical window-pane division line.
  - Bottom-right edge is torn where the footprint trail physically walks off the card.
- **Micro-Details & Keepsake Artifacts:**
  - **Footprint Impressions (On the Paper):** 6 pairs of tread marks stamped into the paper texture (`#A8A090`, opacity 0.35), leading off the bottom edge.
  - **Rain Streaks:** 4 fountain pen rain streaks running down the right margin with condensation droplets.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, WONK 1`), `clamp(2.3rem, 5vw, 3.2rem)`, color `#1E2D30`.
  - Body: `EB Garamond`, `1.2rem`, line-height `1.9`, color `#2A3A3E`. (Removes misplaced Caveat font).
  - Climax Stanza: `EB Garamond` italic, `1.25rem`, left-bordered by slate rain rule.
  - Signature: `Caveat`, `1.3rem`, color `#5C7884`.
- **Artwork & SVG Spec:**
  - Frosted coastal sand dunes; distant solitary warm amber window light (`#FFD680`) on the horizon.
- **Canvas FX & Motion:**
  - `data-canvas="rain"`. Slanted fine rain streaks with droplet ripples along bottom edge.

---

### Poem 15: Landscape
*“soar on wings, reach the skies”*
- **File:** `poems/landscape.html` | **Family:** `D-dawn`
- **Thematic Grounding:** *“Soar on wings, reach the skies... Find the landscape, enjoy the views.”*
- **60-30-10 Color Tokens:**
  - 60% Dawn Coral-Gold Horizon: `#F5E1C8` to `#E8B888`
  - 30% Panoramic Card Parchment: `#FFF9EE`
  - 10% Coral Ink & Wing Cutout: `#D98B6B` / `#3A2A1A`
- **Card & Structural Anatomy (THE LETTERBOX DEVICE):**
  - **Sole Letterboxed Card on the Site:** Constructed at 16:9 panoramic ratio (`width: min(940px, 94vw); aspect-ratio: 16 / 9`).
  - **Two-Column Reading Flow:** Left column holds Title, Subtitle, and Stanza 1; Right column holds Stanza 2, Signature, and Nav; spanning both columns across the bottom is a continuous horizon brushstroke.
- **Micro-Details & Keepsake Artifacts:**
  - **Swallow Wing Linocut:** Bottom-left corner features a minimalist paper-cutout wing silhouette (`width: 36px`).
  - **Marginalia Note:** Handwritten pencil note in Caveat: *“(seven letters sealed in May)”*.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, WONK 1`), `clamp(2.4rem, 4.5vw, 3.4rem)`, color `#3A2016`.
  - Subtitle: `EB Garamond` italic, `1.1rem`, color `#8A5A44`.
  - Body: `EB Garamond`, `1.18rem`, line-height `1.95`, color `#2C1F18`.
  - Horizon Rule: Gradient brushstroke (`#D98B6B`, 1.5px).
  - Signature: `Caveat`, `1.35rem`, color `#8A5A44`.
- **Artwork & SVG Spec:**
  - 4 overlapping mountain ridge washes in dawn mist; low glowing sun disk; soaring wing cutout high in sky.
- **Canvas FX & Motion:**
  - `data-canvas="shimmer"`. Golden dawn mist shimmer undulating across mountain crests.

---

### Poem 16: Within the World I Define
*“a twisted flame that burns bright”*
- **File:** `poems/within-the-world-i-define.html` | **Family:** `C-candle` (Charred Arc · Stop 1)
- **Thematic Grounding:** *“A twisted flame that burns bright / A world that only I define.”*
- **60-30-10 Color Tokens:**
  - 60% Outer Charred Void: `#181010`
  - 30% Inner Sanctuary Parchment: `#FFF7E8`
  - 10% Candle Flame Gold: `#F8B85C`
- **Card & Structural Anatomy (THE NESTED CARD-IN-CARD):**
  - **Card-in-Card Architecture:** An outer dark weathered charred sheet (`#231714`) containing a smaller, luminous cream card (`#FFF7E8`) nested inside it—visualizing a private sanctuary guarded from the world.
- **Micro-Details & Keepsake Artifacts:**
  - **Melted Wax Droplets:** 3 translucent candle wax drips along the left edge of the inner card.
  - **The Embryonic Charred Sea:** A flat, completely unignited obsidian horizon line across the bottom of the scene—its first appearance in the 3-poem arc.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, WONK 1`), `clamp(2.2rem, 4.8vw, 3rem)`, color `#1E0C06`.
  - Body: `EB Garamond`, `1.18rem`, line-height `1.9`, color `#241410`.
  - Final Vow Pull Quote: `Fraunces` italic, `1.3rem`, color `#7A2810`.
  - Signature: `Caveat`, `1.3rem`, color `#7A4222`.
- **Artwork & SVG Spec:**
  - Solitary hand-drawn candle flame brushstroke with gold halo, teardrop core, and curled graphite wick.
- **Canvas FX & Motion:**
  - `data-canvas="candle"`. Warm radiative candle flicker washing over the nested card boundaries.

---

### Poem 17: Controlled Ruin
*“two voices, in the same charred sea”*
- **File:** `poems/controlled-ruin.html` | **Family:** `C-ruin` (Charred Arc · Stop 2)
- **Thematic Grounding:** *“The sea burned long before we spoke—still, black, unmoving... I scorch the edges, slow, exact.”*
- **60-30-10 Color Tokens:**
  - 60% Charred Black: `#0A0808`
  - 30% Ash Cream Card: `#F4ECD8`
  - 10% Scorched Amber & Ember: `#C97A30` / `#F8B85C`
- **Card & Structural Anatomy:**
  - **Two-Hand Dialogue Layout:** Narrator voice aligned left in book serif; interlocutor dialogue ("You") indented `clamp(2rem, 6vw, 4.5rem)` and set in distinct Caveat handwriting.
  - Scorched deckled edge with amber glowing inner boundary and carbon rim.
- **Micro-Details & Keepsake Artifacts:**
  - **Surface Crack Lines:** Hairline fractures running from margins into the page, mirroring the cracking charred sea.
  - Singe burn marks in corners; ash smudge dusting across background.
- **Exact Typography:**
  - Title: `DM Serif Display` italic, `clamp(2.4rem, 5.5vw, 3.4rem)`, color `#1A0808`.
  - Narrator Voice: `EB Garamond`, `1.18rem`, line-height `1.85`, color `#1A0808`.
  - Interlocutor Voice: `Caveat` (`wght 600`), `clamp(1.35rem, 2.4vw, 1.55rem)`, color `#C97A30`, rotated `-1deg`.
  - Signature: `Caveat`, `1.35rem`, color `#6B5340`.
- **Artwork & SVG Spec:**
  - Horizon at `y=260` cracks open with 12 interconnected ember fissure paths; expressive sumi-ink silhouettes of two figures on opposite sides of the chasm.
- **Canvas FX & Motion:**
  - `data-canvas="embers"`. 45 rising ember sparks + 15 smoke puffs emanating from horizon fractures.

---

### Poem 18: Out of Frame
*“close enough to map your days, far enough to never exist inside them”*
- **File:** `poems/out-of-frame.html` | **Family:** `G-photo` (Ghost Family)
- **Thematic Grounding:** *“Close enough to map your days, far enough to never exist inside them / Only part of what it looked like from outside.”*
- **60-30-10 Color Tokens:**
  - 60% Bleached Album Grey: `#E5E1E4`
  - 30% Faded Gelatin Silver: `#5A5C68`
  - 10% Kodak Black & Pale Cyan: `#2A2530` / `#A9B4C2`
- **Card & Structural Anatomy:**
  - **The Empty Mounting Board:** 4 authentic triangular black photo-corner mounts framing an empty rectangular space (`aspect-ratio: 4 / 3`).
  - **Sun-Bleached Ghost:** Paper inside the mounts is visibly lighter (`#FAF7F2`) than surrounding light-damaged album sheet, rotated `-1.2deg` and shifted off-center.
- **Micro-Details & Keepsake Artifacts:**
  - Yellowed rubber-cement stains where a photo was once glued.
  - Faint graphite pencil marginalia under frame: `"summer, uncatalogued"`.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 120, WONK 1`), `clamp(2.2rem, 5vw, 3.2rem)`, color `#2A2530`.
  - Body: `EB Garamond`, `1.15rem`, line-height `1.9`, color `#2A2530`.
  - Pull Verse: `DM Serif Display` italic, `1.45rem`, color `#2A2530`.
  - Signature: `Caveat`, `1.3rem`, color `#6A6470`.
- **Artwork & SVG Spec:**
  - Replaces clunky book with open antique scrapbook album on woodgrain desk with discarded film negative strip.
- **Canvas FX & Motion:**
  - Changes snow to **`data-canvas="dust"`**: 40 drifting attic dust motes with periodic silver light glints.

---

### Poem 19: Silence, in layers
*“even silence wasn't clean, it came in layers”*
- **File:** `poems/silence-in-layers.html` | **Family:** `G-layers`
- **Thematic Grounding:** *“Even silence wasn't clean / It came in layers I had seen / But never meant to notice through.”*
- **60-30-10 Color Tokens:**
  - 60% Translucent Vellum Mist: `#DCD5D8`
  - 30% Muted Lavender-Slate: `#6A6470`
  - 10% Faint Silver Thread: `#A08868`
- **Card & Structural Anatomy (THE 3-TIER VELLUM STACK):**
  - **Physical 3-Sheet Translucent Stack:**
    - Sheet 1 (Bottom): Rotated `-2.4deg`, blurred ghost text of past stanzas (`filter: blur(1.5px)`).
    - Sheet 2 (Mid): Rotated `+1.6deg`, semi-transparent parchment with torn top edge.
    - Sheet 3 (Top): Rotated `0deg`, crisp foreground text (`backdrop-filter: blur(6px)`).
  - Pinned together in corner by an antique brass paperclip SVG.
- **Micro-Details & Keepsake Artifacts:**
  - Show-through reverse ink printed on back of vellum shining faintly through fibers.
  - Tripled offset stanza dividers mimicking double-exposure vision.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, SOFT 80`), `clamp(2.3rem, 5.2vw, 3.3rem)`, color `#3A3640`.
  - Body: `EB Garamond` with descending opacity across stanzas (`#3A3640` down to `#5A5460`).
  - Final Couplet: `DM Serif Display` italic, `1.45rem`, centered.
  - Signature: `Caveat`, `1.3rem`, color `#6A6470`.
- **Artwork & SVG Spec:**
  - 4 undulating watercolor veil horizons with torn edges; dashed vertical linen sewing thread lines.
- **Canvas FX & Motion:**
  - `data-canvas="fog"`. 30 soft mist circles; mouse/touch tilt creates 3D parallax separation between the 3 vellum sheets.

---

### Poem 20: Things I Learn to Bury
*“grief is acceptable only in controlled quantities”*
- **File:** `poems/things-i-learn-to-bury.html` | **Family:** `F` (Contained · Sibling 1)
- **Thematic Grounding:** *“They teach us usefulness. / Endurance. / ... Like oceans trapped beneath ice, / visible only through fractures.”*
- **60-30-10 Color Tokens:**
  - 60% Aged Ledger Cream: `#F0EAD8`
  - 30% Iron Gall Ink: `#2A2722`
  - 10% Accounting Rule Crimson & Ledger Blue: `#8B2E2E` / `#5A7AB8`
- **Card & Structural Anatomy (RULED LEDGER PAGE):**
  - Card abandons deckled edge for clean perforated binder edge with 3 punched holes.
  - Strict 28px rhythmic horizontal ledger ruling across page; vertical red margin line 68px from left edge.
- **Micro-Details & Keepsake Artifacts:**
  - **Hairline Ice Fracture:** Single ultra-fine branching crack (`0.5px`, blue-grey) in lower right corner ("visible only through fractures").
  - Eraser scuff mark near stanza 3; authentic source typos preserved (`"bleeeding"`, `"eaarly"`, `"precisio n"`).
- **Exact Typography:**
  - Title: `Fraunces` (`wght 500, SOFT 10`), `clamp(2.1rem, 4.8vw, 3rem)`, color `#2A2722`.
  - Subtitle: `Courier Prime`, `0.9rem`, uppercase, color `#8B2E2E`.
  - Stanza 1 (Staccato): `Courier Prime`, `0.95rem`, color `#2A2722`.
  - Body: `EB Garamond`, `1.1rem`, locked strictly to 28px baseline grid.
  - Signature: Cramped, small `Caveat` scrawl (`1.15rem`, color `#4A4740`).
- **Artwork & SVG Spec:**
  - Sterile desk surface with stacks of official documents pushed to edges; solitary blue fountain pen with dried ink drop.
- **Canvas FX & Motion:**
  - `data-canvas="ice-dust"`. Absolute stillness; 12 micro-particles drifting with near-zero velocity.

---

### Poem 21: Rage in cage
*“stars collapsing inward from their own gravity”*
- **File:** `poems/rage-in-cage.html` | **Family:** `F` (Contained · Sibling 2)
- **Thematic Grounding:** *“It calcifies instead... Like stars collapsing inward from their own gravity.”*
- **60-30-10 Color Tokens:**
  - 60% Calcified Bone Grey: `#DCD6CB`
  - 30% Charcoal Ash: `#2A2722`
  - 10% Taut Crimson Wire: `#8B2E2E`
- **Card & Structural Anatomy (TAUT WIRE CAGE):**
  - 4 vertical crimson threads (`#8B2E2E`, 1px) drawn taut across card, pinned by brass eyelet punctures at top and bottom.
  - Text container restricted to tight 34ch column for claustrophobic emotional containment.
- **Micro-Details & Keepsake Artifacts:**
  - **Collapsing Star Spiral:** In bottom-right corner, a hyper-dense logarithmic spiral winding inward to a solid black pinprick.
  - Diagonal paper stress wrinkles around eyelets.
- **Exact Typography:**
  - Title: `Fraunces` (`wght 600, SOFT 0`), `clamp(2.2rem, 5vw, 3.2rem)`, color `#8B2E2E`.
  - Subtitle: `Courier Prime`, `0.85rem`, tracked `0.1em uppercase`, color `#4A4740`.
  - Stanza 2 (Axiom): `Fraunces` center-set, `1.45rem`, color `#8B2E2E`.
  - Body: `EB Garamond`, `1.12rem`, tight leading, color `#2A2722`.
  - Signature: `Caveat`, `1.25rem`, color `#4A4740`.
- **Artwork & SVG Spec:**
  - New dedicated scene: iron-grey chamber with harsh 45° geometric shadow bars and gravitational singularity core.
- **Canvas FX & Motion:**
  - Replaces rain with **`data-canvas="calcified-ash"`**: Ash flakes fall and collect along vertical red cage bars.

---

### Poem 22: Between Midnight & Sleep
*“the pause between midnight & sleep”*
- **File:** `poems/between-midnight-and-sleep.html` | **Family:** `G-clock`
- **Thematic Grounding:** *“in the pause between midnight & sleep / in every of your seen-zone, your ignoring.”*
- **60-30-10 Color Tokens:**
  - 60% Nocturnal Slate-Indigo: `#1F2438`
  - 30% Antique Letter Parchment: `#F4ECD8`
  - 10% Phosphor Cyan LED Glow: `#A9C4D6` / `#5C7C9A`
- **Card & Structural Anatomy (DUAL LIGHTING ILLUMINATION):**
  - Warm vintage lamp circle on left half of card; sharp diagonal wash of cold phosphor cyan screen glow across lower-right quadrant.
  - Typewriter timestamp header top right: `00:07:42 AM — UNREAD`.
- **Micro-Details & Keepsake Artifacts:**
  - **Stopped Grandfather Clock:** Clock hands frozen at 12:07; vermilion second hand caught between ticks.
  - **Digital Slang Artifact:** Two delicate blue read-receipt checkmarks (`✓✓`, `#5C8AE6`) beside `"seen-zone"`.
  - Dried coffee mug ring overlapping stanza 1.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 120, WONK 1`), `clamp(2.2rem, 5vw, 3.2rem)`, color `#1A1F2A`.
  - Opening "No—": `Fraunces`, `1.65rem`, color `#1A1F2A`.
  - Insomnia Litany (Stanza 1): `EB Garamond` italic, `1.12rem`, indented `1.5rem`.
  - Body: `EB Garamond`, `1.15rem`, line-height `1.85`.
  - Signature: `Caveat`, `1.3rem`, color `#5A5468`.
- **Artwork & SVG Spec:**
  - Engraved brass wall clock at left; modern dark smartphone monolith at right emitting volumetric light cone.
- **Canvas FX & Motion:**
  - `data-canvas="clock-pulse"`. 4.5-second respiration breathing cycle of cyan screen glow; red clock second hand micro-twitches every 1000ms.

---

### Poem 23: The Blue Inside Ruin
*“a catalogue of blues, ending on the charred sea”*
- **File:** `poems/the-blue-inside-ruin.html` | **Family:** `C-blue` (Charred Arc · Stop 3)
- **Thematic Grounding:** *“Its the blue of deep oceans... winter skies... glaciers... stained glass in cathedrals... Earth seen from space... The blue of charred sea.”*
- **60-30-10 Color Tokens:**
  - 60% 9-Stage Painted Blue Gradient: `#0A1628` → `#6BA8C9` → `#050B12`
  - 30% Cathedral Stained Glass Azure: `#A9C4D6` / `#3F7BB0`
  - 10% Charred Horizon Gold: `#C97A30`
- **Card & Structural Anatomy (THE FULL-HEIGHT CATALOGUE):**
  - **The Masterpiece Background:** Full document height pre-painted gradient shifting through the 9 named blues in exact sync with stanzas, ending in pitch black at the final line.
  - Card styled as frosted vellum glassmorphic sheet (`backdrop-filter: blur(12px); border: 1px solid rgba(169,196,214,0.25)`).
- **Micro-Details & Keepsake Artifacts:**
  - **Stained Glass Shards:** Multi-faceted geometric cathedral glass shards with lead came borders in corners.
  - **The Drowned Charred Sea:** Scorched horizontal line from Poem 17 reappears beneath the final line, submerged in deep indigo glaze.
  - Watercolor swatch pills beside each named blue stanza.
- **Exact Typography:**
  - Title: `DM Serif Display` italic, `clamp(2.4rem, 5.5vw, 3.5rem)`, color `#F4ECD8`.
  - The Blue Catalogue (Stanza 2): `Fraunces` (`opsz 72, WONK 1`), `clamp(1.15rem, 2.1vw, 1.35rem)`, color `#D8ECF8`.
  - Body: `EB Garamond`, `1.15rem`, line-height `1.85`, adapting color to background luminance (AAA contrast).
  - Final Climax ("The blue of charred sea."): `Fraunces` italic, `1.8rem`, color `#C97A30` (charred gold).
  - Signature: `Caveat`, `1.35rem`, color `#8FBED4`.
- **Artwork & SVG Spec:**
  - Gothic rose-window tracery arches; volumetric diagonal light rays; lone silhouette looking out over dark sea.
- **Canvas FX & Motion:**
  - `data-canvas="shimmer"`. Refractive prism caustics and undulating underwater light curves.

---

### Poem 24: End
*“a home I carve for myself alone”*
- **File:** `poems/end.html` | **Family:** `H` (Resolution)
- **Thematic Grounding:** *“'...And so I choose the unknown, / A Home I carve for myself alone.'”*
- **60-30-10 Color Tokens:**
  - 60% Sunlit Desk Cream: `#FAF0E0`
  - 30% Dark Iron Ink: `#3C2A1E`
  - 10% Golden Dawn Light: `#FFE680` / `#B48858`
- **Card & Structural Anatomy (MINIATURE FOLDED POCKET NOTE):**
  - Strictly dimensioned to `max-width: 360px; min-height: 280px; margin: 0 auto;`.
  - Horizontal tri-fold crease shadows indicating it was folded into thirds and carried in a coat pocket.
  - Sits inside vast empty negative desk space (80vh), emphasizing peaceful solitary completion.
- **Micro-Details & Keepsake Artifacts:**
  - **The Door Ajar Line-Art:** Central hand-inked illustration of a wooden door slightly unlatched, streaming a pale golden dawn light beam across floorboards.
  - Single fountain pen rest ink dot beside closing quotation mark.
- **Exact Typography:**
  - Title: `Fraunces` (`opsz 144, SOFT 50`), `clamp(1.8rem, 4vw, 2.4rem)`, color `#3C2A1E`.
  - Final Couplet: `EB Garamond` italic, `1.35rem`, line-height `1.65`, color `#3C2A1E`.
  - Signature: `Caveat`, `1.3rem`, color `#6B5340`.
- **Artwork & SVG Spec:**
  - Delicate architectural sumi-ink linework of door opening into morning light with pencil woodgrain floor hatching.
- **Canvas FX & Motion:**
  - **Purges embers completely.** Set to `data-canvas="dawn-dust"`: absolute stillness, with 6 golden dust motes rising imperceptibly in the morning sunbeam.

---

## 7. THE COLOPHON (ABOUT PAGE)

- **File:** `about.html`
- **Aesthetic:** Treated as the inside back cover or colophon plate of a rare book. No decorative motifs or canvas animations.
- **Materiality:** Bone-white unadorned vellum sheet (`#FAF0E0`).
- **Typography & Structure:**
  - Display Title: `Fraunces` letterpress.
  - Metadata Grid: Styled as an antique library catalogue card or printer's colophon in `Courier Prime`, featuring Author (`tai_khan`), summary, chapter tally (24), composition dates (2024–2026), and Wattpad provenance rendered as a postal return-address stamp.

---

## 8. CROSS-CUTTING THROUGH-LINES VERIFICATION MATRIX

| Lineage / Through-Line | Participating Poems | Physical Device & Evolution | TOC Integration |
|---|---|---|---|
| **Red String Sibling Pair 1** | № 09 (*Lost Answer: Ghost of Warmth*) & № 10 (*Lost Answer: Truth Known*) | Punctured eyelet holes with frayed red thread knots; Poem 09 features fresh starlight wine ring; Poem 10 features dry ash-cracked ring. | Connected across desk by interactive Verlet-physics red thread with transverse tension vibration. |
| **Red String Sibling Pair 2** | № 11 (*Every Winter*) & № 12 (*Every Winter: Free Fall*) | Daytime frost and paper-cutout mountain cluster in #11; Nocturnal blizzard and vertical diamond teardrops in #12; Sun/Moon toggle medallions. | Connected across desk by matching red thread with physical catenary sag. |
| **The Charred-Sea Arc** | № 16 (*Within the World I Define*) $\rightarrow$ № 17 (*Controlled Ruin*) $\rightarrow$ № 23 (*The Blue Inside Ruin*) | **Stop 1:** Embryonic black horizon + candle.<br>**Stop 2:** Scorched horizon cracks open with dialogue + embers.<br>**Stop 3:** Horizon submerged under 9 blue glazes in pitch-black sea. | Connected on the TOC desk by an authentic scorched singe trail burnt into the leather blotter with pulsing ember sparks. |
| **The Contained Suppression Pair** | № 20 (*Things I Learn to Bury*) & № 21 (*Rage in cage*) | Rigid refusal of floral/brush flourishes.<br>**№ 20:** Ruled ledger lines + punch holes + hairline crack.<br>**№ 21:** 4 taut vertical crimson cage wires + collapsing star spiral. | Positioned side-by-side on TOC with rigid iron border tags, unadorned by decorative ribbon. |

---

## 9. ACCESSIBILITY, CONTRAST & PERFORMANCE STANDARDS

1. **WCAG 2.2 AAA / AA Compliance:**
   - Base Parchment (`#2A1F18` on `#F1E8D8`): Contrast ratio **12.18:1 (AAA)**.
   - Cosmic Night (`#F1E8D8` on `#1B1A2E`): Contrast ratio **11.45:1 (AAA)**.
   - *Blue Inside Ruin* Gradient: Dynamic text tone adaptation per band guaranteeing $>6.4:1$ across all 9 color steps.
2. **Motion Accessibility:**
   - `prefers-reduced-motion: reduce` freezes all 15 canvas engines into a single hand-rendered still frame, cancels 3D envelope unfolding into immediate open state, and switches page turns to instant cross-fades.
3. **Screen Readers & Semantic HTML:**
   - All decorative SVGs and canvas layers set to `aria-hidden="true"` and `focusable="false"`.
   - Poem text remains 100% semantic, selectable HTML with screen-reader accessible stanza structures.
4. **Hardware Performance:**
   - All canvas routines operate with throttled particle counts on mobile devices ($N \le 40$).
   - SVG filters use restricted bounding boxes (`x="-10%" y="-10%" width="120%" height="120%"`) to prevent GPU overdraw and maintain 60 FPS scrolling.

---

## 10. MOBILE ERGONOMICS & GESTURE KINEMATICS ARCHITECTURE

Because *Manuscript* is designed primarily for intimate, solitary reading on handheld devices (smartphones and tablets), desktop mouse interactions are secondary to natural touch kinematics. Reading on mobile must feel like holding a sheaf of heavy 1990s stationery cards in one's hand.

### 10.1 The Keepsake Dock (Mobile Thumb Zones)
All primary navigation is concentrated in the bottom 35% of the viewport—the natural ergonomic sweep of the human thumb, eliminating awkward reaches to top navigation bars.

```
+------------------------------------------+
|                                          |
|            POEM READING FIELD            |
|       (Undisturbed Stanza Surface)       |
|                                          |
+------------------------------------------+
|  NATURAL THUMB SWEEP ZONE                |
|      +----------------------------+      |
|      | [PREV] [DESK] [NEXT] [CANDLE] [AUDIO] | <- .keepsake-dock
|      +----------------------------+      |
+------------------------------------------+
```

- **Morphology & Materials:** A floating horizontal capsule (`height: 52px; border-radius: 26px;`) pinned at `bottom: calc(16px + env(safe-area-inset-bottom, 0px)); left: 50%; transform: translateX(-50%);`.
- **Material Styling:** Frosted translucent vellum (`backdrop-filter: blur(16px) saturate(180%); background: rgba(244, 236, 216, 0.82); border: 1px solid rgba(138, 107, 79, 0.35); box-shadow: 0 8px 32px rgba(42, 31, 24, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.6);`).
- **Interactive Action Buttons (48×48px Touch Targets):**
  1. `#dock-prev`: Previous poem card, featuring an engraved dip-pen quill pointing left.
  2. `#dock-desk`: Return to Writing Desk, styled as a miniature crimson wax seal stamp medallion bearing the Roman numeral of the active chapter.
  3. `#dock-next`: Next poem card, featuring an engraved dip-pen quill pointing right.
  4. `#dock-focus`: Toggle Candlelight Focus Mode (icon of a small brass candlestick with dancing flame).
  5. `#dock-audio`: Procedural soundscape mute/unmute (icon of a vintage cut-glass inkwell).
- **Auto-Hide On Natural Flow:** When the user scrolls down through stanzas, the dock gently descends by 60px (`opacity: 0; transform: translate(-50%, 60px); transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;`). An upward thumb flick or pause in scroll instantly restores the dock.

---

### 10.2 Real-Time 3D Page-Turn Peel Kinematics (RK4 Spring Model)
Page transitions abandon flat slide transitions in favor of a real-time, finger-tracked 3D paper curl simulation modeled as a cantilevered thin flexible sheet with Runge-Kutta 4th-order (RK4) spring-damper restitution.

```
       TOUCH ORIGIN (x0, y0)
            \
             \  DRAG VECTOR (dx, dy)
              v
     +--------------------------+
     |                          |
     |        FRONT PAGE        |\
     |                          | \  PEEL CONE
     |                          |  \  (Shadow underside)
     |                          |   \
     +--------------------------+----+
```

1. **Governing Differential Equation:**
   $$\frac{d^2 \theta}{dt^2} = -\frac{k_{\text{spring}}}{I} (\theta - \theta_0) - \frac{c_{\text{damping}}}{I} \frac{d\theta}{dt}$$
   - Rotational spring constant $k_{\text{spring}} = 420\text{ N}\cdot\text{m/rad}$.
   - Damping coefficient $c_{\text{damping}} = 32\text{ N}\cdot\text{s}\cdot\text{m/rad}$.
   - Moment of inertia $I = 0.0052\text{ kg}\cdot\text{m}^2$ (emulating heavy 160 gsm cold-press rag paper).
2. **Curl Geometry & Dynamic SVG Clipping:**
   - As the finger drags from the right edge inward, a dynamic SVG `<clipPath id="page-peel-clip">` calculates the peel crease line as a quadratic Bézier curve:
     $$B(t) = (1-t)^2 P_0 + 2(1-t)t P_{\text{control}} + t^2 P_1$$
   - The curl apex exposes the verso (backside) of the paper, rendered with an inverted fiber grain and a diffused semi-transparent reverse text shadow (`transform: scaleX(-1); opacity: 0.12; filter: blur(1.5px);`).
3. **Double-Shadow Depth Gradient:**
   - **Underside Crease Shadow:** Dynamic linear gradient along the crease line (`rgba(0,0,0,0.45)` tapering to `transparent` over 24px) creating paper thickness depth.
   - **Cast Bed Shadow:** Ambient soft shadow cast onto the upcoming poem card below (`box-shadow: -12px 16px 28px rgba(25, 18, 12, 0.32)`).
4. **Completion Hysteresis:** If the drag displacement exceeds 38% of screen width or velocity $v_x > 0.85\text{px/ms}$, the page peels away completely with an acoustic vellum rustle. If released earlier, the sheet springs back to flat rest with a gentle 120ms damped oscillation.

---

### 10.3 Natural Sheet Gestures (Pinch-to-Fold & Pull-to-Desk)
Two natural multi-touch gestures bridge reading and spatial navigation without requiring buttons:

1. **Pinch-to-Fold (Letter Folding Kinematics):**
   - A two-finger inward pinch gesture calculates pinch scale $S \in [1.0, 0.25]$.
   - As $S$ decreases from $1.0 \to 0.70$, the poem card initiates a 3D tri-fold origami crease:
     - Top third folds downward: `transform: rotateX(-120deg) translateY(33.3%); transform-origin: top center;`.
     - Bottom third folds upward over the center: `transform: rotateX(120deg) translateY(-33.3%); transform-origin: bottom center;`.
   - At $S < 0.45$, the folded letter seals itself with a crimson wax medallion, scales down to postcard size, and snaps directly into its assigned coordinate slot on the Writing Desk with a haptic pulse (`navigator.vibrate(25)`).
   - A reverse two-finger outward expand gesture on any desk letter performs the reverse unfold sequence.
2. **Pull-to-Desk Rubber-Band Gesture:**
   - When the user is at scroll position $y = 0$ and pulls downward, logarithmic elastic resistance is applied:
     $$\Delta y_{\text{visual}} = 180\text{px} \cdot \tanh\left(\frac{\Delta y_{\text{pull}}}{240\text{px}}\right)$$
   - At $\Delta y_{\text{pull}} > 140\text{px}$, a wax seal icon slides down from the top margin with a mechanical latch sound. Releasing the drag triggers a smooth return to the Table of Contents desk view.

---

### 10.4 Spatial Memory & Desk State Machine (Dog-Ears, Wax Seals & Ribbons)
Physical books preserve memory through wear and folding. *Manuscript* tracks reading state through authentic physical artifacts stored in `localStorage`:

```
UNREAD STATE (TOC):              READ STATE (TOC):
+-------------------------+      +-------------------------+
|      [WAX SEAL]         |      |                 / \     | <- Dog-Eared
|    === RED RIBBON ===   |      |                /___\    |    Corner
|                         |      |    (Ribbon untied)      |
|  "№ 04 · HOLLOW SHELL"  |      |  "№ 04 · HOLLOW SHELL"  |
|                         |      |  "a hollow shell..."    |
|   (Card closed/sealed)  |      |   (Exposed stanzas)     |
+-------------------------+      +-------------------------+
```

1. **The Dog-Eared Fold (`#folded-dogear`):**
   - Reading completion is triggered when the reader scrolls through $\ge 80\%$ of a poem's stanzas and maintains a dwell time $\ge 25\text{ seconds}$.
   - The top-right corner of the poem card smoothly folds over via a 45-degree SVG triangular flap with realistic paper creasing, casting a micro-shadow onto the upper margin.
2. **Graphite Author Tick Marks:**
   - Completed poems on the desk receive a faint, hand-penciled Roman numeral or checkmark in the margin (`Caveat` font, `#5E5045`, `opacity: 0.65`).
3. **Sealed vs Opened Letter Dynamics:**
   - **Unread Poems:** Rendered on the Desk as tightly folded ivory envelopes bound by an unbroken wax seal medallion and silk ribbon knot.
   - **Read Poems:** The wax seal is broken into two fractured halves; the ribbon lies coiled beside the envelope; and the card is partially drawn out, exposing the handwritten title and opening verse.
4. **Mood Family Ribbon Bundles:**
   - On the Desk, a floating sorting toggle allows the user to gather the 24 loose cards into **8 Thematic Bundles** tied with silk ribbons (Crimson, Charcoal, Celadon, Cobalt, Gold, Rust, Ochre, and Slate). Clicking a bundle fans out the constituent cards in a smooth radial card spread.
5. **The Cedar Drawer Quick-Index (`Key: D`):**
   - An antique brass drawer pull handle sits at the bottom edge of the Table of Contents. Clicking or dragging upward pulls open a wooden cedar drawer revealing an indexed catalogue of library cards arranged in 24 vertical slots, complete with stamped dates, chapter titles, and first-line excerpts.
6. **Desktop Keyboard Matrix:**

| Key Binding | Target Action | Physics / Sound |
|---|---|---|
| `ArrowRight` / `L` | Advance to next poem card | 3D vellum peel forward + paper slide |
| `ArrowLeft` / `H` | Return to previous poem card | 3D vellum peel backward |
| `ArrowDown` / `J` | Smooth step to next stanza | Parabolic scroll glide |
| `ArrowUp` / `K` | Smooth step to previous stanza | Parabolic scroll glide |
| `Escape` | Fold letter and return to Desk | Envelope tri-fold + wax stamp snap |
| `F` | Toggle Candlelight Focus Mode | Ambient room vignette dims to 15% |
| `D` | Slide open Cedar Drawer quick index | Heavy wooden drawer friction audio |
| `L` | Toggle Magnifying Loupe | Brass loupe attaches to pointer |
| `M` | Mute / Unmute procedural soundscape | Inkwell cork pop |
| `?` | Display Parchment Shortcut Legend | Translucent vellum overlay fade |

---

### 10.5 In-Poem Reading Experience (Candlelight Focus Mode, Marginalia Reveal & Loupe)
1. **Candlelight Focus Mode (`.candlelight-active`):**
   - Activated via `#dock-focus` or pressing `F`.
   - The entire background scene, desk textures, and outer UI dim down to 12% opacity with a deep vignette.
   - An organic radial light pool (`radial-gradient(ellipse 680px 420px at center, rgba(255, 244, 220, 0.95) 0%, rgba(255, 240, 205, 0.45) 55%, rgba(0, 0, 0, 0) 100%)`) tracks the stanza currently closest to the vertical center of the viewport.
   - Inactive stanzas above and below gently fade to 35% opacity, eliminating optical distraction and inducing deep meditative concentration.
   - A subtle canvas flame-flicker algorithm adds $\pm 2.5\%$ luminance variation at 3.2 Hz, creating the sensation of reading by a beeswax candle flame.
2. **Interactive Marginalia & Hidden Author Draft Lines:**
   - Select stanzas feature faint graphite markings, question marks, and asterisks in the left/right gutters (`opacity: 0.35`).
   - Tapping or hovering a marginalia icon smoothly reveals discarded authorial draft couplets, diary dates, or private thoughts written in rapid `Caveat` script, rendered as handwritten pencil annotations on the paper margin.
3. **Reading Cadence Marginalia:**
   - In the top-right card header, beneath the date stamp, a delicate handwritten note indicates the reading breath:
     - *"a 2-minute breath"* (Short lyrical poems like № 08 *Starlight*)
     - *"a quiet vigil (4 min)"* (Reflective pieces like № 23 *The Blue Inside Ruin*)
     - *"a sudden fracture"* (Sharp pieces like № 06 *Dissection*)
4. **The Brass Magnifying Loupe:**
   - Desktop and tablet users can activate the Loupe tool (`Key: L`). A circular brass-rimmed magnifying glass (120px diameter) follows the cursor.
   - Inside the loupe circle, the paper surface is magnified 2.5×, revealing microscopic cotton rag fibers, ink capillary bleeding, iron gall feathering, and watermarks otherwise invisible to the naked eye.
   - Chromatic aberration filter separates red and cyan channels by 1.8px at the lens perimeter; optical barrel distortion simulates authentic 19th-century ground glass.

---

## 11. MICRO-TYPOGRAPHY, OPENTYPE & POETIC METRE MASTER RULES

To achieve true print-grade editorial distinction worthy of an archival letterpress edition, typography must transcend generic web defaults through rigorous OpenType feature activation, optical hanging punctuation, and metre-governed vertical rhythm.

### 11.1 Master OpenType Feature Suite & Sub-Pixel Kerning Pairs
Modern browsers support high-end OpenType font feature tables that are typically left dormant. *Manuscript* mandates universal activation across all font stacks:

```css
/* Master OpenType Declarations for Poetry Engine */
.poem__title,
.poem__verse,
.poem__annotation {
  font-feature-settings: 
    "kern" 1,    /* Standard & Sub-pixel Kerning Pairs */
    "liga" 1,    /* Standard Common Ligatures (fi, fl, ff, ffi) */
    "dlig" 1,    /* Discretionary Ligatures (ct, st, sp, Th) */
    "hlig" 1,    /* Historical Ligatures */
    "onum" 1,    /* Oldstyle Figures (proportional hanging numbers: 1, 2, 3...) */
    "pnum" 1,    /* Proportional Number Widths */
    "calt" 1,    /* Contextual Alternates (natural handwriting variance) */
    "swsh" 1;    /* Flourished Swash Capitals on titles and initials */
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

#### Sub-Pixel Kerning Matrix:
To eliminate awkward visual gaps in uppercase titles and dip-pen scripts, the following kerning overrides are enforced:
- `Fraunces`: `T–o` (-0.045em), `V–a` (-0.055em), `W–e` (-0.040em), `P–a` (-0.035em), `r–.` (-0.060em).
- `EB Garamond`: Discretionary ligatures enabled for `ct` (arched connective bar), `st` (historic loop), and `Th` (high crossbar).
- `Caveat`: Contextual alternates (`calt`) cycle through 3 distinct glyph variants for consecutive identical characters (e.g. *"ll"*, *"ee"*, *"oo"* in *"hollow"*, *"free fall"*), preventing the mechanical giveaway of computer-generated handwriting.

---

### 11.2 Optical Margin Alignment (Hanging Punctuation)
In standard web layouts, quotation marks and dashes cause the left text margin to indent awkwardly, breaking the clean vertical alignment of poetic verse.

```
DEFAULT WEB BEHAVIOR (BROKEN MARGIN):    OPTICAL HANGING MARGIN (MANUSCRIPT PLAN):
|                                        |
|  “And so I choose the unknown,         |“And so I choose the unknown,
|   A Home I carve for myself alone.”    | A Home I carve for myself alone.”
|   — tai_khan                           |— tai_khan
|                                        |
[Left flush line indented by quote]      [Clean visual letter axis preserved]
```

1. **Native CSS Implementation:**
   ```css
   .poem__body,
   .poem__stanza {
     hanging-punctuation: first last force-end allow-end;
   }
   ```
2. **Automated Polyfill Engine (for Chromium / WebKit):**
   A tiny inline parser wraps leading quotation marks, hyphens, and em-dashes in negative-margin hanging spans:
   - Opening double quotation mark (`“`): `<span class="hang-quote">“</span>` (`margin-left: -0.42em; margin-right: 0.05em;`).
   - Opening single quotation mark (`‘`): `<span class="hang-quote-single">‘</span>` (`margin-left: -0.28em;`).
   - Em-dash signature line (`—`): `<span class="hang-dash">—</span>` (`margin-left: -0.22em;`).

---

### 11.3 Metre-Based Modular Vertical Rhythm Scale
Poetic stanzas must breathe in proportion to their internal poetic metre. Rather than arbitrary uniform margins, spacing is mathematically tied to a **24px (1.5rem) base rhythmic unit**:

$$\text{Base Unit } U = 1.5\text{rem} \quad (24\text{px at default 16px root})$$

1. **Couplet Cadence (Rapid, breathless exchanges):**
   - Margin-bottom: $1.0 \times U = 1.5\text{rem}$ (24px).
   - Line-height: $1.65$.
2. **Quatrain Cadence (Standard ballad / lyrical stanzas):**
   - Margin-bottom: $1.5 \times U = 2.25\text{rem}$ (36px).
   - Line-height: $1.75$.
3. **Sestet / Octave Cadence (Dense reflective philosophical blocks):**
   - Margin-bottom: $2.0 \times U = 3.0\text{rem}$ (48px).
   - Line-height: $1.85$.
4. **Variable Font Weight Modulation:**
   - Stanza opening lines set at `font-weight: 460;` (ink nib heavily loaded).
   - Subsequent lines gradually relax to `font-weight: 400;` as ink flows smoothly.

---

### 11.4 Widow, Orphan & Poetic Line-Break Algorithm
Poetic verses must never terminate with a lone dangling word ("orphan") on a wrapped line. 

```javascript
/**
 * Poetic Line Sanitizer & Widow Prevention Engine
 * Automatically injects non-breaking spaces between final words and handles em-dash protection
 */
function sanitizePoeticLineEndings(containerSelector = '.poem__stanza') {
  const stanzas = document.querySelectorAll(containerSelector);
  stanzas.forEach(stanza => {
    // Process text nodes directly to avoid corrupting HTML tags
    const walker = document.createTreeWalker(stanza, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      // Bind last two words with non-breaking space
      node.nodeValue = node.nodeValue.replace(/([^\s\n\r]+)\s+([^\s\n\r]+)$/, '$1\u00A0$2');
      // Protect em-dashes from wrapping alone
      node.nodeValue = node.nodeValue.replace(/\s+—\s+/g, '\u00A0— ');
    }
  });
}
```

Additionally, modern CSS properties are applied to all verse wrappers:
```css
.poem__verse {
  text-wrap: pretty;
  text-wrap: balance;
  overflow-wrap: break-word;
  hyphens: manual;
}
```

---

### 11.5 Authorial Revision Typography (Graphite Scribbles & Ink Strikes)
To convey the intimate feeling of a living, handwritten journal draft, poems feature deliberate authorial revisions, strikeouts, and marginal corrections:

```html
<p class="poem__verse">
  We buried the <del class="ink-strike">promises</del> <ins class="pencil-margin">silence</ins> deep into the loam.
</p>
```

```css
/* Authentic Hand-Drawn Ink Strikeout */
del.ink-strike {
  position: relative;
  text-decoration: none;
  color: inherit;
  opacity: 0.75;
}
del.ink-strike::after {
  content: "";
  position: absolute;
  left: -2px;
  right: -2px;
  top: 52%;
  height: 2px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q 25 1, 50 6 T 100 4' stroke='%238C2D19' stroke-width='2.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-size: 100% 100%;
  pointer-events: none;
  transform: rotate(-1.5deg);
}

/* Angled Graphite Pencil Annotation */
ins.pencil-margin {
  position: relative;
  text-decoration: none;
  font-family: var(--font-handwriting, 'Caveat', cursive);
  font-size: 1.15em;
  color: #4A3E34;
  vertical-align: super;
  margin-left: 4px;
  transform: rotate(-3deg);
  display: inline-block;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));
}
```

---

## 12. PRINT-GRADE EDITORIAL DESIGN & KEEPSAKE POSTCARD ENGINE

*Manuscript* includes a bespoke `@media print` engine that transforms any poem in the collection into a museum-quality 4×6 inch archival letterpress postcard when printed or saved as PDF.

```
+-------------------------------------------------------------+
| / / / / / / / / / / / AIRMAIL CHEVRON BORDER / / / / / / / /|
|  +-------------------------------------+  +---------------+ |
|  |                                     |  | [STAMP BOX]   | |
|  |        POEM CHAPTER TITLE           |  |  Postage 32c  | |
|  |     “a whisper exceeding...”        |  |  (1996 Crest) | |
|  |                                     |  +---------------+ |
|  |  Stanza 01                          |    (Postmark)      |
|  |  verse line one                     |     * 1996 *       |
|  |  verse line two                     |                    |
|  |                                     |  TO:               |
|  |  Stanza 02                          |  ________________  |
|  |  verse line three                   |  ________________  |
|  |  verse line four                    |  ________________  |
|  |                                     |                    |
|  |  — tai_khan                         |  POSTAL ARCHIVE    |
|  +-------------------------------------+  +---------------+ |
| / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / |
+-------------------------------------------------------------+
```

### 12.1 4×6″ Archival Postcard `@media print` Stylesheet
```css
@media print {
  @page {
    size: 4in 6in landscape; /* 101.6mm x 152.4mm Archival Postcard */
    margin: 0.35in 0.4in;
    marks: crop cross;
    bleed: 0.125in;
  }

  /* Force exact color reproduction and suppress browser headers */
  html, body {
    width: 100%;
    height: 100%;
    background: #FAF3E6 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Hide digital UI chrome */
  .keepsake-dock,
  .site-header,
  .site-footer,
  .poem__canvas-layer,
  .poem__dock-controls,
  #loupe-container {
    display: none !important;
  }

  /* Transform poem card into split postcard back */
  .poem-page__main {
    display: grid !important;
    grid-template-columns: 1.4fr 1fr !important;
    gap: 0.4in !important;
    width: 100% !important;
    height: 100% !important;
    padding: 0.25in !important;
    box-sizing: border-box !important;
    border: 1px solid #C4B59D !important;
    background: #FAF3E6 !important;
    position: relative !important;
  }

  /* Left Column: Hand-Lettered Verse */
  .poem__content {
    border-right: 1px dashed #B8A890 !important;
    padding-right: 0.3in !important;
  }

  .poem__title {
    font-size: 1.6rem !important;
    color: #1A120B !important;
    margin-bottom: 0.2in !important;
  }

  .poem__verse {
    font-size: 0.92rem !important;
    line-height: 1.55 !important;
    color: #241A14 !important;
  }
}
```

---

### 12.2 Philatelic Cancellation Stamp & Airmail Chevron Border
1. **Philatelic Postage Stamp:**
   - Positioned in the top right of the printed card (`width: 1.1in; height: 1.35in;`).
   - Features perforated serrated border teeth (`mask: radial-gradient(circle 3px at 0 50%, transparent 3px, black 3.5px)`) and a delicate hand-engraved etching of Saturn and a quill.
2. **Circular Postal Cancellation Mark:**
   - Overprinted at a 12-degree tilt across the stamp and paper.
   - Outer concentric circles: *"MANUSCRIPT POSTAL ARCHIVE · BENGAL / OXFORD"* with the date *"24 SEP 1996"*.
   - Three horizontal wavy ink cancellation lines passing through the stamp to prevent reuse.
3. **1990s Airmail Chevron Border:**
   - The outer perimeter of the printed sheet is framed by alternating 45-degree parallelograms in **Iron Gall Red** (`#8C2D19`) and **Deep Navy Indigo** (`#1E3A5F`).

---

### 12.3 Registration Targets & Crop Bleed Specs
- For users printing on heavy cardstock or archival linen paper, four corner crosshair registration targets and dotted trim-guide lines are rendered outside the 4×6″ printable area (`bleed: 0.125in`).

---

## 13. ADVANCED GLSL SHADERS & MATERIAL PHYSICS ENGINES

To elevate the visual fidelity from flat 2D vector illustrations to authentic, photorealistic physical media, *Manuscript* introduces four specialized WebGL GLSL fragment shaders and dynamic mechanical simulation scripts.

### 13.1 `paper_surface.frag`: Oren-Nayar Rough Diffuse & Anisotropic Fibers
Standard computer graphics shaders use Lambertian reflectance, which looks like smooth plastic. Authentic cotton rag paper exhibits microfacet roughness and anisotropic fiber scattering described by the **Oren-Nayar diffuse model**:

```glsl
// GLSL Fragment Shader: paper_surface.frag
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_light_pos;       // Virtual candle position (screen space)
uniform float u_time;
uniform sampler2D u_fiber_noise; // Procedural cellulose fiber normal texture

varying vec2 v_uv;

#define PI 3.14159265359

// Oren-Nayar diffuse calculation for microfacet porous surfaces
float orenNayarDiffuse(vec3 lightDir, vec3 viewDir, vec3 normal, float roughness, float albedo) {
    float LdotV = dot(lightDir, viewDir);
    float NdotL = dot(normal, lightDir);
    float NdotV = dot(normal, viewDir);

    float s = LdotV - NdotL * NdotV;
    float t = mix(1.0, max(NdotL, NdotV), step(0.0, s));

    float sigma2 = roughness * roughness;
    float A = 1.0 + sigma2 * (albedo / (sigma2 + 0.13) + 0.5 / (sigma2 + 0.33));
    float B = 0.45 * sigma2 / (sigma2 + 0.09);

    return albedo * max(0.0, NdotL) * (A + B * s / t) / PI;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 normal = texture2D(u_fiber_noise, st * 4.0).rgb * 2.0 - 1.0;
    
    // Calculate 3D light vector from virtual candle
    vec3 lightDir = normalize(vec3(u_light_pos - st, 0.45));
    vec3 viewDir = vec3(0.0, 0.0, 1.0); // Viewer perpendicular to screen

    // Cotton rag paper parameters: high roughness (0.85), warm creamy albedo
    float diffuse = orenNayarDiffuse(lightDir, viewDir, normal, 0.85, 0.94);
    
    // Base paper tone (#F5EFE1)
    vec3 paperColor = vec3(0.960, 0.937, 0.882);
    
    // Add subtle ambient occlusion along paper edges
    float edgeVignette = smoothstep(0.0, 0.08, st.x) * smoothstep(1.0, 0.92, st.x) *
                         smoothstep(0.0, 0.08, st.y) * smoothstep(1.0, 0.92, st.y);
                         
    vec3 finalColor = paperColor * diffuse * mix(0.82, 1.0, edgeVignette);
    gl_FragColor = vec4(finalColor, 1.0);
}
```

---

### 13.2 `wet_ink_simulation.frag`: Cook-Torrance Microfacet Meniscus & Evaporation
Freshly deposited fountain pen ink is liquid, pooling with a convex meniscus that catches specular glints before soaking into the cellulose matrix and drying to a matte finish over 3.2 seconds:

```glsl
// GLSL Fragment Shader: wet_ink_simulation.frag
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_light_pos;
uniform float u_stroke_age;     // Time elapsed since stroke was laid down (0.0 to 4.0s)
uniform sampler2D u_ink_mask;   // Stanza text mask

varying vec2 v_uv;

void main() {
    float inkDensity = texture2D(u_ink_mask, v_uv).r;
    if (inkDensity < 0.05) discard;

    // Meniscus Normal calculation via Sobel filter on ink mask
    vec2 texel = 1.0 / u_resolution;
    float hL = texture2D(u_ink_mask, v_uv - vec2(texel.x, 0.0)).r;
    float hR = texture2D(u_ink_mask, v_uv + vec2(texel.x, 0.0)).r;
    float hD = texture2D(u_ink_mask, v_uv - vec2(0.0, texel.y)).r;
    float hU = texture2D(u_ink_mask, v_uv + vec2(0.0, texel.y)).r;
    
    vec3 inkNormal = normalize(vec3(hL - hR, hD - hU, 0.15));
    vec3 lightDir = normalize(vec3(u_light_pos - v_uv, 0.35));
    vec3 halfVector = normalize(lightDir + vec3(0.0, 0.0, 1.0));

    // Drying curve: wet gloss decays exponentially over 3.2 seconds
    float wetness = clamp(exp(-u_stroke_age / 1.1), 0.0, 1.0);
    
    // Cook-Torrance specular highlight on wet liquid meniscus
    float NdotH = max(dot(inkNormal, halfVector), 0.0);
    float specular = pow(NdotH, 64.0) * wetness * 1.8;

    // Color transition: wet ink is glistening indigo-black (#0D111A); dried ink is matte iron gall (#2A1D15)
    vec3 wetColor = vec3(0.05, 0.07, 0.10);
    vec3 dryColor = vec3(0.16, 0.11, 0.08);
    vec3 inkBase = mix(dryColor, wetColor, wetness);

    gl_FragColor = vec4(inkBase + vec3(specular), inkDensity);
}
```

---

### 13.3 `wax_seal_medallion.frag`: Subsurface Scattering & Gyroscope Specular Tilt
Authentic red sealing wax is a semi-translucent colloid of shellac, turpentine, and cinnabar pigment. When held, light penetrates the wax edges (Subsurface Scattering) and shifts dynamically with device orientation:

```glsl
// Subsurface Scattering Approximation for Sealing Wax Medallion
vec3 calculateWaxSSS(vec3 lightDir, vec3 viewDir, vec3 normal, vec3 waxColor) {
    // Inverted normal scatter through thin wax edges
    float backScatter = max(0.0, dot(viewDir, -(lightDir + normal * 0.45)));
    float sssIntensity = pow(backScatter, 3.0) * 0.65;
    
    // Deep crimson interior glow (#C41E3A)
    vec3 sssColor = vec3(0.85, 0.08, 0.12);
    
    // Fresnel rim reflection
    float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 4.0) * 0.4;
    
    return waxColor + sssColor * sssIntensity + vec3(fresnel);
}
```

On mobile devices with gyroscope sensors (`window.addEventListener('deviceorientation')`), the light vector $\mathbf{L}$ tilts in real time with the phone, causing golden specular glints to roll across the engraved monogram relief.

---

### 13.4 `paper_aging_engine.frag`: Procedural Foxing, Suntan Rims & UV Decay
To simulate genuine 1990s aging, an analytical shader computes chemical foxing stains and acid oxidation:
1. **Cellulose Foxing (Iron Salt Rust):**
   - Generated via Poisson-disk distributed micro-centers.
   - Radial color profile: dark russet center (`#6B3E1F`) diffusing into yellowed parchment over 4–8px radius with irregular fractal noise boundaries.
2. **Suntan Edge Vignette:**
   - Ultraviolet degradation causes lignin oxidation along the outer 15mm perimeter of the cards, darkening the paper from `#FAF3E6` down to amber-tan `#D4B892`.

---

### 13.5 Dynamic Mechanical Simulations
Four standalone physics engines govern tactile motion:

```
+---------------------+     +----------------------+
|  FrostThawEngine    |     |   PaperCardPhysics   |
| (Thermodynamic heat |     | (2nd-Order Spring    |
|  diffusion on touch)|     |  Inertia & Bounce)   |
+---------------------+     +----------------------+
           |                           |
+---------------------+     +----------------------+
|  CandleWaxEngine    |     |  EraSliderController |
| (Viscous droplet    |     | (1996 -> 2026 Paper  |
|  rim accumulation)  |     |  Decay Interpolator) |
+---------------------+     +----------------------+
```

1. **`FrostThawEngine.js` (Thermodynamic Melting):**
   - Implemented for Winter poems (№ 03, 11, 12).
   - An $80 \times 60$ 2D thermal conduction grid simulates heat diffusion:
     $$\frac{\partial T}{\partial t} = \alpha \nabla^2 T - \beta (T - T_{\text{ambient}}) + Q_{\text{touch}}$$
   - Touching or hovering warm fingers melts the ice crystal overlay, revealing the hand-inked verse underneath. Melted frost condenses into micro-droplets that trickle down the card under gravity.
2. **`PaperCardPhysics.js` (2nd-Order Spring Dynamics):**
   - Governs all loose cards on the Table of Contents desk.
   - Dragging a card applies torque $\tau = \mathbf{r} \times \mathbf{F}$ based on grab offset from center of mass, rotating the card naturally.
   - Tossing a card imparts kinetic momentum with exponential aerodynamic air resistance ($v(t) = v_0 e^{-\gamma t}$) and elastic collision restitution against the blotter boundary.
3. **`CandleWaxEngine.js` (Viscous Droplet Accumulation):**
   - Active on Poem 16 (*Within the World I Define*).
   - Simulates molten paraffin running down the beeswax candle body. Droplets pool along the bottom card margin, cooling into solid 3D bumps with distinct normal shadows.
4. **`EraSliderController.js` (The 1996 $\to$ 2026 Timeline Slider):**
   - An interactive brass dial in the colophon allows readers to slide the collection between **1996 (Fresh Keepsake)** and **2026 (Archival Vintage)**.
   - Dynamically blends CSS filter values, GLSL foxing frequency, paper yellowing, and ink oxidation in real time.

---

## 14. SENSORY SYNESTHESIA: SPATIAL WEB AUDIO & MULTI-STAGE HAPTICS

Visuals alone cannot convey the tactile intimacy of handling vintage manuscripts. *Manuscript* deploys procedural Web Audio acoustics and multi-stage haptic vibration envelopes without requiring external audio file downloads.

### 14.1 Procedural Spatial Desk Acoustics (Stereo Pan & Air Absorption)
Every sound on the Writing Desk is generated in real time using the **Web Audio API**:

```
[White Noise Buffer] ---> [3x Peaking BiquadFilters] ---> [StereoPannerNode] ---> [Master Gain]
                                (Resonant Tooth)              (Azimuth Pan)
```

1. **Spatial Azimuth Tracking:**
   - As a paper card is dragged across the desk, its normalized X position ($x \in [-1.0, 1.0]$) maps directly to a `StereoPannerNode.pan.value`. Moving a letter to the left desk corner pans its paper-friction rustle entirely to the left headphone ear.
2. **Air Absorption & Distance Lowpass:**
   - Cards further from the center have their high frequencies rolled off via a `BiquadFilterNode` (`type: "lowpass"`), mimicking acoustic high-frequency atmospheric damping.
3. **Paper Friction Noise Generator:**
   - Pure procedural noise passed through three parallel bandpass filters centered at 850 Hz, 2400 Hz, and 6200 Hz. Scrubbing speed ($v$) dynamically modulates filter Q and gain:
     $$\text{Gain}_{\text{scratch}} = \text{clamp}\left(\frac{v}{1200\text{px/s}}, 0.0, 1.0\right) \times 0.18$$

---

### 14.2 The 5 Generative Stanza Synthesizers (Zero MP3 Assets)
To provide quiet emotional accompaniment without overwhelming the poetry, 5 ambient drones are synthesized using pure mathematical oscillators:

| Procedural Drone Engine | Emotional Mood Family | Web Audio Synthesis Graph & Parameters |
|---|---|---|
| **1. Rain on Attic Glass** | Family B (*River to Winter*, *Home*) | Pink noise generator $\to$ random impulse generator (simulating stochastic rain splatter at 12–28 drops/sec) $\to$ dual resonant bandpass (1200 Hz & 3800 Hz) with soft glass reverberation. |
| **2. Harbor Foghorn & Salt Swell** | Family D (*Guiding Light*, *Lost Answer*) | Deep 58 Hz sine wave oscillator + detuned 59.2 Hz sub-oscillator $\to$ slow 14-second LFO envelope (4s swell, 3s hold, 7s decay) $\to$ ocean white-noise wash with lowpass filter sweep. |
| **3. Crackling Cedar Hearth** | Family A & F (*Controlled Ruin*, *Within World*) | Brown noise floor (warm room rumble) + stochastic Poisson process generating micro-spikes (crackle pops: 40–80 $\mu\text{s}$ square-wave pulses followed by damped 450 Hz resonance). |
| **4. Pentatonic Wind Chimes** | Family C & E (*Starlight*, *Painted Sky*) | Five pure sine resonators tuned to ancient pentatonic intervals (528 Hz, 594 Hz, 660 Hz, 792 Hz, 880 Hz). Triggered stochastically by a simulated wind breeze velocity model. |
| **5. Antique Escapement Watch** | Family G (*Between Midnight & Sleep*) | Dual impulse clicks at 4.0 Hz (240 ticks/min). Tick: 3200 Hz brass casing resonance ($Q=18$); Tock: 2800 Hz pallet-fork impact ($Q=14$). |

---

### 14.3 The Interactive Brass Quill & Inkstand Controller
- Positioned in the desk corner or mobile Keepsake Dock (`#dock-audio`).
- **Tactile Click States:**
  1. *Uncorking:* Clicking the inkstand plays an authentic synthetic cork-pop audio transient (120 Hz damped thud + 2400 Hz high suction release).
  2. *Dipping the Quill:* Generates a delicate liquid ink droplet swirl.
  3. *Mute State:* Gently fades ambient drone over 800ms (`gainNode.linearRampToValueAtTime(0.001, ctx.currentTime + 0.8)`).

---

### 14.4 Multi-Stage Tactile Haptic Vibration Profiles (`navigator.vibrate`)
For devices supporting the Vibration API (Android smartphones), distinct micro-haptic patterns provide physical confirmation of user actions:

```javascript
const ManuscriptHaptics = {
  // Brittle wax seal fracture: three micro-cracks followed by main snap
  waxSealBreak: () => {
    if ('vibrate' in navigator) navigator.vibrate([15, 30, 12, 40, 28]);
  },

  // Heavy vellum page peel: progressive fibrous resistance friction
  pagePeelTurn: () => {
    if ('vibrate' in navigator) navigator.vibrate([8, 20, 12, 18, 6]);
  },

  // Fountain pen dip: single gentle mechanical click
  quillDip: () => {
    if ('vibrate' in navigator) navigator.vibrate(12);
  },

  // Card drop onto cedar desk blotter: deep, solid thud
  deskCardSnap: () => {
    if ('vibrate' in navigator) navigator.vibrate([35]);
  },

  // Authorial ink strikeout scratch
  inkStrike: () => {
    if ('vibrate' in navigator) navigator.vibrate([18, 10, 14]);
  }
};
```

---

## 15. HARDWARE E-INK, READING SANCTUARY & COGNITIVE ACCESSIBILITY MODES

To ensure *Manuscript* is universally readable across modern OLED smartphones, desktop monitors, e-readers, and by readers with visual or cognitive differences, the system incorporates four dedicated accessibility modes.

### 15.1 Hardware E-Ink & Low-Power Halftone Mode (`@media (update: slow)`)
When viewed on reflective electrophoretic displays (reMarkable, Kindle Scribe, Boox) or activated via user preference:

```css
@media (update: slow), (monochrome) {
  /* Disable all GPU canvas loops and continuous animations */
  .poem__canvas-layer,
  .flame-flicker,
  .ink-evaporation {
    display: none !important;
  }

  /* Force pure 1-bit / 4-bit letterpress contrast */
  body {
    background: #FFFFFF !important;
    color: #000000 !important;
  }

  .poem-card {
    border: 2px solid #000000 !important;
    box-shadow: none !important;
    background: #FFFFFF !important;
  }

  /* Convert watercolor washes into Floyd-Steinberg dithered stipple art */
  .poem__scene svg {
    filter: grayscale(100%) contrast(300%) url('#dither-halftone') !important;
  }

  .poem__verse {
    color: #000000 !important;
    font-weight: 500 !important;
  }
}
```

---

### 15.2 Reading Sanctuary Mode (The Pure Solitary Vigil)
- Activated by pressing `Key: S` or long-pressing the reading field.
- **Visual Purge:** Instantly strips away all browser UI, headers, navigation bars, docks, page numbers, and author metadata.
- **Aesthetic Environment:** The room field dims to pitch black (`#0A0908`). A single warm, motionless spotlight illuminates only the active card text, creating the atmosphere of sitting alone at a desk at 3:00 AM under a private reading lamp.
- Exiting Sanctuary Mode is achieved by tapping anywhere outside the paper card or pressing `Escape`.

---

### 15.3 Cognitive & Vision Adaptations
1. **Atkinson Hyperlegible Mode Toggle:**
   - For low-vision readers or readers with dyslexia, an accessible font mode replaces body typography with Braille Institute's `Atkinson Hyperlegible` while strictly preserving vintage parchment backgrounds, paper borders, and line-art dividers.
   - Character shapes feature distinct ascenders, descenders, and exaggerated loops to prevent letter reversal confusion (e.g. distinguishing `b`, `d`, `p`, `q`).
2. **Bionic Guided Fixation Mode:**
   - In Bionic Reading mode, an automated DOM parser bolds the initial 1 to 3 letters of each poetic word:
     `<strong>Wh</strong>en <strong>th</strong>e <strong>sh</strong>adows <strong>fa</strong>ll...`
   - This facilitates smooth optical fixation saccades, guiding the reader's eyes rhythmically across verses without fatigue.

---

### 15.4 Three-Tier Motion Sensitivity Profiles
To accommodate vestibular disorders and motion sensitivity, motion is divided into three strict profiles:

```
[ Level 0: Full Kinematics ]  --> Default experience: 3D RK4 peel, canvas particles, GLSL shaders
[ Level 1: Gentle Ambient  ]  --> Disables 3D sheet curls & particle drift; retains soft opacity fades
[ Level 2: Strict Zero     ]  --> prefers-reduced-motion: Instant page cuts, static art, no haptics
```

- **Level 0 (Complete Physical Simulation):** Full 3D RK4 page curl, real-time GLSL paper raking shaders, canvas atmospheric particles, and haptic feedback.
- **Level 1 (Gentle Motion):** Suppresses 3D transforms, curls, and drifting particle systems. Replaces them with smooth 200ms opacity cross-fades and static hand-drawn artwork stills.
- **Level 2 (Strict Reduced Motion):** Triggered automatically by `prefers-reduced-motion: reduce`. Disables all transitions, transforms, Web Audio drones, and haptics. Page turns occur with instantaneous state cuts.

---

*End of Master Improvement Plan. Comprehensive architectural, visual, ergonomic, typographic, shader, and sensory specifications are finalized and ready for build execution.*
