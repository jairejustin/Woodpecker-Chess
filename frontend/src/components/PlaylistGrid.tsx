import { useState } from "react";
import { Edit2, Trash2, Play } from "lucide-react";
import type { Playlist } from "../types";

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
        <div key={playlist.id} className="card playlist-card">
          {editingPlaylistId === playlist.id ? (
            <div className="edit-form">
              <input
                type="text"
                className="form-input"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                autoFocus
              />
              <div className="edit-actions">
                <button onClick={handleSaveEdit} className="btn btn-small">
                  Save
                </button>
                <button onClick={handleCancelEdit} className="btn btn-secondary btn-small">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div 
                className="playlist-thumbnail"
                onClick={() => onViewPlaylist(playlist.id)}
                style={{ cursor: 'pointer' }}
              >
                {playlist.puzzleIds.length > 0 ? (
                  <div className="puzzle-preview">
                    <span className="puzzle-count">
                      {playlist.puzzleIds.length}
                    </span>
                  </div>
                ) : (
                  <div className="empty-thumbnail">
                    <span>Empty</span>
                  </div>
                )}
              </div>

              <div className="playlist-info">
                <h3>{playlist.name}</h3>
                <p className="puzzle-stats">
                  {playlist.puzzleIds.length} {playlist.puzzleIds.length === 1 ? 'puzzle' : 'puzzles'}
                </p>
              </div>

              <div className="playlist-actions">
                <button
                  className="action-btn play-btn"
                  onClick={() => onTrainPlaylist(playlist.id)}
                  title="Train with this playlist"
                  disabled={playlist.puzzleIds.length === 0}
                >
                  <Play size={16} />
                </button>
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleStartEdit(playlist.id, playlist.name)}
                  title="Rename playlist"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  className="action-btn delete-btn"
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