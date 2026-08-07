// ══════════════════════════════════════════
// house.js — wiederverwendbare Haus-Komponente
//
// renderHouse(mountEl, { variant, items })
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
//
// Jede Etage/jedes Fenster ist ein echtes <a>, absolut positioniert über
// einer programmatisch erzeugten SVG-Illustration (kein Copy-Paste-Markup
// pro Seite, kein Layout-Bruch bei anderer Item-Anzahl).
// ══════════════════════════════════════════

(function () {
  const BODY_MARGIN = 80;
  const BODY_W_DEFAULT = 240;
  const BODY_TOP = 80;
  const ROOF_HEIGHT = 34;
  const ROOF_OVERHANG = 14;

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

  // ── Dach: kleines Satteldach oberhalb des Baukörpers, passt in die
  //    ohnehin vorhandene Reserve über BODY_TOP — Bauweise identisch auf
  //    allen Seiten, wirkt auf Unterseiten kleiner, weil deren Haus-
  //    Container schmäler ist als der Hero auf der Startseite.
  function buildRoof(bodyX, bodyW) {
    const apexX = bodyX + bodyW / 2;
    const apexY = BODY_TOP - ROOF_HEIGHT;
    const leftX = bodyX - ROOF_OVERHANG;
    const rightX = bodyX + bodyW + ROOF_OVERHANG;
    return `<polygon points="${leftX},${BODY_TOP} ${apexX},${apexY} ${rightX},${BODY_TOP}" fill="url(#buildingGrad)" stroke="#2a2a28" stroke-width="0.8"/>` +
      `<line x1="${leftX}" x2="${rightX}" y1="${BODY_TOP}" y2="${BODY_TOP}" stroke="#2a2a28" stroke-width="1"/>`;
  }

  // ── Stockwerke: bestehende Anzahl teilt die Gebäudehöhe gleichmäßig,
  //    das unterste Stockwerk bekommt den Eingang.
  function buildFloors(items, bodyX, bodyW, vbW) {
    const n = Math.max(items.length, 1);
    const bodyH = 360;
    const floorH = bodyH / n;
    const units = [];
    let winsSvg = '';
    let dividers = '';

    for (let i = 0; i < n; i++) {
      const y = BODY_TOP + i * floorH;
      const isGround = i === n - 1;
      const winCount = 3;
      const gap = 10;
      const winW = (bodyW - gap * (winCount + 1)) / winCount;
      const winH = Math.max(20, floorH - 34);
      const winY = y + (floorH - winH) / 2 - (isGround ? 10 : 0);

      for (let w = 0; w < winCount; w++) {
        if (isGround && w === 1) continue; // mittlere Achse bleibt für den Eingang frei
        const wx = bodyX + gap + w * (winW + gap);
        winsSvg += `<rect class="win" data-floor="${i}" x="${wx.toFixed(1)}" y="${winY.toFixed(1)}" width="${winW.toFixed(1)}" height="${winH.toFixed(1)}" fill="${w % 2 === 0 ? '#2a2a28' : '#3a3a38'}"/>`;
      }
      if (isGround) {
        const doorW = 90, doorH = Math.min(70, floorH - 10);
        const doorX = bodyX + (bodyW - doorW) / 2;
        const doorY = BODY_TOP + bodyH - doorH;
        winsSvg += `<rect data-floor="${i}" x="${doorX}" y="${doorY}" width="${doorW}" height="${doorH}" fill="#1a1a18"/><line x1="${doorX + doorW / 2}" x2="${doorX + doorW / 2}" y1="${doorY}" y2="${BODY_TOP + bodyH}" stroke="#2a2a28" stroke-width="0.8"/>`;
      }
      if (i > 0) {
        dividers += `<line x1="${bodyX}" x2="${bodyX + bodyW}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#2a2a28" stroke-width="1.4"/>`;
      }
      units.push({ x: bodyX, y, w: bodyW, h: floorH, floorIndex: i, item: items[i] });
    }

    return { winsSvg, dividers, units, vbW, vbH: BODY_TOP + bodyH + 60, bodyBottom: BODY_TOP + bodyH };
  }

  // ── Fenster: Raster ergibt sich aus der Item-Anzahl, wächst nach unten.
  function buildWindows(items, bodyX, bodyW, vbW) {
    const n = Math.max(items.length, 1);
    const cols = Math.max(1, Math.min(3, Math.ceil(Math.sqrt(n))));
    const rows = Math.ceil(n / cols);
    const floorH = 100;
    const bodyH = rows * floorH;
    const gap = 16;
    const cellW = (bodyW - gap * (cols + 1)) / cols;
    const cellH = floorH - 34;
    const units = [];
    let winsSvg = '';
    let dividers = '';

    for (let i = 0; i < n; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = bodyX + gap + col * (cellW + gap);
      const y = BODY_TOP + row * floorH + (floorH - cellH) / 2;
      winsSvg += winContent(items[i], i, x, y, cellW, cellH, 'data-index');
      units.push({ x, y, w: cellW, h: cellH, floorIndex: i, item: items[i] });
    }
    for (let r = 1; r < rows; r++) {
      const y = BODY_TOP + r * floorH;
      dividers += `<line x1="${bodyX}" x2="${bodyX + bodyW}" y1="${y}" y2="${y}" stroke="#2a2a28" stroke-width="0.6"/>`;
    }
    const doorW = 70, doorH = 50;
    const doorX = bodyX + (bodyW - doorW) / 2;
    const doorY = BODY_TOP + bodyH;
    winsSvg += `<rect x="${doorX}" y="${doorY}" width="${doorW}" height="${doorH}" fill="#1a1a18"/>`;

    return { winsSvg, dividers, units, vbW, vbH: BODY_TOP + bodyH + doorH + 40, bodyBottom: BODY_TOP + bodyH + doorH };
  }

  // ── Verstreute Fenster: wechselnde Anzahl pro Reihe (1–3) und wechselnde
  //    Breiten/Höhen, deterministisch aus dem Index erzeugt — wirkt organisch
  //    statt streng gerastert, bleibt aber bei jedem Rendern gleich.
  function buildScattered(items, bodyX, bodyW, vbW) {
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

    const rowHeights = rowCounts.map((_, ri) => 88 + seeded(ri * 3.1 + 5) * 34);
    const bodyH = rowHeights.reduce((a, b) => a + b, 0);

    const units = [];
    let winsSvg = '';
    let idx = 0;
    let curY = BODY_TOP;

    rowCounts.forEach((count, ri) => {
      const rowH = rowHeights[ri];
      const totalGap = gap * (count + 1);
      const avail = bodyW - totalGap;
      const weights = [];
      for (let c = 0; c < count; c++) weights.push(0.55 + seeded(idx + c + 100) * 0.9);
      const sumW = weights.reduce((a, b) => a + b, 0);

      let cx = bodyX + gap;
      for (let c = 0; c < count; c++) {
        const w = (weights[c] / sumW) * avail;
        const hJitter = seeded(idx + c + 300) * 20 - 10;
        const wh = Math.max(34, Math.min(rowH - 16, rowH - 30 + hJitter));
        const wy = curY + (rowH - wh) / 2;
        winsSvg += winContent(items[idx], idx, cx, wy, w, wh, 'data-index');
        units.push({ x: cx, y: wy, w, h: wh, floorIndex: idx, item: items[idx] });
        cx += w + gap;
        idx++;
      }
      curY += rowH;
    });

    const doorW = 70, doorH = 50;
    const doorX = bodyX + (bodyW - doorW) / 2;
    const doorY = BODY_TOP + bodyH;
    winsSvg += `<rect x="${doorX}" y="${doorY}" width="${doorW}" height="${doorH}" fill="#1a1a18"/>`;

    return { winsSvg, dividers: '', units, vbW, vbH: BODY_TOP + bodyH + doorH + 40, bodyBottom: BODY_TOP + bodyH + doorH };
  }

  function renderHouse(mount, opts) {
    if (!mount) return;
    const items = (opts && opts.items) || [];
    const variant = (opts && opts.variant) || 'windows';
    const bodyW = (opts && opts.bodyWidth) || BODY_W_DEFAULT;
    const bodyX = BODY_MARGIN;
    const vbW = bodyW + BODY_MARGIN * 2;
    const built = variant === 'floors' ? buildFloors(items, bodyX, bodyW, vbW)
      : variant === 'scattered' ? buildScattered(items, bodyX, bodyW, vbW)
      : buildWindows(items, bodyX, bodyW, vbW);
    const { vbH, bodyBottom, units, winsSvg, dividers } = built;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const vThird1 = bodyX + bodyW / 3;
    const vThird2 = bodyX + (bodyW * 2) / 3;
    const roofSvg = buildRoof(bodyX, bodyW);

    mount.innerHTML = `
      <svg id="heroBuildingSvg" viewBox="0 0 ${vbW} ${vbH}" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <circle cx="${vbW * 0.13}" cy="${BODY_TOP * 0.5}" r="1" fill="#3a3a38" opacity="0.4"/>
          <circle cx="${vbW * 0.3}" cy="${BODY_TOP * 0.28}" r="1.5" fill="#3a3a38" opacity="0.3"/>
          <circle cx="${vbW * 0.62}" cy="${BODY_TOP * 0.65}" r="1" fill="#3a3a38" opacity="0.5"/>
          <circle cx="${vbW * 0.9}" cy="${BODY_TOP * 0.35}" r="1" fill="#3a3a38" opacity="0.4"/>
        </g>
        <g class="building-main" style="transform-origin:${bodyX + bodyW / 2}px ${bodyBottom}px;">
          ${roofSvg}
          <rect x="${bodyX}" y="${BODY_TOP}" width="${bodyW}" height="${bodyBottom - BODY_TOP}" fill="url(#buildingGrad)" stroke="#2a2a28" stroke-width="0.5"/>
          <line x1="${vThird1}" x2="${vThird1}" y1="${BODY_TOP}" y2="${bodyBottom}" stroke="#2a2a28" stroke-width="0.8"/>
          <line x1="${vThird2}" x2="${vThird2}" y1="${BODY_TOP}" y2="${bodyBottom}" stroke="#2a2a28" stroke-width="0.8"/>
          ${dividers}
          ${winsSvg}
        </g>
        <line x1="0" x2="${vbW}" y1="${bodyBottom}" y2="${bodyBottom}" stroke="#2a2a28" stroke-width="1"/>
        <rect x="${bodyX}" y="${bodyBottom}" width="${bodyW}" height="50" fill="url(#reflGrad)" opacity="0.3"/>
        <g class="float-elements">
          <rect class="float-rect" x="${bodyX - 50}" y="${BODY_TOP + (bodyBottom - BODY_TOP) * 0.35}" width="30" height="2" fill="#3a3a38" opacity="0.4"/>
          <rect class="float-rect" x="${bodyX + bodyW + 20}" y="${BODY_TOP + (bodyBottom - BODY_TOP) * 0.55}" width="25" height="2" fill="#3a3a38" opacity="0.3"/>
          <circle class="float-dot" cx="${bodyX + bodyW + 30}" cy="${BODY_TOP + (bodyBottom - BODY_TOP) * 0.25}" r="3" fill="none" stroke="#3a3a38" stroke-width="1" opacity="0.5"/>
          <circle class="float-dot" cx="${bodyX - 55}" cy="${BODY_TOP + (bodyBottom - BODY_TOP) * 0.7}" r="2" fill="none" stroke="#3a3a38" stroke-width="1" opacity="0.4"/>
        </g>
      </svg>
      <div class="house-overlay" role="list"></div>
      <ul class="house-fallback"></ul>
    `;

    mount.style.aspectRatio = vbW + ' / ' + vbH;

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
      const left = (u.x / vbW * 100).toFixed(2) + '%';
      const top = (u.y / vbH * 100).toFixed(2) + '%';
      const width = (u.w / vbW * 100).toFixed(2) + '%';
      const height = (u.h / vbH * 100).toFixed(2) + '%';

      const a = document.createElement('a');
      a.className = 'house-unit house-unit-' + variant + (item.image ? ' has-photo' : '');
      a.href = item.href || '#';
      a.setAttribute('role', 'listitem');
      a.setAttribute('aria-label', item.ariaLabel || item.label || '');
      a.style.left = left;
      a.style.top = top;
      a.style.width = width;
      a.style.height = height;
      a.innerHTML = `<span class="house-unit-label">${esc(item.label || '')}</span>`;

      const litAttr = variant === 'floors' ? 'data-floor' : 'data-index';
      const litTargets = mount.querySelectorAll(
        `.win[${litAttr}="${u.floorIndex}"], .win-photo[${litAttr}="${u.floorIndex}"]`
      );
      function setLit(on) {
        litTargets.forEach(el => { el.style.filter = on ? 'brightness(1.8)' : ''; });
      }
      a.addEventListener('mouseenter', () => setLit(true));
      a.addEventListener('mouseleave', () => setLit(false));
      a.addEventListener('focus', () => setLit(true));
      a.addEventListener('blur', () => setLit(false));

      if (!reduceMotion) {
        a.style.transitionDelay = (i * 0.08) + 's';
      }
      overlay.appendChild(a);
    });

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
