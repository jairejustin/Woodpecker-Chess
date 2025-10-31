import { useState, useCallback, useEffect } from "react";
import { ChessBoard } from "./ChessBoard";
import TrainingInfo from "./TrainingInfo";
import { useChessPuzzle } from "../hooks/useChessPuzzle";
import type { LichessPuzzle, PuzzleEvent } from "../types";
import { calculateFeedback, getBoardOrientation } from "../utils/puzzleHelpers";
import { PUZZLE_CONSTANTS } from "../constants";

interface TrainingContentProps {
  currentPuzzle: LichessPuzzle;
  currentIndex: number;
  totalPuzzles: number;
  isWrong: boolean;
  showAnimations: boolean;
  onPuzzleEvent: (event: PuzzleEvent) => void;
  onNextPuzzle: () => void;
  onPreviousPuzzle: () => void;
  setIsWrong: (value: boolean) => void;
  playlistName: string;
  onBack: () => void;
}

export function TrainingContent(props: TrainingContentProps) {
  const {
    currentPuzzle,
    currentIndex,
    totalPuzzles,
    isWrong,
    showAnimations,
    onPuzzleEvent,
    onNextPuzzle,
    onPreviousPuzzle,
    setIsWrong,
    playlistName,
    onBack
  } = props;

  const {
    turn,
    chessPosition,
    onPieceDrop,
    resetPuzzle,
    isSolved,
    solutionSequence,
    currentMoveIndex,
  } = useChessPuzzle(currentPuzzle, onPuzzleEvent);

  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    const newFeedback = calculateFeedback(isWrong, isSolved, turn);
    setFeedback(newFeedback);
  }, [isWrong, isSolved, turn]);

  const handleShowHint = useCallback((): void => {
    const hasMoreMoves = currentMoveIndex < solutionSequence.length;
    if (!hasMoreMoves) {
      return;
    }
    const nextMove = solutionSequence[currentMoveIndex];
    setFeedback(`Hint: ${nextMove}`);
    setTimeout(() => {
      const normalFeedback = calculateFeedback(false, isSolved, turn);
      setFeedback(normalFeedback);
    }, PUZZLE_CONSTANTS.HINT_DISPLAY_DURATION);
  }, [currentMoveIndex, solutionSequence, turn, isSolved]);

  const handleResetPuzzle = useCallback((): void => {
    resetPuzzle();
    setIsWrong(false);
  }, [resetPuzzle, setIsWrong]);

  const boardOrientation = getBoardOrientation(turn);

  return (
    <div className="main-layout">
      <div className="main-content">
        <ChessBoard
          key={currentPuzzle.PuzzleId}
          position={chessPosition}
          onPieceDrop={onPieceDrop}
          onReset={handleResetPuzzle}
          onNext={onNextPuzzle}
          onPrevious={onPreviousPuzzle}
          onHint={handleShowHint}
          boardOrientation={boardOrientation}
          showAnimations={showAnimations}
          isSolved={isSolved}
        />
      </div>
      <TrainingInfo
        puzzleNumber={currentIndex + 1}
        totalPuzzles={totalPuzzles}
        rating={currentPuzzle.Rating}
        feedback={feedback}
        isSolved={isSolved}
        playlistName= {playlistName}
        onBack={onBack}
      />
    </div>
  );
}