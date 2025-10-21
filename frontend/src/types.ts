export type Square = string;
export type RawPuzzle = Record<string, unknown>;

export type PuzzleEvent = string;

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
