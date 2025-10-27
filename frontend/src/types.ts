export type Square = string;
export type RawPuzzle = Record<string, unknown>;

export type PuzzleEvent = string;
export type LoadingState = "loading" | "error" | "success" | "empty";


export interface PieceDropHandlerArgs {
  piece: { isSparePiece: boolean, pieceType: string, position: string };
  sourceSquare: Square;
  targetSquare: Square | null;
}

export interface Move {
  from: string;
  to: string;
  promotion?: string;
}

export interface GameState {
  position: Square;
  history: Move[];
  turn: 'white' | 'black';
}

export interface LichessPuzzle {
  PuzzleId: string;
  FEN: string;
  Moves: string;
  Rating: number;
  Themes: string;
  OpeningTags?: string | null;
}

export interface PuzzleState {
  puzzles: LichessPuzzle[];
  currentIndex: number;
  currentPuzzle: LichessPuzzle | null;
}

export interface UIState {
  isWrong: boolean;
  showAnimations: boolean;
  feedback: string;
}

export interface Playlist {
  id: string;
  name: string;
  puzzleIds: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  puzzlesSolved: string[];
  playlists: Playlist[];
  analytics: {
    totalSolved: number;
    avgRating: number;
    streak: number;
  };
}


