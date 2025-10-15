// useChessPuzzle.ts
import { useState, useRef, useEffect } from 'react';
import { Chess } from 'chess.js';
import type { PieceDropHandlerArgs } from './types';
import type { LichessPuzzle } from './types';
import type { PuzzleEvent } from './types';

/**
 * Lichess Puzzle Database Format
 * CSV columns: PuzzleId,FEN,Moves,Rating,RatingDeviation,Popularity,NbPlays,Themes,GameUrl,OpeningFamily,OpeningVariation
 * - FEN is the position BEFORE the opponent makes their move
 * - The first move in Moves is the opponent's move (setup move)
 * - The second move starts the solution (player's first move)
 * - Moves are in UCI format (e.g., "e2e4" not "e4")
 */

interface UseChessPuzzleReturn {
  chessPosition: string;
  turn: 'w' | 'b';
  onPieceDrop: (args: PieceDropHandlerArgs) => boolean;
  resetPuzzle: () => void;
  currentMoveIndex: number;
  playerMovesCompleted: number;
  totalPlayerMoves: number;
  isSolved: boolean;
  lastEvent: PuzzleEvent | null;
  progress: number; // 0-100
  puzzleInfo: {
    id: string;
    rating: number;
    themes: string[];
    popularity: number;
  };
}

export function useChessPuzzle(
  puzzle: LichessPuzzle,
  onEvent?: (event: PuzzleEvent) => void
): UseChessPuzzleReturn {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;
  
  // Parse moves from UCI format
  const movesArray = puzzle.Moves.split(' ').filter(m => m.length > 0);
  const themesArray = puzzle.Themes.split(' ').filter(t => t.length > 0);
  
  const [chessPosition, setChessPosition] = useState(puzzle.FEN);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [lastEvent, setLastEvent] = useState<PuzzleEvent | null>(null);
  const [turn, setTurn] = useState<'w' | 'b'>(chessGame.turn());


  // Initialize puzzle
  useEffect(() => {
    // Load the starting position
    chessGame.load(puzzle.FEN);
    
    // Make the first move (opponent's setup move)
    if (movesArray.length > 0) {
      const setupMove = movesArray[0];
      try {
        chessGame.move(setupMove);
        setChessPosition(chessGame.fen());
        setTurn(chessGame.turn());
      } catch (error) {
        console.error('Invalid setup move:', setupMove);
      }
    }
    
    setCurrentMoveIndex(1); // Start at index 1 (first player move)
    setIsSolved(false);
    
    const startEvent: PuzzleEvent = { type: 'puzzle_started' };
    setLastEvent(startEvent);
    onEvent?.(startEvent);
  }, [puzzle.PuzzleId]);

  const emitEvent = (event: PuzzleEvent) => {
    setLastEvent(event);
    onEvent?.(event);
  };

  const makeComputerMove = () => {
    // After player makes correct move, make the computer's response if there is one
    const nextMoveIndex = currentMoveIndex + 1;
    if (nextMoveIndex < movesArray.length) {
      const computerMove = movesArray[nextMoveIndex];
      try {
        chessGame.move(computerMove);
        setChessPosition(chessGame.fen());
        setCurrentMoveIndex(nextMoveIndex + 1);
      } catch (error) {
        console.error('Invalid computer move in puzzle:', computerMove);
      }
    }
  };

  const onPieceDrop = ({ sourceSquare, targetSquare }: PieceDropHandlerArgs): boolean => {
    if (!targetSquare || isSolved) {
      return false;
    }

    // Check if we've completed all moves
    if (currentMoveIndex >= movesArray.length) {
      return false;
    }

    const expectedMove = movesArray[currentMoveIndex];

    try {
      // Try to make the move
      const move = chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // Auto-promote to queen
      });

      // Convert move to UCI format for comparison
      const moveUCI = sourceSquare + targetSquare + (move.promotion || '');

      // Check if this matches the expected move
      if (moveUCI === expectedMove) {
        setChessPosition(chessGame.fen());
        const newMoveIndex = currentMoveIndex + 1;
        setCurrentMoveIndex(newMoveIndex);

        // Check if puzzle is solved (all moves completed)
        const puzzleSolved = newMoveIndex >= movesArray.length;
        
        if (puzzleSolved) {
          setIsSolved(true);
          emitEvent({ type: 'puzzle_solved' });
        } else {
          emitEvent({ 
            type: 'correct_move', 
            moveNumber: Math.floor(newMoveIndex / 2),
            move: move.san 
          });
          
          setTimeout(() => {
            makeComputerMove();
          }, 500);
        }

        return true;
      } else {
        // Wrong move - undo it
        chessGame.undo();
        emitEvent({ 
          type: 'wrong_move', 
          attempted: move.san,
          expected: expectedMove 
        });
        return false;
      }
    } catch {
      // Invalid move
      return false;
    }
  };

  const resetPuzzle = () => {
    // Load the starting position
    chessGame.load(puzzle.FEN);
    
    // Make the first move (opponent's setup move)
    if (movesArray.length > 0) {
      const setupMove = movesArray[0];
      try {
        chessGame.move(setupMove);
        setChessPosition(chessGame.fen());
        setTurn(chessGame.turn());
      } catch (error) {
        console.error('Invalid setup move:', setupMove);
      }
    }
    
    setCurrentMoveIndex(1);
    setIsSolved(false);
    
    const resetEvent: PuzzleEvent = { type: 'puzzle_reset' };
    emitEvent(resetEvent);
  };

  // Calculate player moves (every odd index after setup)
  const totalPlayerMoves = Math.ceil((movesArray.length - 1) / 2);
  const playerMovesCompleted = Math.floor((currentMoveIndex - 1) / 2);
  const progress = totalPlayerMoves > 0 
    ? Math.round((playerMovesCompleted / totalPlayerMoves) * 100) 
    : 0;

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
    progress,
    puzzleInfo: {
      id: puzzle.PuzzleId,
      rating: puzzle.Rating,
      themes: themesArray,
      popularity: puzzle.Popularity
    }
  };
}