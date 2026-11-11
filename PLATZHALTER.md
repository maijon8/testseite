# Platzhalter – vor Veröffentlichung ersetzen

Auf der Seite sind alle Platzhalter sichtbar orange-gestrichelt markiert (`<mark class="ph">` bzw. `.placeholder-box`, `.logo-ph`, `.legal-note`).

## Startseite (`index.html`)
| Bereich | Platzhalter |
|---|---|
| Hero – Fakten | Monatspreis `[XX] €`, Dauer bis online `[14]` Tage, Einrichtungsgebühr `[0] €` |
| Hero – Mockup | „Bäckerei Becker, Dillingen“ ist ein fiktiver Beispielbetrieb (auch im Ablauf: `baeckerei-becker.de`) |
| Problem → Lösung | Anwendungsbeispiel ist fiktiv → durch echten Kundenfall ersetzen |
| So funktioniert's | Leistungsversprechen prüfen: „30 Minuten“, „zwei Korrekturrunden“, „Backup täglich“, Google-Profil-Verknüpfung |
| Fotos (Zusatzleistung) | Preis bzw. Paketzugehörigkeit; Nutzungsrechte der Bilder für Kunden (Google-Profil, Social Media, Flyer) vertraglich regeln |
| Über uns | Firmensitz `[Ort, z. B. Saarbrücken]`, Teamfoto / Kurzvorstellung |
| Vertrauen | 2 Kundenstimmen (Zitat, Name, Betrieb, Ort), 5 Kundenlogos |
| Kontakt | Telefon, E-Mail (auch `tel:`/`mailto:`-Links!), Adresse |
| Kontaktformular | Öffnet das E-Mail-Programm (mailto). Empfänger-Adresse `hallo@saarflow.example` in `index.html` ersetzen: im Formular (`action` + `data-mailto`) und beim E-Mail-Link im Kontaktbereich |
| Footer | – (Mailänder & Scholl GbR eingetragen) |

## Impressum (`impressum.html`)
Straße + PLZ in Saarlouis, Vorname Scholl, verantwortliche Person nach MStV, Telefon, E-Mail, Registergericht + HRB, USt-IdNr., Verantwortliche:r nach § 18 Abs. 2 MStV, Hinweise zu Streitschlichtung prüfen, Haftungstexte.

## Datenschutz (`datenschutz.html`)
Straße/PLZ und Vorname Scholl bei der verantwortlichen Stelle, Kundenportal (Hosting-Anbieter, z. B. Vercel), ggf. Datenschutzbeauftragte:r, Hosting-Anbieter + Speicherdauer der Logfiles, ggf. E-Mail-Anbieter, Anschrift der Aufsichtsbehörde (Unabhängiges Datenschutzzentrum Saarland), Stand-Datum.

> Rechtstexte sind Gliederungen mit Mustertexten, keine Rechtsberatung – vor Livegang prüfen lassen.

## Sonstiges
- Domain in Meta-Daten/Canonical, Open-Graph-Bild (noch nicht vorhanden)
- Logo ist eine einfache SVG-Wortmarke (`assets/favicon.svg`, im Header inline) – ggf. durch echtes Logo ersetzen
