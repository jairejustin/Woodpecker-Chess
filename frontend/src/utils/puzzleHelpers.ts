
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