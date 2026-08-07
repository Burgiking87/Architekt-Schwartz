// ══════════════════════════════════════════
// house.js — wiederverwendbare Haus-Komponente
//
// renderHouse(mountEl, { variant, items, activeIndex })
//   variant "floors"    → feste Anzahl Stockwerke (Startseite, Projekte)
//   variant "windows"   → Fensterraster, Zeilen/Spalten aus items.length
//                          berechnet (Team, Kontakt)
//   variant "scattered" → unregelmäßig verteilte Fenster in wechselnden
//                          Größen, nicht im Raster (Leistungen)
//
// items: [{ label, href, ariaLabel, slug, image? }]
//   item.image (optional): fertiges SVG-Markup (z. B. ein Porträt), wird
//   in einem verschachtelten <svg> fenster-füllend eingebettet statt der
//   schlichten Fensterfläche — für Team-Fotos.
// activeIndex (optional): hebt ein Fenster hervor (Detailseiten).
//
// WICHTIG — feste Bauweise: viewBox, Baukörper und Dach haben auf JEDER
// Seite exakt dieselben Maße. Nur der Fensterinhalt wird innerhalb dieser
// festen Höhe verteilt (mehr Items → kleinere Fenster). Dadurch steht das
// Haus beim Navigieren unbewegt an derselben Stelle, und nur der Inhalt
// tauscht sich aus.
//
// Jede Etage/jedes Fenster ist ein echtes <a>, absolut positioniert über
// einer programmatisch erzeugten SVG-Illustration (kein Copy-Paste-Markup
// pro Seite, kein Layout-Bruch bei anderer Item-Anzahl).
// ══════════════════════════════════════════

(function () {
  // ── Feste Geometrie: gilt unverändert für alle Seiten und Varianten ──
  const VB_W = 400;          // viewBox-Breite
  const BODY_X = 50;         // linke Kante des Baukörpers
  const BODY_W = 300;        // Breite des Baukörpers
  const BODY_TOP = 92;       // Oberkante Baukörper (darüber liegt das Dach)
  const BODY_H = 372;        // FESTE Höhe des Baukörpers
  const DOOR_H = 52;         // Sockel/Eingangszone unter dem Baukörper
  const VB_H = BODY_TOP + BODY_H + DOOR_H + 30;
  const BODY_BOTTOM = BODY_TOP + BODY_H;
  const ROOF_HEIGHT = 44;
  const ROOF_OVERHANG = 18;

  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Deterministische Pseudo-Zufallszahl (stabil pro Index, kein Layout-
  // Flackern bei erneutem Rendern derselben Items).
  function seeded(seed) {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  }

  // Fensterinhalt: entweder ein per Item mitgegebenes Bild (z. B. Porträt,
  // fenster-füllend über ein verschachteltes SVG) oder die schlichte Fläche.
  function winContent(item, index, x, y, w, h, dataAttrName) {
    const dataAttr = `${dataAttrName}="${index}"`;
    if (item && item.image) {
      return `<svg class="win-photo" ${dataAttr} x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" viewBox="${item.imageViewBox || '0 0 240 380'}" preserveAspectRatio="xMidYMid slice">${item.image}</svg>`;
    }
    return `<rect class="win" ${dataAttr} x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${index % 2 === 0 ? '#2a2a28' : '#3a3a38'}"/>`;
  }

  // ── Dach: Satteldach über dem Baukörper. Feste Maße wie der Rest des
  //    Hauses, damit die Silhouette auf allen Seiten deckungsgleich ist.
  function buildRoof() {
    const apexX = BODY_X + BODY_W / 2;
    const apexY = BODY_TOP - ROOF_HEIGHT;
    const leftX = BODY_X - ROOF_OVERHANG;
    const rightX = BODY_X + BODY_W + ROOF_OVERHANG;
    return `<polygon points="${leftX},${BODY_TOP} ${apexX},${apexY} ${rightX},${BODY_TOP}" fill="url(#buildingGrad)" stroke="#2a2a28" stroke-width="0.8"/>` +
      `<line x1="${leftX}" x2="${rightX}" y1="${BODY_TOP}" y2="${BODY_TOP}" stroke="#2a2a28" stroke-width="1"/>`;
  }

  // Eingang unten mittig — gehört zum festen Baukörper, nicht zum Inhalt.
  function buildDoor() {
    const doorW = 84, doorH = 66;
    const doorX = BODY_X + (BODY_W - doorW) / 2;
    const doorY = BODY_BOTTOM - doorH;
    return `<rect x="${doorX}" y="${doorY}" width="${doorW}" height="${doorH}" fill="#1a1a18"/>` +
      `<line x1="${doorX + doorW / 2}" x2="${doorX + doorW / 2}" y1="${doorY}" y2="${BODY_BOTTOM}" stroke="#2a2a28" stroke-width="0.8"/>`;
  }

  // Der Bereich, in dem Inhalte Platz finden: der Baukörper ohne die
  // Eingangszone ganz unten.
  const CONTENT_TOP = BODY_TOP;
  const CONTENT_H = BODY_H - 74;

  // ── Stockwerke: die Item-Anzahl teilt die feste Inhaltshöhe gleichmäßig.
  function buildFloors(items) {
    const n = Math.max(items.length, 1);
    const floorH = CONTENT_H / n;
    const units = [];
    let winsSvg = '';
    let dividers = '';

    for (let i = 0; i < n; i++) {
      const y = CONTENT_TOP + i * floorH;
      const winCount = 3;
      const gap = 12;
      const winW = (BODY_W - gap * (winCount + 1)) / winCount;
      const winH = Math.max(18, Math.min(floorH - 26, floorH * 0.62));
      const winY = y + (floorH - winH) / 2;

      for (let w = 0; w < winCount; w++) {
        const wx = BODY_X + gap + w * (winW + gap);
        winsSvg += `<rect class="win" data-floor="${i}" x="${wx.toFixed(1)}" y="${winY.toFixed(1)}" width="${winW.toFixed(1)}" height="${winH.toFixed(1)}" fill="${w % 2 === 0 ? '#2a2a28' : '#3a3a38'}"/>`;
      }
      if (i > 0) {
        dividers += `<line x1="${BODY_X}" x2="${BODY_X + BODY_W}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#2a2a28" stroke-width="1.4"/>`;
      }
      units.push({ x: BODY_X, y, w: BODY_W, h: floorH, floorIndex: i, item: items[i] });
    }

    return { winsSvg, dividers, units };
  }

  // ── Fenster: Raster aus der Item-Anzahl, aber immer innerhalb der festen
  //    Inhaltshöhe — mehr Items bedeuten kleinere Fenster, nicht ein
  //    höheres Haus.
  function buildWindows(items) {
    const n = Math.max(items.length, 1);
    const cols = Math.max(1, Math.min(3, Math.ceil(Math.sqrt(n))));
    const rows = Math.ceil(n / cols);
    const rowH = CONTENT_H / rows;
    const gap = 14;
    const cellW = (BODY_W - gap * (cols + 1)) / cols;
    const cellH = Math.max(24, Math.min(rowH - 18, rowH * 0.72));
    const units = [];
    let winsSvg = '';
    let dividers = '';

    for (let i = 0; i < n; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = BODY_X + gap + col * (cellW + gap);
      const y = CONTENT_TOP + row * rowH + (rowH - cellH) / 2;
      winsSvg += winContent(items[i], i, x, y, cellW, cellH, 'data-index');
      units.push({ x, y, w: cellW, h: cellH, floorIndex: i, item: items[i] });
    }
    for (let r = 1; r < rows; r++) {
      const y = CONTENT_TOP + r * rowH;
      dividers += `<line x1="${BODY_X}" x2="${BODY_X + BODY_W}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#2a2a28" stroke-width="0.6"/>`;
    }

    return { winsSvg, dividers, units };
  }

  // ── Verstreute Fenster: wechselnde Anzahl pro Reihe (1–3) und wechselnde
  //    Breiten/Höhen, deterministisch aus dem Index erzeugt — wirkt organisch
  //    statt streng gerastert. Die Reihenhöhen werden anschließend auf die
  //    feste Inhaltshöhe normiert, damit das Haus nicht mitwächst.
  function buildScattered(items) {
    const n = Math.max(items.length, 1);
    const gap = 14;
    const rowCounts = [];
    let placed = 0, rowSeed = 0;
    while (placed < n) {
      const remaining = n - placed;
      let count = seeded(rowSeed * 7.3 + 1) < 0.45 ? 1 : (seeded(rowSeed * 7.3 + 2) < 0.6 ? 2 : 3);
      count = Math.min(count, remaining);
      rowCounts.push(count);
      placed += count;
      rowSeed++;
    }

    const rawHeights = rowCounts.map((_, ri) => 88 + seeded(ri * 3.1 + 5) * 34);
    const rawTotal = rawHeights.reduce((a, b) => a + b, 0);
    const scale = CONTENT_H / rawTotal;
    const rowHeights = rawHeights.map(h => h * scale);

    const units = [];
    let winsSvg = '';
    let idx = 0;
    let curY = CONTENT_TOP;

    rowCounts.forEach((count, ri) => {
      const rowH = rowHeights[ri];
      const totalGap = gap * (count + 1);
      const avail = BODY_W - totalGap;
      const weights = [];
      for (let c = 0; c < count; c++) weights.push(0.55 + seeded(idx + c + 100) * 0.9);
      const sumW = weights.reduce((a, b) => a + b, 0);

      let cx = BODY_X + gap;
      for (let c = 0; c < count; c++) {
        const w = (weights[c] / sumW) * avail;
        const jitter = (seeded(idx + c + 300) * 0.12) - 0.06;
        const wh = Math.max(30, Math.min(rowH - 14, rowH * (0.7 + jitter)));
        const wy = curY + (rowH - wh) / 2;
        winsSvg += winContent(items[idx], idx, cx, wy, w, wh, 'data-index');
        units.push({ x: cx, y: wy, w, h: wh, floorIndex: idx, item: items[idx] });
        cx += w + gap;
        idx++;
      }
      curY += rowH;
    });

    return { winsSvg, dividers: '', units };
  }

  function renderHouse(mount, opts) {
    if (!mount) return;
    const items = (opts && opts.items) || [];
    const variant = (opts && opts.variant) || 'windows';
    const activeIndex = (opts && typeof opts.activeIndex === 'number') ? opts.activeIndex : -1;
    const built = variant === 'floors' ? buildFloors(items)
      : variant === 'scattered' ? buildScattered(items)
      : buildWindows(items);
    const { units, winsSvg, dividers } = built;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const vThird1 = BODY_X + BODY_W / 3;
    const vThird2 = BODY_X + (BODY_W * 2) / 3;

    mount.innerHTML = `
      <svg id="heroBuildingSvg" viewBox="0 0 ${VB_W} ${VB_H}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="buildingGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#1a1a18"/>
            <stop offset="50%" stop-color="#242422"/>
            <stop offset="100%" stop-color="#1a1a18"/>
          </linearGradient>
          <linearGradient id="reflGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3a3a38"/>
            <stop offset="100%" stop-color="transparent"/>
          </linearGradient>
        </defs>
        <g class="sky-particles">
          <circle cx="${VB_W * 0.13}" cy="${BODY_TOP * 0.5}" r="1" fill="#3a3a38" opacity="0.4"/>
          <circle cx="${VB_W * 0.3}" cy="${BODY_TOP * 0.28}" r="1.5" fill="#3a3a38" opacity="0.3"/>
          <circle cx="${VB_W * 0.62}" cy="${BODY_TOP * 0.65}" r="1" fill="#3a3a38" opacity="0.5"/>
          <circle cx="${VB_W * 0.9}" cy="${BODY_TOP * 0.35}" r="1" fill="#3a3a38" opacity="0.4"/>
        </g>
        <g class="building-shell">
          ${buildRoof()}
          <rect x="${BODY_X}" y="${BODY_TOP}" width="${BODY_W}" height="${BODY_H}" fill="url(#buildingGrad)" stroke="#2a2a28" stroke-width="0.5"/>
          <line x1="${vThird1}" x2="${vThird1}" y1="${BODY_TOP}" y2="${BODY_BOTTOM}" stroke="#2a2a28" stroke-width="0.8"/>
          <line x1="${vThird2}" x2="${vThird2}" y1="${BODY_TOP}" y2="${BODY_BOTTOM}" stroke="#2a2a28" stroke-width="0.8"/>
          ${buildDoor()}
        </g>
        <g class="building-content">
          ${dividers}
          ${winsSvg}
        </g>
        <line x1="0" x2="${VB_W}" y1="${BODY_BOTTOM}" y2="${BODY_BOTTOM}" stroke="#2a2a28" stroke-width="1"/>
        <rect x="${BODY_X}" y="${BODY_BOTTOM}" width="${BODY_W}" height="50" fill="url(#reflGrad)" opacity="0.3"/>
        <g class="float-elements">
          <rect class="float-rect" x="${BODY_X - 42}" y="${BODY_TOP + BODY_H * 0.35}" width="26" height="2" fill="#3a3a38" opacity="0.4"/>
          <rect class="float-rect" x="${BODY_X + BODY_W + 16}" y="${BODY_TOP + BODY_H * 0.55}" width="22" height="2" fill="#3a3a38" opacity="0.3"/>
          <circle class="float-dot" cx="${BODY_X + BODY_W + 26}" cy="${BODY_TOP + BODY_H * 0.25}" r="3" fill="none" stroke="#3a3a38" stroke-width="1" opacity="0.5"/>
          <circle class="float-dot" cx="${BODY_X - 30}" cy="${BODY_TOP + BODY_H * 0.7}" r="2" fill="none" stroke="#3a3a38" stroke-width="1" opacity="0.4"/>
        </g>
      </svg>
      <div class="house-overlay" role="list"></div>
      <ul class="house-fallback"></ul>
    `;

    mount.style.aspectRatio = VB_W + ' / ' + VB_H;

    // Gestapeltes Fallback: auf sehr schmalen Screens per CSS statt der
    // Overlay-Links gezeigt, damit Touch-Targets nie zu klein werden.
    const fallback = mount.querySelector('.house-fallback');
    items.forEach(item => {
      if (!item) return;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'house-fallback-link';
      a.href = item.href || '#';
      a.textContent = item.label || '';
      a.setAttribute('aria-label', item.ariaLabel || item.label || '');
      li.appendChild(a);
      fallback.appendChild(li);
    });

    const overlay = mount.querySelector('.house-overlay');
    units.forEach((u, i) => {
      const item = u.item;
      if (!item) return;

      const a = document.createElement('a');
      a.className = 'house-unit house-unit-' + variant + (item.image ? ' has-photo' : '')
        + (i === activeIndex ? ' is-active' : '');
      a.href = item.href || '#';
      a.setAttribute('role', 'listitem');
      a.setAttribute('aria-label', item.ariaLabel || item.label || '');
      if (i === activeIndex) a.setAttribute('aria-current', 'page');
      a.style.left = (u.x / VB_W * 100).toFixed(2) + '%';
      a.style.top = (u.y / VB_H * 100).toFixed(2) + '%';
      a.style.width = (u.w / VB_W * 100).toFixed(2) + '%';
      a.style.height = (u.h / VB_H * 100).toFixed(2) + '%';
      a.innerHTML = `<span class="house-unit-label">${esc(item.label || '')}</span>`;

      const litAttr = variant === 'floors' ? 'data-floor' : 'data-index';
      const litTargets = mount.querySelectorAll(
        `.win[${litAttr}="${u.floorIndex}"], .win-photo[${litAttr}="${u.floorIndex}"]`
      );
      function setLit(on) {
        litTargets.forEach(el => { el.style.filter = on ? 'brightness(1.8)' : ''; });
      }
      if (i === activeIndex) setLit(true);
      a.addEventListener('mouseenter', () => setLit(true));
      a.addEventListener('mouseleave', () => { if (i !== activeIndex) setLit(false); });
      a.addEventListener('focus', () => setLit(true));
      a.addEventListener('blur', () => { if (i !== activeIndex) setLit(false); });

      overlay.appendChild(a);
    });

    // Der Baukörper steht sofort; nur der Inhalt (Fenster + Beschriftungen)
    // faded kurz ein — so wirkt der Seitenwechsel wie ein Austausch im
    // selben Haus statt wie ein Neuaufbau.
    if (!reduceMotion) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => overlay.classList.add('in'));
      });
    } else {
      overlay.classList.add('in');
    }
  }

  window.renderHouse = renderHouse;
})();
