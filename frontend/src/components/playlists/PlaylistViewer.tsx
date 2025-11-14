import { useState, useEffect } from "react";
import usePlaylists from "../../hooks/usePlaylists";
import type { LichessPuzzle } from "../../types";
import "./Playlist.css";

interface PlaylistViewerProps {
  playlistId: string;
  playlistName: string;
  onClose: () => void;
}

export function PlaylistViewer(props: PlaylistViewerProps) {
  const { playlistId, playlistName, onClose } = props;
  const { getPlaylistPuzzles } = usePlaylists();
  const [puzzles, setPuzzles] = useState<LichessPuzzle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPlaylistPuzzles(playlistId)
      .then((loaded) => setPuzzles(loaded))
      .catch((err) => {
        console.error("Failed to load puzzles:", err);
        setPuzzles([]);
      })
      .finally(() => setIsLoading(false));
  }, [playlistId, getPlaylistPuzzles]);

  return (
    <div className="playlist-viewer">
      <div className="playlist-viewer__header">
        <h2 className="playlist-viewer__title">{playlistName}</h2>
        <button
          className="playlist-viewer__close-btn"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      {isLoading ? (
        <div className="playlist-viewer__loading">Loading puzzles...</div>
      ) : puzzles.length === 0 ? (
        <div className="playlist-viewer__empty">No puzzles in this playlist</div>
      ) : (
        <div className="playlist-viewer__puzzles-list">
          {puzzles.map((puzzle) => (
            <div key={puzzle.PuzzleId} className="playlist-viewer__puzzle-item">
              <span className="playlist-viewer__puzzle-id">{puzzle.PuzzleId}</span>
              <span className="playlist-viewer__puzzle-rating">Rating: {puzzle.Rating}</span>
              <span className="playlist-viewer__puzzle-themes">{puzzle.Themes}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}