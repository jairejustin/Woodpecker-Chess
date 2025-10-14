// types.ts
export type Square = string;

export interface PieceDropHandlerArgs {
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