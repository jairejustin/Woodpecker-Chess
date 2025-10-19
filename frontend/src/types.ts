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
  Moves: string;
  Rating: number;
  Themes: string;
  OpeningTags?: string | null;
}


export type PuzzleEvent = 
  | { type: 'correct_move'; moveNumber: number; move: string }
  | { type: 'wrong_move'; attempted: string; expected: string }
  | { type: 'puzzle_solved' }
  | { type: 'puzzle_started' }
  | { type: 'puzzle_reset' };