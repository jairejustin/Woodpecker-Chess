import { useState, useEffect } from "react";
import usePlaylists from "../../hooks/usePlaylists";
import type { LichessPuzzle } from "../../types";
import "./PlaylistViewer.css";

interface PlaylistViewerProps {
  playlistId: string;
  playlistName: string;
  onClose: () => void;
}

export function PlaylistViewer({ playlistId, playlistName, onClose }: PlaylistViewerProps) {
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
      <div className="playlist-viewer__overlay" onClick={onClose} />

      <div className="playlist-viewer__modal">
        <div className="playlist-viewer__header">
          <h2 className="playlist-viewer__title">{playlistName}</h2>
          <button className="playlist-viewer__close-btn" onClick={onClose}>×</button>
        </div>

        {isLoading ? (
          <div className="playlist-viewer__status playlist-viewer__status--loading">
            Loading puzzles...
          </div>
        ) : puzzles.length === 0 ? (
          <div className="playlist-viewer__status playlist-viewer__status--empty">
            No puzzles in this playlist
          </div>
        ) : (
          <div className="playlist-viewer__list">
            {puzzles.map((p) => (
              <div key={p.PuzzleId} className="playlist-viewer__item">
                <span className="playlist-viewer__item-id">{p.PuzzleId}</span>
                <span className="playlist-viewer__item-rating">Rating: {p.Rating}</span>
                <span className="playlist-viewer__item-themes">{p.Themes}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
