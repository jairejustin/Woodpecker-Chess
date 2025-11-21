import type { LichessPuzzle, User, Playlist } from "@/types";
import { fetchPuzzles } from "./fetchPuzzles";

export async function fetchPlaylistPuzzles(
  user: User | null,
  playlistId: string
): Promise<{ playlist: Playlist; puzzles: LichessPuzzle[] } | null> {
  if (!user) {
    return null;
  }

  // Find the playlist in user's data
  const playlist = user.playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return null;
  }

  // Fetch all available puzzles
  const allPuzzles = await fetchPuzzles();

  // Filter puzzles that are in this playlist
  const playlistPuzzles = allPuzzles.filter((puzzle) =>
    playlist.puzzleIds.includes(puzzle.PuzzleId)
  );


  return {
    playlist,
    puzzles: playlistPuzzles,
  };
}