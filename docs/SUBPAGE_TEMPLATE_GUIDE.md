# Bismut Landing: gemeinsame Unterseiten-Templates V1

**Status:** Redaktionelles Template. Keine neuen Features oder Releases zugesichert.

Die bestehende Navigation und die bisherigen Inhalte bleiben im `dist/app.js`.
`dist/subpage-template.js` verwaltet die neuen Slots (Kurzprofil, drei Themenkarten und Stand & Ausblick).
`dist/subpage-template.css` kapselt das Layout. Acht Unterseiten enthalten die Slots;
`dist/index.html` und `dist/library-explorer.html` bleiben unverändert.

## Pflege
1. Im `specs`-Objekt das Profil der Unterseite ändern: Status, Typ, Fokus, drei Themen, aktueller Stand, nächste Inhalte.
2. Fakten gegen das zuständige Projekt-Repository und einen datierten Report prüfen. Keine erfundenen PASS, Release-Stände oder Downloadlinks.
3. Produktstatus (Konzept, Prototyp, Implementierung, öffentlich freigegeben) nicht vermischen.
4. Der Renderer setzt Inhalte per `textContent` ein; kein unsicheres HTML aus Datenquellen.
5. Für eine zusätzliche Route die HTML-Slots, Routing-Konfiguration und Tests gemeinsam ergänzen.

## Gates
Vor Merge und Deployment: `node --test tests/*.test.cjs`; `npx playwright test` mit
1280×720, 1920×1080 und 375×667; Seiten, Navigation, Tastaturfokus, Explorer und Katalog prüfen.
Bei fehlender Evidence Branch nicht veröffentlichen. Das statische Vercel-Output-Verzeichnis
ist `dist`, festgelegt in `vercel.json`.
