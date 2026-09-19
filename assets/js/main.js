/* Manuscript — Procedural Atmospheres, Mobile Keepsake Dock & Transitions
   Lightweight, robust, and reduced-motion compliant (<500 lines). */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersReducedTransparency = window.matchMedia('(prefers-reduced-transparency: reduce)').matches;
  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);
  const particleScale = isMobile ? 0.45 : 1.0;

  /* ---------- 1. Page Transitions & Entry ---------- */
  document.querySelectorAll('a[data-turn]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (prefersReduced) return;
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript:')) return;
      const card = document.querySelector('.poem-card');
      if (!card) return;
      e.preventDefault();
      card.classList.add('poem-turn-out');
      setTimeout(() => { window.location.href = href; }, 440);
    });
  });

  if (!prefersReduced) {
    const card = document.querySelector('.poem-card');
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      requestAnimationFrame(() => {
        card.style.transition = 'opacity 500ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }
  }

  /* ---------- 2. Scene Toggle (Every Winter pair) ---------- */
  document.querySelectorAll('.scene-toggle').forEach((btn) => {
    const scene = document.querySelector('.poem__scene img');
    const scenePath = scene ? scene.getAttribute('src') : '';
    const family = document.body.getAttribute('data-family');
    btn.setAttribute('aria-pressed', 'false');

    btn.addEventListener('click', () => {
      const { alt: altScene, familyAlt, scene: curScene, family: curFamily } = btn.dataset;
      const label = btn.querySelector('.scene-toggle__label');
      if (!scene || !altScene || !familyAlt) return;

      const isCur = (scenePath.indexOf(curScene) !== -1) || (family === curFamily);
      if (!isCur) {
        scene.src = scene.src.replace(altScene, curScene);
        document.body.setAttribute('data-family', curFamily);
        if (label) label.textContent = curFamily === 'B-day' ? 'day' : 'night';
        btn.setAttribute('aria-pressed', 'false');
        return;
      }
      scene.src = scene.src.replace(curScene, altScene);
      document.body.setAttribute('data-family', familyAlt);
      if (label) label.textContent = familyAlt === 'B-day' ? 'day' : 'night';
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  /* ---------- 3. Mobile Keepsake Dock ---------- */
  (function setupKeepsakeDock() {
    let dock = document.querySelector('.keepsake-dock');
    const poemStage = document.querySelector('.poem-stage') || document.querySelector('.poem');

    if (!dock && poemStage) {
      const prev = document.querySelector('.poem__nav .back') || document.querySelector('.poem__nav a:first-child');
      const next = document.querySelector('a[data-turn]') || document.querySelector('.poem__nav a:last-child');
      const prevUrl = prev ? prev.getAttribute('href') : '../toc.html';
      const nextUrl = next ? next.getAttribute('href') : '../toc.html';
      const match = (document.querySelector('.poem__chapter')?.textContent || '').match(/№\s*([0-9A-Za-z]+)/);
      const chapter = match ? match[1] : '№';

      dock = document.createElement('nav');
      dock.className = 'keepsake-dock';
      dock.setAttribute('aria-label', 'Keepsake Navigation');
      dock.innerHTML = `
        <a href="${prevUrl}" id="dock-prev" class="dock-btn" title="Previous" aria-label="Previous poem"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></a>
        <a href="../toc.html" id="dock-desk" class="dock-btn dock-btn--desk" title="Desk" aria-label="Writing Desk"><span class="dock-seal-mark">${chapter}</span></a>
        <a href="${nextUrl}" id="dock-next" class="dock-btn" title="Next" aria-label="Next poem"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
      `;
      document.body.appendChild(dock);

      if (!document.getElementById('keepsake-dock-styles')) {
        const style = document.createElement('style');
        style.id = 'keepsake-dock-styles';
        style.textContent = `
          .keepsake-dock { position: fixed; bottom: clamp(16px, 3vh, 28px); left: 50%; transform: translate(-50%, 0); display: flex; align-items: center; gap: 16px; padding: 6px 14px; background: rgba(244,236,216,0.94); border: 1px solid rgba(60,42,30,0.22); border-radius: 999px; box-shadow: 0 8px 24px rgba(25,18,12,0.22); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); z-index: 1000; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease; }
          .keepsake-dock.dock--hidden { transform: translate(-50%, 75px); opacity: 0; pointer-events: none; }
          .dock-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; color: #3C2A1E; text-decoration: none; transition: transform 0.15s ease, background 0.2s ease; }
          .dock-btn:hover { transform: scale(1.08); background: rgba(60,42,30,0.08); }
          .dock-btn--desk { background: #8A1A20; color: #F4ECD8; box-shadow: 0 2px 6px rgba(138,26,32,0.4); }
          .dock-btn--desk:hover { background: #A02028; color: #FFFFFF; }
          .dock-seal-mark { font-family: var(--font-mono, monospace); font-size: 0.72rem; font-weight: 700; }
        `;
        document.head.appendChild(style);
      }
    }

    if (dock) {
      let lastY = window.scrollY;
      window.addEventListener('scroll', () => {
        const currY = window.scrollY;
        if (currY - lastY > 10 && currY > 80) dock.classList.add('dock--hidden');
        else if (currY - lastY < -6) dock.classList.remove('dock--hidden');
        lastY = currY;
      }, { passive: true });
    }
  })();

  /* ---------- 4. Canvas Procedural Atmospheres ---------- */
  (function setupCanvasFx() {
    const rawKind = (document.body.getAttribute('data-canvas') || '').trim().toLowerCase();
    if (!rawKind || prefersReducedTransparency) return;

    const aliasMap = {
      rain: 'rain-streaks', snow: 'nocturnal-blizzard', embers: 'embers-drift', candle: 'candle-flame',
      smoke: 'coffee-bleed', shimmer: 'river-current', fog: 'horizon-haze', aurora: 'watercolor-bloom',
      fireflies: 'scrapbook-sparkle', lightning: 'razor-shimmer', 'scalpel-glint': 'razor-shimmer',
      'memory-motes': 'scrapbook-sparkle', 'diamond-fall': 'nocturnal-blizzard', 'shore-drift': 'shoreline-tide',
      'calcified-ash': 'wire-vibrate', 'clock-pulse': 'clock-hand', dust: 'dawn-dust', 'ice-dust': 'frost-crystals'
    };
    const kind = aliasMap[rawKind] || rawKind;

    const scene = document.querySelector('.poem__scene') || document.querySelector('.cover__art') || document.querySelector('.desk') || document.body;
    if (!scene) return;

    let canvas = document.getElementById('poemCanvas') || scene.querySelector('canvas.poem__fx');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'poem__fx';
      canvas.setAttribute('aria-hidden', 'true');
      scene.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2)), w = 0, h = 0;

    function resize() {
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      const isFull = canvas.id === 'poemCanvas';
      const rect = isFull ? null : scene.getBoundingClientRect();
      w = Math.max(300, Math.floor(isFull ? window.innerWidth : rect.width));
      h = Math.max(200, Math.floor(isFull ? window.innerHeight : rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const css = getComputedStyle(document.body);
    const accent = (css.getPropertyValue('--scene-warm').trim() || '#C9A24B').replace(' ', '');
    const cool = (css.getPropertyValue('--scene-cool').trim() || '#6A88A8').replace(' ', '');
    const hex = (hStr, a = 1) => {
      const c = hStr.replace('#', '');
      const n = parseInt(c.length === 3 ? c.split('').map(x => x + x).join('') : c, 16);
      if (isNaN(n)) return `rgba(200,200,200,${a})`;
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    };

    let isVisible = true, animId = null;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((e) => {
        isVisible = e[0].isIntersecting;
        if (isVisible && !animId && !prefersReduced) animId = requestAnimationFrame(loop);
      }, { threshold: 0.05 }).observe(canvas);
    }

    let loop = () => {};
    function run(fn) {
      loop = () => { if (!isVisible) { animId = null; return; } fn(); if (!prefersReduced) animId = requestAnimationFrame(loop); };
      if (prefersReduced) fn(); else animId = requestAnimationFrame(loop);
    }

    const makeP = (n, init) => Array.from({ length: Math.floor(n * particleScale) }, init);

    const engines = {
      'stars': () => {
        const s = makeP(150, () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.3 + Math.random() * 1.4, c: ['#FFF', '#F4ECD8', '#A9C4E8', '#C9A24B'][Math.floor(Math.random() * 4)], ph: Math.random() * 6.28, sp: 0.01 + Math.random() * 0.02 }));
        run(() => {
          ctx.clearRect(0, 0, w, h);
          for (const p of s) {
            p.ph += p.sp; ctx.fillStyle = p.c; ctx.globalAlpha = 0.2 + 0.7 * (0.5 + 0.5 * Math.sin(p.ph));
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
            if (p.r > 1.1 && Math.sin(p.ph * 2) > 0.65) {
              ctx.strokeStyle = p.c; ctx.lineWidth = 0.4; ctx.beginPath();
              ctx.moveTo(p.x - p.r * 3.5, p.y); ctx.lineTo(p.x + p.r * 3.5, p.y);
              ctx.moveTo(p.x - p.r * 3.5); ctx.lineTo(p.x + p.r * 3.5); ctx.stroke();
            }
          }
          ctx.globalAlpha = 1;
        });
      },
      'celestial-spin': () => {
        let a = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); a += 0.001;
          [0.35, 0.52, 0.68].forEach((rx, i) => {
            ctx.save(); ctx.translate(w * 0.5, h * 0.5); ctx.rotate(0.25 * (i % 2 === 0 ? 1 : -1) + a * (i + 1) * 0.3);
            ctx.setLineDash([4, 6]); ctx.strokeStyle = hex(accent, 0.24); ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.ellipse(0, 0, w * rx, h * rx * 0.38, 0, 0, 6.28); ctx.stroke(); ctx.restore();
          });
        });
      },
      'river-current': () => {
        let t = 0; const lines = Math.floor(18 * particleScale);
        run(() => {
          ctx.clearRect(0, 0, w, h); t += 0.015; ctx.strokeStyle = hex(cool, 0.22); ctx.lineWidth = 0.85;
          for (let i = 0; i < lines; i++) {
            const by = (h / lines) * i; ctx.beginPath();
            for (let x = 0; x <= w; x += 12) { const y = by + Math.sin(x * 0.008 + t + i * 0.4) * 7; if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
            ctx.stroke();
          }
        });
      },
      'coffee-bleed': () => {
        let gr = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); gr = Math.min(1.0, gr + 0.003);
          const ox = w * 0.85, oy = h * 0.8, br = Math.min(w, h) * 0.22 * gr;
          const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, br);
          g.addColorStop(0, 'rgba(110,75,45,0.03)'); g.addColorStop(0.75, 'rgba(90,55,30,0.08)'); g.addColorStop(1, 'rgba(70,40,20,0.25)');
          ctx.fillStyle = g; ctx.beginPath();
          for (let th = 0; th <= 6.35; th += 0.1) { const r = br + Math.sin(th * 7) * 2.5; const px = ox + Math.cos(th) * r, py = oy + Math.sin(th) * r; if (th === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
          ctx.fill(); ctx.strokeStyle = 'rgba(75,42,22,0.32)'; ctx.lineWidth = 1.2; ctx.stroke();
        });
      },
      'beacon-sweep': () => {
        let ang = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); ang += 0.008; const bx = w * 0.5, by = h * 0.45, len = Math.max(w, h);
          ctx.save(); ctx.beginPath(); ctx.moveTo(bx, by); ctx.arc(bx, by, len, ang - 0.14, ang + 0.14); ctx.closePath();
          const gr = ctx.createRadialGradient(bx, by, 0, bx, by, len * 0.7); gr.addColorStop(0, 'rgba(255,245,210,0.35)'); gr.addColorStop(1, 'transparent');
          ctx.fillStyle = gr; ctx.fill(); ctx.restore();
        });
      },
      'razor-shimmer': () => {
        let gp = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); gp = (gp + 0.004) % 1.0;
          const x1 = w * 0.1, y1 = h * 0.35, x2 = w * 0.9, y2 = h * 0.65;
          ctx.strokeStyle = 'rgba(220,225,230,0.3)'; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
          const gx = x1 + (x2 - x1) * gp, gy = y1 + (y2 - y1) * gp;
          const rg = ctx.createRadialGradient(gx, gy, 0, gx, gy, 14); rg.addColorStop(0, '#FFF'); rg.addColorStop(1, 'transparent');
          ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(gx, gy, 14, 0, 6.28); ctx.fill();
        });
      },
      'scrapbook-sparkle': () => {
        const m = makeP(40, () => ({ x: Math.random() * w, y: Math.random() * h, r: 1.2 + Math.random() * 2.2, vy: 0.2 + Math.random() * 0.5, vx: -0.2 + Math.random() * 0.4, rot: Math.random() * 3.14, sp: 0.02 + Math.random() * 0.03 }));
        run(() => {
          ctx.clearRect(0, 0, w, h);
          for (const p of m) {
            p.y += p.vy; p.x += p.vx; p.rot += p.sp;
            if (p.y > h + 10) p.y = -10; if (p.x > w + 10) p.x = -10;
            ctx.save(); ctx.translate(p.x, p.y); ctx.scale(Math.cos(p.rot), 1);
            ctx.fillStyle = hex(accent, 0.7); ctx.beginPath(); ctx.arc(0, 0, p.r, 0, 6.28); ctx.fill(); ctx.restore();
          }
        });
      },
      'star-cascade': () => {
        const meteors = []; let fr = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); fr++;
          if (fr % 16 === 0 && Math.random() < 0.6) meteors.push({ x: Math.random() * w * 1.2, y: -20, len: 45 + Math.random() * 55, sp: 5 + Math.random() * 4, a: 0.75 });
          for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i]; m.x -= m.sp * 0.75; m.y += m.sp; m.a -= 0.015;
            if (m.a <= 0 || m.y > h + 50) { meteors.splice(i, 1); continue; }
            const gr = ctx.createLinearGradient(m.x, m.y, m.x + m.len * 0.75, m.y - m.len); gr.addColorStop(0, '#FFF'); gr.addColorStop(1, 'transparent');
            ctx.strokeStyle = gr; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x + m.len * 0.75, m.y - m.len); ctx.stroke();
          }
        });
      },
      'shoreline-tide': () => {
        let t = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); t += 0.012; const base = h * 0.76 + Math.sin(t) * 16;
          ctx.beginPath(); ctx.moveTo(0, h);
          for (let x = 0; x <= w; x += 12) ctx.lineTo(x, base + Math.sin(x * 0.012 + t * 2) * 5);
          ctx.lineTo(w, h); ctx.closePath(); ctx.fillStyle = hex('#A8C0D0', 0.12); ctx.fill();
          ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 0.9; ctx.stroke();
        });
      },
      'ash-drift': () => {
        const a = makeP(35, () => ({ x: Math.random() * w, y: Math.random() * h, vy: -0.4 - Math.random() * 0.7, ph: Math.random() * 6.28, r: 0.6 + Math.random() * 1.5 }));
        run(() => {
          ctx.clearRect(0, 0, w, h);
          for (const p of a) {
            p.y += p.vy; p.ph += 0.03; p.x += Math.sin(p.ph) * 0.5;
            if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
            ctx.fillStyle = '#A09890'; ctx.globalAlpha = 0.35 + 0.25 * Math.sin(p.ph);
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
          }
          ctx.globalAlpha = 1;
        });
      },
      'frost-crystals': () => {
        let g = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); g = Math.min(1.0, g + 0.003); ctx.strokeStyle = 'rgba(235,245,255,0.4)'; ctx.lineWidth = 0.8;
          for (let b = 0; b < 16; b++) { const bx = (w / 16) * b, len = 30 * g; ctx.beginPath(); ctx.moveTo(bx, h); ctx.lineTo(bx + (b % 2 === 0 ? 6 : -6), h - len); ctx.stroke(); }
        });
      },
      'nocturnal-blizzard': () => {
        const f = makeP(90, () => ({ x: Math.random() * w, y: Math.random() * h, vx: -1.2 - Math.random() * 1.5, vy: 1.5 + Math.random() * 2.5, r: 0.6 + Math.random() * 2.2 }));
        run(() => {
          ctx.clearRect(0, 0, w, h);
          for (const p of f) {
            p.x += p.vx; p.y += p.vy;
            if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w + 30; }
            if (p.x < -10) p.x = w + 10;
            ctx.fillStyle = '#FFF'; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
          }
          ctx.globalAlpha = 1;
        });
      },
      'watercolor-bloom': () => {
        let t = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); t += 0.008;
          const rad = ctx.createRadialGradient(w * 0.4, h * 0.5, 0, w * 0.4, h * 0.5, Math.min(w, h) * (0.35 + 0.05 * Math.sin(t)));
          rad.addColorStop(0, hex(accent, 0.12)); rad.addColorStop(0.7, hex(cool, 0.04)); rad.addColorStop(1, 'transparent');
          ctx.fillStyle = rad; ctx.fillRect(0, 0, w, h);
        });
      },
      'rain-streaks': () => {
        const d = makeP(65, () => ({ x: Math.random() * w, y: Math.random() * h, len: 12 + Math.random() * 16, vy: 8 + Math.random() * 6 }));
        run(() => {
          ctx.clearRect(0, 0, w, h); ctx.strokeStyle = hex(cool, 0.35); ctx.lineWidth = 0.85; ctx.lineCap = 'round';
          for (const p of d) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 1, p.y + p.len); ctx.stroke();
            p.y += p.vy; p.x -= 0.3; if (p.y > h + p.len) { p.y = -p.len; p.x = Math.random() * w; }
          }
        });
      },
      'horizon-haze': () => {
        let t = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); t += 0.005; const hy = h * 0.55 + Math.sin(t) * 12;
          const gr = ctx.createLinearGradient(0, hy - 60, 0, hy + 60); gr.addColorStop(0, 'transparent'); gr.addColorStop(0.5, 'rgba(235,230,220,0.18)'); gr.addColorStop(1, 'transparent');
          ctx.fillStyle = gr; ctx.fillRect(0, hy - 60, w, 120);
        });
      },
      'candle-flame': () => {
        let ft = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); ft += 0.05; const fl = 1.0 + Math.sin(ft * 3.2) * 0.025;
          const cx = w * 0.5, cy = h * 0.72, fh = 32 * fl, fw = 11 * fl;
          ctx.save(); ctx.translate(cx, cy);
          const halo = ctx.createRadialGradient(0, -fh * 0.3, 0, 0, -fh * 0.3, fh * 2.0); halo.addColorStop(0, 'rgba(255,190,90,0.4)'); halo.addColorStop(1, 'transparent');
          ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(0, -fh * 0.3, fh * 2.0, 0, 6.28); ctx.fill();
          ctx.fillStyle = 'rgba(255,140,40,0.85)'; ctx.beginPath(); ctx.ellipse(0, -fh * 0.4, fw * 1.1, fh * 0.9, 0, 0, 6.28); ctx.fill();
          ctx.fillStyle = '#FFFDE8'; ctx.beginPath(); ctx.ellipse(0, -fh * 0.2, fw * 0.45, fh * 0.4, 0, 0, 6.28); ctx.fill(); ctx.restore();
        });
      },
      'embers-drift': () => {
        const e = makeP(50, () => ({ x: Math.random() * w, y: h + Math.random() * 30, vy: -0.7 - Math.random() * 1.4, vx: -0.3 + Math.random() * 0.6, r: 0.5 + Math.random() * 1.6, ph: Math.random() * 6.28 }));
        run(() => {
          ctx.clearRect(0, 0, w, h);
          for (const p of e) {
            p.y += p.vy; p.ph += 0.05; p.x += p.vx + Math.sin(p.ph) * 0.5;
            if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
            const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.0); halo.addColorStop(0, '#FFE890'); halo.addColorStop(0.5, '#D05020'); halo.addColorStop(1, 'transparent');
            ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.0, 0, 6.28); ctx.fill();
          }
        });
      },
      'light-leak': () => {
        let t = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); t += 0.007; const p = 0.5 + 0.5 * Math.sin(t);
          const g = ctx.createRadialGradient(w, 0, 0, w, 0, w * 0.65);
          g.addColorStop(0, `rgba(255,170,70,${0.24 * p})`); g.addColorStop(1, 'transparent');
          ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        });
      },
      'vellum-shimmer': () => {
        let t = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); t += 0.01; const gr = ctx.createLinearGradient(0, 0, w, h); const o = (Math.sin(t) + 1) * 0.5;
          gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(o, 'rgba(255,250,235,0.08)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = gr; ctx.fillRect(0, 0, w, h);
        });
      },
      'ink-seep': () => {
        let rad = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); rad = Math.min(w * 0.25, rad + 0.05);
          const gr = ctx.createRadialGradient(w * 0.15, h * 0.85, 0, w * 0.15, h * 0.85, rad);
          gr.addColorStop(0, 'rgba(25,20,30,0.25)'); gr.addColorStop(1, 'transparent');
          ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(w * 0.15, h * 0.85, rad, 0, 6.28); ctx.fill();
        });
      },
      'wire-vibrate': () => {
        let wt = 0; const wires = [w * 0.25, w * 0.5, w * 0.75];
        run(() => {
          ctx.clearRect(0, 0, w, h); wt += 0.05; ctx.strokeStyle = hex('#8B2E2E', 0.35); ctx.lineWidth = 0.85;
          wires.forEach((wx, i) => {
            const amp = Math.sin(wt * 2.5 + i) * 2.0; ctx.beginPath();
            for (let y = 0; y <= h; y += 10) { const x = wx + Math.sin((y / h) * Math.PI) * amp; if (y === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
            ctx.stroke();
          });
        });
      },
      'clock-hand': () => {
        let ct = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); ct += 0.016; const cx = w * 0.82, cy = h * 0.25, r = Math.min(w, h) * 0.1;
          ctx.strokeStyle = hex(accent, 0.25); ctx.lineWidth = 1.0; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.28); ctx.stroke();
          const discreteSec = Math.floor(ct * 4.0) / 4.0; const ang = (discreteSec * 0.4) % 6.28;
          ctx.strokeStyle = '#8B2E2E'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ang) * r * 0.8, cy + Math.sin(ang) * r * 0.8); ctx.stroke();
        });
      },
      'blue-prism': () => {
        let pt = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h); pt += 0.012; ctx.strokeStyle = hex('#5CC8E6', 0.2); ctx.lineWidth = 1.0;
          for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            for (let x = 0; x <= w; x += 16) { const y = (h / 5) * i + Math.sin(x * 0.01 + pt + i) * 12; if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
            ctx.stroke();
          }
        });
      },
      'dawn-dust': () => {
        const d = makeP(25, () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.8 + Math.random() * 1.4, vy: -0.15 - Math.random() * 0.25, ph: Math.random() * 6.28 }));
        run(() => {
          ctx.clearRect(0, 0, w, h);
          for (const p of d) {
            p.y += p.vy; p.ph += 0.02; if (p.y < -10) p.y = h + 10;
            ctx.fillStyle = '#FFEAA0'; ctx.globalAlpha = 0.3 + 0.35 * Math.sin(p.ph);
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
          }
          ctx.globalAlpha = 1;
        });
      }
    };

    if (engines[kind]) {
      engines[kind]();
    }
  })();
})();
