import { Chess } from "chess.js";

export function calculateFeedback(
  isWrong: boolean,
  isSolved: boolean,
  turn: string
): string {
  if (isWrong) {
    return "Wrong";
  }

  if (isSolved) {
    return "Solved";
  }

  const playerColor = turn === "w" ? "White" : "Black";
  return `${playerColor} to move`;
}

export function getBoardOrientation(turn: string): "white" | "black" {
  return turn === "w" ? "white" : "black";
}

// Helper function to convert UCI moves to SAN notation
export function convertUCItoSAN(fen: string, uciMoves: string[]): string[] {
  const tempGame = new Chess(fen);
  const sanMoves: string[] = [];

  for (const uciMove of uciMoves) {
    try {
      // Extract from, to, and promotion from UCI format
      const from = uciMove.slice(0, 2);
      const to = uciMove.slice(2, 4);
      const promotion = uciMove.length > 4 ? uciMove[4] : undefined;

      // Make the move and get SAN notation
      const move = tempGame.move({
        from,
        to,
        promotion,
      });

      if (move) {
        sanMoves.push(move.san);
      } else {
        // If move fails, fall back to UCI
        sanMoves.push(uciMove);
      }
    } catch (error) {
      // If conversion fails, use UCI as fallback
      sanMoves.push(uciMove);
    }
  }

  return sanMoves;
}

export function generateUniqueId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    // @ts-ignore - TS sometimes complains about lib target
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export function createTimestamp(): string {
  return new Date().toISOString();
}