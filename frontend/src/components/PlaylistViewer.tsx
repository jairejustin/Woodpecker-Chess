import { useState, useEffect } from "react";
import usePlaylists from "../hooks/usePlaylists";
import type { LichessPuzzle } from "../types";

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
    <div className="puzzle-viewer">
      <div className="viewer-header">
        <h2 className="home-subtitle">{playlistName}</h2>
        <button 
          className="close-viewer"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      {isLoading ? (
        <div className="loading">Loading puzzles...</div>
      ) : puzzles.length === 0 ? (
        <div className="no-puzzles">No puzzles in this playlist</div>
      ) : (
        <div className="puzzles-list">
          {puzzles.map((puzzle) => (
            <div key={puzzle.PuzzleId} className="puzzle-item">
              <span className="puzzle-id">{puzzle.PuzzleId}</span>
              <span className="puzzle-rating">Rating: {puzzle.Rating}</span>
              <span className="puzzle-themes">{puzzle.Themes}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}