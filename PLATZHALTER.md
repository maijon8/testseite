# Offene Punkte

Auf der Seite sind verbleibende Platzhalter orange-gestrichelt markiert (`<mark class="ph">`).

## Startseite (`index.html`)
| Bereich | Offen |
|---|---|
| Hero-Mockup | Kundenportal-Ansicht ist nachgebaut, nicht das echte Portal; „Bäckerei Becker“ ist fiktiv |
| Fotos (Zusatzleistung) | Nutzungsrechte der Bilder für Kunden vertraglich regeln |
| Vertrauen | Echte Kundenstimmen und Logos ergänzen, sobald vorhanden |
| Gründer | Fotos ersetzen später die Initialen DS / JM |

## Demos (`demos.html` und `demo-*.html`)
| Bereich | Offen |
|---|---|
| Vier Beispielseiten | Alle Betriebe sind frei erfunden (Gasthaus Lindenblick, Schreinerei Brandt, Kfz-Meisterbetrieb Kessler, Salon Nora). Das steht in der Leiste oben und im Footer jeder Beispielseite |
| Adressen, Telefon, Preise, Bewertungen | Auf den Beispielseiten erfunden („Musterstadt“, 06831 000 000); die Speisekarten- und Salonpreise sind nur Beispielinhalt |
| Formulare | Die Formulare der Beispielseiten senden nichts, sie zeigen nur einen Hinweis |
| Impressum / Datenschutz | Im Footer der Beispielseiten nur als Text, nicht verlinkt |
| Bilder | Die Beispielseiten nutzen Zeichnungen statt Fotos; später echte Kundenprojekte zeigen |
| Funktionen | Prüfen, ob alles Gezeigte wirklich angeboten wird: Anfrageformulare, Google-Bewertungen (laut Paketen nur Premium), Hinweisleiste, Anfahrtskarte |
| Vorschaubilder | `assets/img/demos/*.webp` sind Screenshots der Beispielseiten und müssen nach Änderungen neu erzeugt werden |
| Namen | Vor dem Livegang kurz prüfen, ob es einen gleichnamigen Betrieb in der Region gibt |

## Online-Terminbuchung
- Die Buchung in `demo-salon.html` und `demo-werkstatt.html` ist eine Vorführung im Browser: freie und belegte Zeiten sind ausgedacht, es wird nichts gespeichert oder gesendet
- Für echte Kunden ist Easy!Appointments (Open Source, GPL-3.0) vorgesehen; es muss pro Kunde installiert werden. Im KAS prüfen: PHP 8.2+, MySQL-Datenbank, Cronjob
- Auf der Startseite steht die Terminbuchung als „Zusatzleistung“ ohne Preis. Preis und Paket-Zuordnung festlegen
- Die Aussagen „Termin steht im Kalender“, „Bestätigung per E-Mail“, „ohne Buchungsportal und ohne Provision“ gelten für eine selbst betriebene Lösung wie Easy!Appointments. Vor dem ersten Kundenprojekt einmal selbst testen
- Datenschutz: Auftragsverarbeitungsvertrag mit jedem Kunden, Buchung in der Datenschutzerklärung der Kundenseite erwähnen
- Idee für später: das eigene Erstgespräch über dieselbe Buchung anbieten – dann erleben Interessenten das Produkt direkt

## Vor dem echten Betrieb
- Impressum und Datenschutzerklärung mit eRecht24 gegenprüfen
- Auftragsverarbeitungsvertrag (AVV) mit ALL-INKL.COM im KAS abschließen
- AVV/DPA mit Vercel (Kundenportal) abschließen

## Digitalisierung (`digitalisierung.html`)
- Einsatzbeispiele und Ablauf mit Dennis abstimmen – nur anbieten, was wirklich umgesetzt werden kann
- Preise / Preismodell für KI-Projekte ergänzen, sobald festgelegt
- Datenschutz: eingesetzte KI-Dienste (z. B. OpenAI, Anthropic, Mistral) in der Datenschutzerklärung der jeweiligen Kunden-Lösung berücksichtigen; AVV mit jedem Dienst
- Gewerbeanmeldung um „Digitalisierung, Automatisierung mit KI / Softwaredienstleistungen“ erweitern (Gewerbeummeldung)
- Foto von Dennis ersetzt später die Initialen

## Suchmaschinen (SEO)
- Google Search Console einrichten (search.google.com/search-console), Domain `saarflow.info` bestätigen und `https://saarflow.info/sitemap.xml` einreichen
- Dasselbe bei Bing Webmaster Tools (optional)
- Google-Unternehmensprofil anlegen (wichtigster Hebel für lokale Suchen wie „Webdesign Saarlouis“). Die Adresse lässt sich dort verbergen, wenn nur ein Einzugsgebiet angezeigt werden soll
- In den strukturierten Daten der Startseite stehen bewusst nur Ort und PLZ (Ensdorf, 66806), keine Straße und keine Telefonnummer
- Die alte Kopie unter GitHub Pages abschalten oder das Repository privat stellen, damit die Seite nicht doppelt im Netz steht
- Icon in der Google-Suche: `favicon.ico` liegt im Hauptordner, dazu PNG in 96 und 192 px. Nach dem Hochladen in der Search Console die Startseite über „URL-Prüfung“ neu einreichen; bis das Icon erscheint, dauert es Tage bis Wochen
- Neue Seite angelegt? In `sitemap.xml` eintragen und `<link rel="canonical">` setzen
- HSTS steht auf 30 Tage (`.htaccess`); wenn HTTPS ein paar Wochen stabil läuft, auf ein Jahr (`max-age=31536000`) erhöhen
