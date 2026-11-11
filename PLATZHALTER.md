# Platzhalter – vor Veröffentlichung ersetzen

Auf der Seite sind alle Platzhalter sichtbar orange-gestrichelt markiert (`<mark class="ph">` bzw. `.placeholder-box`, `.logo-ph`, `.legal-note`).

## Startseite (`index.html`)
| Bereich | Platzhalter |
|---|---|
| Hero – Fakten | Monatspreis `[XX] €`, Dauer bis online `[14]` Tage, Einrichtungsgebühr `[0] €` |
| Hero – Mockup | „Bäckerei Becker, Dillingen“ ist ein fiktiver Beispielbetrieb (auch im Ablauf: `baeckerei-becker.de`) |
| Problem → Lösung | Anwendungsbeispiel ist fiktiv → durch echten Kundenfall ersetzen |
| So funktioniert's | Leistungsversprechen prüfen: „30 Minuten“, „zwei Korrekturrunden“, „Backup täglich“, Google-Profil-Verknüpfung |
| Über uns | Firmensitz `[Ort, z. B. Saarbrücken]`, Teamfoto / Kurzvorstellung |
| Vertrauen | 2 Kundenstimmen (Zitat, Name, Betrieb, Ort), 5 Kundenlogos |
| Kontakt | Telefon, E-Mail (auch `tel:`/`mailto:`-Links!), Adresse |
| Kontaktformular | Formspree-ID fehlt: in `index.html` `DEINE_FORM_ID` im `action`-Attribut ersetzen. Antwortzeit `[2]` Werktage unter dem Button |
| Footer | Rechtsform (`[Rechtsform]`) |

## Impressum (`impressum.html`)
Firmenname, Rechtsform, Anschrift, Vertretungsberechtigte, Telefon, E-Mail, Registergericht + HRB, USt-IdNr., Verantwortliche:r nach § 18 Abs. 2 MStV, Hinweise zu Streitschlichtung prüfen, Haftungstexte.

## Datenschutz (`datenschutz.html`)
Verantwortliche Stelle, ggf. Datenschutzbeauftragte:r, Hosting-Anbieter + Speicherdauer der Logfiles, Formspree: Auftragsverarbeitungsvertrag (DPA) + Grundlage der Drittlandübermittlung (USA), Anschrift der Aufsichtsbehörde (Unabhängiges Datenschutzzentrum Saarland), Stand-Datum.

> Rechtstexte sind Gliederungen mit Mustertexten, keine Rechtsberatung – vor Livegang prüfen lassen.

## Sonstiges
- Domain in Meta-Daten/Canonical, Open-Graph-Bild (noch nicht vorhanden)
- Logo ist eine einfache SVG-Wortmarke (`assets/favicon.svg`, im Header inline) – ggf. durch echtes Logo ersetzen
