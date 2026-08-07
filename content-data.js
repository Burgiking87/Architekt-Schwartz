// ══════════════════════════════════════════
// content-data.js — zentrale Inhalte für die
// datengetriebenen Haus-Seiten (Startseite +
// Themen-Unterseiten). Neue Einträge hier
// hinzufügen/entfernen genügt, kein Layout-Code
// muss angefasst werden.
// ══════════════════════════════════════════

// Startseite: die 4 Stockwerke des Hauses (oben → unten)
const HOME_FLOORS = [
  { slug: 'projekte',   label: 'Projekte',   href: 'projekte/',   ariaLabel: 'Zu unseren Projekten' },
  { slug: 'team',       label: 'Team',       href: 'team/',       ariaLabel: 'Zu unserem Team' },
  { slug: 'leistungen', label: 'Leistungen', href: 'leistungen/', ariaLabel: 'Zu unseren Leistungen' },
  { slug: 'kontakt',    label: 'Kontakt',    href: 'kontakt/',    ariaLabel: 'Zum Kontakt' }
];

// Projekte: bestehende GALLERY_PROJECTS-Kategorien (aus buildings.js) werden
// auf die 3 vom Kunden gewünschten Stockwerke gefaltet.
function projektKategorieFalten(kategorie) {
  if (kategorie === 'privatbau') return 'privatbauten';
  if (kategorie === 'wohnbau') return 'wohnbauten';
  return 'gewerbebauten'; // gewerbebau, oeffentlich, kulturbauten
}

const PROJEKT_KATEGORIEN = [
  { slug: 'privatbauten',  label: 'Privatbauten',  href: 'privatbauten/',  ariaLabel: 'Privatbauten ansehen' },
  { slug: 'gewerbebauten', label: 'Gewerbebauten', href: 'gewerbebauten/', ariaLabel: 'Gewerbe- und öffentliche Bauten ansehen' },
  { slug: 'wohnbauten',    label: 'Wohnbauten',    href: 'wohnbauten/',    ariaLabel: 'Wohnbauten ansehen' }
];

function projekteInKategorie(slug) {
  if (typeof GALLERY_PROJECTS === 'undefined') return [];
  return GALLERY_PROJECTS.filter(function (p) {
    return projektKategorieFalten(p.kategorie) === slug;
  });
}

// Kategorie-Hausfenster (Ebene A) — ein Fenster pro Projekt dieser
// Kategorie, mit der Außenansicht als Bild und dem Projektnamen als Label.
// Klick führt auf die gemeinsame Projektseite (Ebene B).
function projekteFensterItems(kategorieSlug) {
  return projekteInKategorie(kategorieSlug).map(function (p) {
    return {
      slug: p.slug,
      label: p.name,
      href: '../projekt.html?id=' + p.slug,
      ariaLabel: 'Projekt ' + p.name + ' ansehen',
      image: p.svgContent,
      imageViewBox: p.viewBox
    };
  });
}

function projektBySlug(slug) {
  if (typeof GALLERY_PROJECTS === 'undefined') return null;
  for (var i = 0; i < GALLERY_PROJECTS.length; i++) {
    if (GALLERY_PROJECTS[i].slug === slug) return GALLERY_PROJECTS[i];
  }
  return null;
}

// Alle Bilder eines Projekts in fester Reihenfolge (Außenansicht zuerst,
// dann Innenraum/Detail/Grundriss) — dieselbe Reihenfolge wird für die
// Hausfenster (Ebene B) und die Lightbox verwendet, damit Fenster-Index
// und Lightbox-Index übereinstimmen.
function projektAlleBilder(projekt) {
  if (!projekt) return [];
  return [{ label: 'Außenansicht', viewBox: projekt.viewBox, svgContent: projekt.svgContent }].concat(projekt.bilder || []);
}

// Projekt-Hausfenster (Ebene B) — ein Fenster pro Bild des Projekts. Die
// href-Fragmente (#bild-N) navigieren nirgendwo hin; die Projektseite fängt
// den Klick ab und öffnet stattdessen die Lightbox (siehe projekt.html).
function projektBilderFensterItems(projekt) {
  return projektAlleBilder(projekt).map(function (bild, i) {
    return {
      slug: projekt.slug + '-' + i,
      label: bild.label,
      href: '#bild-' + i,
      ariaLabel: 'Bild „' + bild.label + '" von ' + projekt.name + ' vergrößern',
      image: bild.svgContent,
      imageViewBox: bild.viewBox
    };
  });
}

// Leistungen — noch nicht im Bestand vorhanden, Platzhaltertexte zur Freigabe.
// fensterLabel: kurze Beschriftung fürs Hausfenster (der volle Name aus
// label steht auf der Detailseite).
const LEISTUNGEN = [
  {
    slug: 'neubau-entwurf',
    label: 'Neubau & Entwurf',
    fensterLabel: 'Neubau',
    kurztext: 'Vom ersten Skizzenstrich bis zur Einreichplanung.',
    text: 'Wir begleiten Neubauprojekte von der ersten Idee bis zur Einreichplanung — Konzept, Entwurf, Genehmigungsplanung aus einer Hand, abgestimmt auf Grundstück, Budget und Nutzung.'
  },
  {
    slug: 'sanierung-umbau',
    label: 'Sanierung & Umbau',
    fensterLabel: 'Sanierung',
    kurztext: 'Bestand weiterdenken statt abreißen.',
    text: 'Ob Altbausanierung, energetische Ertüchtigung oder Umbau im laufenden Betrieb — wir entwickeln Bestandsgebäude behutsam weiter und verbinden historische Substanz mit zeitgemäßen Ansprüchen.'
  },
  {
    slug: 'innenraumgestaltung',
    label: 'Innenraumgestaltung',
    fensterLabel: 'Innenraum',
    kurztext: 'Material, Licht und Raumfolge im Detail.',
    text: 'Von der Möblierung bis zur Lichtplanung gestalten wir Innenräume, die die architektonische Idee bis ins letzte Detail weiterführen — für Wohn-, Büro- und Empfangsbereiche.'
  },
  {
    slug: 'staedtebau-wettbewerbe',
    label: 'Städtebau & Wettbewerbe',
    fensterLabel: 'Städtebau',
    kurztext: 'Von der Quartiersidee bis zur Wettbewerbsabgabe.',
    text: 'Wir entwickeln städtebauliche Konzepte und vertreten unsere Entwürfe in offenen und geladenen Wettbewerbsverfahren — mit einem Blick für Maßstab, Nutzungsmischung und öffentlichen Raum.'
  },
  {
    slug: 'baumanagement',
    label: 'Baumanagement & Bauleitung',
    fensterLabel: 'Baumanagement',
    kurztext: 'Qualität und Termine auf der Baustelle sichern.',
    text: 'Örtliche Bauaufsicht, Kostenkontrolle und Schnittstellenkoordination zwischen Gewerken — wir sorgen dafür, dass aus dem Plan tatsächlich das gebaute Ergebnis wird.'
  }
];

function leistungById(slug) {
  for (var i = 0; i < LEISTUNGEN.length; i++) {
    if (LEISTUNGEN[i].slug === slug) return LEISTUNGEN[i];
  }
  return null;
}

// Kontakt: 3 Fenster, die zu Ankern auf derselben Seite führen.
const KONTAKT_FENSTER = [
  { slug: 'adresse',       label: 'Adresse & Anfahrt',  href: '#adresse',      ariaLabel: 'Zu Adresse und Anfahrt springen' },
  { slug: 'telefon-email', label: 'Telefon & E-Mail',   href: '#telefon-email', ariaLabel: 'Zu Telefon und E-Mail springen' },
  { slug: 'formular',      label: 'Kontaktformular',    href: '#formular',     ariaLabel: 'Zum Kontaktformular springen' }
];

// Team-Fenster für team/index.html, abgeleitet aus TEAM_MEMBERS (buildings.js).
// Jedes Fenster bekommt ein fenster-füllendes Porträt (Platzhalter-Illustration,
// da noch keine echten Fotos vorliegen) mit.
function teamFensterItems() {
  if (typeof TEAM_MEMBERS === 'undefined' || typeof makePortraitContent === 'undefined') return [];
  return TEAM_MEMBERS.map(function (m, i) {
    return {
      slug: m.slug,
      label: m.name.replace(/^(Dipl\.-Ing\.|Arch\.)\s*/, ''),
      href: 'mitglied.html?id=' + m.slug,
      ariaLabel: 'Profil von ' + m.name + ' öffnen',
      image: makePortraitContent(m.svgBg, m.svgAccent, i),
      imageViewBox: '0 0 240 320'
    };
  });
}

function teamMemberBySlug(slug) {
  if (typeof TEAM_MEMBERS === 'undefined') return null;
  for (var i = 0; i < TEAM_MEMBERS.length; i++) {
    if (TEAM_MEMBERS[i].slug === slug) return TEAM_MEMBERS[i];
  }
  return null;
}
