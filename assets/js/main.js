/* Manuscript — Procedural Atmospheres, Mobile Keepsake Dock & Transitions
   Lightweight, robust, and reduced-motion compliant (<500 lines). */

(function () {
  'use strict';

  if (window.__manuscriptBooted) return;
  window.__manuscriptBooted = true;

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      const card = document.querySelector('.poem-card');
      if (card) {
        card.classList.remove('poem-turn-out');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    }
  });

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

  /* ---------- 0. Master SVG Filters Auto-Injection ---------- */
  (function injectMasterFilters() {
    if (document.getElementById('deckled-edge')) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'svg-filters');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;';
    svg.innerHTML = `
      <defs>
        <filter id="ink-bleed" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="74" result="fiber" />
          <feDisplacementMap in="SourceGraphic" in2="fiber" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="feathered" />
          <feGaussianBlur in="feathered" stdDeviation="0.45" result="absorbed" />
          <feComponentTransfer in="absorbed" result="density">
            <feFuncA type="linear" slope="1.4" intercept="-0.08" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="density" />
            <feMergeNode in="SourceGraphic" opacity="0.65" />
          </feMerge>
        </filter>
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
        <filter id="paper-tooth" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75 0.75" numOctaves="4" stitchTiles="stitch" result="tooth" />
          <feColorMatrix in="tooth" type="matrix" values="0 0 0 0 0.22  0 0 0 0 0.16  0 0 0 0 0.11  0 0 0 0.045 0" result="tintedTooth" />
        </filter>
        <filter id="wax-seal-filter" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="blur" />
          <feDiffuseLighting in="blur" surfaceScale="4.5" diffuseConstant="1.2" lighting-color="#FFEED8" result="diffuse">
            <feDistantLight azimuth="225" elevation="45" />
          </feDiffuseLighting>
          <feSpecularLighting in="blur" surfaceScale="5.5" specularConstant="1.3" specularExponent="22" lighting-color="#FFF8EE" result="specular">
            <feDistantLight azimuth="225" elevation="55" />
          </feSpecularLighting>
          <feComposite in="diffuse" in2="SourceGraphic" operator="in" result="diffuseGraphic" />
          <feBlend in="diffuseGraphic" in2="SourceGraphic" mode="multiply" result="shaded" />
          <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularCut" />
          <feBlend in="specularCut" in2="shaded" mode="screen" result="lit" />
          <feDropShadow dx="1.5" dy="3.5" stdDeviation="3.5" flood-color="#260408" flood-opacity="0.55" result="final" />
        </filter>
        <filter id="charred-edge" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.08" numOctaves="4" seed="88" result="burnNoise" />
          <feDisplacementMap in="SourceGraphic" in2="burnNoise" scale="5" xChannelSelector="R" yChannelSelector="G" result="burntShape" />
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#E25822" flood-opacity="0.7" result="glow" />
          <feDropShadow in="glow" dx="0" dy="1" stdDeviation="6" flood-color="#140602" flood-opacity="0.9" result="soot" />
          <feMerge>
            <feMergeNode in="soot" />
            <feMergeNode in="burntShape" />
          </feMerge>
        </filter>
      </defs>`;
    document.body.prepend(svg);
  })();

  /* ---------- 2. Ambient Soundscape ---------- */
  (function setupSoundscape() {
    try { localStorage.removeItem('manuscript_candlelight'); } catch (e) {}
    document.body.classList.remove('candlelight-active');

    const audioBtn = document.getElementById('dock-audio');

    // Ambient Soundscape via Web Audio API (Zero external assets, procedural vintage acoustics)
    if (audioBtn) {
      let audioCtx = null;
      let masterGain = null;
      let isPlaying = false;
      let soundGenerators = [];

      function stopSoundscape() {
        soundGenerators.forEach(g => {
          try { g.stop(); g.disconnect(); } catch (e) {}
        });
        soundGenerators = [];
        if (masterGain && audioCtx) {
          masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
        }
        isPlaying = false;
        audioBtn.setAttribute('aria-pressed', 'false');
      }

      function startSoundscape() {
        if (!audioCtx) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (!AudioContextClass) return;
          audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 1.2);
        masterGain.connect(audioCtx.destination);

        const canvasKind = (document.body.getAttribute('data-canvas') || '').trim().toLowerCase();

        // 1. Rain / River soundscape (Filtered pink/white noise with gentle water patter)
        if (canvasKind.includes('rain') || canvasKind.includes('river') || canvasKind.includes('tide')) {
          const bufferSize = audioCtx.sampleRate * 2;
          const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99 * b0 + white * 0.05;
            b1 = 0.95 * b1 + white * 0.08;
            b2 = 0.85 * b2 + white * 0.12;
            output[i] = (b0 + b1 + b2) * 0.4;
          }
          const whiteNoise = audioCtx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const filter = audioCtx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(750, audioCtx.currentTime);

          whiteNoise.connect(filter);
          filter.connect(masterGain);
          whiteNoise.start();
          soundGenerators.push(whiteNoise);
        }
        // 2. Winter / Blizzard wind drift (Filtered low-frequency wind breath)
        else if (canvasKind.includes('snow') || canvasKind.includes('blizzard') || canvasKind.includes('frost')) {
          const bufferSize = audioCtx.sampleRate * 2;
          const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) output[i] = (Math.random() * 2 - 1) * 0.3;
          const noise = audioCtx.createBufferSource();
          noise.buffer = noiseBuffer;
          noise.loop = true;

          const bandpass = audioCtx.createBiquadFilter();
          bandpass.type = 'bandpass';
          bandpass.frequency.setValueAtTime(320, audioCtx.currentTime);
          bandpass.Q.setValueAtTime(3.0, audioCtx.currentTime);

          noise.connect(bandpass);
          bandpass.connect(masterGain);
          noise.start();
          soundGenerators.push(noise);
        }
        // 3. Cosmic / Celestial harmonic drone (Warm ethereal fifths)
        else {
          const osc1 = audioCtx.createOscillator();
          const osc2 = audioCtx.createOscillator();
          const osc3 = audioCtx.createOscillator();
          osc1.type = 'sine';
          osc2.type = 'sine';
          osc3.type = 'triangle';
          osc1.frequency.setValueAtTime(146.83, audioCtx.currentTime);
          osc2.frequency.setValueAtTime(220.00, audioCtx.currentTime);
          osc3.frequency.setValueAtTime(440.00, audioCtx.currentTime);

          const droneGain = audioCtx.createGain();
          droneGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

          osc1.connect(droneGain);
          osc2.connect(droneGain);
          osc3.connect(droneGain);
          droneGain.connect(masterGain);

          osc1.start();
          osc2.start();
          osc3.start();
          soundGenerators.push(osc1, osc2, osc3);
        }

        isPlaying = true;
        audioBtn.setAttribute('aria-pressed', 'true');
      }

      audioBtn.addEventListener('click', () => {
        if (isPlaying) stopSoundscape();
        else startSoundscape();
      });
    }
  })();

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

    // Share Button Handling (IMP-11)
    const shareBtn = document.getElementById('dock-share');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const title = document.querySelector('.poem__title')?.textContent?.trim() || document.title || 'Manuscript';
        const url = window.location.href;
        if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
          try {
            await navigator.share({ title, url });
            return;
          } catch (err) {
            if (err.name !== 'AbortError') console.warn(err);
          }
        }
        try {
          await navigator.clipboard.writeText(url);
          const tooltip = shareBtn.querySelector('.dock-btn__tooltip');
          if (tooltip) {
            const originalText = tooltip.textContent;
            tooltip.textContent = 'Copied!';
            tooltip.style.color = '#8A6D3B';
            setTimeout(() => {
              tooltip.textContent = originalText;
              tooltip.style.color = '';
            }, 2000);
          }
          if ('vibrate' in navigator) navigator.vibrate(30);
        } catch (e) {
          prompt('Copy letter link:', url);
        }
      });
    }

    // Time-of-day atmospheric cue for the Every Winter diptych (IMP-04)
    const sceneToggle = document.querySelector('.scene-toggle');
    if (sceneToggle) {
      const hour = new Date().getHours();
      const isNightTime = hour < 6 || hour >= 18;
      const onDayPoem = window.location.pathname.endsWith('every-winter.html');
      const onNightPoem = window.location.pathname.endsWith('every-winter-free-fall.html');

      if (onDayPoem && isNightTime) {
        sceneToggle.setAttribute('title', 'It is nighttime outside · Switch to Free Fall (Night)');
        sceneToggle.classList.add('scene-toggle--time-hint');
      } else if (onNightPoem && !isNightTime) {
        sceneToggle.setAttribute('title', 'It is daylight outside · Switch to Every Winter (Day)');
        sceneToggle.classList.add('scene-toggle--time-hint');
      }

        sceneToggle.addEventListener('click', (e) => {
        if (prefersReduced) return;
        const href = sceneToggle.getAttribute('href');
        if (!href) return;
        const card = document.querySelector('.poem-card');
        if (card) {
          e.preventDefault();
          card.classList.add('poem-turn-out');
          setTimeout(() => { window.location.href = href; }, 380);
        }
      });
    }

    // Desktop Keyboard Navigation for Poems (ArrowLeft, ArrowRight, Escape)
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (document.querySelector('.epistolary-modal.is-open')) return;

      if (e.key === 'ArrowLeft') {
        const prev = document.getElementById('dock-prev') || document.querySelector('.poem__nav .back') || document.querySelector('.poem__nav a:first-child');
        if (prev && prev.getAttribute('href')) {
          e.preventDefault();
          window.location.href = prev.getAttribute('href');
        }
      } else if (e.key === 'ArrowRight') {
        const next = document.getElementById('dock-next') || document.querySelector('.poem__nav a[data-turn]') || document.querySelector('.poem__nav a:last-child');
        if (next && next.getAttribute('href')) {
          e.preventDefault();
          window.location.href = next.getAttribute('href');
        }
      } else if (e.key === 'Escape') {
        const desk = document.getElementById('dock-desk') || document.querySelector('.poem__nav .poem-nav__desk');
        if (desk && desk.getAttribute('href')) {
          e.preventDefault();
          window.location.href = desk.getAttribute('href');
        }
      }
    });
  })();

  /* ---------- 4. Canvas Procedural Atmospheres ---------- */
  (function setupCanvasFx() {
    const rawKind = (document.body.getAttribute('data-canvas') || '').trim().toLowerCase();
    if (!rawKind) return;

    const transparencyFactor = prefersReducedTransparency ? 0.45 : 1;

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
      const isFull = canvas.id === 'poemCanvas' || canvas.classList.contains('poem__canvas-layer') || canvas.classList.contains('poem__fx');
      w = Math.max(300, Math.floor(isFull ? window.innerWidth : (scene.getBoundingClientRect().width || window.innerWidth)));
      h = Math.max(200, Math.floor(isFull ? window.innerHeight : (scene.getBoundingClientRect().height || window.innerHeight)));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 60);
    }, { passive: true });
    window.addEventListener('orientationchange', resize, { passive: true });

    const css = getComputedStyle(document.body);
    const accent = (css.getPropertyValue('--scene-warm').trim() || '#C9A24B').replace(' ', '');
    const cool = (css.getPropertyValue('--scene-cool').trim() || '#6A88A8').replace(' ', '');
    const hex = (hStr, a = 1) => {
      const c = hStr.replace('#', '');
      const n = parseInt(c.length === 3 ? c.split('').map(x => x + x).join('') : c, 16);
      const finalA = a * transparencyFactor;
      if (isNaN(n)) return `rgba(200,200,200,${finalA})`;
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${finalA})`;
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

    const getDensity = (factor = 1) => {
      const area = w * h;
      const scale = Math.max(0.75, Math.min(2.2, area / 1200000));
      return scale * particleScale * factor;
    };
    const makeP = (n, init, factor = 1) => Array.from({ length: Math.max(12, Math.floor(n * getDensity(factor))) }, init);

    const engines = {
      'stars': () => {
        const s = makeP(150, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.5 + Math.random() * 1.5,
          c: ['#FFF', '#F4ECD8', '#A9C4E8', '#FFE082'][Math.floor(Math.random() * 4)],
          ph: Math.random() * 6.28,
          sp: 0.012 + Math.random() * 0.024
        }));
        run(() => {
          ctx.clearRect(0, 0, w, h);
          for (const p of s) {
            p.ph += p.sp;
            ctx.fillStyle = p.c;
            ctx.globalAlpha = 0.25 + 0.7 * (0.5 + 0.5 * Math.sin(p.ph));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 6.28);
            ctx.fill();
            if (p.r > 1.2 && Math.sin(p.ph * 2) > 0.6) {
              ctx.strokeStyle = p.c;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x - p.r * 3.2, p.y);
              ctx.lineTo(p.x + p.r * 3.2, p.y);
              ctx.moveTo(p.x, p.y - p.r * 3.2);
              ctx.lineTo(p.x, p.y + p.r * 3.2);
              ctx.stroke();
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
        const stars = makeP(120, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.5 + Math.random() * 1.5,
          ph: Math.random() * 6.28,
          sp: 0.01 + Math.random() * 0.022,
          c: ['#FFE082', '#FFFFFF', '#E8A88A', '#A9C4D6'][Math.floor(Math.random() * 4)]
        }));
        const meteors = [];
        let fr = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h);
          for (const s of stars) {
            s.ph += s.sp;
            ctx.fillStyle = s.c;
            ctx.globalAlpha = 0.2 + 0.7 * (0.5 + 0.5 * Math.sin(s.ph));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, 6.28);
            ctx.fill();
          }
          ctx.globalAlpha = 1;

          fr++;
          if (fr % 28 === 0 && Math.random() < 0.85) {
            meteors.push({
              x: Math.random() * (w + 200),
              y: -40,
              len: 60 + Math.random() * 70,
              sp: 6 + Math.random() * 4,
              maxLife: Math.floor(h / (5 + Math.random() * 3)),
              life: 0
            });
          }

          for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i];
            m.x -= m.sp * 0.75;
            m.y += m.sp;
            m.life++;
            const progress = m.life / m.maxLife;
            if (progress >= 1 || m.y > h + 50 || m.x < -100) {
              meteors.splice(i, 1);
              continue;
            }
            const alpha = Math.sin(progress * Math.PI) * 0.85;
            ctx.save();
            ctx.globalAlpha = alpha;
            const gr = ctx.createLinearGradient(m.x, m.y, m.x + m.len * 0.75, m.y - m.len);
            gr.addColorStop(0, '#FFF9E6');
            gr.addColorStop(0.25, '#FFE082');
            gr.addColorStop(1, 'transparent');
            ctx.strokeStyle = gr;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x + m.len * 0.75, m.y - m.len);
            ctx.stroke();
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(m.x, m.y, 1.2, 0, 6.28);
            ctx.fill();
            ctx.restore();
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
        const a = makeP(45, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vy: -0.4 - Math.random() * 0.8,
          ph: Math.random() * 6.28,
          r: 0.8 + Math.random() * 1.8
        }));
        run(() => {
          ctx.clearRect(0, 0, w, h);
          for (const p of a) {
            p.y += p.vy;
            p.ph += 0.025;
            p.x += Math.sin(p.ph) * 0.6;
            if (p.y < -10) {
              p.y = h + 10;
              p.x = Math.random() * w;
            }
            ctx.fillStyle = '#C4BCB4';
            ctx.globalAlpha = 0.35 + 0.3 * Math.sin(p.ph);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 6.28);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        });
      },
      'frost-crystals': () => {
        let g = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h);
          g = Math.min(1.0, g + 0.003);
          ctx.strokeStyle = 'rgba(235,245,255,0.4)';
          ctx.lineWidth = 0.8;
          for (let b = 0; b < 16; b++) {
            const bx = (w / 16) * b, len = 30 * g;
            ctx.beginPath();
            ctx.moveTo(bx, h);
            ctx.lineTo(bx + (b % 2 === 0 ? 6 : -6), h - len);
            ctx.stroke();
          }
        });
      },
      'nocturnal-blizzard': () => {
        const f = makeP(100, () => ({
          x: Math.random() * (w + 120),
          y: Math.random() * h,
          vx: -1.2 - Math.random() * 1.8,
          vy: 1.6 + Math.random() * 2.8,
          r: 0.7 + Math.random() * 2.4,
          op: 0.4 + Math.random() * 0.45
        }));
        run(() => {
          ctx.clearRect(0, 0, w, h);
          for (const p of f) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.y > h + 10) {
              p.y = -10;
              p.x = Math.random() * (w + 120);
            }
            if (p.x < -10) p.x = w + 10;
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = p.op;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 6.28);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        });
      },
      'watercolor-bloom': () => {
        let t = 0;
        run(() => {
          ctx.clearRect(0, 0, w, h);
          t += 0.008;
          const rad = ctx.createRadialGradient(w * 0.4, h * 0.5, 0, w * 0.4, h * 0.5, Math.min(w, h) * (0.35 + 0.05 * Math.sin(t)));
          rad.addColorStop(0, hex(accent, 0.12));
          rad.addColorStop(0.7, hex(cool, 0.04));
          rad.addColorStop(1, 'transparent');
          ctx.fillStyle = rad;
          ctx.fillRect(0, 0, w, h);
        });
      },
      'rain-streaks': () => {
        const d = makeP(120, () => ({
          x: Math.random() * (w + 120),
          y: Math.random() * h,
          len: 16 + Math.random() * 22,
          vy: 9 + Math.random() * 7,
          op: 0.45 + Math.random() * 0.35
        }));
        run(() => {
          ctx.clearRect(0, 0, w, h);
          ctx.lineWidth = 1.25;
          ctx.lineCap = 'round';
          for (const p of d) {
            ctx.strokeStyle = hex(cool, p.op);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - 1.5, p.y + p.len);
            ctx.stroke();
            p.y += p.vy;
            p.x -= 0.4;
            if (p.y > h + p.len) {
              p.y = -p.len - 10;
              p.x = Math.random() * (w + 120);
            }
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

  /* ---------- 5. Back/Forward Cache (bfcache) Restoration Guard ---------- */
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      const card = document.querySelector('.poem-card');
      if (card) {
        card.classList.remove('poem-turn-out');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    }
  });

  /* ---------- 6. Letter Writing Easter Egg (Cmd/Ctrl+E) (IMP-02) ---------- */
  (function setupLetterWritingMode() {
    let modal = null;

    function openEpistolary() {
      if (!modal) {
        modal = document.createElement('div');
        modal.className = 'epistolary-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Keepsake Letter Writer');
        const title = document.querySelector('.poem__title')?.textContent || document.title;
        modal.innerHTML = `
          <div class="epistolary-paper">
            <div class="epistolary-header">
              <span>Keepsake Reply · ${title}</span>
              <button type="button" class="epistolary-close" aria-label="Close letter notepad">✕</button>
            </div>
            <textarea class="epistolary-textarea" placeholder="Write your letter response in ink...&#10;&#10;“The words we never spoke out loud...”"></textarea>
            <div class="epistolary-footer">
              <span class="epistolary-hint">Press Esc to close · Letter saved locally</span>
              <button type="button" class="epistolary-btn">Download Letter (.txt)</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);

        const textarea = modal.querySelector('textarea');
        const closeBtn = modal.querySelector('.epistolary-close');
        const downloadBtn = modal.querySelector('.epistolary-btn');

        const saved = localStorage.getItem('manuscript_draft_' + window.location.pathname);
        if (saved) textarea.value = saved;

        textarea.addEventListener('input', () => {
          localStorage.setItem('manuscript_draft_' + window.location.pathname, textarea.value);
        });

        closeBtn.addEventListener('click', closeEpistolary);
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeEpistolary();
        });

        downloadBtn.addEventListener('click', () => {
          const content = `--- MANUSCRIPT KEEPSAKE LETTER ---
Response to: ${title}
Date: ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}

${textarea.value || '(Empty letter slip)'}

--- Kept on cedar desk ---`;
          const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `letter-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
      }

      modal.classList.add('is-open');
      const ta = modal.querySelector('textarea');
      if (ta) ta.focus();
    }

    function closeEpistolary() {
      if (modal) modal.classList.remove('is-open');
    }

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'e' || e.key === 'E')) {
        // Don't trigger if user is actively writing in a different form input
        if (e.target.tagName === 'INPUT' || (e.target.tagName === 'TEXTAREA' && (!modal || !modal.contains(e.target)))) return;
        e.preventDefault();
        if (modal && modal.classList.contains('is-open')) closeEpistolary();
        else openEpistolary();
      } else if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
        closeEpistolary();
      }
    });
  })();

  /* ---------- 7. Offline Service Worker Registration (IMP-10) ---------- */
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
})();

