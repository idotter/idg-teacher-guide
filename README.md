# IDG im Unterricht

PWA für Lehrpersonen (Lehrplan 21 / Sek I+II), um die **Inner Development Goals** im Unterrichtsalltag zu entdecken und einzusetzen.

Vorn auf jeder Karte: unverändertes IDG-Framework (Dimension, Kompetenz, offizielle Beschreibung).  
Hinten: originale Impulse — Für dich, Für die Klasse, Im Unterricht.

## Lokal starten

```bash
npm install
npm run dev
```

App: [http://127.0.0.1:43123](http://127.0.0.1:43123) (leitet auf `/de` um)

Produktion:

```bash
npm run build
npm start
```

## Sprachen hinzufügen

1. Locale in `src/i18n/routing.ts` ergänzen (`locales`-Array).
2. Message-Datei `src/messages/<locale>.json` anlegen (Kopie von `de.json` oder `en.json`).
3. In `src/content/framework.ts` und `src/content/teacher-backs.ts` die LocalizedText-/Back-Inhalte um die neue Sprache erweitern (oder ein drittes Mapping analog zu DE/EN).
4. Middleware/Matcher bleibt gleich, solange das Locale in `routing` steht.

UI-Copy liegt nur in `src/messages/*`. Offizielle Framework-Texte und Unterrichtsrückseiten liegen in `src/content/`.

## Marke & Attribution

Farben und Dimensionssymbolik folgen dem IDG Brandguide 2.0 (Okt 2025):

| Dimension | HEX |
|-----------|-----|
| Sein / Being | `#d4b88c` |
| Denken / Thinking | `#e585a1` |
| Beziehung / Relating | `#ef4136` |
| Zusammenarbeit / Collaborating | `#ff7e2a` |
| Handeln / Acting | `#661a30` |
| Hintergrund | `#FAF7F5` |

Schrift: **Inter** (Bold / Regular / Light).

Diese App nutzt die Behandlung **Inspired by IDG** — kein offizielles Foundation-Produkt. Das Framework selbst (Namen, Beschreibungen) ist unverändert. Nicht-kommerzielle Bildungsnutzung.

Mehr: [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org)

## Technik

- Next.js App Router, TypeScript, Tailwind CSS
- `next-intl` (DE Standard, EN vorhanden)
- PWA: Web App Manifest + Serwist Service Worker (Offline nach erstem Besuch)
- Kein Backend, kein Auth — statischer Content
- Production: `output: "standalone"` + multi-stage `Dockerfile`

Icons neu erzeugen: `npm run icons`

## Deploy with Coolify (GitHub)

Repo: [`idotter/idg-teacher-guide`](https://github.com/idotter/idg-teacher-guide)

1. In Coolify, create a new application from the GitHub repository `idotter/idg-teacher-guide` (branch `main`).
2. Build pack: prefer **Dockerfile** (recommended). Coolify can also use **Nixpacks**; for Nixpacks set the start command to `npm run start` and ensure the build command is `npm run build`.
3. Port: **3000** (container listens on `0.0.0.0:3000` via `PORT` / `HOSTNAME`).
4. HTTPS: enable Coolify’s proxy / Let’s Encrypt on your domain — no app-level TLS config needed.
5. Optional local check: `docker compose up --build` then open `http://127.0.0.1:3000`.

No secrets are required for the default static PWA deploy.
