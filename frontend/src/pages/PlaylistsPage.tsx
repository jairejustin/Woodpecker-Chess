// src/pages/PlaylistsPage.tsx
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Play } from "lucide-react";
import usePlaylists from "../hooks/usePlaylists";
import type { LichessPuzzle } from "../types";
import "./Pages.css";

export default function PlaylistsPage() {
  const {
    playlists,
    isEmpty,
    createPlaylist,
    deletePlaylist,
    renamePlaylist,
    getPlaylistPuzzles,
  } = usePlaylists();

  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [puzzles, setPuzzles] = useState<LichessPuzzle[]>([]);
  const [isLoadingPuzzles, setIsLoadingPuzzles] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [showCreateInput, setShowCreateInput] = useState(false);

  useEffect(() => {
    if (!selectedPlaylistId) {
      setPuzzles([]);
      return;
    }

    setIsLoadingPuzzles(true);
    getPlaylistPuzzles(selectedPlaylistId)
      .then((loaded) => setPuzzles(loaded))
      .catch((err) => {
        console.error("Failed to load puzzles:", err);
        setPuzzles([]);
      })
      .finally(() => setIsLoadingPuzzles(false));
  }, [selectedPlaylistId, getPlaylistPuzzles]);

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;
    const playlist = createPlaylist(newPlaylistName.trim());
    setNewPlaylistName("");
    setShowCreateInput(false);
    setSelectedPlaylistId(playlist.id);
  };

  const handleDeletePlaylist = (id: string) => {
    if (!confirm("Are you sure you want to delete this playlist?")) return;
    deletePlaylist(id);
    if (selectedPlaylistId === id) setSelectedPlaylistId(null);
  };

  const handleStartEdit = (id: string, name: string) => {
    setEditingPlaylistId(id);
    setEditName(name);
  };

  const handleSaveEdit = () => {
    if (!editingPlaylistId || !editName.trim()) return;
    renamePlaylist(editingPlaylistId, editName.trim());
    setEditingPlaylistId(null);
    setEditName("");
  };

  const handleCancelEdit = () => {
    setEditingPlaylistId(null);
    setEditName("");
  };

  return (
    <div className="main-content">
        <div className="playlists-page">
        <div className="playlists-header">
            <h1 className="home-title">My Playlists</h1>
            <button 
            className="btn"
            onClick={() => setShowCreateInput(!showCreateInput)}
            >
            <Plus size={20} />
            </button>
        </div>

        {showCreateInput && (
            <div className="card create-playlist-form">
            <input
                type="text"
                className="form-input playlist-input"
                placeholder="Enter playlist name..."
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreatePlaylist()}
                autoFocus
            />
            <button onClick={handleCreatePlaylist} className="btn btn-small">
                Create
            </button>
            <button onClick={() => setShowCreateInput(false)} className="btn btn-secondary btn-small">
                Cancel
            </button>
            </div>
        )}

        {isEmpty ? (
            <div className="empty-state">
            <p>No playlists yet. Create your first playlist to get started!</p>
            </div>
        ) : (
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
                    <div className="playlist-thumbnail">
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
                        onClick={() => setSelectedPlaylistId(playlist.id)}
                        title="View puzzles"
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
                        onClick={() => handleDeletePlaylist(playlist.id)}
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
        )}

        {selectedPlaylistId && (
            <div className="puzzle-viewer">
            <div className="viewer-header">
                <h2 className="home-subtitle">
                {playlists.find(p => p.id === selectedPlaylistId)?.name || 'Playlist'}
                </h2>
                <button 
                className="close-viewer"
                onClick={() => setSelectedPlaylistId(null)}
                >
                ×
                </button>
            </div>
            {isLoadingPuzzles ? (
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
        )}
        </div>
    </div>
  );
}