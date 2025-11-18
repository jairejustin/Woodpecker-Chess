import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "../context/SessionContext";
import type { Playlist, LichessPuzzle } from "../types";
import { fetchPuzzles } from "../services/api/fetchPuzzles";
import { createTimestamp, generateUniqueId } from "../utils/puzzleHelpers";

// ============================================================================
// Hook
// ============================================================================

export default function usePlaylists() {
  const { user, updateUser } = useSession();

  // Local state mirrors user's playlists for responsive UI updates
  const [playlists, setPlaylists] = useState<Playlist[]>(() => user?.playlists ?? []);

  // Sync local state when session user changes (login/logout/external update)
  useEffect(() => {
    setPlaylists(user?.playlists ?? []);
  }, [user?.playlists]);

  // ============================================================================
  // Persistence Helper
  // ============================================================================

  const persistPlaylists = useCallback(
    (updatedPlaylists: Playlist[]) => {
      setPlaylists(updatedPlaylists);
      updateUser({ playlists: updatedPlaylists });
    },
    [updateUser]
  );

  // ============================================================================
  // Read Operations
  // ============================================================================

  const getAllPlaylists = useCallback(() => {
    return playlists;
  }, [playlists]);

  const getPlaylistById = useCallback(
    (playlistId: string): Playlist | null => {
      return playlists.find((playlist) => playlist.id === playlistId) ?? null;
    },
    [playlists]
  );

  const getPlaylistPuzzles = useCallback(
    async (playlistId: string): Promise<LichessPuzzle[]> => {
      const playlist = getPlaylistById(playlistId);
      if (!playlist) {
        return [];
      }

      // Fetch all available puzzles
      const allPuzzles = await fetchPuzzles();
      const puzzleMap = new Map(allPuzzles.map((puzzle) => [puzzle.PuzzleId, puzzle]));

      // Map playlist puzzle IDs to actual puzzle objects, maintaining order
      const orderedPuzzles: LichessPuzzle[] = [];
      for (const puzzleId of playlist.puzzleIds) {
        const puzzle = puzzleMap.get(puzzleId);
        if (puzzle) {
          orderedPuzzles.push(puzzle);
        }
      }

      return orderedPuzzles;
    },
    [getPlaylistById]
  );

  // ============================================================================
  // Create & Delete Operations
  // ============================================================================

  const createPlaylist = useCallback(
    (name: string, initialPuzzleIds: string[] = []): Playlist => {
      const newPlaylist: Playlist = {
        id: generateUniqueId(),
        name,
        puzzleIds: initialPuzzleIds,
        createdAt: createTimestamp(),
        updatedAt: createTimestamp(),
      };

      const updatedPlaylists = [...playlists, newPlaylist];
      persistPlaylists(updatedPlaylists);

      return newPlaylist;
    },
    [playlists, persistPlaylists]
  );

  const deletePlaylist = useCallback(
    (playlistId: string): void => {
      const updatedPlaylists = playlists.filter((playlist) => playlist.id !== playlistId);
      persistPlaylists(updatedPlaylists);
    },
    [playlists, persistPlaylists]
  );

  // ============================================================================
  // Update Operations
  // ============================================================================

  const renamePlaylist = useCallback(
    (playlistId: string, newName: string): void => {
      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist.id !== playlistId) {
          return playlist;
        }
        return {
          ...playlist,
          name: newName,
          updatedAt: createTimestamp(),
        };
      });

      persistPlaylists(updatedPlaylists);
    },
    [playlists, persistPlaylists]
  );

  const setPlaylistOrder = useCallback(
    (playlistId: string, newOrderIds: string[]): void => {
      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist.id !== playlistId) {
          return playlist;
        }
        return {
          ...playlist,
          puzzleIds: [...newOrderIds],
          updatedAt: createTimestamp(),
        };
      });

      persistPlaylists(updatedPlaylists);
    },
    [playlists, persistPlaylists]
  );

  const addPuzzleToPlaylist = useCallback(
    (
      playlistId: string,
      puzzleId: string,
      options?: { position?: number; unique?: boolean }
    ): void => {
      const { position, unique = true } = options ?? {};

      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist.id !== playlistId) {
          return playlist;
        }

        // Skip if puzzle already exists and unique flag is true
        const puzzleExists = playlist.puzzleIds.includes(puzzleId);
        if (unique && puzzleExists) {
          return playlist;
        }

        // Add puzzle at specified position or end of list
        const newPuzzleIds = [...playlist.puzzleIds];
        if (typeof position === "number") {
          newPuzzleIds.splice(position, 0, puzzleId);
        } else {
          newPuzzleIds.push(puzzleId);
        }

        return {
          ...playlist,
          puzzleIds: newPuzzleIds,
          updatedAt: createTimestamp(),
        };
      });

      persistPlaylists(updatedPlaylists);
    },
    [playlists, persistPlaylists]
  );

  const removePuzzleFromPlaylist = useCallback(
    (playlistId: string, puzzleId: string): void => {
      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist.id !== playlistId) {
          return playlist;
        }
        return {
          ...playlist,
          puzzleIds: playlist.puzzleIds.filter((id) => id !== puzzleId),
          updatedAt: createTimestamp(),
        };
      });

      persistPlaylists(updatedPlaylists);
    },
    [playlists, persistPlaylists]
  );

  const reorderPuzzleInPlaylist = useCallback(
    (playlistId: string, fromIndex: number, toIndex: number): void => {
      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist.id !== playlistId) {
          return playlist;
        }

        const puzzleIds = [...playlist.puzzleIds];
        
        // Validate indices
        const isValidIndex = (index: number) => index >= 0 && index < puzzleIds.length;
        if (!isValidIndex(fromIndex) || !isValidIndex(toIndex)) {
          return playlist;
        }

        // Perform reorder
        const [movedPuzzle] = puzzleIds.splice(fromIndex, 1);
        puzzleIds.splice(toIndex, 0, movedPuzzle);

        return {
          ...playlist,
          puzzleIds,
          updatedAt: createTimestamp(),
        };
      });

      persistPlaylists(updatedPlaylists);
    },
    [playlists, persistPlaylists]
  );

  const isEmpty = useMemo(() => playlists.length === 0, [playlists]);

  return {
    // State
    playlists,
    isEmpty,

    // Read operations
    getAll: getAllPlaylists,
    getById: getPlaylistById,
    getPlaylistPuzzles,

    // Create & Delete
    createPlaylist,
    deletePlaylist,

    // Update operations
    renamePlaylist,
    setPlaylistOrder,

    // Puzzle management
    addPuzzleToPlaylist,
    removePuzzleFromPlaylist,
    reorderWithinPlaylist: reorderPuzzleInPlaylist,
  };
}