import { useState, useCallback } from 'react';
import { ChessBoard } from '../components/ChessBoard';
import { InfoCard } from '../components/InfoCard';
import { useChessPuzzle } from '../hooks/useChessPuzzle';
import type { LichessPuzzle } from '../types';
import type { PuzzleEvent } from '../types';
import { mockLichessPuzzles } from '../api/mockChessPuzzles';

export default function PuzzleExplorerPage() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState<LichessPuzzle>(mockLichessPuzzles[0]);
  const [isWrong, setIsWrong] = useState(false);

  const handlePuzzleEvent = useCallback((event: PuzzleEvent) => {
    switch (event.type) {
      case 'wrong_move':
        setIsWrong(true);
        setTimeout(() => setIsWrong(false), 2000);
        break;

      case 'correct_move':
        
      case 'puzzle_reset':
        setIsWrong(false);
        break;

      case 'puzzle_solved':
        break;
    }
  }, []);

  const {
    turn,
    chessPosition,
    onPieceDrop,
    resetPuzzle,
    isSolved,
  } = useChessPuzzle(currentPuzzle, handlePuzzleEvent);

  const handleNextPuzzle = useCallback(() => {
    const nextIndex = (puzzleIndex + 1) % mockLichessPuzzles.length;
    setPuzzleIndex(nextIndex);
    setCurrentPuzzle(mockLichessPuzzles[nextIndex]);
    setIsWrong(false);
  }, [puzzleIndex]);

  const handleResetPuzzle = useCallback(() => {
    resetPuzzle();
    setIsWrong(false);
  }, [resetPuzzle]);

  const humanTurn = turn === 'w' ? 'White' : 'Black';
  const feedback = isWrong ? 'Wrong' : isSolved ? 'Solved' : `${humanTurn} to move`;
  const boardOrientation = turn === 'w' ? 'white' : 'black';

  return (
    <div className="main-layout">
      <div className="main-content">
        <div className="chessBoardContainer">
          <ChessBoard 
            position={chessPosition}
            onPieceDrop={onPieceDrop}
            onReset={handleResetPuzzle}
            onNext={handleNextPuzzle}
            boardOrientation={boardOrientation}
          />
        </div>
      </div>

      <InfoCard 
        Rating={currentPuzzle.Rating}
        Opening={currentPuzzle.OpeningFamily}
        Feedback={feedback}
      />
    </div>
  );
}
