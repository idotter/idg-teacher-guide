# Task 1: Routing-Kern — Report

## Zusammenfassung

Der Routing-Kern für mehrsprachige, sprachpräfixierte Pfade wurde vollständig implementiert und getestet. Alle 15 Unit-Tests bestanden. Der Build bleibt grün.

## Durchgeführte Arbeiten

### Step 1: vitest installieren
- `npm install --save-dev vitest` erfolgreich ausgeführt
- vitest `^5.0.0` hinzugefügt

### Step 2: package.json ergänzen
- Script `"test": "vitest run"` alphabetisch vor `generate:share` einsortiert

### Step 3 & 4: Test-Suite erstellen und Fehlschlag sehen
- `src/site/routes.test.js` mit 15 Tests erstellt (alle relevanten Fälle abgedeckt)
- Test-Lauf zeigte erwarteten Fehler: `Cannot find module './routes.js'`

### Step 5: Routing-Kern implementieren
Datei `src/site/routes.js` mit exportierten Funktionen:
- `langFromPath(pathname)` — extrahiert Sprache aus Pfad oder gibt Deutsch zurück
- `stripLangPrefix(pathname)` — entfernt Sprachpräfix
- `routeKeyFromPath(pathname)` — erkennt Route und optionale ID
- `localizedPath(key, lang, id)` — baut lokalisierte Pfade
- `translationsOf(pathname)` — liefert alle 6 Sprachen in fester Reihenfolge

Alle Funktionen nutzen intern:
- `LANGS` aus `src/content/langs.js` (bereits vorhanden)
- `SEGMENTS` aus `src/site/i18n/segments.js` (neu)

### Step 6: Tests grün
```
Test Files  1 passed (1)
Tests  15 passed (15)
Duration  117ms
```

Alle Tests bestanden ohne Fehler.

### Step 7: Build-Verifikation
```
✓ built in 782ms
```

Der Vite-Build läuft erfolgreich. Keine neuen Fehler.

### Step 8: Commit
Commit-Hash: `9d39fba`

```
Routing-Kern für sprachpräfixierte Pfade.
Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

Dateien im Commit:
- `package.json`
- `package-lock.json`
- `src/site/i18n/segments.js` (neu)
- `src/site/routes.js` (neu)
- `src/site/routes.test.js` (neu)

## Implementierungs-Entscheidungen

1. **SEGMENTS-Struktur**: Bewusst kleine, isolierte Datei ohne Inhaltsimporte — der Client zieht nur die Slug-Tabelle, nicht alle Textdateien.

2. **normalize()**: Interne Hilfsfunktion normalisiert alle Pfadvarianten (`/x`, `/x/`, `x`) zu `/x/`, damit die Logik nicht variiert.

3. **Sprachpriorität**: Deutscher Pfad `/projekt/` bleibt ohne Präfix. Unbekannte Präfixe fallen zu Deutsch zurück.

4. **Inhaltsseiten**: `dimension` und `skill` *erfordern* eine ID (sonst unknown), während andere Seiten *verbieten* IDs.

5. **translationsOf()**: Liefert die feste Reihenfolge `de, en, fr, es, it, sv` aus `LANG_IDS`, skipped `app` und unknown.

## Tests im Detail

- **langFromPath**: 3 Tests — Präfix erkennen, Deutsch fallback, unbekannte Präfixe
- **stripLangPrefix**: 2 Tests — Präfix entfernen, deutsche Pfade unberührt
- **routeKeyFromPath**: 5 Tests — Startseite, Unterseiten, Inhaltsseiten mit ID, App, unbekannte Pfade
- **localizedPath**: 3 Tests — deutsche ohne Präfix, fremdsprachig mit Präfix, App always unpräfixiert
- **translationsOf**: 2 Tests — alle 6 Sprachen in Reihenfolge, leere Liste für unknown

## Bedenken / Offene Punkte

Keine. Die Implementierung folgt exakt dem Brief, alle Tests bestehen, der Build bricht nicht. Die Schnittstellen sind klar und können nahtlos in Client, Build-Generatoren und weitere Routing-Logik integriert werden.

---

## Fix-Runde 1: Explizites deutsches Präfix `/de/…`

**Befund (Important):** `/de/projekt/` löste zu `{key: 'unknown'}` auf, nicht zu `{key: 'project', id: null}`.

**Ursache:** `stripLangPrefix` entfernte das Präfix nur, wenn `lang !== DEFAULT_LANG`. Das explizite `/de/`-Präfix wurde nicht erkannt.

**Lösung (strip-and-resolve):** `stripLangPrefix` prüft jetzt direkt, ob der erste Pfad-Segment eine bekannte Sprache ist — unabhängig davon, ob es Deutsch ist — und entfernt ihn dann. So sind `/projekt/` und `/de/projekt/` äquivalent.

**Änderung in `src/site/routes.js`:**
```js
export function stripLangPrefix(pathname) {
  const path = normalize(pathname)
  const first = path.split('/')[1]
  return LANG_IDS.includes(first) ? normalize(path.slice(first.length + 1)) : path
}
```

**Neue Tests hinzugefügt:**
- `stripLangPrefix('/de/')` → `'/'`
- `stripLangPrefix('/de/projekt/')` → `'/projekt/'`
- `routeKeyFromPath('/de/')` → `{key: 'home', id: null}`
- `routeKeyFromPath('/de/projekt/')` → `{key: 'project', id: null}`
- `routeKeyFromPath('/de/kompetenzen/mut/')` → `{key: 'skill', id: 'mut'}`
- `localizedPath('project', 'de')` → `'/projekt/'` (kein `/de/`-Präfix erzeugt)

**Test-Ergebnis nach Fix:**
```
Test Files  1 passed (1)
Tests  20 passed (20)
Duration  187ms
```

**Build-Verifikation:**
```
✓ built in 532ms
```

### Nächste Schritte

Task 2 wird auf diesem Kern aufbauen: Navigation/Link-System, das `translationsOf()` nutzt, um Sprachumschalter zu rendern.
