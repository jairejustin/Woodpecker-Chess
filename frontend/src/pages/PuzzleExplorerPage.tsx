import { useState, useCallback, useEffect } from "react";
import { ChessBoard } from "../components/ChessBoard";
import { InfoCard } from "../components/InfoCard";
import { useChessPuzzle } from "../hooks/useChessPuzzle";
import type { LichessPuzzle, PuzzleEvent } from "../types";
import { fetchSamplePuzzles } from "../api/fetchLichessPuzzles";

export default function PuzzleExplorerPage() {
  const [puzzles, setPuzzles] = useState<LichessPuzzle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState<LichessPuzzle | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  const [showAnimations, setShowAnimations] = useState(false);

  useEffect(() => {
    async function loadPuzzles() {
      try {
        const data = await fetchSamplePuzzles(1500, 1999);
        setPuzzles(data);
        setCurrentPuzzle(data[0]);
      } catch (err) {
        console.error("Failed to load puzzles:", err);
        setError(err instanceof Error ? err.message : 'Failed to load puzzles');
      } finally {
        setIsLoading(false);
      }
    }
    loadPuzzles();
  }, []);

  const handlePuzzleEvent = useCallback((event: PuzzleEvent) => {
    switch (event) {
      case "wrong_move":
        setIsWrong(true);
        setTimeout(() => setIsWrong(false), 2000);
        break;
      case "correct_move":
      case "puzzle_reset":
        setIsWrong(false);
        break;
      case "puzzle_solved":
        break;
      case "show_hint":
        // Hint logic is now handled in PuzzleExplorerContent
        break;
    }
  }, []);

  const handleNextPuzzle = useCallback(() => {
    if (!puzzles.length) return;
    setShowAnimations(false);
    const nextIndex = (puzzleIndex + 1) % puzzles.length;
    setPuzzleIndex(nextIndex);
    setCurrentPuzzle(puzzles[nextIndex]);
    setIsWrong(false);
    setTimeout(() => setShowAnimations(true), 300);
  }, [puzzleIndex, puzzles]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading puzzles...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-400">
        <p className="text-xl mb-2">Error loading puzzles</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  // Show no puzzles state
  if (!currentPuzzle) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        No puzzles available
      </div>
    );
  }

  // Now we can safely render the component that uses the hook
  return (
    <PuzzleExplorerContent
      currentPuzzle={currentPuzzle}
      isWrong={isWrong}
      showAnimations={showAnimations}
      handlePuzzleEvent={handlePuzzleEvent}
      handleNextPuzzle={handleNextPuzzle}
      setIsWrong={setIsWrong}
    />
  );
}

// Separate component that uses the hook - this ensures the hook is always called
function PuzzleExplorerContent({
  currentPuzzle,
  isWrong,
  showAnimations,
  handlePuzzleEvent,
  handleNextPuzzle,
  setIsWrong,
}: {
  currentPuzzle: LichessPuzzle;
  isWrong: boolean;
  showAnimations: boolean;
  handlePuzzleEvent: (event: PuzzleEvent) => void;
  handleNextPuzzle: () => void;
  setIsWrong: (value: boolean) => void;
}) {
  const { 
    turn, 
    chessPosition, 
    onPieceDrop, 
    resetPuzzle, 
    isSolved,
    solutionSequence,
    currentMoveIndex 
  } = useChessPuzzle(currentPuzzle, handlePuzzleEvent);

  const [feedback, setFeedback] = useState<string>("");

  // Update feedback based on puzzle state
  useEffect(() => {
    if (isWrong) {
      setFeedback("Wrong");
    } else if (isSolved) {
      setFeedback("Solved");
    } else {
      const humanTurn = turn === "w" ? "White" : "Black";
      setFeedback(`${humanTurn} to move`);
    }
  }, [isWrong, isSolved, turn]);

  const handleShowHint = useCallback(() => {
    if (currentMoveIndex < solutionSequence.length) {
      const nextMove = solutionSequence[currentMoveIndex];
      setFeedback(`Hint: ${nextMove}`);
      // Restore normal feedback after 3 seconds
      setTimeout(() => {
        if (isSolved) {
          setFeedback("Solved");
        } else {
          const humanTurn = turn === "w" ? "White" : "Black";
          setFeedback(`${humanTurn} to move`);
        }
      }, 3000);
    }
  }, [currentMoveIndex, solutionSequence, turn, isSolved]);

  const handleResetPuzzle = useCallback(() => {
    resetPuzzle();
    setIsWrong(false);
  }, [resetPuzzle, setIsWrong]);

  const boardOrientation = turn === "w" ? "white" : "black";

  return (
    <div className="main-layout">
      <div className="main-content">
        <ChessBoard
          key={currentPuzzle.PuzzleId}
          position={chessPosition}
          onPieceDrop={onPieceDrop}
          onReset={handleResetPuzzle}
          onNext={handleNextPuzzle}
          onHint={handleShowHint}
          boardOrientation={boardOrientation}
          showAnimations={showAnimations}
        />
      </div>
      <InfoCard
        Rating={currentPuzzle.Rating}
        Feedback={feedback}
      />
    </div>
  );
}