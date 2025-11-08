import { ArrowLeft } from "lucide-react";
import { LoadingState, ErrorState, EmptyState } from "../loadingStates/LoadingStates";
import { TrainingContent } from "./TrainingContent";
import { usePuzzleLoader } from "../../hooks/usePuzzleLoader";
import { usePuzzleNavigation } from "../../hooks/usePuzzleNavigation";
import './TrainingMode.css'

interface TrainingModeProps {
  playlistId: string;
  playlistName: string;
  onBack: () => void;
}

export function TrainingMode(props: TrainingModeProps) {
  const { playlistId, playlistName, onBack } = props;

  const {
    puzzleState,
    loadingState,
    errorMessage,
    setPuzzleState,
  } = usePuzzleLoader(playlistId);

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
    return (
      <div className="main-content">
        <LoadingState message="Loading training puzzles..." />
      </div>
    );
  }

  // Render error state
  if (loadingState === "error" && errorMessage) {
    return (
      <div className="main-content">
        <div className="training-header-nav">
          <button onClick={onBack} className="btn btn-secondary">
            <ArrowLeft size={20} />
            Back to Playlists
          </button>
        </div>
        <ErrorState errorMessage={errorMessage} />
      </div>
    );
  }

  // Render empty state
  if (loadingState === "empty" || puzzleState.currentPuzzle === null) {
    return (
      <div className="main-content">
        <div className="training-header-nav">
          <button onClick={onBack} className="btn btn-secondary">
            <ArrowLeft size={20} />
            Back to Playlists
          </button>
        </div>
        <EmptyState />
      </div>
    );
  }

  // Render training content
  return (
    <>
      <div className="main-content">
        <TrainingContent
          currentPuzzle={puzzleState.currentPuzzle}
          currentIndex={puzzleState.currentIndex}
          totalPuzzles={puzzleState.puzzles.length}
          isWrong={isWrong}
          showAnimations={showAnimations}
          onPuzzleEvent={handlePuzzleEvent}
          onNextPuzzle={handleNextPuzzle}
          onPreviousPuzzle={handlePreviousPuzzle}
          setIsWrong={setIsWrong}
          playlistName={playlistName}
          onBack={onBack}
        />
      </div>
    </>

  );
}