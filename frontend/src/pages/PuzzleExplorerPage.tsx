import { LoadingState, ErrorState, EmptyState } from "../components/loadingStates/LoadingStates";
import { PuzzleExplorer } from "../containers";
import { usePuzzleLoader } from "../hooks/usePuzzleLoader";
import { usePuzzleNavigation } from "../hooks/usePuzzleNavigation";

export default function PuzzleExplorerPage() {
  const {
    puzzleState,
    loadingState,
    errorMessage,
    setPuzzleState,
  } = usePuzzleLoader();

  const {
    isWrong,
    showAnimations,
    setIsWrong,
    handleNextPuzzle,
    handlePreviousPuzzle,
    handlePuzzleEvent,
  } = usePuzzleNavigation({ puzzleState, setPuzzleState });

  // Render loading state
  if (loadingState === "loading") {
    return <LoadingState message="Loading puzzles..." />;
  }

  // Render error state
  if (loadingState === "error" && errorMessage) {
    return <ErrorState errorMessage={errorMessage} />;
  }

  // Render empty state
  if (loadingState === "empty" || puzzleState.currentPuzzle === null) {
    return <EmptyState />;
  }

  // Render main content
  return (
    <PuzzleExplorer
      currentPuzzle={puzzleState.currentPuzzle}
      isWrong={isWrong}
      showAnimations={showAnimations}
      onPuzzleEvent={handlePuzzleEvent}
      onNextPuzzle={handleNextPuzzle}
      onPreviousPuzzle={handlePreviousPuzzle}
      setIsWrong={setIsWrong}
    />
  );
}
