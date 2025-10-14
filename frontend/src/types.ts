// types.ts
export type Square = string;

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
  Moves: string; // Space-separated UCI moves (e.g., "f2g3 e6e7 b2b1 e7e1")
  Rating: number;
  RatingDeviation: number;
  Popularity: number;
  NbPlays: number;
  Themes: string; // Space-separated themes
  GameUrl?: string;
  OpeningFamily?: string;
  OpeningVariation?: string;
}