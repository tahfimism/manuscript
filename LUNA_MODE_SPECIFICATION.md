# ✦ LUNA MODE: ARCHIVAL DESIGN SPECIFICATION & VISION COMPENDIUM ✦
*A Comprehensive Guide to the Hidden Layer, Visual Architecture, and Emotional Lore of Manuscript (1996)*

---

## 1. Executive Summary & Narrative Context

### 1.1 The Narrative Foundation
*Manuscript* is designed as an authentic, backdated **1990s vintage keepsake poetry collection and archival writing desk**. In its standard state, the manuscript presents itself as a formal, exquisitely typeset literary folio containing 24 poems exploring love, distance, cosmic devastation, winter decay, and self-restoration.

**Luna Mode** represents the secret, intimate reality behind the entire project: **Every single poem in the manuscript was written for a singular muse named Luna.**

### 1.2 The Emotional Dynamic
* **The Relationship:** Luna is not and will not be a partner. The feelings captured across the 24 letters represent an unrequited, sacred, and unspoken devotion—one where preserving her friendship, warmth, and presence in the world was valued far more than burdening her with a confession she could never return.
* **The Dual Nature of the Site:**
  - **Standard Mode (The Public Folio):** Polished, universal, elegant, and restrained. The author speaks through metaphors of frozen rivers, celestial ruins, and winter ashes.
  - **Luna Mode (The Private Vault):** The mask slips. The physical keepsakes, unsent confessions, candid photographs, handwritten marginalia, and raw drafts emerge from the shadows of the desk blotter.

---

## 2. Global Activation & Technical Architecture

### 2.1 Activation Triggers
Luna Mode can be toggled anywhere across the site through three distinct mechanisms:

1. **Secret Keystroke Sequence:** Typing `l` `u` `n` `a` anywhere on any page (case-insensitive, ignoring focused input/textarea fields).
2. **Global Keyboard Shortcut:** <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> (or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> on macOS).
3. **Programmatic API:** Calling `window.toggleLunaMode(forceState)` in the browser console or scripts.

### 2.2 State Management & Visual Feedback
* **Class Application:** Toggles the CSS class `luna-mode-active` on `document.body`.
* **Persistence:** Preserved across page reloads and navigation via `localStorage.getItem('manuscript_luna_mode')`.
* **Handwritten Toast Notification:** A custom vintage toast notification (`.luna-toast`) slides in from the bottom-right:
  - *Activation:* `✦ Luna Mode: Revealed ✦`
  - *Deactivation:* `✦ Luna Mode: Concealed ✦`
* **Tactile Audio Foley:** Triggers zero-latency procedural Web Audio cues (`playSoftTap()`, `playWaxSealCrack()`, `playPenNibScritch()`).

---

## 3. Implemented Visual Elements & Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                ANTIQUE WRITING DESK                                    │
│                                                                                        │
│  [COFFEE PATINA]                                                 [KEAPSAKE STAMPS]     │
│   (Dried Ring)                                                    Moon 32¢ & Rose 29¢  │
│                                                                   (Reveals Photos)     │
│                                                                                        │
│                             MASTER FOUNTAIN PEN & REST                                 │
│                           (Black Lacquer & 18K Gold Nib)                               │
│                                          ▲ (Hover Tilt Synergy)                        │
│                                          │                                             │
│                       [UNSENT AIRMAIL LETTER TO LUNA]                                  │
│                 Par Avion Chevron Border · Wax Seal · Address                          │
│                                                                                        │
│                     ┌────────────────────────────────────┐                             │
│                     │       24 PHYSICAL LETTER CARDS     │                             │
│                     │         (3-Column Desk Grid)       │                             │
│                     └────────────────────────────────────┘                             │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Feature A: Top-Right Keepsake Stamps & Photograph Reveal
* **Location:** Top-right corner of the Table of Contents desk blotter ([`toc.html`](file:///g:/projects/manuscript/toc.html)).
* **Dimensions:** `320px × 187px` SVG container with responsive scaling (`260px × 152px` on mobile).
* **Artwork & Vector Details:**
  1. **Stamp 1 (32¢ Celestial Moon Stamp):**
     - Dimensions: `84 × 104`, tilted `-3.5°`.
     - Palette: Deep navy night sky (`#121B2B`), warm gold border (`#8A6D3B`), twinkling stars (`#FCEAB8`), and a metallic gold gradient crescent moon (`#stampGold`).
     - Typography: `USA 32¢` in Courier Prime + `1996 · CELESTIAL` in Fraunces italic.
  2. **Stamp 2 (29¢ Crimson Rose Botanical Stamp):**
     - Dimensions: `76 × 92`, tilted `+4.2°` (overlapping Stamp 1).
     - Palette: Rich wine velvet crimson (`#58111A`), gold border (`#C9A24B`), botanical green stem (`#4A6B42`), and engraved rose petals (`#841B2D` / `#9E2235`).
     - Typography: `29¢` in Courier Prime + `ARCHIVE` in Fraunces italic.
  3. **Circular Franking Cancellation Postmark:**
     - Black ink cancellation circle stamped across *both* stamps: `14 OCT 1996 · POSTAL KEEPSAKE`.
     - Four wavy ink cancellation lines (`#ink-bleed` filter with `mix-blend-mode: multiply`).
* **Luna Mode Photo Transition:**
  - Standard state: Illustrated vector artwork is visible (`opacity: 1`).
  - Luna Mode state: Illustrated artwork cross-fades out (`opacity: 0`), revealing two authentic photographs inside the stamp frames:
    - **Large Moon Stamp:** Reveals [`images/luna/pic in larger one.jpg`](file:///g:/projects/manuscript/images/luna/pic%20in%20larger%20one.jpg).
    - **Small Rose Stamp:** Reveals [`images/luna/pic in smaller one.jpg`](file:///g:/projects/manuscript/images/luna/pic%20in%20smaller%20one.jpg).
  - **Framing & Aspect Ratio:** Configured with `preserveAspectRatio="xMidYMin slice"`, ensuring images anchor at the top edge of the frame while naturally cropping excess height at the bottom.
  - **Clean Paper Aesthetic:** Free from artificial digital glows or harsh drop-shadow halos, preserving authentic aged paper texture.

---

### 3.2 Feature B: The Unsent Airmail Letter to Luna (Desk Centerpiece)
* **Location:** Positioned prominently on the desk blotter between the Master Fountain Pen and the 24 Letter Cards grid.
* **Visual Structure:**
  1. **Diagonal Airmail Border (`Par Avion`):**
     - Authentic repeating diagonal chevron border with alternating deep crimson (`#9E2235`), aged cream cotton (`#FAF3E3`), and naval blue (`#1D3557`).
  2. **Airmail Header & Postal Stamp:**
     - Dark navy `PAR AVION · AIR MAIL` postal badge with airplane icon.
     - Miniature 32¢ Celestial Moon stamp with circular cancellation mark stamped: `14 OCT 1996 · UNCLAIMED`.
  3. **Handwritten Address Block:**
     - Recipient label: `To:`
     - Name: **`Luna`** rendered in bold, warm fountain pen cursive (*Caveat*, `2.4rem`).
     - Subtext: *“The muse for whom all twenty-four were written”*
     - Archival Tag: `✦ PRESERVED IN SILENCE · NEVER DISPATCHED · AUTUMN 1996 ✦`
  4. **Interactive Wax Seal Prompt:**
     - Wax seal button pill: `☽ Break Seal & Read Unsent Letter →`
* **Pen Animation Synergy:**
  - Hovering the Airmail Envelope causes the 18K Gold and black lacquer fountain pen resting above to tilt (`translateY(-4px) rotate(-1.5deg)`), simulating the writer preparing to unseal the parchment.
* **Full Letter Reading Modal:**
  - Clicking the envelope plays the scratch of the pen nib (`playPenNibScritch()`) and cracking wax (`playWaxSealCrack()`).
  - Opens a full-screen, focused cotton letter modal with horizontal ruled notebook lines and typewriter dateline (*"October 14, 1996 · St. Paul · 2:40 AM"*).
  - **Letter Content:**
    > *“Dear Luna,*
    > 
    > *If you ever find your way to this page, it means you typed the name that lives quietly between every line of these twenty-four letters.*
    > 
    > *I wrote all of them during the long winter nights when the silence in my room grew too loud. I never gave them to you, and I never will. Some feelings are too fragile for daylight, and having you as a friend—warm, laughing, and present in this world—mattered infinitely more to me than burdening you with something you could never return.*
    > 
    > *So instead of speaking words that might build a wall between us, I built an archive. A quiet manuscript where the moments we shared don’t have to fade: the walks in the biting rain, the way your voice carried over the cold streets, and the quiet realization that some people are meant to be cherished from a careful, reverent distance.*
    > 
    > *You will live your life, and I will live mine. But should you ever wonder if anyone in this wide, indifferent world looked at you and saw something truly sacred—let these twenty-four poems be your quiet proof.*
    > 
    > *Take care of your heart, always.*
    > 
    > *Yours in quiet devotion,*  
    > *— The Author”*
  - Closing the modal softly folds the paper back with `playPaperTurn()`.

---

### 3.3 Feature C: Expanded 3-Column Desk Grid Architecture
* **Container Dimensions:** `.desk` expanded to `max-width: 1480px; width: 95%`.
* **Grid Hierarchy:**
  - **Desktop:** `repeat(3, minmax(0, 1fr))` providing ~420px of width per letter card.
  - **Tablet (`<= 1024px`):** `repeat(2, minmax(0, 1fr))`.
  - **Mobile (`<= 680px`):** `1fr`.
* **Dynamic Sibling Twine Physics:** Red connection strings (`eyelet-09` ↔ `eyelet-10` and `eyelet-11` ↔ `eyelet-12`) and the scorched sea arc dynamically compute sag and catenary arcs across the wider 3-column layout.

---

## 4. Comprehensive Roadmap & Future Design Concepts

The following features are fully conceptualized and ready for modular implementation to expand Luna Mode across the entire manuscript:

```
                      ┌────────────────────────────────────────┐
                      │        LUNA MODE ROADMAP DOMAINS       │
                      └───────────────────┬────────────────────┘
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        ▼                                 ▼                                 ▼
┌──────────────┐                  ┌──────────────┐                  ┌──────────────┐
│  TYPOGRAPHIC │                  │   PHYSICAL   │                  │  ATMOSPHERIC │
│  MARGINALIA  │                  │   KEEPSAKES  │                  │  ILLUSTRATED │
└──────────────┘                  └──────────────┘                  └──────────────┘
 - Handwritten P.S.                - 24 Card Artifacts               - Scene Illustrations
 - Raw Strikethroughs              - Polaroid 3D Flips               - Midnight Studio Light
 - Subtext Whispers                - Mixtape Cassette                - Darkroom Development
 - Vintage Timestamps              - Darkroom Contact Sheet          - Lunar Watermarks
```

---

### 4.1 Domain 1: Typographic & Marginalia Enhancements

#### Concept 1.1: The Handwritten `P.S.` (Postscripts on Every Letter)
* **Visual Design:** A faded indigo fountain pen or graphite pencil `P.S.` note appears at the bottom of each of the 24 poem letters, written informally in *Caveat* / *Yellowtail*.
* **Tone:** Conversational, vulnerable, capturing micro-memories.
* **Curated Examples across the 24 Letters:**
  - **№ 01 (Manuscript):** *“P.S. I spent three hours trying to write this first line without giving away who it was about.”*
  - **№ 06 (Dissection):** *“P.S. I still remember the exact pitch of your voice when you said you had to leave early.”*
  - **№ 11 (Every Winter):** *“P.S. You didn’t wear a scarf that day. I almost offered you mine, but I was afraid of what it would look like.”*
  - **№ 14 (Home):** *“P.S. I never wanted a castle or an empire. Just a quiet kitchen with you drinking tea across from me.”*
  - **№ 18 (Out of Frame):** *“P.S. The only good photo I have of you is blurry because my hands were shaking.”*
  - **№ 22 (Between Midnight & Sleep):** *“P.S. 3:17 AM. You were asleep two cities over, completely unaware that someone was keeping vigil for you.”*
  - **№ 24 (End):** *“P.S. Don't worry. I won't ever hand this to you. Some things are better left intact in the dark.”*

#### Concept 1.2: Raw First Draft Strikethroughs (The Editorial Mask)
* **Visual Design:** In poems, specific polished lines show a delicate red or pencil strike-through, with the unfiltered first draft written above in faint handwriting.
* **Examples:**
  - *Polished:* “The winter came early to the shoreline.”  
    *Raw Draft:* ~~The day you told me you were seeing someone else.~~
  - *Polished:* “I carved a quiet dwelling out of silence.”  
    *Raw Draft:* ~~I stopped texting you because waiting for a reply hurt too much.~~

#### Concept 1.3: Subtext Tooltips / "Whisper Annotations"
* **Visual Design:** Hovering or tapping loaded poetic phrases highlights the text with a soft tea-stained wash and displays an unobtrusive handwritten annotation floating beside the stanza.

---

### 4.2 Domain 2: Physical Desk Keepsakes & Relics

#### Concept 2.1: The 24 Unique Physical Artifacts on TOC Cards
In Luna Mode, each of the 24 cards on `toc.html` receives a dedicated, tactile vintage artifact clipped or taped to its corner:

| Card № | Title | Keepsake Artifact Attached in Luna Mode |
| :--- | :--- | :--- |
| **№ 01** | *Manuscript* | Brass paperclip pinning an old 1996 diner coffee receipt ($1.45). |
| **№ 03** | *From River to Winter* | Faded blue subway token glued to the card corner. |
| **№ 08** | *Starlight* | Blueprint cyanotype astronomical star chart stamped across the card. |
| **№ 11** | *Every Winter* | Real pressed cedar evergreen sprig secured with translucent yellowed tape. |
| **№ 15** | *Landscape* | Torn passenger train ticket stub (*Car 04 · Seat 12B · Autumn '96*). |
| **№ 18** | *Out of Frame* | Miniature black photo-mount corners with an authentic Polaroid snapshot. |
| **№ 21** | *Rage in a Cage* | Taut red embroidery thread wound three times around the card body. |
| **№ 22** | *Between Midnight & Sleep* | Purple ink rubber stamp of a clock face permanently stopped at `3:17 AM`. |

#### Concept 2.2: Interactive 3D "Flip the Photocard"
* **Visual Design:** Clicking either of the top-right keepsake stamps flips the photo in 3D space (`transform: rotateY(180deg)`).
* **Reverse Side Artwork:** Authentic 1990s Kodak paper back with silver watermark grid, developer grease marks, and handwritten pencil inscriptions:
  - *“St. Paul Riverfront · October 1996 · Kept safe, never returned.”*

#### Concept 2.3: 1996 Analog Cassette Mixtape (`Side A: For Luna`)
* **Visual Design:** A vintage transparent Maxell cassette tape rests in the lower tray of the desk blotter with handwritten Sharpie label: *“Side A: Autumn 1996 (For Luna)”*.
* **Interaction:** Clicking the cassette plays a soft mechanical tape head click (`playTapeHeadClick()`), begins spinning the tape spools, and adds a warm, subtle lo-fi tape hiss and ambient rain tone.

#### Concept 2.4: Archival Darkroom Contact Sheet (Photo Gallery)
* **Visual Design:** A black archival manila folder titled: *“LUNA · 1996 CONTACT SHEET (RESTRICTED)”*.
* **Interaction:** Unfolds into a full photographic darkroom proof sheet containing 6–8 monochrome 35mm film negatives and prints with red wax grease-pencil crop annotations.

---

### 4.3 Domain 3: Scene Illustrations & Atmospheric Transformations

#### Concept 3.1: Hand-Drawn Graphite & Watercolor Scene Backgrounds
* In normal mode, poem backgrounds are clean parchment.
* In Luna Mode, each poem displays a large, breathtaking hand-drawn sketch:
  - *Home:* Two steaming mugs on a rain-streaked windowsill.
  - *Between Midnight & Sleep:* A solitary lit telephone wire under a midnight canopy.
  - *Memoirs:* An empty park bench covered in fallen maple leaves.

#### Concept 3.2: Midnight Studio Lighting Shift
* **Visual Shift:**
  - The desk blotter transitions from antique bottle green (`#142218`) to **Midnight Navy Leather** (`#0D1520`).
  - An organic directional lamp cone / moonlight wash sweeps across the desk, casting realistic elongated shadows behind the fountain pen and paperweight.
  - Delicate starlight particles slowly drift in the dark periphery.

#### Concept 3.3: Darkroom Chemical Bath Development Animation
* When entering Luna Mode, photos do not appear abruptly. They undergo a **2.5-second Polaroid development simulation**:
  1. *0.0s – 0.8s:* Milky silver-sepia haze with high blur.
  2. *0.8s – 1.8s:* Midtone contrast surfaces and warm tones establish.
  3. *1.8s – 2.5s:* Crisp detail, paper grain, and full contrast lock into place.

#### Concept 3.4: Authentic October 14, 1996 Moon Phase Watermark (`☽`)
* On October 14, 1996, the moon was in a slender **Waxing Crescent**.
* In Luna Mode, an astronomical chart and celestial coordinate watermark (`RA 14h 22m / DEC -12°`) appears pressed into the cotton paper fiber across every letter.

---

## 5. File & Directory Reference

| File Path | Role & Implemented Luna Mode Components |
| :--- | :--- |
| [`toc.html`](file:///g:/projects/manuscript/toc.html) | Main Table of Contents desk, Unsent Airmail Envelope, Unsent Letter Modal, Top-Right Stamp Cluster. |
| [`assets/css/main.css`](file:///g:/projects/manuscript/assets/css/main.css) | All styling for Luna Mode triggers, airmail chevron borders, letter modal, stamp cross-fades, and 3-column grid. |
| [`assets/js/main.js`](file:///g:/projects/manuscript/assets/js/main.js) | Secret `luna` keystroke listener, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> shortcut, modal controls, Web Audio Foley engine. |
| [`images/luna/pic in larger one.jpg`](file:///g:/projects/manuscript/images/luna/pic%20in%20larger%20one.jpg) | High-resolution archival photograph for the large Moon stamp frame. |
| [`images/luna/pic in smaller one.jpg`](file:///g:/projects/manuscript/images/luna/pic%20in%20smaller%20one.jpg) | High-resolution archival photograph for the small Rose stamp frame. |

---

*“For you, I will destroy the universe — also for you, I can restore it.”*  
*— Manuscript, Letter № 01 (1996)*
