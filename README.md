# Woodpecker Chess
[![Tech used](https://skillicons.dev/icons?i=react,typescript,vite&theme=dark)](https://skillicons.dev)

> **Short description**: Woodpecker is a personal project: a lightweight chess puzzle repetition trainer built with React + TypeScript and a chessboard UI. It’s created to be a practical learning project for frontend + fullstack skills while producing a usable puzzle trainer (mock-data first, Lichess puzzles DB integration later on.Thats If I got to that point which is unlikely).

---

## Features

### Implemented

* Render puzzles on an interactive chessboard component.
* Validate player moves against the solution sequence.
* simple UI feedback for correct / incorrect moves.
* Controls like **Next** and **Reset**.
* Mock puzzle dataset with typed puzzle objects.

### Planned (near term)

* Import real puzzles from Lichess puzzle database (CSV → internal JSON mapping).
* Doing the get hint feature.
* Basic user results tracking (local → Supabase for persistence if chosen).
* Simple spaced‑repetition queue: mark puzzles as `learned` / `needs review` and requeue them.
* Allow users to save a puzzle into their playlists.
* Some minimal analytics like per‑puzzle success rate and average solve time.
* Make a seperate mobile responsive version of the UI.

### Stretch (future)

* User accounts + cross‑device sync (Supabase or equivalent).
* Adaptive difficulty and theme suggestion.
* Sharing / export of study sets, leaderboards, or challenge modes.

---

## Tech Stack & Libraries

* Frontend: **React** + **TypeScript** + **Vite**
* Chess UI: **react‑chessboard** (or equivalent interactive chessboard component)
* Data source: Lichess puzzle CSV (official puzzle DB) → mapped to local puzzle type

---

## Install & Run (example)

> These are generic commands; adjust accordingly

```bash
# clone
git clone <repo-url>
cd woodpecker

# install
npm install

# dev server
npm run dev    # or `npm start` depending on your setup

# build for production
npm run build

# run tests (if present)
npm run test
```

---

## Puzzle data format (example)

This is the internal format used for mock puzzles. When wiring Lichess CSV, map the CSV columns into this object.

```json
{
  "id": "lichess-123456",
  "source": "lichess",
  "sourceId": "123456",
  "fen": "r1bqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "movesUci": ["e2e4", "e7e5", "g1f3"],
  "movesSan": ["e4", "e5", "Nf3"],
  "rating": 1500,
  "themes": ["fork", "tactic"],
  "nbPlays": 482,
  "gameUrl": "https://lichess.org/xxxxx",
  "openingFamily": "Open Games",
  "openingVariation": "King's Pawn"
}
```

**Notes:**

* `fen` is the board position before the puzzle starts.
* `solution` is an array of moves in SAN (or algebraic SAN/long algebraic depending on how you validate).

---

## Practical next steps
* Add a small script and map 50 real Lichess puzzles into some json file to mock data from a server.
* Implement a simple `Review` queue that adds puzzles you miss to a `needsReview` list.
* Add basic local persistence (localStorage) for progress.
* Implement spaced repetition scheduling and a UI to review mistakes.
* Adaptive difficulty, social features, or mobile offline mode. Polish UX and package for public deploy (Vercel + Supabase).
