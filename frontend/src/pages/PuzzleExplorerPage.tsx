import { useState, useCallback } from 'react';
import { ChessBoard } from '../components/ChessBoard';
import { InfoCard } from '../components/InfoCard';
import { useChessPuzzle } from '../useChessPuzzle';
import type { LichessPuzzle } from '../types';
import type { PuzzleEvent } from '../types';
import { samplePuzzle } from '../api/mockChessPuzzles';

export default function PuzzleExplorerPage() {
  const [currentPuzzle, setCurrentPuzzle] = useState<LichessPuzzle>(samplePuzzle);
  const [isWrong, setIsWrong] = useState(false);

  const handlePuzzleEvent = useCallback((event: PuzzleEvent) => {
    switch (event.type) {
      case 'wrong_move':
        setIsWrong(true);
        setTimeout(() => setIsWrong(false), 2000);
        break;

      case 'correct_move':
        setIsWrong(false);
        break;

      case 'puzzle_solved':
        break;

      case 'puzzle_reset':
        setIsWrong(false);
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

  const humanTurn = turn === 'w' ? 'White' : 'Black';
  const feedback = isWrong ? 'Wrong' : isSolved ? 'Solved' : `${humanTurn} to move`;

  const Rating = currentPuzzle.Rating;
  const Themes = currentPuzzle.Themes;

  return (
    <div className="main-layout">
      <div className="main-content">
        <div className="chessBoardContainer">
          <ChessBoard 
            position={chessPosition} 
            onPieceDrop={onPieceDrop} 
            onReset={resetPuzzle} 
          />
        </div>
      </div>
      <InfoCard 
        Rating={Rating}
        Themes={Themes}
        Feedback={feedback}
      />
    </div>
  );
}
