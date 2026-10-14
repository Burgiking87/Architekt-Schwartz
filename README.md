# Architekt Schwartz — Website-Vorschau

Dieses Repository enthält den aktuellen statischen Website-Entwurf. **Es wird dadurch weder veröffentlicht noch deployed.**

## Website lokal ansehen

Es gibt keinen Build-Schritt und keine Paketinstallation. Im Projektordner einen einfachen lokalen Server starten, zum Beispiel:

```bash
python3 -m http.server 8000
```

Dann `http://localhost:8000/` im Browser öffnen. Die Startseite wird von `index.html` geladen. Zum Navigieren auf die Häuser klicken; unten links in der Seitenleiste führt „Projekte“ zur Projektübersicht. Der Bürohund bleibt als festes Seitenelement sichtbar.

## Projektstruktur

- `index.html` — Startseite
- `projekte/`, `team/`, `leistungen/`, `kontakt/`, `impressum/` — Unterseiten
- `css/style.css` — Gestaltung und responsive Layouts
- `js/` — Hauskomponente, Inhalte, Interaktionen und Seitenübergänge
- `_redirects` — Weiterleitungen für kompatible Static-Hosts
- `cloudcannon.config.yml` — Startkonfiguration für CloudCannon

Die Projekt- und Gebäudegrafiken liegen als SVG-Markup in den JavaScript-Daten; es gibt keinen separaten Bilderordner.

## Vor Veröffentlichung prüfen

Inhalte im Impressum, Team und Kontaktformular enthalten teils gekennzeichnete Platzhalter. Das Kontaktformular öffnet derzeit das lokale E-Mail-Programm (`mailto:`); es versendet nicht direkt über einen Server. Vor einer öffentlichen Veröffentlichung bitte alle Platzhalter und Kontaktdaten mit der Geschäftsführung prüfen und den gewünschten Formular-Versand einrichten.
