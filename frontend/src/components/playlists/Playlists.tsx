import { useState } from "react";
import { Edit2, Trash2, Play } from "lucide-react";
import type { Playlist } from "../../types";
import "./Playlists.css";

interface PlaylistGridProps {
  playlists: Playlist[];
  onViewPlaylist: (id: string) => void;
  onTrainPlaylist: (id: string) => void;
  onDeletePlaylist: (id: string) => void;
  onRenamePlaylist: (id: string, name: string) => void;
}

export function Playlists(props: PlaylistGridProps) {
  const { playlists, onViewPlaylist, onTrainPlaylist, onDeletePlaylist, onRenamePlaylist } = props;
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const startEdit = (id: string, name: string) => {
    setEditingPlaylistId(id);
    setEditName(name);
  };

  const saveEdit = () => {
    if (!editingPlaylistId || !editName.trim()) return;
    onRenamePlaylist(editingPlaylistId, editName.trim());
    setEditingPlaylistId(null);
    setEditName("");
  };

  const cancelEdit = () => {
    setEditingPlaylistId(null);
    setEditName("");
  };

  return (
    <div className="playlists">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="playlist">
          
          {editingPlaylistId === playlist.id ? (
            <div className="playlist-edit">
              <input
                type="text"
                className="playlist-edit__input"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                autoFocus
              />

              <div className="playlist-edit__actions">
                <button onClick={saveEdit} className="button button--secondary">
                  Save
                </button>
                <button onClick={cancelEdit} className="button button--secondary">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                className="playlist__thumbnail"
                onClick={() => onViewPlaylist(playlist.id)}
              >
                {playlist.puzzleIds.length > 0 ? (
                  <div className="playlist__thumbnail">
                    <span className="playlist__puzzle-count">
                      {playlist.puzzleIds.length}
                    </span>
                  </div>
                ) : (
                  <div className="playlist__thumbnail playlist__thumbnail--empty">
                    <span className="playlist__thumbnail--empty-text">Empty</span>
                  </div>
                )}
              </div>

              <div className="playlist__info">
                <h3 className="playlist__title">{playlist.name}</h3>

                <p className="playlist__stats">
                  {playlist.puzzleIds.length}{" "}
                  {playlist.puzzleIds.length === 1 ? "puzzle" : "puzzles"}
                </p>
              </div>

              <div className="playlist__actions">
                <button
                  className="playlist__action-btn playlist__action-btn--play"
                  onClick={() => onTrainPlaylist(playlist.id)}
                  disabled={playlist.puzzleIds.length === 0}
                  title="Train with this playlist"
                >
                  <Play size={16} />
                </button>

                <button
                  className="playlist__action-btn playlist__action-btn--edit"
                  onClick={() => startEdit(playlist.id, playlist.name)}
                  title="Rename playlist"
                >
                  <Edit2 size={16} />
                </button>

                <button
                  className="playlist__action-btn playlist__action-btn--delete"
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
