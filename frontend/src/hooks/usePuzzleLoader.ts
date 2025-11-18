import { useState, useEffect } from "react";
import { fetchPuzzles } from "../services/api/fetchPuzzles";
import { fetchPlaylistPuzzles } from "../services/api/fetchPlaylistPuzzles";
import { useSession } from "../context/SessionContext";
import type { LoadingState, PuzzleState } from "../types";

interface UsePuzzleLoaderReturn {
  puzzleState: PuzzleState;
  loadingState: LoadingState;
  errorMessage: string | null;
  setPuzzleState: (state: PuzzleState) => void;
}

export function usePuzzleLoader(playlistId?: string): UsePuzzleLoaderReturn {
  const { user } = useSession();
  const [puzzleState, setPuzzleState] = useState<PuzzleState>({
    puzzles: [],
    currentIndex: 0,
    currentPuzzle: null,
  });
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadInitialPuzzles();
  }, [playlistId, user]); // Re-run when playlistId or user changes

  async function loadInitialPuzzles(): Promise<void> {
    try {
      setLoadingState("loading");
      setErrorMessage(null);

      let fetchedPuzzles;

      // If playlistId is provided, fetch from playlist
      if (playlistId) {
        const result = await fetchPlaylistPuzzles(user, playlistId);
        
        if (!result) {
          setErrorMessage(
            user 
              ? `Playlist "${playlistId}" not found` 
              : "Please log in to access playlists"
          );
          setLoadingState("error");
          return;
        }

        fetchedPuzzles = result.puzzles;

        // Check if playlist is empty
        if (fetchedPuzzles.length === 0) {
          setErrorMessage(`Playlist "${result.playlist.name}" contains no puzzles`);
          setLoadingState("empty");
          return;
        }

        console.log(`Loaded ${fetchedPuzzles.length} puzzles from playlist "${result.playlist.name}"`);
      } else {
        // No playlistId, fetch all puzzles
        fetchedPuzzles = await fetchPuzzles();

        if (fetchedPuzzles.length === 0) {
          setLoadingState("empty");
          return;
        }
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