/* Manuscript — cover unfold + page turn + day/night scene toggle + canvas FX */

(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersReducedTransparency = window.matchMedia('(prefers-reduced-transparency: reduce)').matches;

  /* ---------- Cover (no envelope in v2; enter is a direct link) ---------- */

  /* ---------- Page-turn between poems ---------- */
  const links = document.querySelectorAll('a[data-turn]');
  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      if (prefersReduced) return;
      const href = a.getAttribute('href');
      const card = document.querySelector('.poem-card');
      if (!card) { window.location.href = href; return; }

      e.preventDefault();
      card.classList.add('poem-turn-out');
      setTimeout(() => { window.location.href = href; }, 480);
    });
  });

  /* ---------- Poem entry fade-in ---------- */
  if (!prefersReduced) {
    const card = document.querySelector('.poem-card');
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      requestAnimationFrame(() => {
        card.style.transition = 'opacity 600ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }
  }

  /* ---------- Scene toggle (Every Winter pair) ----------
     A button with data-scene/data-alt (svg filenames) and
     data-family/data-family-alt (body[data-family] values).
     Clicking swaps the body's data-family and the scene <img>'s src,
     and updates aria-pressed + label text. */
  const toggles = document.querySelectorAll('.scene-toggle');
  toggles.forEach((btn) => {
    const scene = document.querySelector('.poem__scene img');
    const scenePath = scene ? scene.getAttribute('src') : '';
    const family = document.body.getAttribute('data-family');

    btn.setAttribute('aria-pressed', 'false');

    btn.addEventListener('click', () => {
      const altScene = btn.dataset.alt;
      const altFamily = btn.dataset.familyAlt;
      const currentScene = btn.dataset.scene;
      const currentFamily = btn.dataset.family;
      const label = btn.querySelector('.scene-toggle__label');

      if (!scene || !altScene || !altFamily) return;

      const isCurrent = (scenePath.indexOf(currentScene) !== -1) || (family === currentFamily);
      if (!isCurrent) {
        /* already swapped by some other means; force to current */
        scene.src = scene.src.replace(altScene, currentScene);
        document.body.setAttribute('data-family', currentFamily);
        if (label) label.textContent = currentFamily === 'B-day' ? 'day' : 'night';
        btn.setAttribute('aria-pressed', 'false');
        return;
      }

      scene.src = scene.src.replace(currentScene, altScene);
      document.body.setAttribute('data-family', altFamily);
      if (label) label.textContent = altFamily === 'B-day' ? 'day' : 'night';
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  /* =========================================================
     CANVAS FX OVERLAY — world-class procedural animation
     Set body[data-canvas="rain|snow|embers|smoke|stars|shimmer|candle|fog|aurora|fireflies|lightning"]
     and a single <canvas class="poem__fx"> overlay is created
     inside .poem__scene with the requested effect.

     If prefers-reduced-motion, only static "frozen" effects render
     (single frame drawn, no animation loop).
     ========================================================= */
  function setupCanvasFx() {
    const kind = document.body.getAttribute('data-canvas');
    if (!kind) return;
    if (prefersReducedTransparency) return; // respect reduced transparency

    const scene = document.querySelector('.poem__scene') || document.querySelector('.cover__art');
    if (!scene) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'poem__fx';
    scene.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    let w = 0, h = 0;

    function resize() {
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      const rect = scene.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const css = getComputedStyle(document.body);
    const accent = (css.getPropertyValue('--scene-warm').trim() || '#fff').replace(' ', '');
    const cool = (css.getPropertyValue('--scene-cool').trim() || '#888').replace(' ', '');
    const glow = (css.getPropertyValue('--scene-glow').trim() || 'rgba(255,255,255,0.5)');

    const rand = (a, b) => a + Math.random() * (b - a);
    const rgba = (r, g, b, a = 1) => `rgba(${r|0},${g|0},${b|0},${a})`;
    const hex = (h, a = 1) => {
      const n = parseInt(h.replace('#', ''), 16);
      const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
      return rgba(r, g, b, a);
    };

    /* ---------- RAIN (with depth, splashes, gusts) ---------- */
    if (kind === 'rain') {
      const drops = [];
      const layers = [
        { count: 60, vyBase: 9,  len: 18, alpha: 0.18, width: 0.6, blur: false }, // far
        { count: 50, vyBase: 13, len: 14, alpha: 0.32, width: 0.9, blur: false }, // mid
        { count: 30, vyBase: 18, len: 10, alpha: 0.5,  width: 1.2, blur: true  }, // near (motion blur)
      ];
      for (const L of layers) {
        for (let i = 0; i < L.count; i++) {
          drops.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vy: L.vyBase + Math.random() * 4,
            len: L.len * (0.7 + Math.random() * 0.6),
            alpha: L.alpha * (0.6 + Math.random() * 0.5),
            slant: -1.4 + Math.random() * 0.4,
            width: L.width,
            layer: L,
          });
        }
      }
      const splashes = [];
      let gust = 0;
      let frameCount = 0;
      function frame() {
        ctx.clearRect(0, 0, w, h);
        frameCount++;
        gust = Math.sin(frameCount * 0.008) * 0.6;
        // Draw drops
        for (const d of drops) {
          ctx.globalAlpha = d.alpha;
          ctx.strokeStyle = cool;
          ctx.lineWidth = d.width;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + d.slant * d.len * 0.4 + gust * 2, d.y + d.len);
          ctx.stroke();
          d.x += d.slant * 0.4 + gust * 0.3;
          d.y += d.vy;
          if (d.y > h - 10 && Math.random() < 0.04) {
            splashes.push({ x: d.x, y: h - 8 + Math.random() * 6, r: 0.6 + Math.random() * 1.4, life: 0, max: 12 + Math.random() * 8 });
          }
          if (d.y > h + d.len) {
            d.y = -d.len;
            d.x = Math.random() * w;
          }
          if (d.x < -30) d.x = w + 30;
          if (d.x > w + 30) d.x = -30;
        }
        // Splashes (small ripples)
        for (let i = splashes.length - 1; i >= 0; i--) {
          const s = splashes[i];
          s.life += 1;
          const t = s.life / s.max;
          if (t >= 1) { splashes.splice(i, 1); continue; }
          ctx.globalAlpha = (1 - t) * 0.5;
          ctx.strokeStyle = cool;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.ellipse(s.x, s.y, s.r * (1 + t * 3), s.r * 0.6 * (1 + t), 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        if (!prefersReduced) requestAnimationFrame(frame);
      }
      frame();
      return;
    }

    /* ---------- SNOW (with flakes, drifts, accumulation) ---------- */
    if (kind === 'snow') {
      const flakes = [];
      const N = 120;
      for (let i = 0; i < N; i++) {
        const depth = Math.random(); // 0=far, 1=near
        flakes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + depth * 2.8,
          vy: 0.3 + depth * 1.6,
          vx: -0.4 + Math.random() * 0.8,
          a: 0.35 + depth * 0.55,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.012 + Math.random() * 0.02,
          depth,
          spin: Math.random() * Math.PI * 2,
          spinSpeed: 0.005 + Math.random() * 0.02,
        });
      }
      const accumPts = []; // snow accumulation on ground
      let gustDir = 0;
      let frameN = 0;
      function frame() {
        ctx.clearRect(0, 0, w, h);
        frameN++;
        gustDir = Math.sin(frameN * 0.005) * 1.2 + Math.sin(frameN * 0.013) * 0.6;
        for (const f of flakes) {
          f.phase += f.phaseSpeed;
          f.spin += f.spinSpeed;
          const sway = Math.sin(f.phase) * (0.5 + f.depth * 1.2);
          // Glow halo for big flakes
          if (f.r > 2) {
            const g = ctx.createRadialGradient(f.x + sway, f.y, 0, f.x + sway, f.y, f.r * 2.5);
            g.addColorStop(0, rgba(255, 255, 255, f.a * 0.4));
            g.addColorStop(1, rgba(255, 255, 255, 0));
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(f.x + sway, f.y, f.r * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = f.a;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(f.x + sway, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
          // Tiny crystalline sparkle on large flakes occasionally
          if (f.r > 2.2 && Math.sin(f.spin) > 0.8) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(f.x + sway - f.r * 1.8, f.y);
            ctx.lineTo(f.x + sway + f.r * 1.8, f.y);
            ctx.moveTo(f.x + sway, f.y - f.r * 1.8);
            ctx.lineTo(f.x + sway, f.y + f.r * 1.8);
            ctx.stroke();
          }
          f.x += f.vx + sway * 0.3 + gustDir * f.depth * 0.5;
          f.y += f.vy + (f.depth > 0.7 ? Math.abs(gustDir) * 0.2 : 0);
          if (f.y > h - 6) {
            // accumulate
            accumPts.push({ x: f.x + sway, y: h - 4 + Math.random() * 6, r: f.r * 0.6 });
            if (accumPts.length > 200) accumPts.shift();
            f.y = -f.r;
            f.x = Math.random() * w;
          }
          if (f.x < -10) f.x = w + 10;
          if (f.x > w + 10) f.x = -10;
        }
        // Draw accumulated snow on ground
        ctx.globalAlpha = 1;
        for (const p of accumPts) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        if (!prefersReduced) requestAnimationFrame(frame);
      }
      frame();
      return;
    }

    /* ---------- EMBERS (with wind drift, glow halos, sparks) ---------- */
    if (kind === 'embers') {
      const embers = [];
      const N = 80;
      for (let i = 0; i < N; i++) {
        embers.push({
          x: Math.random() * w,
          y: h + Math.random() * 40,
          vy: -0.6 - Math.random() * 1.8,
          vx: -0.5 + Math.random() * 1.0,
          r: 0.4 + Math.random() * 1.8,
          a: 0.4 + Math.random() * 0.6,
          hue: Math.random() > 0.4 ? accent : '#F8B85C',
          life: Math.random() * 300,
          maxLife: 200 + Math.random() * 200,
          wobble: Math.random() * Math.PI * 2,
        });
      }
      const sparks = [];
      let frameN = 0;
      let windX = 0;
      function frame() {
        ctx.clearRect(0, 0, w, h);
        frameN++;
        windX = Math.sin(frameN * 0.005) * 0.6 + Math.sin(frameN * 0.019) * 0.3;
        for (const e of embers) {
          e.life += 1;
          e.wobble += 0.08;
          const fadeIn = Math.min(1, e.life / 30);
          const fadeOut = Math.max(0, 1 - (e.life / e.maxLife));
          const lifeAlpha = fadeIn * fadeOut;
          e.x += e.vx + windX + Math.sin(e.wobble) * 0.4;
          e.y += e.vy + Math.cos(e.wobble * 0.7) * 0.1;
          // Outer halo
          const halo = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 6);
          halo.addColorStop(0, hex(e.hue, lifeAlpha * 0.7));
          halo.addColorStop(0.4, hex(e.hue, lifeAlpha * 0.25));
          halo.addColorStop(1, rgba(0, 0, 0, 0));
          ctx.globalAlpha = lifeAlpha;
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.r * 6, 0, Math.PI * 2);
          ctx.fill();
          // Mid glow
          const glow2 = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 2.5);
          glow2.addColorStop(0, hex(e.hue, lifeAlpha));
          glow2.addColorStop(1, rgba(0, 0, 0, 0));
          ctx.fillStyle = glow2;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.r * 2.5, 0, Math.PI * 2);
          ctx.fill();
          // Core
          ctx.fillStyle = e.hue;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
          ctx.fill();
          // Bright white core for hot embers
          if (e.r > 1.2) {
            ctx.fillStyle = '#FFFAEC';
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.r * 0.35, 0, Math.PI * 2);
            ctx.fill();
          }
          if (e.life > e.maxLife || e.y < -20) {
            e.x = Math.random() * w;
            e.y = h + 10 + Math.random() * 30;
            e.life = 0;
            e.maxLife = 200 + Math.random() * 200;
          }
        }
        // Occasional sparks (bright quick streaks)
        if (frameN % 12 === 0) {
          sparks.push({
            x: Math.random() * w,
            y: h + 10,
            vx: -2 + Math.random() * 4,
            vy: -4 - Math.random() * 3,
            life: 0,
            max: 15 + Math.random() * 10,
            hue: '#FFE680',
          });
        }
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.life += 1;
          if (s.life > s.max) { sparks.splice(i, 1); continue; }
          const t = s.life / s.max;
          ctx.globalAlpha = (1 - t);
          ctx.strokeStyle = s.hue;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 4, s.y - s.vy * 4);
          ctx.stroke();
          s.x += s.vx;
          s.y += s.vy;
        }
        ctx.globalAlpha = 1;
        if (!prefersReduced) requestAnimationFrame(frame);
      }
      frame();
      return;
    }

    /* ---------- SMOKE (with turbulence, multi-layer wisps) ---------- */
    if (kind === 'smoke') {
      const puffs = [];
      const N = 50;
      const sourceX = w * 0.18;
      const sourceY = h * 0.85;
      for (let i = 0; i < N; i++) {
        puffs.push({
          x: sourceX + Math.random() * 12 - 6,
          y: sourceY,
          r: 3 + Math.random() * 7,
          vx: -0.1 + Math.random() * 0.5,
          vy: -0.4 - Math.random() * 0.7,
          a: 0.08 + Math.random() * 0.18,
          life: Math.random() * 200,
          max: 150 + Math.random() * 150,
          swirl: Math.random() * Math.PI * 2,
        });
      }
      let frameN = 0;
      function frame() {
        ctx.clearRect(0, 0, w, h);
        frameN++;
        const turbulence = Math.sin(frameN * 0.01) * 0.3;
        for (const p of puffs) {
          p.life += 1;
          p.swirl += 0.04;
          if (p.life > p.max) {
            p.x = sourceX + Math.random() * 12 - 6;
            p.y = sourceY;
            p.r = 3 + Math.random() * 7;
            p.life = 0;
            p.max = 150 + Math.random() * 150;
            p.a = 0.08 + Math.random() * 0.18;
          }
          const fade = Math.sin((p.life / p.max) * Math.PI); // bell curve
          const expansion = p.r + p.life * 0.06;
          // Soft outer halo
          ctx.globalAlpha = p.a * fade * 0.4;
          ctx.fillStyle = '#5A5048';
          ctx.beginPath();
          ctx.arc(p.x + p.life * 0.4 + Math.sin(p.swirl) * 4, p.y - p.life * 0.2, expansion * 1.6, 0, Math.PI * 2);
          ctx.fill();
          // Mid smoke
          ctx.globalAlpha = p.a * fade * 0.7;
          ctx.fillStyle = '#3A3028';
          ctx.beginPath();
          ctx.arc(p.x + p.life * 0.5 + Math.sin(p.swirl) * 6, p.y - p.life * 0.25, expansion, 0, Math.PI * 2);
          ctx.fill();
          // Inner darker core
          ctx.globalAlpha = p.a * fade * 0.5;
          ctx.fillStyle = '#1A1208';
          ctx.beginPath();
          ctx.arc(p.x + p.life * 0.6 + Math.sin(p.swirl * 1.3) * 3, p.y - p.life * 0.3, expansion * 0.5, 0, Math.PI * 2);
          ctx.fill();
          p.x += p.vx + turbulence;
          p.y += p.vy;
        }
        ctx.globalAlpha = 1;
        if (!prefersReduced) requestAnimationFrame(frame);
      }
      frame();
      return;
    }

    /* ---------- STARS (twinkling + shooting stars + milky way) ---------- */
    if (kind === 'stars') {
      const stars = [];
      const N = 200;
      for (let i = 0; i < N; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.9,
          r: 0.2 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          speed: 0.005 + Math.random() * 0.03,
          base: 0.2 + Math.random() * 0.6,
          hue: Math.random() > 0.85 ? '#A9C4E8' : (Math.random() > 0.85 ? '#F4E8C8' : '#FFFFFF'),
        });
      }
      const shootingStars = [];
      let frameN = 0;
      function spawnShooting() {
        if (Math.random() < 0.005) {
          shootingStars.push({
            x: Math.random() * w * 0.7,
            y: Math.random() * h * 0.4,
            vx: 8 + Math.random() * 6,
            vy: 3 + Math.random() * 2,
            life: 0,
            max: 30 + Math.random() * 20,
          });
        }
      }
      function frame() {
        ctx.clearRect(0, 0, w, h);
        frameN++;
        spawnShooting();
        // Stars
        for (const s of stars) {
          s.phase += s.speed;
          const a = s.base + Math.sin(s.phase) * 0.3;
          // Glow halo for bright stars
          if (s.r > 1) {
            const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
            halo.addColorStop(0, hex(s.hue, a * 0.4));
            halo.addColorStop(1, rgba(0, 0, 0, 0));
            ctx.globalAlpha = a * 0.5;
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = a;
          ctx.fillStyle = s.hue;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
          // 4-point sparkle (cross)
          if (s.r > 1.0 && Math.sin(s.phase * 2) > 0.6) {
            ctx.globalAlpha = a * 0.6;
            ctx.strokeStyle = s.hue;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(s.x - s.r * 4, s.y);
            ctx.lineTo(s.x + s.r * 4, s.y);
            ctx.moveTo(s.x, s.y - s.r * 4);
            ctx.lineTo(s.x, s.y + s.r * 4);
            ctx.stroke();
          }
        }
        // Shooting stars
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          s.life += 1;
          if (s.life > s.max) { shootingStars.splice(i, 1); continue; }
          const t = s.life / s.max;
          const tailLen = 80;
          const tx = s.x - s.vx * (tailLen / 10);
          const ty = s.y - s.vy * (tailLen / 10);
          // Tail gradient
          const tail = ctx.createLinearGradient(tx, ty, s.x, s.y);
          tail.addColorStop(0, rgba(255, 255, 255, 0));
          tail.addColorStop(1, rgba(255, 240, 200, (1 - t)));
          ctx.strokeStyle = tail;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
          // Bright head
          ctx.fillStyle = '#FFFAEC';
          ctx.globalAlpha = 1 - t;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
          s.x += s.vx;
          s.y += s.vy;
        }
        ctx.globalAlpha = 1;
        if (!prefersReduced) requestAnimationFrame(frame);
      }
      frame();
      return;
    }

    /* ---------- SHIMMER (water surface, realistic ripples) ---------- */
    if (kind === 'shimmer') {
      const lines = [];
      const N = 30;
      for (let i = 0; i < N; i++) {
        lines.push({
          y: h * 0.5 + (i / N) * h * 0.5,
          amp: 0.5 + Math.random() * 2.5,
          freq: 0.006 + Math.random() * 0.012,
          phase: Math.random() * Math.PI * 2,
          speed: 0.008 + Math.random() * 0.025,
          alpha: 0.08 + Math.random() * 0.25,
          width: 0.4 + Math.random() * 1.0,
        });
      }
      const sparkles = [];
      let frameN = 0;
      function frame() {
        ctx.clearRect(0, 0, w, h);
        frameN++;
        // Wave lines
        for (const l of lines) {
          l.phase += l.speed;
          ctx.globalAlpha = l.alpha;
          ctx.strokeStyle = glow;
          ctx.lineWidth = l.width;
          ctx.beginPath();
          for (let x = 0; x <= w; x += 3) {
            const y = l.y + Math.sin(x * l.freq + l.phase) * l.amp +
                              Math.sin(x * l.freq * 2.3 + l.phase * 1.7) * l.amp * 0.3;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        // Sun glitter sparkles on the water surface
        if (frameN % 3 === 0) {
          const sx = w * 0.2 + Math.random() * w * 0.6;
          const sy = h * 0.55 + Math.random() * h * 0.4;
          sparkles.push({ x: sx, y: sy, r: 0.5 + Math.random() * 1.2, life: 0, max: 20 + Math.random() * 15 });
        }
        for (let i = sparkles.length - 1; i >= 0; i--) {
          const sp = sparkles[i];
          sp.life += 1;
          if (sp.life > sp.max) { sparkles.splice(i, 1); continue; }
          const t = sp.life / sp.max;
          ctx.globalAlpha = Math.sin(t * Math.PI);
          // Cross-shaped sparkle
          ctx.strokeStyle = glow;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(sp.x - sp.r * 3, sp.y);
          ctx.lineTo(sp.x + sp.r * 3, sp.y);
          ctx.moveTo(sp.x, sp.y - sp.r * 3);
          ctx.lineTo(sp.x, sp.y + sp.r * 3);
          ctx.stroke();
          // Bright center
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.r * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        if (!prefersReduced) requestAnimationFrame(frame);
      }
      frame();
      return;
    }

    /* ---------- CANDLE FLICKER (realistic flame with multi-layer halo) ---------- */
    if (kind === 'candle') {
      let t = 0;
      const cx = w * 0.5;
      const cy = h * 0.78;
      const particles = [];
      function frame() {
        ctx.clearRect(0, 0, w, h);
        t += 0.16;
        // Wind noise
        const wind = Math.sin(t * 1.2) * 0.08 + Math.sin(t * 2.7) * 0.04 + Math.sin(t * 5.3) * 0.02;
        const flicker = 1 + Math.sin(t * 4) * 0.08 + Math.sin(t * 11) * 0.04;
        // Flame teardrop shape
        const flameH = 38 * flicker;
        const flameW = 14 * flicker;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.transform(1 + wind, 0, 0, 1, 0, 0);
        // Outermost warm glow (large)
        const og = ctx.createRadialGradient(0, -flameH * 0.2, 0, 0, -flameH * 0.2, flameH * 1.4);
        og.addColorStop(0, 'rgba(255,180,80,0.7)');
        og.addColorStop(0.4, 'rgba(255,140,60,0.3)');
        og.addColorStop(1, 'rgba(255,80,40,0)');
        ctx.fillStyle = og;
        ctx.beginPath();
        ctx.arc(0, -flameH * 0.2, flameH * 1.4, 0, Math.PI * 2);
        ctx.fill();
        // Outer flame body (orange)
        const fg = ctx.createRadialGradient(0, 0, 0, 0, -flameH * 0.5, flameW * 1.4);
        fg.addColorStop(0, 'rgba(255,220,140,0.95)');
        fg.addColorStop(0.5, 'rgba(255,160,80,0.7)');
        fg.addColorStop(1, 'rgba(255,80,30,0)');
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.ellipse(0, -flameH * 0.4, flameW * 1.2, flameH * 1.1, 0, 0, Math.PI * 2);
        ctx.fill();
        // Mid flame (yellow)
        ctx.fillStyle = 'rgba(255,235,180,0.95)';
        ctx.beginPath();
        ctx.ellipse(0, -flameH * 0.2, flameW * 0.6, flameH * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        // Inner core (white)
        const cg = ctx.createRadialGradient(0, -flameH * 0.1, 0, 0, -flameH * 0.1, flameW * 0.5);
        cg.addColorStop(0, 'rgba(255,255,240,1)');
        cg.addColorStop(1, 'rgba(255,220,150,0)');
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.ellipse(0, -flameH * 0.1, flameW * 0.5, flameH * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        // Hot tip
        ctx.fillStyle = 'rgba(180,80,30,0.85)';
        ctx.beginPath();
        ctx.ellipse(0, -flameH * 0.8, flameW * 0.25, flameH * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        // Upward heat distortion line
        ctx.globalAlpha = 0.15;
        ctx.strokeStyle = 'rgba(255,200,140,0.4)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx, cy - flameH);
        for (let i = 0; i < 6; i++) {
          const dy = -flameH - i * 8;
          ctx.lineTo(cx + Math.sin(t + i * 0.5) * 2 + wind * 4, dy);
        }
        ctx.stroke();
        // Embers floating up
        if (Math.random() < 0.4) {
          particles.push({
            x: cx + (Math.random() - 0.5) * 6,
            y: cy - flameH * 0.5,
            vx: -0.3 + Math.random() * 0.6,
            vy: -0.8 - Math.random() * 0.6,
            r: 0.4 + Math.random() * 0.8,
            life: 0,
            max: 30 + Math.random() * 20,
          });
        }
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life += 1;
          if (p.life > p.max) { particles.splice(i, 1); continue; }
          const t2 = p.life / p.max;
          ctx.globalAlpha = (1 - t2) * 0.85;
          ctx.fillStyle = '#FFD680';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (1 - t2 * 0.5), 0, Math.PI * 2);
          ctx.fill();
          p.x += p.vx;
          p.y += p.vy;
        }
        ctx.globalAlpha = 1;
        if (!prefersReduced) requestAnimationFrame(frame);
      }
      frame();
      return;
    }

    /* ---------- FOG / MIST (drifting, soft, atmospheric) ---------- */
    if (kind === 'fog') {
      const puffs = [];
      const N = 25;
      for (let i = 0; i < N; i++) {
        puffs.push({
          x: Math.random() * w,
          y: h * 0.3 + Math.random() * h * 0.7,
          r: 60 + Math.random() * 120,
          vx: 0.2 + Math.random() * 0.4,
          a: 0.08 + Math.random() * 0.15,
          phase: Math.random() * Math.PI * 2,
        });
      }
      function frame() {
        ctx.clearRect(0, 0, w, h);
        for (const p of puffs) {
          p.phase += 0.005;
          ctx.globalAlpha = p.a * (0.7 + Math.sin(p.phase) * 0.3);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          g.addColorStop(0, rgba(255, 255, 255, 0.7));
          g.addColorStop(0.5, rgba(255, 255, 255, 0.3));
          g.addColorStop(1, rgba(255, 255, 255, 0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          p.x += p.vx;
          if (p.x - p.r > w) p.x = -p.r;
        }
        ctx.globalAlpha = 1;
        if (!prefersReduced) requestAnimationFrame(frame);
      }
      frame();
      return;
    }

    /* ---------- AURORA BOREALIS (curtains of light) ---------- */
    if (kind === 'aurora') {
      let t = 0;
      const curtains = [];
      for (let i = 0; i < 4; i++) {
        curtains.push({
          baseY: h * (0.2 + i * 0.12),
          ampY: h * 0.15,
          speed: 0.003 + Math.random() * 0.004,
          phase: Math.random() * Math.PI * 2,
          hue: ['#5CE68A', '#5CC8E6', '#A95CE6', '#5C8AE6'][i],
          alpha: 0.15 + Math.random() * 0.1,
        });
      }
      function frame() {
        ctx.clearRect(0, 0, w, h);
        t += 0.01;
        for (const c of curtains) {
          c.phase += c.speed;
          ctx.globalAlpha = c.alpha;
          ctx.fillStyle = c.hue;
          ctx.beginPath();
          ctx.moveTo(0, c.baseY);
          for (let x = 0; x <= w; x += 8) {
            const wave = Math.sin(x * 0.005 + c.phase) * c.ampY +
                         Math.sin(x * 0.013 + c.phase * 1.4) * c.ampY * 0.3;
            ctx.lineTo(x, c.baseY + wave);
          }
          ctx.lineTo(w, h);
          ctx.lineTo(0, h);
          ctx.closePath();
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        if (!prefersReduced) requestAnimationFrame(frame);
      }
      frame();
      return;
    }

    /* ---------- FIREFLIES (glowing dots with trails) ---------- */
    if (kind === 'fireflies') {
      const flies = [];
      const N = 35;
      for (let i = 0; i < N; i++) {
        flies.push({
          x: Math.random() * w,
          y: h * 0.3 + Math.random() * h * 0.6,
          vx: -0.3 + Math.random() * 0.6,
          vy: -0.2 + Math.random() * 0.4,
          r: 0.6 + Math.random() * 1.2,
          glowPhase: Math.random() * Math.PI * 2,
          glowSpeed: 0.02 + Math.random() * 0.03,
          trail: [],
        });
      }
      function frame() {
        ctx.clearRect(0, 0, w, h);
        for (const f of flies) {
          f.glowPhase += f.glowSpeed;
          const glow = (Math.sin(f.glowPhase) + 1) * 0.5; // 0-1
          const baseAlpha = 0.3 + glow * 0.7;
          // Trail
          f.trail.push({ x: f.x, y: f.y, life: 0 });
          if (f.trail.length > 8) f.trail.shift();
          for (let i = f.trail.length - 1; i >= 0; i--) {
            const t = f.trail[i];
            t.life += 1;
            const ti = i / f.trail.length;
            ctx.globalAlpha = baseAlpha * ti * 0.4;
            ctx.fillStyle = '#FFE680';
            ctx.beginPath();
            ctx.arc(t.x, t.y, f.r * ti, 0, Math.PI * 2);
            ctx.fill();
          }
          // Main glow halo
          const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 6);
          g.addColorStop(0, rgba(255, 240, 140, baseAlpha * 0.9));
          g.addColorStop(0.5, rgba(255, 220, 100, baseAlpha * 0.3));
          g.addColorStop(1, rgba(255, 200, 80, 0));
          ctx.globalAlpha = baseAlpha;
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r * 6, 0, Math.PI * 2);
          ctx.fill();
          // Bright core
          ctx.fillStyle = '#FFFAEC';
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
          // Movement with gentle drift
          f.x += f.vx + Math.sin(f.glowPhase * 0.5) * 0.3;
          f.y += f.vy + Math.cos(f.glowPhase * 0.7) * 0.2;
          if (f.x < 0) f.x = w;
          if (f.x > w) f.x = 0;
          if (f.y < h * 0.2) f.y = h * 0.8;
          if (f.y > h * 0.9) f.y = h * 0.3;
        }
        ctx.globalAlpha = 1;
        if (!prefersReduced) requestAnimationFrame(frame);
      }
      frame();
      return;
    }

    /* ---------- LIGHTNING (periodic flash + bolt) ---------- */
    if (kind === 'lightning') {
      let lastFlash = 0;
      let nextDelay = 60 + Math.random() * 200;
      let frameN = 0;
      let bolt = null;
      function frame() {
        ctx.clearRect(0, 0, w, h);
        frameN++;
        if (frameN - lastFlash > nextDelay) {
          lastFlash = frameN;
          nextDelay = 60 + Math.random() * 200;
          bolt = { life: 0, max: 4, segments: [] };
          // Generate bolt path
          let bx = Math.random() * w;
          let by = 0;
          while (by < h * 0.7) {
            const nx = bx + (Math.random() - 0.5) * 30;
            const ny = by + 20 + Math.random() * 30;
            bolt.segments.push({ x1: bx, y1: by, x2: nx, y2: ny });
            bx = nx; by = ny;
          }
        }
        if (bolt) {
          bolt.life += 1;
          const t = bolt.life / bolt.max;
          ctx.globalAlpha = (1 - t) * 0.95;
          ctx.strokeStyle = '#E8F4FF';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#A9C4E8';
          ctx.shadowBlur = 12;
          for (const seg of bolt.segments) {
            ctx.beginPath();
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
            ctx.stroke();
          }
          // Branch
          if (bolt.segments.length > 3 && Math.random() < 0.3) {
            const s = bolt.segments[Math.floor(Math.random() * bolt.segments.length)];
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(s.x2, s.y2);
            ctx.lineTo(s.x2 + (Math.random() - 0.5) * 30, s.y2 + 20 + Math.random() * 30);
            ctx.stroke();
          }
          ctx.shadowBlur = 0;
          if (bolt.life >= bolt.max) bolt = null;
        }
        // Sky flash (full scene)
        if (bolt && bolt.life < 2) {
          ctx.globalAlpha = 0.4;
          ctx.fillStyle = '#E8F4FF';
          ctx.fillRect(0, 0, w, h);
        }
        ctx.globalAlpha = 1;
        if (!prefersReduced) requestAnimationFrame(frame);
      }
      frame();
      return;
    }
  }

  setupCanvasFx();
})();
