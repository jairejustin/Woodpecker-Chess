import { useState } from "react";
import { Plus } from "lucide-react";
import usePlaylists from "../../hooks/usePlaylists";
import { PlaylistGrid } from "../../components/playlists/PlaylistGrid";
import { PlaylistViewer } from "../../components/playlists/PlaylistViewer";
import { TrainingMode } from "../../components/training/TrainingMode";
import "./PlaylistsPage.css";

type ViewMode = "list" | "viewer" | "training";

export default function PlaylistsPage() {
  const {
    playlists,
    isEmpty,
    createPlaylist,
    deletePlaylist,
    renamePlaylist,
  } = usePlaylists();

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showCreateInput, setShowCreateInput] = useState(false);

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;
    createPlaylist(newPlaylistName.trim());
    setNewPlaylistName("");
    setShowCreateInput(false);
  };

  const handleDeletePlaylist = (id: string) => {
    if (!confirm("Are you sure you want to delete this playlist?")) return;
    deletePlaylist(id);
    if (selectedPlaylistId === id) {
      setSelectedPlaylistId(null);
      setViewMode("list");
    }
  };

  const handleViewPlaylist = (id: string) => {
    setSelectedPlaylistId(id);
    setViewMode("viewer");
  };

  const handleTrainPlaylist = (id: string) => {
    setSelectedPlaylistId(id);
    setViewMode("training");
  };

  const handleBackToList = () => {
    setSelectedPlaylistId(null);
    setViewMode("list");
  };

  // Training mode view
  if (viewMode === "training" && selectedPlaylistId) {
    return (
      <TrainingMode
        playlistId={selectedPlaylistId}
        playlistName={playlists.find(p => p.id === selectedPlaylistId)?.name || "Playlist"}
        onBack={handleBackToList}
      />
    );
  }

  // List and viewer mode view
  return (
    <div className="layout__main">
      <div className="playlist-page">
        <div className="playlist-page__header">
          <h1 className="playlist-page__title">My Playlists</h1>
          <button
            className="btn"
            onClick={() => setShowCreateInput(!showCreateInput)}
          >
            <Plus size={20} />
          </button>
        </div>

        {showCreateInput && (
          <div className="card playlist-page__create-form">
            <input
              type="text"
              className="form-input playlist-page__create-form-input"
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
          <div className="playlist-page__empty-state">
            <p>No playlists yet. Create your first playlist to get started!</p>
          </div>
        ) : (
          <PlaylistGrid
            playlists={playlists}
            onViewPlaylist={handleViewPlaylist}
            onTrainPlaylist={handleTrainPlaylist}
            onDeletePlaylist={handleDeletePlaylist}
            onRenamePlaylist={renamePlaylist}
          />
        )}

        {viewMode === "viewer" && selectedPlaylistId && (
          <PlaylistViewer
            playlistId={selectedPlaylistId}
            playlistName={playlists.find(p => p.id === selectedPlaylistId)?.name || "Playlist"}
            onClose={handleBackToList}
          />
        )}
      </div>
    </div>
  );
}