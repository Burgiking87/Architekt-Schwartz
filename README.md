# FORM & RAUM — Architekturbüro Website

Eine hypermoderne, interaktive Website für ein fiktives Architekturbüro. Design-Sprache: eine Mischung aus eleganter Editorial-Typografie (Serife, Kursiv) und rohem Brutalismus (überdimensionierte Grotesk-Headlines, sichtbare Rasterlinien). Entwickelt mit reinem HTML, CSS und JavaScript – ohne externe Abhängigkeiten außer Google Fonts, ohne Build-Step, ohne Framework.

## 🏗️ Struktur

```
index.html                    Startseite: Hero-Haus mit 4 klickbaren Stockwerken
css/
  └── style.css                Alle Styles
js/
  ├── buildings.js              SVG-Daten für Team & Projekte (TEAM_MEMBERS, GALLERY_PROJECTS)
  ├── content-data.js           Zentrale Inhalte für die Haus-Seiten (Floors/Fenster/Leistungen/Kontaktwege)
  ├── house.js                  Wiederverwendbare Haus-Komponente (renderHouse)
  └── main.js                   Interaktivität, Scroll-Engine, Bürohund, Seiten-Init

projekte/index.html            Haus mit 3 Fenstern: Privat / Wohn / Gewerbe
projekte/privat/index.html     Projektliste "Privat"
projekte/wohn/index.html       Projektliste "Wohn"
projekte/gewerbe/index.html    Projektliste "Gewerbe"

team/index.html                Haus, ein Fenster pro Teammitglied (datengetrieben)
team/mitglied.html             Detail-Vorlage, liest ?id=<slug> aus TEAM_MEMBERS

leistungen/index.html          Haus, ein Fenster pro Leistung
leistungen/leistung.html       Detail-Vorlage, liest ?id=<slug> aus LEISTUNGEN

kontakt/index.html             Haus mit 3 Fenstern → Anker auf derselben Seite
```

## ✨ Features

- **Startseite** mit Hero-Bereich, animiertem Haus (4 klickbare Stockwerke: Projekte/Team/Leistungen/Kontakt), Statistik-Zählern, Neuigkeiten-Grid und gepinntem Manifest-Abschnitt
- **Projekte** — eigenes Haus mit 3 Fenstern (Privat/Wohn/Gewerbe), jedes führt zu einer Kategorie-Projektliste
- **Team** — eigenes Haus, ein Fenster pro Mitglied; Klick öffnet Detailseite mit Foto, Rolle, Bio, Tags und E-Mail-Kontakt
- **Leistungen** — eigenes Haus, ein Fenster pro Leistung; Klick öffnet Detailbeschreibung
- **Kontakt** — eigenes Haus mit 3 Fenstern (Adresse/Anfahrt, Telefon & E-Mail, Kontaktformular), die zu Ankern auf derselben Seite springen; Formular versendet per `mailto:`
- **Galerie** (auf der Startseite, als Tab) mit 8 Projekten, filterbar nach gebaut/geplant

### Die Haus-Komponente (`js/house.js`)
`renderHouse(mountEl, { variant, items })` baut das Gebäude als SVG programmatisch aus einer Item-Liste (Silhouette, Geschossdecken bzw. Fensterraster) und legt echte, fokussierbare `<a>`-Elemente darüber — mit `aria-label`, sichtbarem Focus-Ring, Hover-Aufhellung der Fenster und gestaffeltem Einfliegen. Kein Copy-Paste des Hausmarkups: Startseite nutzt `variant: 'floors'` (feste 4 Stockwerke aus `HOME_FLOORS`), die Unterseiten nutzen `variant: 'windows'` (Fensterraster, Zeilen/Spalten aus `items.length` berechnet — neue Teammitglieder oder Leistungen sind reine Datensatz-Ergänzungen in `content-data.js` / `buildings.js`, ohne Layout-Code anzufassen).

Auf sehr schmalen Screens (< 400px) blendet CSS die Haus-Illustration aus und zeigt stattdessen eine gestapelte Linkliste (`.house-fallback`), damit Touch-Targets nie zu klein werden.

### Scroll-Animationen
- 📊 Scroll-Fortschrittsbalken
- 🧭 Navigation blendet beim Scrollen nach unten aus, erscheint beim Scrollen nach oben
- ✂️ Zeilenweise Text-Reveals (Masken-Wipe) für alle Headlines
- 🪟 Clip-Wipe-Reveal für Karten & Grids (News, Stats, Kontakt, Projektlisten)
- 📌 Gepinnter Manifest-Abschnitt mit Scrollytelling-Dimming (4 Statements)
- 🌫️ Section-Wasserzeichen (großformatige Outline-Typografie im Hintergrund)
- ♿ Respektiert `prefers-reduced-motion` (alle Animationen werden deaktiviert/vereinfacht)

### Weitere Interaktionen
- 🖱️ Custom-Cursor mit Hover-Reaktion
- 🐕 Animierter Bürohund (Bacchus) unten rechts auf jeder Seite — sitzt, legt sich beim Hover hin, freut sich beim Klick
- 🃏 News-Karten mit 3D-Tilt-Effekt
- 🖼️ Galerie-Objekte heben sich an und kippen beim Hover
- 🔢 Zahlen-Counter beim Laden der Startseite

## 🚀 GitHub Pages Deployment

1. Repository auf GitHub erstellen
2. Alle Dateien hochladen (Struktur beibehalten)
3. Unter **Settings → Pages → Branch: main → / (root)** aktivieren
4. Die Website ist nach wenigen Minuten unter `https://USERNAME.github.io/REPO-NAME` erreichbar

Alle internen Links sind relativ, damit die Seite sowohl unter einem Root-Domain als auch unter einem Unterpfad (z. B. `github.io/REPO-NAME/`) funktioniert.

## 🎨 Design

- Farbpalette: Schwarz, Weiß, Grau (`#0a0a0a`, `#f5f4f0`, `#3a3a38`) — bewusst monochrom, kein Akzentton
- Schriften: Archivo Black (brutalistische Headlines), Cormorant Garamond (elegante Kursiv-Akzente), Space Mono (Labels & Daten)
- Alle Illustrationen sind SVG (skalierbar, kein Bildladen nötig)

## 📱 Responsive

Funktioniert auf Desktop, Tablet und Mobilgeräten.
