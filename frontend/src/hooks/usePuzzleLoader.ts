import { useState, useEffect } from "react";
import { fetchPuzzles } from "../api/fetchPuzzles";
import type { LoadingState, PuzzleState } from "../types";

interface UsePuzzleLoaderReturn {
  puzzleState: PuzzleState;
  loadingState: LoadingState;
  errorMessage: string | null;
  setPuzzleState: (state: PuzzleState) => void;
}

export function usePuzzleLoader(): UsePuzzleLoaderReturn {
  const [puzzleState, setPuzzleState] = useState<PuzzleState>({
    puzzles: [],
    currentIndex: 0,
    currentPuzzle: null,
  });

  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadInitialPuzzles();
  }, []);

  async function loadInitialPuzzles(): Promise<void> {
    try {
      setLoadingState("loading");
      
      const fetchedPuzzles = await fetchPuzzles();
      
      if (fetchedPuzzles.length === 0) {
        setLoadingState("empty");
        return;
      }

      setPuzzleState({
        puzzles: fetchedPuzzles,
        currentIndex: 0,
        currentPuzzle: fetchedPuzzles[0],
      });
      
      setLoadingState("success");
    } catch (error) {
      console.error("Failed to load puzzles:", error);
      
      const message = error instanceof Error 
        ? error.message 
        : "Failed to load puzzles";
      
      setErrorMessage(message);
      setLoadingState("error");
    }
  }

  return {
    puzzleState,
    loadingState,
    errorMessage,
    setPuzzleState,
  };
}