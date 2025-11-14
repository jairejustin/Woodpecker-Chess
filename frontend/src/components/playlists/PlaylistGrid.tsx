import { useState } from "react";
import { Edit2, Trash2, Play } from "lucide-react";
import type { Playlist } from "../../types";
import "./Playlist.css";

interface PlaylistGridProps {
  playlists: Playlist[];
  onViewPlaylist: (id: string) => void;
  onTrainPlaylist: (id: string) => void;
  onDeletePlaylist: (id: string) => void;
  onRenamePlaylist: (id: string, name: string) => void;
}

export function PlaylistGrid(props: PlaylistGridProps) {
  const { playlists, onViewPlaylist, onTrainPlaylist, onDeletePlaylist, onRenamePlaylist } = props;
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleStartEdit = (id: string, name: string) => {
    setEditingPlaylistId(id);
    setEditName(name);
  };

  const handleSaveEdit = () => {
    if (!editingPlaylistId || !editName.trim()) return;
    onRenamePlaylist(editingPlaylistId, editName.trim());
    setEditingPlaylistId(null);
    setEditName("");
  };

  const handleCancelEdit = () => {
    setEditingPlaylistId(null);
    setEditName("");
  };

  return (
    <div>
      {playlists.map((playlist) => (
        <div key={playlist.id} className="playlist-grid__card">
          {editingPlaylistId === playlist.id ? (
            <div className="playlist-grid__edit-form">
              <input
                type="text"
                className="playlist-grid__form-input"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                autoFocus
              />
              <div className="playlist-grid__edit-actions">
                <button onClick={handleSaveEdit} className="playlist-grid__btn playlist-grid__btn--save">
                  Save
                </button>
                <button onClick={handleCancelEdit} className="playlist-grid__btn playlist-grid__btn--cancel">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                className="playlist-grid__thumbnail"
                onClick={() => onViewPlaylist(playlist.id)}
                style={{ cursor: 'pointer' }}
              >
                {playlist.puzzleIds.length > 0 ? (
                  <div className="playlist-grid__puzzle-preview">
                    <span className="playlist-grid__puzzle-count">
                      {playlist.puzzleIds.length}
                    </span>
                  </div>
                ) : (
                  <div className="playlist-grid__empty-thumbnail">
                    <span>Empty</span>
                  </div>
                )}
              </div>

              <div className="playlist-grid__info">
                <h3 className="playlist-grid__name">{playlist.name}</h3>
                <p className="playlist-grid__puzzle-stats">
                  {playlist.puzzleIds.length} {playlist.puzzleIds.length === 1 ? 'puzzle' : 'puzzles'}
                </p>
              </div>

              <div className="playlist-grid__actions">
                <button
                  className="playlist-grid__action-btn playlist-grid__action-btn--play"
                  onClick={() => onTrainPlaylist(playlist.id)}
                  title="Train with this playlist"
                  disabled={playlist.puzzleIds.length === 0}
                >
                  <Play size={16} />
                </button>
                <button
                  className="playlist-grid__action-btn playlist-grid__action-btn--edit"
                  onClick={() => handleStartEdit(playlist.id, playlist.name)}
                  title="Rename playlist"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  className="playlist-grid__action-btn playlist-grid__action-btn--delete"
                  onClick={() => onDeletePlaylist(playlist.id)}
                  title="Delete playlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}