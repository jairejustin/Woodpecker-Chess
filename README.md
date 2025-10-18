# Woodpecker Chess
[![Tech used](https://skillicons.dev/icons?i=react,typescript,vite&theme=dark)](https://skillicons.dev)

The Woodpecker Method, introduced by Axel Smith in his book The Woodpecker Method, is a chess training approach that involves repeatedly solving the same set of tactical puzzles to strengthen pattern recognition and calculation speed through spaced repetition.

Woodpecker is a personal project: a chess puzzle repetition trainer built with React + TypeScript and `react-chessboard` UI. Just something I did for fun. While the project is very far from the projected application, below shows my progress so far.

---

## Features

### Implemented

* Render puzzles on an interactive chessboard component.
* Validate player moves against the solution sequence.
* simple UI feedback for correct / incorrect moves.
* Controls like **Next** and **Reset**.
* Mock puzzle dataset with typed puzzle objects.

### Planned (near term)

* Import real puzzles from [Lichess puzzle database](https://database.lichess.org/#puzzles) (CSV to JSON).
* Doing the get hint feature.
* Basic user results tracking.
* Simple spaced‑repetition queue: mark puzzles as `learned` / `needs review` and requeue them.
* Allow users to save a puzzle into their playlists.
* Some minimal analytics like per‑puzzle success rate and average solve time.
* Make a seperate mobile responsive version of the UI.
* Users

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
---

## Install & Run (example)
These are generic commands; adjust accordingly

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