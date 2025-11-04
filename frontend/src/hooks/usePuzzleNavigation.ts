import { useCallback, useState } from "react";
import type { PuzzleState } from "../types";
import { PUZZLE_CONSTANTS } from "../constants";
import type { PuzzleEvent } from "../types";

interface UsePuzzleNavigationProps {
  puzzleState: PuzzleState;
  setPuzzleState: (state: PuzzleState) => void;
}

interface UsePuzzleNavigationReturn {
  isWrong: boolean;
  showAnimations: boolean;
  setIsWrong: (value: boolean) => void;
  handleNextPuzzle: () => void;
  handlePreviousPuzzle: () => void;
  handlePuzzleEvent: (event: PuzzleEvent) => void;
}

export function usePuzzleNavigation(
  props: UsePuzzleNavigationProps
): UsePuzzleNavigationReturn {
  const { puzzleState, setPuzzleState } = props;
  
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showAnimations, setShowAnimations] = useState<boolean>(true);

  const handlePuzzleEvent = useCallback((event: PuzzleEvent): void => {
    if (event === "wrong_move") {
      setIsWrong(true);
      setTimeout(() => {setIsWrong(false);}
      , PUZZLE_CONSTANTS.WRONG_MOVE_DISPLAY_DURATION);
    }

    if (event === "correct_move" || event === "puzzle_reset") {
      setIsWrong(false);
    }
  }, []);

  const handleNextPuzzle = useCallback((): void => {
    const { puzzles, currentIndex } = puzzleState;
    
    if (puzzles.length === 0 || currentIndex+1 === puzzles.length ) {
      return;
    }

    setShowAnimations(false);
    
    const nextIndex = (currentIndex + 1);
    const nextPuzzle = puzzles[nextIndex];
    
    setPuzzleState({
      puzzles,
      currentIndex: nextIndex,
      currentPuzzle: nextPuzzle,
    });
    
    setIsWrong(false);
    
    setTimeout(() => {
      setShowAnimations(true);
    }, PUZZLE_CONSTANTS.ANIMATION_DELAY);
  }, [puzzleState, setPuzzleState]);

  const handlePreviousPuzzle = useCallback((): void => {
    const { puzzles, currentIndex } = puzzleState;
    
    if (puzzles.length === 0 || currentIndex === 0) {
      return;
    }

    setShowAnimations(false);
    
    const nextIndex = currentIndex - 1;
    const nextPuzzle = puzzles[nextIndex];
    
    setPuzzleState({
      puzzles,
      currentIndex: nextIndex,
      currentPuzzle: nextPuzzle,
    });
    
    setIsWrong(false);
    
    setTimeout(() => {
      setShowAnimations(true);
    }, PUZZLE_CONSTANTS.ANIMATION_DELAY);
  }, [puzzleState, setPuzzleState]);

  return {
    isWrong,
    showAnimations,
    setIsWrong,
    handleNextPuzzle,
    handlePreviousPuzzle,
    handlePuzzleEvent,
  };
}