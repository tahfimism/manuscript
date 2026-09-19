/* =========================================================
   Manuscript cover — handdrawn canvas illustration
   No SVG. No polished shapes. Just ink, jitter, and wobble.

   Drawing principles:
   - Every line is drawn MULTIPLE TIMES with slight per-pass
     offset (simulates pen pressure / multiple drafts).
   - Each path is broken into many segments; every endpoint
     gets random jitter (simulates unsteady hand).
   - Endpoints drop ink-spots: small filled circles.
   - Circles are approximated by 24-48 chained segments with
     radial jitter, drawn 2-3 times at slightly different angles.
   - Ellipses (Saturn rings) are similar but with per-axis scale.
   - Paper grain laid down FIRST: layered low-opacity noise.
   ========================================================= */

(function () {
  const c = document.getElementById('coverCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');

  // ---- sizing ----
  let W = 0, H = 0, DPR = 1;
  function resize() {
    DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    const rect = c.getBoundingClientRect();
    W = Math.floor(rect.width);
    H = Math.floor(rect.height);
    c.width  = W * DPR;
    c.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    draw();
  }

  // ---- helpers ----
  const rand    = (a, b) => a + Math.random() * (b - a);
  const irand   = (a, b) => Math.floor(rand(a, b + 1));
  const choice  = arr => arr[(Math.random() * arr.length) | 0];
  const TAU     = Math.PI * 2;
  const RED     = '#8A1A20';
  const RED_DEEP= '#5A0A14';
  const INK     = '#F4ECD8';
  const INK_DIM = 'rgba(244,236,216,0.55)';

  // Single-jitter draw: every segment has a (1+jitter) scaling per axis
  function jitter(amount) { return (Math.random() - 0.5) * 2 * amount; }

  // --- Paper grain: low-opacity scattered dots all over ---
  function paperGrain() {
    // Subtle warm wash on dark red
    const g = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, Math.max(W, H) * 0.75);
    g.addColorStop(0,    '#7A1422');
    g.addColorStop(0.55, '#4A0810');
    g.addColorStop(1,    '#1A0408');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Noise / grain
    const grain = 1400;
    for (let i = 0; i < grain; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const a = Math.random() * 0.08;
      ctx.fillStyle = Math.random() > 0.6
        ? `rgba(244,236,216,${a * 0.5})`
        : `rgba(0,0,0,${a})`;
      ctx.fillRect(x, y, 1, 1);
    }
    // Subtle horizontal striations (paper fibers)
    ctx.globalAlpha = 0.04;
    ctx.strokeStyle = INK;
    ctx.lineWidth = 0.4;
    for (let i = 0; i < 40; i++) {
      const y = Math.random() * H;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y + (Math.random() - 0.5) * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // --- Wobbly line: from (x1,y1) to (x2,y2) with N segments, each endpoint jittered ---
  // Draws `passes` overlapping passes, each shifted slightly.
  function wobblyLine(x1, y1, x2, y2, opts) {
    const passes = opts?.passes ?? 2;
    const segs   = opts?.segs   ?? 14;
    const wob    = opts?.wob    ?? 1.4;
    const width  = opts?.width  ?? 1.2;
    const color  = opts?.color  ?? INK;
    const alpha  = opts?.alpha  ?? 0.85;
    const closed = opts?.closed ?? false;

    for (let p = 0; p < passes; p++) {
      const ox = jitter(0.6), oy = jitter(0.6);
      ctx.beginPath();
      for (let i = 0; i <= segs; i++) {
        const t  = i / segs;
        const px = x1 + (x2 - x1) * t + jitter(wob) + ox;
        const py = y1 + (y2 - y1) * t + jitter(wob) + oy;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      if (closed) ctx.closePath();
      ctx.lineWidth = width + jitter(0.3);
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Splatter: small filled dot near where the stroke ended, occasionally
      if (Math.random() < 0.35) {
        const sx = x2 + jitter(4);
        const sy = y2 + jitter(4);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha * 0.7;
        ctx.beginPath();
        ctx.arc(sx, sy, rand(0.4, 1.2), 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  // --- Wobbly polygon: closed shape with jittered vertices ---
  function wobblyPoly(points, opts) {
    const passes = opts?.passes ?? 2;
    const wob    = opts?.wob    ?? 1.2;
    const width  = opts?.width  ?? 1.2;
    const color  = opts?.color  ?? INK;
    const alpha  = opts?.alpha  ?? 0.85;

    for (let p = 0; p < passes; p++) {
      const ox = jitter(0.6), oy = jitter(0.6);
      ctx.beginPath();
      points.forEach((pt, i) => {
        const px = pt[0] + jitter(wob) + ox;
        const py = pt[1] + jitter(wob) + oy;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.lineWidth = width + jitter(0.3);
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // --- Wobbly circle: jittered chain of segs around (cx,cy,r) ---
  function wobblyCircle(cx, cy, r, opts) {
    const segs   = opts?.segs   ?? 36;
    const passes = opts?.passes ?? 3;
    const wob    = opts?.wob    ?? 0.8;
    const width  = opts?.width  ?? 1.3;
    const color  = opts?.color  ?? INK;
    const alpha  = opts?.alpha  ?? 0.85;

    for (let p = 0; p < passes; p++) {
      const phase = rand(0, TAU);
      const rJ = r + jitter(1.2);
      ctx.beginPath();
      for (let i = 0; i <= segs; i++) {
        const t = i / segs;
        const a = phase + t * TAU;
        const rr = rJ + jitter(wob);
        const px = cx + Math.cos(a) * rr + jitter(0.5);
        const py = cy + Math.sin(a) * rr + jitter(0.5);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.lineWidth = width + jitter(0.3);
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // --- Wobbly ellipse (rotated) ---
  function wobblyEllipse(cx, cy, rx, ry, rotDeg, opts) {
    const segs   = opts?.segs   ?? 48;
    const passes = opts?.passes ?? 3;
    const wob    = opts?.wob    ?? 0.7;
    const width  = opts?.width  ?? 1.2;
    const color  = opts?.color  ?? INK;
    const alpha  = opts?.alpha  ?? 0.85;
    const rot = rotDeg * Math.PI / 180;

    for (let p = 0; p < passes; p++) {
      const phase = rand(0, TAU);
      const rxJ = rx + jitter(1.5);
      const ryJ = ry + jitter(0.8);
      ctx.beginPath();
      for (let i = 0; i <= segs; i++) {
        const t  = i / segs;
        const a  = phase + t * TAU;
        const rxa = rxJ + jitter(wob);
        const rya = ryJ + jitter(wob);
        let px = Math.cos(a) * rxa;
        let py = Math.sin(a) * rya;
        // rotate
        const rx2 = px * Math.cos(rot) - py * Math.sin(rot);
        const ry2 = px * Math.sin(rot) + py * Math.cos(rot);
        px = cx + rx2 + jitter(0.5);
        py = cy + ry2 + jitter(0.5);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.lineWidth = width + jitter(0.3);
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // --- Ink splatter cluster: random dots of varying size near a point ---
  function splatter(cx, cy, count = 14, spread = 28, color = INK) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * TAU;
      const dist  = Math.pow(Math.random(), 1.7) * spread;
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;
      const r = rand(0.3, 1.6);
      ctx.fillStyle = color;
      ctx.globalAlpha = rand(0.3, 0.85);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fill();
    }
    // A few long-tail streaks
    for (let i = 0; i < 3; i++) {
      const x1 = cx + jitter(spread * 1.2);
      const y1 = cy + jitter(spread * 1.2);
      const len = rand(8, 24);
      const ang = Math.random() * TAU;
      const x2 = x1 + Math.cos(ang) * len;
      const y2 = y1 + Math.sin(ang) * len;
      wobblyLine(x1, y1, x2, y2, { passes: 1, segs: 4, wob: 0.7, width: rand(0.5, 1.1), color, alpha: 0.5 });
    }
    ctx.globalAlpha = 1;
  }

  // --- Crosshatch shading: sets of overlapping wobbly lines ---
  function crosshatch(cx, cy, rx, ry, opts) {
    const density = opts?.density ?? 10;   // how many lines
    const angle   = opts?.angle   ?? 0;
    const color   = opts?.color   ?? INK;
    const alpha   = opts?.alpha   ?? 0.35;
    const spread  = opts?.spread  ?? 1.0; // scaling factor of area
    const angRad = angle * Math.PI / 180;
    const dx = Math.cos(angRad), dy = Math.sin(angRad);
    const px = -dy, py = dx; // perpendicular
    for (let i = -density; i <= density; i++) {
      const t = i / density; // -1..1
      const ox = px * rx * spread * t;
      const oy = py * ry * spread * t;
      const x1 = cx + ox + dx * Math.max(rx, ry) * 1.4;
      const y1 = cy + oy + dy * Math.max(rx, ry) * 1.4;
      const x2 = cx + ox - dx * Math.max(rx, ry) * 1.4;
      const y2 = cy + oy - dy * Math.max(rx, ry) * 1.4;
      wobblyLine(x1, y1, x2, y2, { passes: 1, segs: 8, wob: 0.6, width: 0.6, color, alpha });
    }
  }

  // --- Star: a small 4-point sparkle with wobbly arms ---
  function star(cx, cy, r) {
    const arms = [
      [cx, cy - r,    cx, cy + r],
      [cx - r, cy,    cx + r, cy],
      // tiny diagonals
      [cx - r * 0.55, cy - r * 0.55, cx + r * 0.55, cy + r * 0.55],
      [cx - r * 0.55, cy + r * 0.55, cx + r * 0.55, cy - r * 0.55],
    ];
    arms.slice(0, 2).forEach(([x1, y1, x2, y2]) => {
      wobblyLine(x1, y1, x2, y2, { passes: 2, segs: 6, wob: 0.4, width: 1.1, alpha: 0.95 });
    });
    // tiny center dot
    ctx.fillStyle = INK;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.18, 0, TAU);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // --- Simple dot star ---
  function dotStar(cx, cy, r) {
    ctx.fillStyle = INK;
    ctx.globalAlpha = rand(0.5, 0.95);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // --- Saturn ring-segment: draws only the front half (passing in front of planet) ---
  function saturnFrontRing(cx, cy, rx, ry, rotDeg, color) {
    const rot = rotDeg * Math.PI / 180;
    const passes = 3;
    for (let p = 0; p < passes; p++) {
      const phase = rand(0, TAU);
      const rxJ = rx + jitter(1.4);
      const ryJ = ry + jitter(0.6);
      ctx.beginPath();
      // Only bottom arc (front of ring, passes in front of planet)
      const segs = 48;
      for (let i = 0; i <= segs; i++) {
        const t = i / segs;
        // Map to pi..2pi (bottom half) plus a touch of overlap
        const a = phase + Math.PI + t * Math.PI; // pi..2pi
        const rxa = rxJ + jitter(0.6);
        const rya = ryJ + jitter(0.4);
        let px = Math.cos(a) * rxa;
        let py = Math.sin(a) * rya;
        const rx2 = px * Math.cos(rot) - py * Math.sin(rot);
        const ry2 = px * Math.sin(rot) + py * Math.cos(rot);
        px = cx + rx2 + jitter(0.4);
        py = cy + ry2 + jitter(0.4);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.lineWidth = rand(1.0, 1.5);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.9;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // ========================================================
  // COMPOSITION — draw the cover
  // ========================================================
  function draw() {
    ctx.clearRect(0, 0, W, H);

    paperGrain();

    // Frame border (inset ~6%) — wobble it like it was inked by hand
    const pad = Math.min(W, H) * 0.06;
    wobblyPoly(
      [[pad, pad], [W - pad, pad], [W - pad, H - pad], [pad, H - pad]],
      { passes: 3, wob: 2.0, width: 1.8, color: INK, alpha: 0.85 }
    );
    // inner hairline just inside, offset by 10px
    const inner = pad + 10;
    wobblyPoly(
      [[inner, inner], [W - inner, inner], [W - inner, H - inner], [inner, H - inner]],
      { passes: 2, wob: 1.0, width: 0.7, color: INK, alpha: 0.55 }
    );

    // Title-block safe zone (top of canvas, where HTML title/subtitle/tagline/CTA sit).
    // We carve a "title well" — no stars/splatters/orbit lines drawn there.
    const titleWell = {
      top: pad + 30,
      bottom: H * 0.46,        // everything above this y is reserved for text
      left: pad + 30,
      right: W - pad - 30,
    };

    // ---- Saturn (BELOW the title well) ----
    // Pushed firmly into the lower-middle so it never crowds the text.
    const cx = W * 0.5;
    const cy = H * 0.72;
    const planetR = Math.min(W, H) * 0.11;   // slightly smaller
    const ringRX  = planetR * 1.95;
    const ringRY  = planetR * 0.42;

    // Back half of ring (behind the planet)
    saturnBackRing(cx, cy, ringRX, ringRY, -22, INK_DIM);

    // Planet body — wobbly circle + interior texture
    wobblyCircle(cx, cy, planetR, { passes: 3, segs: 56, wob: 0.7, width: 1.6, color: INK, alpha: 0.95 });
    // terminator (light/dark side hint)
    wobblyLine(
      cx + planetR * 0.18, cy - planetR * 0.96,
      cx + planetR * 0.32, cy + planetR * 0.94,
      { passes: 2, segs: 16, wob: 0.6, width: 0.9, color: INK, alpha: 0.5 }
    );
    // crosshatch shading on the dark side
    crosshatch(cx + planetR * 0.35, cy, planetR * 0.7, planetR * 1.0, { density: 8, angle: 60, alpha: 0.32 });

    // Front half of ring (passes in front of planet)
    saturnFrontRing(cx, cy, ringRX, ringRY, -22, INK);

    // small detail sparkles on ring edges
    star(cx + ringRX * 0.7, cy + ringRY * 0.55, 3);
    star(cx - ringRX * 0.6, cy - ringRY * 0.25, 2.5);

    // tiny moon to upper-left of planet + orbit hint
    const moonR = planetR * 0.12;
    const moonX = cx - planetR * 1.4;
    const moonY = cy - planetR * 0.9;
    wobblyCircle(moonX, moonY, moonR, { passes: 2, segs: 24, wob: 0.4, width: 1.0, color: INK, alpha: 0.8 });
    wobblyLine(
      moonX, moonY,
      cx + planetR * 1.6, cy + planetR * 0.3,
      { passes: 1, segs: 28, wob: 1.0, width: 0.6, color: INK, alpha: 0.35 }
    );

    // ---- Stars: scattered ONLY in the side margins + below the title well ----
    // Keeps the upper-center area completely clear for the brush-stroke title.
    let placed = 0;
    let safety = 0;
    while (placed < 26 && safety < 400) {
      safety++;
      const x = Math.random() * W;
      const y = Math.random() * H;
      // Reject points inside the title well
      if (x > titleWell.left && x < titleWell.right &&
          y > titleWell.top && y < titleWell.bottom) continue;
      // Reject points too close to Saturn
      if (Math.hypot(x - cx, y - cy) < planetR * 2.4) continue;
      // Reject points inside the frame border
      if (x < pad + 24 || x > W - pad - 24 || y < pad + 24 || y > H - pad - 24) continue;
      const isSparkle = Math.random() < 0.26;
      if (isSparkle) star(x, y, rand(2, 4.5));
      else dotStar(x, y, rand(0.6, 1.5));
      placed++;
    }

    // ---- Ink splatters — only in margins/bottom, NOT in title well ----
    splatter(W * 0.08, H * 0.95, 16, 30, INK);
    splatter(W * 0.92, H * 0.62, 14, 26, INK);
    splatter(W * 0.06, H * 0.72, 10, 22, INK);
    splatter(W * 0.94, H * 0.90, 12, 24, INK);

    // Handdrawn underline near the bottom (just below Saturn)
    wobblyLine(
      W * 0.30, H * 0.93,
      W * 0.70, H * 0.935,
      { passes: 2, segs: 60, wob: 1.4, width: 0.9, alpha: 0.45 }
    );
  }

  // back-half of ring (faint, behind the planet body)
  function saturnBackRing(cx, cy, rx, ry, rotDeg, color) {
    const rot = rotDeg * Math.PI / 180;
    const passes = 2;
    for (let p = 0; p < passes; p++) {
      const phase = rand(0, TAU);
      const rxJ = rx + jitter(1.6);
      const ryJ = ry + jitter(0.7);
      ctx.beginPath();
      const segs = 56;
      // Top half only (0..pi)
      for (let i = 0; i <= segs; i++) {
        const t = i / segs;
        const a = phase + t * Math.PI; // 0..pi
        const rxa = rxJ + jitter(0.6);
        const rya = ryJ + jitter(0.4);
        let px = Math.cos(a) * rxa;
        let py = Math.sin(a) * rya;
        const rx2 = px * Math.cos(rot) - py * Math.sin(rot);
        const ry2 = px * Math.sin(rot) + py * Math.cos(rot);
        px = cx + rx2 + jitter(0.4);
        py = cy + ry2 + jitter(0.4);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.lineWidth = rand(0.7, 1.0);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.55;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  resize();
  window.addEventListener('resize', resize);
})();
