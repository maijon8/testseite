# Saarflow – Marketing-Website

Statische Seite (HTML/CSS/Vanilla-JS), kein Build-Schritt.

```bash
cd testseite
python3 -m http.server 8080   # dann http://localhost:8080 öffnen
```

- `index.html` – Startseite · `impressum.html` · `datenschutz.html`
- `assets/css/style.css` – alle Styles, Design-Tokens oben in `:root`
- `assets/js/main.js` – Mobil-Menü, Einblenden, Formular-Platzhalter
- `assets/fonts/` – Bricolage Grotesque, Inter, JetBrains Mono (lokal, SIL OFL)
- `PLATZHALTER.md` – alles, was vor dem Livegang ersetzt werden muss

Für den Live-Betrieb auf dem Server gzip/brotli und lange Cache-Header für `assets/` aktivieren.

**Nach Änderungen an CSS/JS** die Versionsnummer `?v=…` in allen drei HTML-Dateien hochzählen, damit Browser nicht die alte Datei aus dem Cache nehmen.
