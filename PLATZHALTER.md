# Platzhalter – vor Veröffentlichung ersetzen

Auf der Seite sind alle Platzhalter sichtbar orange-gestrichelt markiert (`<mark class="ph">` bzw. `.placeholder-box`, `.logo-ph`, `.legal-note`).

## Startseite (`index.html`)
| Bereich | Platzhalter |
|---|---|
| Hero – Fakten | Dauer bis online `[14]` Tage |
| Hero – Mockup | Kundenportal-Ansicht ist nachgebaut, nicht das echte Portal. „Bäckerei Becker, Dillingen“ ist ein fiktiver Beispielbetrieb (auch im Ablauf: `baeckerei-becker.de`) |
| Problem → Lösung | Anwendungsbeispiel ist fiktiv → durch echten Kundenfall ersetzen |
| So funktioniert's | Leistungsversprechen prüfen: „30 Minuten“, „zwei Korrekturrunden“, „Backup täglich“, Google-Profil-Verknüpfung |
| Fotos (Zusatzleistung) | Nutzungsrechte der Bilder für Kunden (Google-Profil, Social Media, Flyer) vertraglich regeln |
| Über uns | Fotos der Gründer (ersetzen die Initialen DS / JM) |
| Vertrauen | Echte Kundenstimmen und Logos ergänzen, sobald vorhanden (derzeit: „Noch keine Bewertungen“ + freie Plätze) |
| Kontakt | Telefon, E-Mail (auch `tel:`/`mailto:`-Links!) |
| Kontaktformular | Öffnet das E-Mail-Programm (mailto). Empfänger-Adresse `hallo@saarflow.example` in `index.html` ersetzen: im Formular (`action` + `data-mailto`) und beim E-Mail-Link im Kontaktbereich |
| Footer | – (Mailänder & Scholl GbR eingetragen) |

## Impressum (`impressum.html`)
Straße + PLZ in Saarlouis (ladungsfähige Anschrift ist Pflicht, auch für Online-Unternehmen), verantwortliche Person nach MStV, Telefon, E-Mail, Steuernummer der GbR, Verantwortliche:r nach § 18 Abs. 2 MStV, Hinweise zu Streitschlichtung prüfen, Haftungstexte.

## Datenschutz (`datenschutz.html`)
Straße/PLZ bei der verantwortlichen Stelle, Kundenportal (Hosting-Anbieter, z. B. Vercel), ggf. Datenschutzbeauftragte:r, Hosting-Anbieter + Speicherdauer der Logfiles, ggf. E-Mail-Anbieter, Anschrift der Aufsichtsbehörde (Unabhängiges Datenschutzzentrum Saarland), Stand-Datum.

> Rechtstexte sind Gliederungen mit Mustertexten, keine Rechtsberatung – vor Livegang prüfen lassen.

## Sonstiges
- Domain in Meta-Daten/Canonical, Open-Graph-Bild (noch nicht vorhanden)
- Logo ist eine einfache SVG-Wortmarke (`assets/favicon.svg`, im Header inline) – ggf. durch echtes Logo ersetzen

## Erklärung zur Barrierefreiheit (`barrierefreiheit.html`)
E-Mail und Telefon für Feedback; prüfen lassen, ob das BFSG für Saarflow gilt.

## Cookie-Hinweis
Die Seite setzt keine Cookies und kein Tracking – der Banner informiert nur. Wird später z. B. ein Statistik-Tool eingebunden, muss der Banner eine echte Einwilligung abfragen (siehe Kommentar in `assets/js/main.js`) und die Datenschutzerklärung angepasst werden.
