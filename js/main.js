// ══════════════════════════════════════════
// main.js — Interactivity & Animations
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ────────────────────────────────────
     SCROLL ENGINE — progress bar, nav
     auto-hide
  ──────────────────────────────────── */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const mainNav = document.getElementById('mainNav');
  let lastScrollY = window.scrollY;

  function onScrollFrame() {
    const y = window.scrollY;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = max > 0 ? `${Math.min(100, (y / max) * 100)}%` : '0%';
    }

    if (mainNav) {
      if (y > 140 && y > lastScrollY) mainNav.classList.add('nav-hidden');
      else mainNav.classList.remove('nav-hidden');
    }

    lastScrollY = y;
    ticking = false;
  }
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScrollFrame);
      ticking = true;
    }
  }, { passive: true });
  onScrollFrame();

  /* ────────────────────────────────────
     SPLIT-LINE HEADLINE REVEAL
  ──────────────────────────────────── */
  function splitIntoLines(el) {
    const groups = [[]];
    el.childNodes.forEach(node => {
      if (node.nodeName === 'BR') { groups.push([]); }
      else { groups[groups.length - 1].push(node); }
    });
    const frag = document.createDocumentFragment();
    groups.forEach(group => {
      const rline = document.createElement('span');
      rline.className = 'rline';
      const inner = document.createElement('span');
      inner.className = 'rline-inner';
      group.forEach(n => inner.appendChild(n));
      rline.appendChild(inner);
      frag.appendChild(rline);
    });
    el.innerHTML = '';
    el.appendChild(frag);
  }

  const splitEls = document.querySelectorAll('.split-lines');
  if (!reduceMotion) {
    splitEls.forEach(el => splitIntoLines(el));

    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const inners = entry.target.querySelectorAll('.rline-inner');
          inners.forEach((inner, i) => {
            inner.style.transitionDelay = `${i * 0.09}s`;
          });
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    splitEls.forEach(el => lineObserver.observe(el));
  } else {
    splitEls.forEach(el => el.classList.add('in-view'));
  }

  /* ────────────────────────────────────
     CLIP-WIPE REVEAL (cards & grids)
  ──────────────────────────────────── */
  const clipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        clipObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

  function observeClipReveal(root = document) {
    root.querySelectorAll('.reveal-clip').forEach((el, i) => {
      if (el.classList.contains('in-view')) return;
      if (!reduceMotion) el.style.transitionDelay = `${(i % 6) * 0.08}s`;
      clipObserver.observe(el);
    });
  }
  observeClipReveal();

  /* ────────────────────────────────────
     BÜROHUND (Bacchus) — Markup wird hier
     erzeugt, damit es nicht auf jeder Seite
     von Hand dupliziert werden muss.
  ──────────────────────────────────── */
  (function initDog() {
    const box = document.createElement('div');
    box.className = 'corner-dog';
    box.id = 'cornerDog';
    box.innerHTML = `
      <div class="corner-dog-label">
        <span>Bürohund</span>
        <div class="corner-dog-dot"></div>
      </div>
      <svg class="corner-dog-svg" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
        <rect width="120" height="100" fill="#141412"/>
        <rect x="0" y="92" width="120" height="2" fill="#1e1e1c"/>
        <ellipse cx="62" cy="93" rx="28" ry="3" fill="#0a0a0a" opacity=".6"/>
        <g id="dogSit">
          <rect x="30" y="55" width="52" height="28" fill="#3d2208"/>
          <rect x="36" y="61" width="40" height="16" fill="#55300e"/>
          <rect x="38" y="65" width="22" height="10" fill="#6b3e14"/>
          <rect x="56" y="44" width="18" height="14" fill="#3d2208"/>
          <rect x="50" y="24" width="34" height="26" fill="#3d2208"/>
          <rect x="74" y="34" width="16" height="14" fill="#55300e"/>
          <rect x="80" y="34" width="8" height="6" fill="#160804" rx="1"/>
          <rect x="81" y="36" width="2" height="2" fill="#2a1008"/>
          <rect x="85" y="36" width="2" height="2" fill="#2a1008"/>
          <rect x="56" y="30" width="7" height="7" fill="#160804"/>
          <rect x="57" y="31" width="3" height="3" fill="#f0ede6" opacity=".9"/>
          <rect x="55" y="28" width="9" height="2" fill="#55300e"/>
          <rect x="48" y="22" width="10" height="20" fill="#2a1408"/>
          <rect x="46" y="26" width="6" height="16" fill="#2a1408"/>
          <rect x="72" y="20" width="10" height="16" fill="#2a1408"/>
          <rect x="76" y="16" width="8" height="10" fill="#2a1408"/>
          <rect x="36" y="81" width="10" height="12" fill="#341c06"/>
          <rect x="52" y="81" width="10" height="12" fill="#341c06"/>
          <rect x="34" y="91" width="14" height="4" fill="#2a1408" rx="2"/>
          <rect x="50" y="91" width="14" height="4" fill="#2a1408" rx="2"/>
          <rect x="68" y="79" width="12" height="14" fill="#341c06"/>
          <rect x="66" y="91" width="16" height="4" fill="#2a1408" rx="2"/>
          <rect x="54" y="53" width="22" height="5" fill="#8b8b86"/>
          <rect x="62" y="54" width="6" height="4" fill="#e8e6e1"/>
          <rect x="26" y="59" width="8" height="8" fill="#3d2208"/>
          <g class="tw-a"><rect x="22" y="62" width="8" height="6" fill="#3d2208"/><rect x="14" y="54" width="10" height="10" fill="#3d2208"/><rect x="8" y="46" width="8" height="10" fill="#4d2a0a"/><rect x="6" y="40" width="10" height="8" fill="#6b3e14"/><rect x="4" y="36" width="14" height="6" fill="#7a4820"/><rect x="3" y="38" width="16" height="4" fill="#8a5228"/></g>
          <g class="tw-b"><rect x="22" y="62" width="8" height="6" fill="#3d2208"/><rect x="16" y="56" width="10" height="8" fill="#3d2208"/><rect x="12" y="48" width="8" height="10" fill="#4d2a0a"/><rect x="10" y="42" width="10" height="8" fill="#6b3e14"/><rect x="8" y="38" width="14" height="6" fill="#7a4820"/><rect x="7" y="40" width="16" height="4" fill="#8a5228"/></g>
          <rect class="dtongue" x="78" y="46" width="8" height="8" fill="#b03030" rx="2"/>
          <rect class="dtongue" x="78" y="50" width="8" height="4" fill="#922828"/>
        </g>
        <g id="dogLie" style="display:none">
          <ellipse cx="58" cy="93" rx="38" ry="4" fill="#0a0a0a" opacity=".7"/>
          <rect x="12" y="68" width="72" height="20" fill="#3d2208"/>
          <rect x="18" y="72" width="60" height="12" fill="#55300e"/>
          <rect x="20" y="74" width="36" height="8" fill="#6b3e14"/>
          <rect x="76" y="60" width="30" height="22" fill="#3d2208"/>
          <rect x="90" y="70" width="18" height="12" fill="#55300e"/>
          <rect x="96" y="70" width="10" height="6" fill="#160804" rx="1"/>
          <rect x="80" y="64" width="8" height="3" fill="#160804"/>
          <rect x="80" y="65" width="8" height="2" fill="#2a1408"/>
          <text x="70" y="58" font-size="7" fill="#c8c4bc" font-family="monospace" class="z1">z</text>
          <text x="76" y="51" font-size="9" fill="#c8c4bc" font-family="monospace" class="z2">z</text>
          <text x="84" y="43" font-size="11" fill="#c8c4bc" font-family="monospace" class="z3">z</text>
          <rect x="74" y="58" width="10" height="18" fill="#2a1408"/>
          <rect x="86" y="80" width="28" height="8" fill="#341c06"/>
          <rect x="110" y="80" width="8" height="6" fill="#2a1408" rx="2"/>
          <rect x="12" y="82" width="28" height="8" fill="#341c06"/>
          <rect x="10" y="82" width="8" height="6" fill="#2a1408" rx="2"/>
          <rect x="76" y="70" width="22" height="5" fill="#8b8b86"/>
          <rect x="84" y="71" width="6" height="4" fill="#e8e6e1"/>
          <rect x="6"  y="64" width="10" height="8" fill="#3d2208"/>
          <rect x="2"  y="70" width="8"  height="10" fill="#3d2208"/>
          <rect x="4"  y="78" width="8"  height="8" fill="#55300e"/>
        </g>
        <g id="dogHappy" style="display:none">
          <rect x="28" y="50" width="50" height="28" fill="#3d2208" transform="rotate(-6,53,64)"/>
          <rect x="34" y="56" width="38" height="16" fill="#55300e" transform="rotate(-6,53,64)"/>
          <rect x="36" y="60" width="22" height="10" fill="#6b3e14" transform="rotate(-6,53,64)"/>
          <rect x="52" y="18" width="34" height="28" fill="#3d2208"/>
          <rect x="74" y="30" width="16" height="14" fill="#55300e"/>
          <rect x="78" y="30" width="10" height="6" fill="#160804" rx="1"/>
          <rect x="56" y="22" width="8" height="8" fill="#160804"/>
          <rect x="57" y="23" width="4" height="4" fill="#f0ede6" opacity=".9"/>
          <rect x="58" y="23" width="2" height="2" fill="#fff"/>
          <rect x="54" y="19" width="12" height="2" fill="#55300e" transform="rotate(-10,60,20)"/>
          <rect x="50" y="8"  width="10" height="18" fill="#2a1408" transform="rotate(-12,55,17)"/>
          <rect x="72" y="6"  width="10" height="16" fill="#2a1408" transform="rotate(12,77,14)"/>
          <rect x="32" y="76" width="10" height="14" fill="#341c06" transform="rotate(-14,37,83)"/>
          <rect x="52" y="74" width="10" height="14" fill="#341c06" transform="rotate(10,57,81)"/>
          <rect x="28" y="88" width="14" height="5" fill="#2a1408" rx="2"/>
          <rect x="50" y="86" width="14" height="5" fill="#2a1408" rx="2"/>
          <rect x="66" y="74" width="12" height="16" fill="#341c06"/>
          <rect x="64" y="88" width="16" height="5" fill="#2a1408" rx="2"/>
          <rect x="56" y="42" width="22" height="5" fill="#8b8b86"/>
          <rect x="64" y="43" width="6" height="4" fill="#e8e6e1"/>
          <g class="th-a"><rect x="16" y="48" width="8" height="6" fill="#3d2208"/><rect x="10" y="40" width="10" height="10" fill="#3d2208"/><rect x="6" y="32" width="8" height="10" fill="#4d2a0a"/><rect x="4" y="26" width="10" height="8" fill="#6b3e14"/><rect x="2" y="22" width="14" height="6" fill="#7a4820"/><rect x="1" y="24" width="16" height="4" fill="#8a5228"/></g>
          <g class="th-b"><rect x="18" y="52" width="8" height="6" fill="#3d2208"/><rect x="14" y="44" width="10" height="10" fill="#3d2208"/><rect x="10" y="36" width="8" height="10" fill="#4d2a0a"/><rect x="8" y="30" width="10" height="8" fill="#6b3e14"/><rect x="6" y="26" width="14" height="6" fill="#7a4820"/><rect x="5" y="28" width="16" height="4" fill="#8a5228"/></g>
          <rect x="78" y="42" width="10" height="14" fill="#c03030" rx="3"/>
          <rect x="79" y="50" width="8"  height="6"  fill="#922828" rx="2"/>
          <text x="3"  y="20" font-size="10" fill="#c8c4bc" class="dh1" font-family="serif">♥</text>
          <text x="18" y="10" font-size="8"  fill="#c8c4bc" class="dh2" font-family="serif">♥</text>
          <text x="96" y="16" font-size="9"  fill="#c8c4bc" class="dh3" font-family="serif">♥</text>
          <text x="106" y="7" font-size="7"  fill="#c8c4bc" class="dh4" font-family="serif">♥</text>
          <text x="0"  y="40" font-size="9"  fill="#c8c4bc" class="ds1" font-family="serif">✦</text>
          <text x="102" y="36" font-size="8" fill="#c8c4bc" class="ds2" font-family="serif">✦</text>
        </g>
      </svg>
      <div class="corner-dog-caption">Bacchus · im Team seit 2023</div>
    `;
    document.body.appendChild(box);

    const sit = box.querySelector('#dogSit');
    const lie = box.querySelector('#dogLie');
    const happy = box.querySelector('#dogHappy');

    let isHappy = false;
    let timer = null;
    function show(s, l, h) {
      sit.style.display = s;
      lie.style.display = l;
      happy.style.display = h;
    }
    box.addEventListener('mouseenter', () => { if (!isHappy) show('none', 'block', 'none'); });
    box.addEventListener('mouseleave', () => { if (!isHappy) show('block', 'none', 'none'); });
    box.addEventListener('click', () => {
      isHappy = true;
      show('none', 'none', 'block');
      clearTimeout(timer);
      timer = setTimeout(() => { isHappy = false; show('block', 'none', 'none'); }, 2200);
    });
    bindHover('.corner-dog');
  })();

  /* ────────────────────────────────────
     CURSOR
  ──────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    // Ring follows with slight lag via CSS transition on left/top
    ring.style.left = mouseX + 'px';
    ring.style.top  = mouseY + 'px';
    // Erst ab der ersten echten Bewegung einblenden -- sonst hängt ein
    // Punkt/Ring unpositioniert in der oberen linken Ecke.
    cursor.classList.add('visible');
    ring.classList.add('visible');
  });

  // Beim Verlassen des Browserfensters ausblenden, statt am Rand
  // eingefroren stehen zu bleiben.
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
    ring.classList.remove('visible');
  });
  document.addEventListener('mouseenter', () => {
    cursor.classList.add('visible');
    ring.classList.add('visible');
  });

  function setCursorHover(on) {
    cursor.classList.toggle('hovering', on);
    ring.classList.toggle('hovering', on);
  }

  function bindHover(selector) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => setCursorHover(true));
      el.addEventListener('mouseleave', () => setCursorHover(false));
    });
  }
  bindHover('a, button, .gallery-item, .stat-item, .kontakt-block-inner, .corner-dog');

  /* ────────────────────────────────────
     PAGE NAVIGATION
  ──────────────────────────────────── */
  window.showPage = function(id, linkEl) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const page = document.getElementById('page-' + id);
    if (page) page.classList.add('active');
    if (linkEl) linkEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (id === 'gallery') buildGallery('all');
    if (id === 'home')    startCounters();

    // Close mobile nav
    document.querySelector('.nav-links').classList.remove('open');
    return false;
  };

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('open');
    });
  }

  // Cross-page link to the Galerie SPA-Tab (z.B. von einer Unterseite aus)
  if (location.hash === '#galerie' && document.getElementById('page-gallery')) {
    showPage('gallery', document.querySelector('.nav-links a[onclick*="gallery"]'));
  }

  /* ────────────────────────────────────
     HERO BUILDING — MOUSE PARALLAX
  ──────────────────────────────────── */
  const heroVisual   = document.getElementById('heroVisual');
  const heroBuilding = document.getElementById('heroBuilding');
  const parallaxBg   = document.getElementById('parallaxBg');

  if (heroVisual) {
    heroVisual.addEventListener('mousemove', e => {
      const rect = heroVisual.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / rect.width;   // -0.5 … +0.5
      const dy   = (e.clientY - cy) / rect.height;

      // Main building: gentle float
      if (heroBuilding) {
        heroBuilding.style.transform =
          `translate(${dx * 18}px, ${dy * 12}px) rotate(${dx * 1.2}deg)`;
      }

      // Background layer moves opposite (parallax depth)
      if (parallaxBg) {
        parallaxBg.style.transform =
          `translate(${-dx * 28}px, ${-dy * 18}px)`;
      }

      // Building tilt via SVG group
      const buildingMain = document.querySelector('.building-main');
      if (buildingMain) {
        buildingMain.style.transform =
          `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg)`;
      }

      // Float elements drift
      document.querySelectorAll('.float-rect').forEach((el, i) => {
        const factor = (i % 2 === 0 ? 1 : -1) * (i + 1);
        el.style.transform = `translate(${dx * 12 * factor}px, ${dy * 8 * factor}px)`;
      });
      document.querySelectorAll('.float-dot').forEach((el, i) => {
        const factor = i % 2 === 0 ? -1.5 : 1.5;
        el.style.transform = `translate(${dx * 15 * factor}px, ${dy * 10 * factor}px)`;
      });

      // Window glow: windows closest to cursor brighten
      document.querySelectorAll('#heroBuildingSvg .win').forEach(win => {
        const wr = win.getBoundingClientRect();
        const wdx = (wr.left + wr.width/2) - e.clientX;
        const wdy = (wr.top  + wr.height/2) - e.clientY;
        const dist = Math.sqrt(wdx*wdx + wdy*wdy);
        const bright = Math.max(0, 1 - dist / 200);
        const base = parseInt(win.getAttribute('fill').replace('#',''), 16);
        const boost = Math.round(bright * 40);
        win.style.filter = boost > 5
          ? `brightness(${1 + bright * 0.8})`
          : 'brightness(1)';
      });
    });

    heroVisual.addEventListener('mouseleave', () => {
      if (heroBuilding) heroBuilding.style.transform = '';
      if (parallaxBg)   parallaxBg.style.transform = '';
      const buildingMain = document.querySelector('.building-main');
      if (buildingMain) buildingMain.style.transform = '';
      document.querySelectorAll('.float-rect, .float-dot').forEach(el => {
        el.style.transform = '';
      });
      document.querySelectorAll('#heroBuildingSvg .win').forEach(w => {
        w.style.filter = '';
      });
    });
  }

  /* ────────────────────────────────────
     TILT CARDS (News, Contact)
  ──────────────────────────────────── */
  function initTiltCards() {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect  = card.getBoundingClientRect();
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height / 2;
        const dx    = (e.clientX - cx) / (rect.width  / 2);
        const dy    = (e.clientY - cy) / (rect.height / 2);
        const tiltX = -dy * 6;
        const tiltY =  dx * 6;

        card.style.transform =
          `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(4px)`;
        card.style.transition = 'transform 0.08s linear, box-shadow 0.08s linear';

        // Subtle highlight follow
        const lightX = ((e.clientX - rect.left) / rect.width)  * 100;
        const lightY = ((e.clientY - rect.top)  / rect.height) * 100;
        card.style.background =
          `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.04) 0%, transparent 70%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s';
        card.style.background = '';
      });
    });
  }

  /* ────────────────────────────────────
     GALLERY ITEMS — 3D TILT
  ──────────────────────────────────── */
  function initGalleryTilt() {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('mousemove', e => {
        const rect = item.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) / (rect.width  / 2);
        const dy   = (e.clientY - cy) / (rect.height / 2);

        item.style.transform =
          `perspective(700px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) translateY(-6px)`;
        item.style.transition = 'transform 0.08s linear, box-shadow 0.08s, border-color 0.08s';

        // SVG building reacts to mouse
        const svg = item.querySelector('svg');
        if (svg) {
          const bldg = svg.querySelector('.proj-building');
          if (bldg) {
            bldg.style.transform = `translate(${dx * 6}px, ${dy * 4}px)`;
            bldg.style.transition = 'transform 0.15s ease-out';
          }
          const trees = svg.querySelectorAll('.proj-tree');
          trees.forEach((t, i) => {
            const dir = i % 2 === 0 ? 1 : -1;
            t.style.transform = `translate(${dx * 10 * dir}px, ${dy * 5}px)`;
            t.style.transition = 'transform 0.2s ease-out';
          });
          const wins = svg.querySelectorAll('.proj-win, .proj-wins rect');
          wins.forEach(w => {
            const dist = Math.abs(dx) + Math.abs(dy);
            w.style.filter = `brightness(${1 + dist * 0.3})`;
          });
          const roof = svg.querySelector('.proj-roof');
          if (roof) {
            roof.style.transform = `translate(${dx * 3}px, ${dy * 2}px)`;
            roof.style.transition = 'transform 0.2s ease-out';
          }
        }
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform  = '';
        item.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s, border-color 0.4s';

        const svg = item.querySelector('svg');
        if (svg) {
          const bldg = svg.querySelector('.proj-building');
          if (bldg) { bldg.style.transform = ''; bldg.style.transition = 'transform 0.5s ease-out'; }
          svg.querySelectorAll('.proj-tree').forEach(t => { t.style.transform = ''; t.style.transition = 'transform 0.5s ease-out'; });
          svg.querySelectorAll('.proj-win, .proj-wins rect').forEach(w => { w.style.filter = ''; });
          const roof = svg.querySelector('.proj-roof');
          if (roof) { roof.style.transform = ''; }
        }
      });
    });
  }

  /* ────────────────────────────────────
     COUNTER ANIMATION
  ──────────────────────────────────── */
  let countersStarted = false;
  function startCounters() {
    if (countersStarted) {
      // Reset and redo
      document.querySelectorAll('.stat-num').forEach(el => {
        el.textContent = '0';
      });
      countersStarted = false;
    }
    setTimeout(() => {
      document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const target   = parseInt(el.getAttribute('data-target'));
        const duration = 1800;
        const start    = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
      });
      countersStarted = true;
    }, 400);
  }

  /* ────────────────────────────────────
     BUILD GALLERY
  ──────────────────────────────────── */
  let galleryBuilt = false;
  function buildGallery(filter) {
    const masonry = document.getElementById('galleryMasonry');
    if (!masonry || typeof GALLERY_PROJECTS === 'undefined') return;

    if (!galleryBuilt) {
      GALLERY_PROJECTS.forEach((proj, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-status', proj.status);
        item.innerHTML = `
          <div class="gallery-img-wrap">
            <svg viewBox="${proj.viewBox}" xmlns="http://www.w3.org/2000/svg"
                 class="gallery-img-inner" style="display:block;aspect-ratio:${proj.aspect};">
              ${proj.svgContent}
            </svg>
          </div>
          <div class="gallery-overlay">
            <div class="gallery-overlay-title">${proj.name}, ${proj.location}</div>
            <div class="gallery-overlay-meta">${proj.type} · ${proj.area} · ${proj.year}</div>
          </div>
          <div class="gallery-caption">
            <span class="gallery-caption-name">${proj.name}</span>
            <span class="gallery-caption-status status-${proj.status}">
              ${proj.status === 'gebaut' ? 'Gebaut' : 'Geplant'}
            </span>
          </div>`;
        masonry.appendChild(item);

        // Entrance animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 60 + i * 60);
      });
      galleryBuilt = true;
      setTimeout(() => {
        initGalleryTilt();
        bindHover('.gallery-item');
      }, 700);
    }

    filterGallery(filter, document.querySelector('.filter-btn.active'));
  }

  window.filterGallery = function(status, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.gallery-item').forEach((item, i) => {
      const show = status === 'all' || item.dataset.status === status;
      if (show) {
        item.style.display = '';
        item.style.opacity = '0';
        item.style.transform = 'translateY(12px)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 40);
      } else {
        item.style.display = 'none';
      }
    });
  };

  /* ────────────────────────────────────
     INIT
  ──────────────────────────────────── */
  // Jede Seite mit einem Haus setzt window.PAGE_HOUSE, bevor main.js läuft
  // (siehe index.html / projekte/index.html / team/index.html / ...).
  if (window.PAGE_HOUSE && typeof renderHouse === 'function') {
    const houseMount = document.getElementById(window.PAGE_HOUSE.mountId);
    if (houseMount) {
      renderHouse(houseMount, { variant: window.PAGE_HOUSE.variant, items: window.PAGE_HOUSE.items });
      bindHover('.house-unit');
    }
  }

  // Projekte-Kategorieseiten setzen window.PAGE_LIST für die Listenansicht
  if (window.PAGE_LIST && typeof renderProjekteListe === 'function') {
    const listMount = document.getElementById(window.PAGE_LIST.mountId);
    if (listMount) renderProjekteListe(listMount, window.PAGE_LIST.projects);
  }

  initTiltCards();
  startCounters();

  // Make sure gallery filter button still works
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const status = this.textContent.trim().toLowerCase() === 'alle' ? 'all'
        : this.textContent.trim().toLowerCase() === 'gebaut' ? 'gebaut' : 'geplant';
      window.filterGallery(status, this);
    });
  });

});
