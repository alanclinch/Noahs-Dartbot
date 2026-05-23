# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

DartBot is a static, no-build web app: a launcher page (`index.html`) plus one self-contained HTML file per game under `games/`. There is no package.json, bundler, or framework — open `index.html` in a browser (or serve the folder over any static HTTP server) and everything runs.

The app integrates with the [Autodarts](https://autodarts.io) board over a local WebSocket (`ws://localhost:3180`) and optionally with a Neon Postgres database for cloud stats. Both connections are optional — games fall back to manual scoring / local-only stats.

## Running and testing

- **Run the app**: open `index.html` directly, or serve the repo root via any static server (e.g. `python -m http.server`, VS Code Live Server). Game pages link relatively to `assets/`, so the working directory must be the repo root.
- **Autodarts**: requires the Autodarts caller/client running locally on port 3180. Without it, games stay in "Manual Mode" and you click segments to score.
- **Neon stats**: configured per-browser via the SETUP button on the launcher; the connection string is stored in `localStorage` under `neon_db_string`. The Neon serverless driver is imported dynamically from `https://esm.sh/@neondatabase/serverless` inside each game.
- **Demolish bot calibration / simulation** (Node, no deps):
  - `node tools/simulate-demolish-games.js` — default matchups
  - `node tools/simulate-demolish-games.js cpu8 cpu0 500` — head-to-head N legs
  - `node tools/simulate-demolish-games.js roundrobin 100` — all-vs-all
  - `tools/calibrate-demolish-bot.html` is the in-browser calibration UI for tuning per-CPU sigma values.

There is no automated test suite or linter. Verification for game logic changes is by playing the affected game in the browser (manual mode is fine) and, for Demolish bot changes, by running the simulator.

## Architecture

### Shared modules (loaded by every game)

All games include the same two scripts in their `<head>`, plus `bots.js` if they have CPU opponents:

- [assets/js/autodarts.js](assets/js/autodarts.js) — WebSocket client. Game defines `handleWS(data)` and calls `initAutodarts(handleWS)` on `DOMContentLoaded`. Auto-reconnects across three known endpoint paths. Updates any `.ws-dot` and `#setup-ws-label` / `#game-ws-label` elements with connection state.
- [assets/js/utils.js](assets/js/utils.js) — `PLAYER_COLORS`, segment helpers (`isMiss`, `segScore`, `dartSpeak`), `showScreen(id)`, the speech queue (`initSpeech`, `speak`, voice picker auto-selection preferring en-GB Natural/Neural), Web Audio SFX primitives (`tone`, `noiz`, `sfxBust`, `sfxCheckout`, etc.), and `spawnConfetti`.
- [assets/js/bots.js](assets/js/bots.js) — `CPU_PLAYERS` roster (Jocky Wilson → Phil Taylor, ordered weakest to strongest), per-CPU `BOT_TIERS` sigma table, face/avatar SVG generators, `generateCpuThrow(target, mpr)` (Gaussian scatter via Box–Muller), `getAdjacentNumbers`.

### Per-game files

Each game is **one HTML file + one JS file + one CSS file**, named consistently (e.g. `games/cricket.html` ↔ `assets/js/cricket.js` ↔ `assets/css/cricket.css`). Games are independent — they share only the modules above. When adding a new game, follow the same triplet and link it from the games grid in `index.html`.

Pokémon Darts is the exception: it has its own `pokemon-autodarts.js`, `pokemon-bots.js`, and `pokemon-utils.js` rather than reusing the shared ones, because its mechanics (damage/heal by odd/even, evolution by multiplier streak) diverge enough to warrant separate logic.

### CPU bot model

Two coexisting tuning schemes — be careful not to cross them:

- **Cricket**: uses an MPR-based formula directly inside `generateCpuThrow` based on each CPU's `mpr` value. Cricket never reads `BOT_TIERS`. This formula is canonical — do not change it when adjusting other games.
- **Other games (Around the Clock, Demolish, etc.)**: pass `sigmaOverride` to `generateCpuThrow`, looking up either `BOT_TIERS[cpu.id].sigma` (Around the Clock) or a game-specific table such as `DEMOLISH_PPR_TABLE` in [assets/js/demolish.js](assets/js/demolish.js). The Demolish table is mirrored verbatim in `tools/simulate-demolish-games.js` — keep them in sync.

Theoretical background for the Cricket CPU (Lead-and-Cover, MDP, dartboard radial/angle math) is in `Documentation/Cricket_Darts_CPU_Complete_Architecture-v2.pdf` and extracted to `Documentation/arch_extract.txt`.

### Persistence

- **Player roster + per-player stats**: `localStorage['dartbot_players']` — a `{ name: { darts, marks, games, wins, flag } }` map. Read/written by both the launcher and individual games. MPR is derived (`marks / (darts/3)`), not stored.
- **Caller voice**: `localStorage['dartbot_voice']`.
- **Neon connection string**: `localStorage['neon_db_string']` (per browser; not committed). Games import the Neon driver dynamically only if this key is set.

### Documentation

`Documentation/autodarts-game-dev-guide.docx.pdf` is the upstream Autodarts WebSocket/event reference. Consult it when adding a new event handler or changing how throws are parsed.

## Conventions

- No build step, no transpilation — write browser-native ES (no JSX, no TypeScript, no imports/exports except dynamic `import()` for Neon). Globals from `utils.js` / `bots.js` are referenced directly.
- File-level header comments in shared modules list the globals they export — keep these accurate when adding/removing helpers.
- `deprecated/` holds prior iterations; do not edit unless reviving old work.
