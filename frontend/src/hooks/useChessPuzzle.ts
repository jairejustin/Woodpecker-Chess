// useChessPuzzle.ts
import { useState, useRef, useEffect, useMemo } from "react";
import { Chess } from "chess.js";
import type { PieceDropHandlerArgs } from "../types";
import type { LichessPuzzle } from "../types";
import type { PuzzleEvent } from "../types";

/**
 * Lichess Puzzle Database Format
 * CSV columns: PuzzleId,FEN,Moves,Rating,RatingDeviation,Popularity,NbPlays,Themes,GameUrl,OpeningFamily,OpeningVariation
 * - FEN is the position BEFORE the opponent makes their move
 * - The first move in Moves is the opponent's move (setup move)
 * - The second move starts the solution (player's first move)
 * - Moves are in UCI format ( "e2e4" not "e4")
 */

// types
interface UseChessPuzzleReturn {
  chessPosition: string;
  turn: "w" | "b";
  onPieceDrop: (args: PieceDropHandlerArgs) => boolean;
  resetPuzzle: () => void;
  currentMoveIndex: number;
  playerMovesCompleted: number;
  totalPlayerMoves: number;
  isSolved: boolean;
  lastEvent: PuzzleEvent | null;
  solutionSequence: string[];
  puzzleInfo: {
    id: string;
    rating: number;
    themes: string[];
  };
}

// Helper function to convert UCI moves to SAN notation
function convertUCItoSAN(fen: string, uciMoves: string[]): string[] {
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

export function useChessPuzzle(
  puzzle: LichessPuzzle,
  onEvent?: (event: PuzzleEvent) => void
): UseChessPuzzleReturn {

  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;
  
  // Use ref for move index to avoid stale closures
  const currentMoveIndexRef = useRef(0);

  // parse moves from UCI format
  const movesArray = puzzle.Moves.split(" ").filter((m) => m.length > 0);
  const themesArray = puzzle.Themes.split(" ").filter((t) => t.length > 0);

  // Convert UCI moves to SAN notation - memoized so it only runs when puzzle changes
  const solutionSequence = useMemo(() => {
    return convertUCItoSAN(puzzle.FEN, movesArray);
  }, [puzzle.FEN, puzzle.Moves]);

  // initialize state hooks
  const [chessPosition, setChessPosition] = useState(puzzle.FEN);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [lastEvent, setLastEvent] = useState<PuzzleEvent | null>(null);
  const [turn, setTurn] = useState<"w" | "b">(chessGame.turn());

  // initialize and load puzzle
  useEffect(() => {
    chessGame.load(puzzle.FEN);

    // check if there are moves, then make a setup move
    if (movesArray.length > 0) {
      const setupMove = movesArray[0];
      try {
        chessGame.move(setupMove);
        setChessPosition(chessGame.fen());
        setTurn(chessGame.turn());
      } catch (error) {
        console.error("Invalid setup move:", setupMove);
      }
    }

    // update states
    currentMoveIndexRef.current = 1;
    setCurrentMoveIndex(1);
    setIsSolved(false);

    // initialize this state
    const startEvent: PuzzleEvent = "puzzle_started";
    onEvent?.(startEvent);
  }, [puzzle.PuzzleId]);

  // function to emit events
  const emitEvent = (event: PuzzleEvent) => {
    setLastEvent(event);
    onEvent?.(event);
  };

  // arrow function to make the response from the solution (now synchronous)
  const makeComputerMove = () => {
    const nextMoveIndex = currentMoveIndexRef.current;
    if (nextMoveIndex < movesArray.length) {
      const computerMove = movesArray[nextMoveIndex];
      try {
        chessGame.move(computerMove);
        setChessPosition(chessGame.fen());
        currentMoveIndexRef.current = nextMoveIndex + 1;
        setCurrentMoveIndex(nextMoveIndex + 1);
      } catch (error) {
        console.error("Invalid computer move in puzzle:", computerMove);
      }
    }
  };

  // arrow function for handling the moves played by the user
  const onPieceDrop = ({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs): boolean => {
    if (!targetSquare || isSolved) {
      return false;
    }

    // Use ref for synchronous access
    const currentIndex = currentMoveIndexRef.current;

    if (currentIndex >= movesArray.length) {
      return false;
    }

    const expectedMove = movesArray[currentIndex];

    try {
      const move = chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      // convert move to UCI format for comparison
      const moveUCI = sourceSquare + targetSquare + (move.promotion || "");

      // check if this matches the expected move
      if (moveUCI === expectedMove) {
        setChessPosition(chessGame.fen());
        const newMoveIndex = currentIndex + 1;
        currentMoveIndexRef.current = newMoveIndex;
        setCurrentMoveIndex(newMoveIndex);

        // check if puzzle is solved 
        const puzzleSolved = newMoveIndex >= movesArray.length;

        if (puzzleSolved) {
          setIsSolved(true);
          emitEvent("puzzle_solved");
        } else {
          emitEvent("correct_move");

          setTimeout(() => {
            makeComputerMove();
          }, 500);
        }

        return true;
      } else {
        // wrong move, undo it
        chessGame.undo();
        emitEvent("wrong_move");
        return false;
      }
    } catch {
      return false;
    }
  };

  // arrow function for resetting puzzle
  const resetPuzzle = () => {
    chessGame.load(puzzle.FEN);

    if (movesArray.length > 0) {
      const setupMove = movesArray[0];
      try {
        chessGame.move(setupMove);
        setChessPosition(chessGame.fen());
        setTurn(chessGame.turn());
      } catch (error) {
        console.error("Invalid setup move:", setupMove);
      }
    }

    currentMoveIndexRef.current = 1;
    setCurrentMoveIndex(1);
    setIsSolved(false);

    const resetEvent: PuzzleEvent = "puzzle_reset";
    emitEvent(resetEvent);
  };

  // get number of moves, moves completed are floored and total turns are rounded up
  const totalPlayerMoves = Math.ceil((movesArray.length - 1) / 2);
  const playerMovesCompleted = Math.floor((currentMoveIndex - 1) / 2);

  return {
    chessPosition,
    turn,
    onPieceDrop,
    resetPuzzle,
    currentMoveIndex,
    playerMovesCompleted,
    totalPlayerMoves,
    isSolved,
    lastEvent,
    solutionSequence,
    puzzleInfo: {
      id: puzzle.PuzzleId,
      rating: puzzle.Rating,
      themes: themesArray,
    },
  };
}