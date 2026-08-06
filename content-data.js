// ══════════════════════════════════════════
// buildings.js — SVG data for gallery & team
// ══════════════════════════════════════════

const TEAM_MEMBERS = [
  {
    name: "Dipl.-Ing. Maria Hofmann",
    slug: "maria-hofmann",
    email: "maria.hofmann@architekt-schwartz.at",
    role: "Gründerin & Geschäftsführerin",
    bio: "Maria Hofmann studierte Architektur an der TU Wien und der ETH Zürich. Nach Stationen bei Herzog & de Meuron und Zaha Hadid Architects gründete sie 1998 das Büro Architekt Schwartz. Ihr Werk wurde mit zahlreichen nationalen und internationalen Preisen ausgezeichnet.",
    tags: ["Wohnbau", "Konzept", "Nachhaltigkeit"],
    svgBg: "#1e1e1c",
    svgAccent: "#d9d4c8"
  },
  {
    name: "Arch. Thomas Bergmann",
    slug: "thomas-bergmann",
    email: "thomas.bergmann@architekt-schwartz.at",
    role: "Partner & Projektleiter",
    bio: "Thomas Bergmann ist seit 2003 Teil des Büros und verantwortlich für Großprojekte im öffentlichen Bereich. Er lehrt an der Akademie der bildenden Künste Wien.",
    tags: ["Öffentlicher Bau", "Bestand", "Städtebau"],
    svgBg: "#222220",
    svgAccent: "#d9d4c8"
  },
  {
    name: "Dipl.-Ing. Lena Fuchs",
    slug: "lena-fuchs",
    email: "lena.fuchs@architekt-schwartz.at",
    role: "Seniorarchitektin — Innenraum",
    bio: "Lena Fuchs verbindet Architektur und Interior Design zu einer ganzheitlichen Raumsprache. Sie hat an der Universität für angewandte Kunst Wien studiert.",
    tags: ["Interior", "Luxuswohnbau", "Material"],
    svgBg: "#1a1a18",
    svgAccent: "#d9d4c8"
  },
  {
    name: "Arch. Julian Werner",
    slug: "julian-werner",
    email: "julian.werner@architekt-schwartz.at",
    role: "Projektarchitekt",
    bio: "Julian Werner bringt Expertise im Bereich parametrisches Design und digitale Fabrikation ein. Seine Arbeit erforscht die Grenzen zwischen computergesteuerter Formfindung und handwerklicher Ausführung.",
    tags: ["Parametrisch", "Digital", "Experiment"],
    svgBg: "#202020",
    svgAccent: "#d9d4c8"
  },
  {
    name: "Dipl.-Ing. Sophie Klein",
    slug: "sophie-klein",
    email: "sophie.klein@architekt-schwartz.at",
    role: "Projektarchitektin",
    bio: "Sophie Klein absolvierte ihr Studium an der Bartlett School of Architecture in London und ist seit 2019 bei Architekt Schwartz tätig.",
    tags: ["Widmung", "Wohnbau", "BIM"],
    svgBg: "#1c1c1a",
    svgAccent: "#d9d4c8"
  },
  {
    name: "Arch. Markus Steiner",
    slug: "markus-steiner",
    email: "markus.steiner@architekt-schwartz.at",
    role: "Technischer Leiter",
    bio: "Markus Steiner ist verantwortlich für die technische Qualitätssicherung aller Projekte. Mit 20 Jahren Berufserfahrung koordiniert er die Schnittstellen zwischen Architektur, Tragwerk und Haustechnik.",
    tags: ["Bauphysik", "Statik", "Ausführung"],
    svgBg: "#242422",
    svgAccent: "#d9d4c8"
  },
  // ── Platzhalter-Profile (Text & Porträts fiktiv, zur Freigabe) ──
  {
    name: "Dipl.-Ing. Anna Wagner",
    slug: "anna-wagner",
    email: "anna.wagner@architekt-schwartz.at",
    role: "Projektarchitektin — Fassade",
    bio: "Anna Wagner studierte an der TU Graz und vertiefte sich anschließend am Institut für Fassadentechnik. Seit 2020 verantwortet sie bei Architekt Schwartz die Gebäudehüllenplanung anspruchsvoller Projekte.",
    tags: ["Fassade", "Bauphysik", "Detail"],
    svgBg: "#262624",
    svgAccent: "#d9d4c8"
  },
  {
    name: "Arch. Paul Huber",
    slug: "paul-huber",
    email: "paul.huber@architekt-schwartz.at",
    role: "Projektarchitekt — Bestand",
    bio: "Paul Huber ist auf die Weiterentwicklung von Bestandsgebäuden spezialisiert. Vor Architekt Schwartz arbeitete er mehrere Jahre im Bundesdenkmalamt und bringt diese Erfahrung in Umbauprojekte ein.",
    tags: ["Bestand", "Denkmalschutz", "Umbau"],
    svgBg: "#1e1c1a",
    svgAccent: "#d9d4c8"
  },
  {
    name: "Dipl.-Ing. Nora Berger",
    slug: "nora-berger",
    email: "nora.berger@architekt-schwartz.at",
    role: "Landschaftsarchitektin",
    bio: "Nora Berger verantwortet die Freiraumplanung im Team und sorgt dafür, dass Gebäude und Umgebung als Einheit entworfen werden. Sie studierte Landschaftsarchitektur an der BOKU Wien.",
    tags: ["Freiraum", "Landschaft", "Ökologie"],
    svgBg: "#232321",
    svgAccent: "#d9d4c8"
  },
  {
    name: "Arch. David Winkler",
    slug: "david-winkler",
    email: "david.winkler@architekt-schwartz.at",
    role: "Projektleiter — Gewerbebau",
    bio: "David Winkler leitet seit 2017 Gewerbe- und Bürobauprojekte des Büros, von der Machbarkeitsstudie bis zur Übergabe. Zuvor war er mehrere Jahre als Bauleiter tätig.",
    tags: ["Gewerbebau", "Projektsteuerung", "Kosten"],
    svgBg: "#1a1c1e",
    svgAccent: "#d9d4c8"
  },
  {
    name: "Dipl.-Ing. Clara Moser",
    slug: "clara-moser",
    email: "clara.moser@architekt-schwartz.at",
    role: "BIM-Koordinatorin",
    bio: "Clara Moser koordiniert die digitale Planung aller laufenden Projekte im gemeinsamen Bauwerksmodell und schult das Team im Umgang mit BIM-Werkzeugen.",
    tags: ["BIM", "Digitalisierung", "Koordination"],
    svgBg: "#201e1c",
    svgAccent: "#d9d4c8"
  },
  {
    name: "Arch. Felix Brandner",
    slug: "felix-brandner",
    email: "felix.brandner@architekt-schwartz.at",
    role: "Architekt — Wettbewerbe",
    bio: "Felix Brandner ist seit 2022 im Team und auf Wettbewerbsverfahren spezialisiert. Er hat an der Angewandten Wien studiert und bringt frische Entwurfsansätze in frühe Projektphasen ein.",
    tags: ["Wettbewerb", "Entwurf", "Konzept"],
    svgBg: "#1c1e20",
    svgAccent: "#d9d4c8"
  }
];

// Nur der Inhalt (ohne umschließendes <svg>) -- wiederverwendbar sowohl im
// eigenen viewBox-Wrapper (makePortraitSVG) als auch verschachtelt in einem
// Hausfenster (house.js).
function makePortraitContent(bg, accent, index) {
  const variations = [
    // Classic silhouette
    `<ellipse cx="120" cy="108" rx="44" ry="50" fill="${accent}"/>
     <path d="M38 320 Q62 215 120 206 Q178 215 202 320Z" fill="${accent}"/>
     <line x1="0" x2="240" y1="165" y2="165" stroke="${accent}" stroke-width="0.5" opacity="0.4"/>`,
    // Slightly different proportions
    `<ellipse cx="120" cy="106" rx="42" ry="48" fill="${accent}"/>
     <path d="M42 320 Q65 218 120 208 Q175 218 198 320Z" fill="${accent}"/>
     <rect x="60" y="260" width="120" height="2" fill="${accent}" opacity="0.3"/>`,
    // Taller neck
    `<ellipse cx="120" cy="110" rx="43" ry="49" fill="${accent}"/>
     <rect x="105" y="155" width="30" height="30" fill="${accent}"/>
     <path d="M40 320 Q63 220 120 207 Q177 220 200 320Z" fill="${accent}"/>`,
    // Slightly offset
    `<ellipse cx="118" cy="109" rx="44" ry="51" fill="${accent}"/>
     <path d="M36 320 Q61 216 118 207 Q178 214 204 320Z" fill="${accent}"/>`,
    // With shoulder hint
    `<ellipse cx="120" cy="107" rx="41" ry="47" fill="${accent}"/>
     <path d="M44 320 Q64 217 120 208 Q176 217 196 320Z" fill="${accent}"/>
     <ellipse cx="60" cy="210" rx="25" ry="15" fill="${accent}" opacity="0.5"/>
     <ellipse cx="180" cy="210" rx="25" ry="15" fill="${accent}" opacity="0.5"/>`,
    // Geometric style
    `<polygon points="80,155 120,65 160,155" fill="${accent}"/>
     <rect x="85" y="155" width="70" height="10" fill="${accent}"/>
     <path d="M40 320 Q65 210 120 200 Q175 210 200 320Z" fill="${accent}"/>`
  ];
  return `
    <rect width="240" height="320" fill="${bg}"/>
    <rect x="0" y="200" width="240" height="120" fill="${bg}" opacity="0.7"/>
    ${variations[index % variations.length]}
    <line x1="0" x2="240" y1="200" y2="200" stroke="${accent}" stroke-width="0.4" opacity="0.3"/>`;
}

function makePortraitSVG(bg, accent, index) {
  return `
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      ${makePortraitContent(bg, accent, index)}
    </svg>`;
}

// Platzhalter-Bilder für Innenraum/Detail/Grundriss, solange keine echten
// Projektfotos vorliegen — abstrakte, art-spezifische Komposition plus
// deutlich lesbarer "Platzhalter"-Schriftzug, damit nichts mit einem
// echten Foto verwechselt wird.
function makePlatzhalterBild(art, seed) {
  const s = (n) => { const x = Math.sin((seed + n) * 12.9898) * 43758.5453; return x - Math.floor(x); };
  const bg = "#1a1a18", line = "#2a2a28", fill = "#242422";
  let art_svg = '';
  if (art === 'innenraum') {
    const winY = 40 + s(1) * 20;
    art_svg = `
      <rect x="0" y="150" width="300" height="70" fill="#141412"/>
      <rect x="30" y="${winY}" width="90" height="100" fill="${fill}" stroke="${line}" stroke-width="0.6"/>
      <rect x="140" y="${winY + 30}" width="60" height="70" fill="#1e1e1c" stroke="${line}" stroke-width="0.6"/>
      <rect x="220" y="120" width="50" height="90" fill="${fill}" opacity="0.6"/>
      <line x1="0" x2="300" y1="150" y2="150" stroke="${line}" stroke-width="0.8"/>`;
  } else if (art === 'detail') {
    const r = 60 + s(2) * 30;
    art_svg = `
      <circle cx="${120 + s(3) * 60}" cy="110" r="${r}" fill="none" stroke="${line}" stroke-width="1.2"/>
      <rect x="40" y="60" width="220" height="4" fill="${fill}"/>
      <rect x="40" y="150" width="140" height="4" fill="${fill}" opacity="0.6"/>
      <line x1="40" x2="260" y1="20" y2="200" stroke="${line}" stroke-width="0.5" opacity="0.5"/>`;
  } else {
    art_svg = `
      <rect x="30" y="30" width="240" height="160" fill="none" stroke="${line}" stroke-width="1"/>
      <line x1="30" x2="270" y1="90" y2="90" stroke="${line}" stroke-width="0.7"/>
      <line x1="140" x2="140" y1="30" y2="190" stroke="${line}" stroke-width="0.7"/>
      <rect x="45" y="45" width="30" height="6" fill="${fill}"/>
      <rect x="150" y="150" width="30" height="6" fill="${fill}"/>
      <line x1="150" x2="150" y1="90" y2="120" stroke="${line}" stroke-width="1.4"/>`;
  }
  return `
    <rect width="300" height="220" fill="${bg}"/>
    ${art_svg}
    <text x="150" y="115" text-anchor="middle" transform="rotate(-8 150 115)" font-family="monospace" font-size="22" letter-spacing="2" fill="#5a5a58" opacity="0.55">PLATZHALTER</text>`;
}

const GALLERY_PROJECTS = [
  {
    name: "Villa Sonnberg", slug: "villa-sonnberg", location: "Wachau",
    type: "Privathaus", area: "340m²", year: "2024", status: "gebaut", kategorie: "privatbau", kurzbeschreibung: "Freistehendes Einfamilienhaus mit offener Wohnebene und Blick in den Weingarten.",
    viewBox: "0 0 300 420", aspect: "3/4.2",
    svgContent: `
      <rect width="300" height="420" fill="#1a1a18"/>
      <g class="proj-building">
        <rect x="40" y="60" width="220" height="300" fill="#222220" stroke="#2a2a28" stroke-width="0.5"/>
        <rect x="60" y="80" width="80" height="120" fill="#2a2a28" class="proj-win"/>
        <rect x="160" y="80" width="80" height="120" fill="#1e1e1c" class="proj-win"/>
        <rect x="60" y="220" width="180" height="60" fill="#242422" class="proj-win"/>
        <rect x="100" y="330" width="100" height="30" fill="#1a1a18"/>
        <line x1="150" x2="150" y1="330" y2="360" stroke="#2a2a28" stroke-width="0.8"/>
      </g>
      <rect x="0" y="360" width="300" height="60" fill="#141412"/>
      <ellipse cx="20" cy="340" rx="18" ry="30" fill="#181816" class="proj-tree"/>
      <ellipse cx="280" cy="345" rx="16" ry="25" fill="#181816" class="proj-tree"/>
      <rect x="40" y="360" width="220" height="8" fill="#0a0a08" opacity="0.5"/>
    `,
    bilder: [
      { label: "Innenraum", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('innenraum', 1) },
      { label: "Detail", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('detail', 1) },
      { label: "Grundriss", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('grundriss', 1) }
    ]
  },
  {
    name: "Kulturzentrum Graz", slug: "kulturzentrum-graz", location: "Graz",
    type: "Öffentlicher Bau", area: "1800m²", year: "2026", status: "geplant", kategorie: "oeffentlich", kurzbeschreibung: "Veranstaltungshaus mit flexibler Bespielung für Ausstellungen, Konzerte und Stadtteilprojekte.",
    viewBox: "0 0 300 220", aspect: "300/220",
    svgContent: `
      <rect width="300" height="220" fill="#161614"/>
      <g class="proj-building">
        <rect x="20" y="70" width="260" height="110" fill="#1e1e1c"/>
        <rect x="10" y="60" width="280" height="12" fill="#2a2a28" class="proj-roof"/>
        <g stroke="#2a2a28" stroke-width="0.7" class="proj-grid">
          <line x1="20" x2="280" y1="95" y2="95"/>
          <line x1="20" x2="280" y1="115" y2="115"/>
          <line x1="20" x2="280" y1="135" y2="135"/>
          <line x1="20" x2="280" y1="155" y2="155"/>
          <line x1="60" x2="60" y1="70" y2="180"/>
          <line x1="100" x2="100" y1="70" y2="180"/>
          <line x1="140" x2="140" y1="70" y2="180"/>
          <line x1="180" x2="180" y1="70" y2="180"/>
          <line x1="220" x2="220" y1="70" y2="180"/>
          <line x1="260" x2="260" y1="70" y2="180"/>
        </g>
      </g>
      <rect x="0" y="180" width="300" height="40" fill="#111110"/>
      <rect x="20" y="180" width="260" height="6" fill="#0a0a08" opacity="0.5"/>
    `,
    bilder: [
      { label: "Innenraum", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('innenraum', 2) },
      { label: "Detail", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('detail', 2) },
      { label: "Grundriss", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('grundriss', 2) }
    ]
  },
  {
    name: "Haus im Weinberg", slug: "haus-im-weinberg", location: "Burgenland",
    type: "Privathaus", area: "280m²", year: "2023", status: "gebaut", kategorie: "privatbau", kurzbeschreibung: "Terrassiertes Wohnhaus, das sich in die Hangneigung des Weinbergs einfügt.",
    viewBox: "0 0 300 280", aspect: "300/280",
    svgContent: `
      <rect width="300" height="280" fill="#1c1c1a"/>
      <g class="proj-building">
        <rect x="50" y="100" width="200" height="150" fill="#222220" stroke="#2a2a28" stroke-width="0.5"/>
        <rect x="100" y="60" width="150" height="190" fill="#282826" stroke="#2a2a28" stroke-width="0.5"/>
        <rect x="110" y="78" width="50" height="38" fill="#1e1e1c" class="proj-win"/>
        <rect x="170" y="78" width="60" height="38" fill="#242422" class="proj-win"/>
        <rect x="60" y="130" width="38" height="55" fill="#1a1a18" class="proj-win"/>
        <rect x="110" y="138" width="40" height="38" fill="#1e1e1c" class="proj-win"/>
        <rect x="170" y="138" width="60" height="45" fill="#202020" class="proj-win"/>
        <rect x="165" y="208" width="40" height="42" fill="#161614"/>
      </g>
      <rect x="0" y="250" width="300" height="30" fill="#121210"/>
    `,
    bilder: [
      { label: "Innenraum", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('innenraum', 3) },
      { label: "Detail", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('detail', 3) },
      { label: "Grundriss", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('grundriss', 3) }
    ]
  },
  {
    name: "Bürohaus Schottenring", slug: "buerohaus-schottenring", location: "Wien",
    type: "Gewerbebau", area: "4200m²", year: "2021", status: "gebaut", kategorie: "gewerbebau", kurzbeschreibung: "Bürogebäude mit modularen Grundrissen und begrüntem Innenhof im 1. Bezirk.",
    viewBox: "0 0 300 360", aspect: "300/360",
    svgContent: `
      <rect width="300" height="360" fill="#181816"/>
      <g class="proj-building">
        <rect x="80" y="50" width="140" height="260" fill="#1e1e1c" stroke="#2a2a28" stroke-width="0.5"/>
        <g fill="#242422" class="proj-wins">
          ${Array.from({length:9},(_,row)=>Array.from({length:3},(_,col)=>`<rect x="${90+col*40}" y="${60+row*25}" width="28" height="16"/>`).join('')).join('')}
        </g>
        <rect x="100" y="293" width="100" height="17" fill="#141412"/>
      </g>
      <rect x="0" y="310" width="300" height="50" fill="#0e0e0c"/>
    `,
    bilder: [
      { label: "Innenraum", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('innenraum', 4) },
      { label: "Detail", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('detail', 4) },
      { label: "Grundriss", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('grundriss', 4) }
    ]
  },
  {
    name: "Wohnanlage Linz Nord", slug: "wohnanlage-linz-nord", location: "Linz",
    type: "Wohnbau", area: "8600m²", year: "2027", status: "geplant", kategorie: "wohnbau", kurzbeschreibung: "Geförderter Wohnbau mit 62 Einheiten, Gemeinschaftsgarten und Quartiersplatz.",
    viewBox: "0 0 300 200", aspect: "300/200",
    svgContent: `
      <rect width="300" height="200" fill="#1a1a18"/>
      <g class="proj-building">
        <rect x="10" y="55" width="280" height="8" fill="#282826" class="proj-roof"/>
        <rect x="10" y="63" width="280" height="105" fill="#202020"/>
        <g fill="#1a1a18" stroke="#2a2a28" stroke-width="0.4">
          ${Array.from({length:2},(_,row)=>Array.from({length:7},(_,col)=>`<rect x="${20+col*40}" y="${73+row*38}" width="28" height="26"/>`).join('')).join('')}
        </g>
        <ellipse cx="50" cy="50" rx="12" ry="18" fill="#1e1e1c" class="proj-tree"/>
        <ellipse cx="150" cy="48" rx="14" ry="20" fill="#1e1e1c" class="proj-tree"/>
        <ellipse cx="250" cy="52" rx="11" ry="16" fill="#1e1e1c" class="proj-tree"/>
      </g>
      <rect x="0" y="168" width="300" height="32" fill="#111110"/>
    `,
    bilder: [
      { label: "Innenraum", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('innenraum', 5) },
      { label: "Detail", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('detail', 5) },
      { label: "Grundriss", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('grundriss', 5) }
    ]
  },
  {
    name: "Kunsthaus Salzburg", slug: "kunsthaus-salzburg", location: "Salzburg",
    type: "Museum", area: "2100m²", year: "2019", status: "gebaut", kategorie: "kulturbauten", kurzbeschreibung: "Museumsbau mit auskragendem Satteldach als moderner Bezug auf die Altstadtsilhouette.",
    viewBox: "0 0 300 340", aspect: "300/340",
    svgContent: `
      <rect width="300" height="340" fill="#161614"/>
      <g class="proj-building">
        <polygon points="30,195 150,78 270,195" fill="#1e1e1c" stroke="#2a2a28" stroke-width="0.7" class="proj-roof"/>
        <rect x="30" y="195" width="240" height="110" fill="#222220"/>
        <rect x="80" y="175" width="15" height="130" fill="#1a1a18"/>
        <rect x="110" y="175" width="15" height="130" fill="#1a1a18"/>
        <rect x="175" y="175" width="15" height="130" fill="#1a1a18"/>
        <rect x="205" y="175" width="15" height="130" fill="#1a1a18"/>
        <rect x="130" y="240" width="40" height="65" fill="#141412"/>
        <rect x="130" y="115" width="40" height="58" fill="#242422" opacity="0.7" class="proj-win"/>
      </g>
      <rect x="0" y="305" width="300" height="35" fill="#0e0e0c"/>
    `,
    bilder: [
      { label: "Innenraum", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('innenraum', 6) },
      { label: "Detail", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('detail', 6) },
      { label: "Grundriss", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('grundriss', 6) }
    ]
  },
  {
    name: "Brückenhotel Donau", slug: "brueckenhotel-donau", location: "Wien",
    type: "Hotel", area: "5400m²", year: "2028", status: "geplant", kategorie: "gewerbebau", kurzbeschreibung: "Hotelneubau über der Uferpromenade mit Blick auf die Donau.",
    viewBox: "0 0 300 240", aspect: "300/240",
    svgContent: `
      <rect width="300" height="240" fill="#1c1c1a"/>
      <g class="proj-building">
        <rect x="20" y="80" width="260" height="90" fill="#202020" stroke="#2a2a28" stroke-width="0.5"/>
        <path d="M20 170 Q75 130 130 170" fill="none" stroke="#2a2a28" stroke-width="1.5" class="proj-arch"/>
        <path d="M130 170 Q185 120 240 170" fill="none" stroke="#2a2a28" stroke-width="1.5" class="proj-arch"/>
        <g fill="#282826" class="proj-wins">
          ${Array.from({length:2},(_,row)=>Array.from({length:6},(_,col)=>`<rect x="${30+col*43}" y="${90+row*35}" width="28" height="22"/>`).join('')).join('')}
        </g>
      </g>
      <rect x="0" y="170" width="300" height="70" fill="#161614"/>
      <rect x="20" y="172" width="260" height="6" fill="#1a1a18" opacity="0.5"/>
      <rect x="20" y="182" width="260" height="4" fill="#1a1a18" opacity="0.3"/>
    `,
    bilder: [
      { label: "Innenraum", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('innenraum', 7) },
      { label: "Detail", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('detail', 7) },
      { label: "Grundriss", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('grundriss', 7) }
    ]
  },
  {
    name: "Gymnasium Innsbruck", slug: "gymnasium-innsbruck", location: "Innsbruck",
    type: "Bildungsbau", area: "3800m²", year: "2022", status: "gebaut", kategorie: "oeffentlich", kurzbeschreibung: "Schulerweiterung mit Bibliothek, Mensa und flexiblen Lernclustern.",
    viewBox: "0 0 300 260", aspect: "300/260",
    svgContent: `
      <rect width="300" height="260" fill="#191917"/>
      <g class="proj-building">
        <rect x="20" y="75" width="180" height="150" fill="#202020" stroke="#2a2a28" stroke-width="0.5"/>
        <rect x="160" y="35" width="120" height="115" fill="#222220" stroke="#2a2a28" stroke-width="0.5"/>
        <g fill="#1c1c1a" stroke="#2a2a28" stroke-width="0.3">
          <rect x="30" y="85"/><rect x="65" y="85"/><rect x="100" y="85"/><rect x="135" y="85"/>
          <rect x="30" y="115"/><rect x="65" y="115"/><rect x="100" y="115"/><rect x="135" y="115"/>
          <rect x="30" y="145"/><rect x="65" y="145"/>
          ${['85','115','145'].map(y=>['30','65','100','135'].map(x=>`<rect x="${x}" y="${y}" width="24" height="18"/>`).join('')).join('')}
          ${['45','75','105'].map(y=>['170','205','240'].map(x=>`<rect x="${x}" y="${y}" width="27" height="20"/>`).join('')).join('')}
        </g>
        <rect x="25" y="165" width="130" height="55" fill="#161614"/>
      </g>
      <rect x="0" y="225" width="300" height="35" fill="#101010"/>
    `,
    bilder: [
      { label: "Innenraum", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('innenraum', 8) },
      { label: "Detail", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('detail', 8) },
      { label: "Grundriss", viewBox: "0 0 300 220", svgContent: makePlatzhalterBild('grundriss', 8) }
    ]
  }
];
