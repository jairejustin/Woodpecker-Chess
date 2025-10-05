// types.ts
export type Square = string;

export interface PieceDropHandlerArgs {
  sourceSquare: Square;
  targetSquare: Square | null;
}