# Woodpecker Chess
[![Tech used](https://skillicons.dev/icons?i=react,typescript,vite&theme=dark)](https://skillicons.dev)

The Woodpecker Method, introduced by Axel Smith in his book **The Woodpecker Method**, is a chess training approach that involves repeatedly solving the same set of tactical puzzles to strengthen pattern recognition and calculation speed. The approach is like spaced repetition but opposite, you complete the set of puzzles (lets say a set of 200 difficult puzzles) with decreasing intervals instead of increasing.

While the project is very far from the projected, polished version of the application (not even a minimum viable product) below shows my progress so far.

---

![alt text](image.png)

## Features

### Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety 
- **Vite** - Fast build tool and dev server
- **react-chessboard** - Chessboard component
- **chess.js** - Chess logic and move validation

### Implemented
* Chessboard using `react-chessboard` component
* Move validation against puzzle solution sequences
* UI feedback for correct/incorrect moves (would need some polishing though)
* Puzzle navigation controls (**Next** and **Reset**)
* Playing puzzles using data from [Lichess puzzle database](https://database.lichess.org/#puzzles)
* Custom hook (`useChessPuzzle`) for puzzle state management
* Automatic opponent move responses after correct player moves
* Hint system
* User playlists to save puzzles or create training sets.
* User authentication and profiles (mocked with local storage)
* Mobile-responsive UI design (to some extent)

### To-Do List
* Rating-based puzzle filtering (1500-1999, 2000-2499, etc.)
* Some user results tracking and statistics
* Spaced repetition algorithm: mark puzzles as `learned`/`needs review` and requeue accordingly
* Analytics dashboard: per-puzzle success rate, average solve time, rating progression
* Daily puzzle challenges
* Achievement system and progress milestones

---

## Puzzles
- Puzzle data from [Lichess.org](https://lichess.org) - licensed under CC0

## Puzzle Data Format

Puzzles are sourced from the Lichess puzzle database and structured as follows:

```typescript
interface LichessPuzzle {
  PuzzleId: string;      // Unique puzzle identifier
  FEN: string;           // Position before opponent's setup move
  Moves: string;         // UCI format moves (space-separated)
  Rating: number;        // Puzzle difficulty rating
  Themes: string;        // camel-cased and space-separated theme tags
}
```

### Example Puzzle Object
```json
{
  "PuzzleId": "004zh",
  "FEN": "4b1k1/4Pr2/3R2pp/1ppBP1q1/8/PP4P1/2P4P/3R3K b - - 2 38",
  "Moves": "g5h5 d1f1 g8g7 d5f7 e8f7 d6d8 h5e5 f1f7 g7f7 e7e8q e5e8 d8e8",
  "Rating": 2623,
  "Themes": "advancedPawn attraction crushing endgame exposedKing intermezzo pin promotion quietMove veryLong"
}
```

### Notes on Puzzle Format
- **Forsyth–Edwards Notation (FEN)**: Starting position before the opponent's move, this is the format the lichess database use for the puzzles. The string in this format is converted into a chess position using `chess.js` and `react-chessboard`.
- **Moves**: First move is opponent's setup, followed by alternating player/opponent solution moves
- **UCI Format**: Moves as handled by computer uses coordinate notation or **Universal Chess Interface** (e.g., `e2e4` not `e4`)
- **SAN Format**: UI representation of moves like in hints are in **Standard Algebraic Notation**.
- Puzzles are stored as JSON files grouped by rating ranges in the `public` directory

---

## How It Works (for now)

1. **Puzzle Loading**: Puzzles are fetched from JSON files in the `public` directory (temporary, until a backend server is created)
2. **Initial Setup**: The first move in the solution is played automatically (opponent's setup move)
3. **Player**: Player makes moves by dragging pieces on the board
4. **Move Validation**: Moves are validated against the expected UCI move sequence
5. **Opponent Response**: After a correct move, the opponent's response from the solution sequence is played.
6. **Completion**: Puzzle is marked as solved when all moves in the sequence are completed correctly
7. **Playlists**: Users can save a puzzle to a playlist, where they could replay or train that puzzle again.

---

## Installation & Setup

```bash
# Clone the repository
git clone <repo-url>
cd woodpecker

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173` (or the port shown in terminal).

