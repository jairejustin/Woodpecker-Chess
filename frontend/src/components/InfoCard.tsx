import { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import usePlaylists from '../hooks/usePlaylists';
import './styles/InfoCard.css'

export function InfoCard({
  Rating,
  Feedback,
  puzzleId,
}: {
  Rating: number;
  Feedback: string;
  puzzleId: string;
}) {
  const { playlists, addPuzzleToPlaylist, createPlaylist } = usePlaylists();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [addedToPlaylists, setAddedToPlaylists] = useState<Set<string>>(new Set());

  const handleAddToPlaylist = (playlistId: string) => {
    addPuzzleToPlaylist(playlistId, puzzleId, { unique: true });
    setAddedToPlaylists(prev => new Set(prev).add(playlistId));
    
    // Remove the checkmark after 2 seconds
    setTimeout(() => {
      setAddedToPlaylists(prev => {
        const newSet = new Set(prev);
        newSet.delete(playlistId);
        return newSet;
      });
    }, 2000);
  };

  const handleCreateAndAdd = () => {
    if (!newPlaylistName.trim()) return;
    const newPlaylist = createPlaylist(newPlaylistName.trim());
    addPuzzleToPlaylist(newPlaylist.id, puzzleId);
    setNewPlaylistName('');
    setShowCreateForm(false);
    setAddedToPlaylists(prev => new Set(prev).add(newPlaylist.id));
    
    setTimeout(() => {
      setAddedToPlaylists(prev => {
        const newSet = new Set(prev);
        newSet.delete(newPlaylist.id);
        return newSet;
      });
    }, 2000);
  };

  const isPuzzleInPlaylist = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    return playlist?.puzzleIds.includes(puzzleId) ?? false;
  };

  return (
    <>
      <aside className="infocard">
        <div className="infocard-content">
          <h2 className="infocard-title">Puzzle Info</h2>
          <div className="puzzle-progress">
            <h3 className="progress-title">{Feedback}</h3>
          </div>
          <div className="puzzle-stats">
            <div className="stat-item">
              <span className="stat-label">Rating</span>
              <span className="stat-value">{Rating}</span>
            </div>
          </div>
          <button
            className="add-to-playlist-btn"
            onClick={() => setShowPlaylistModal(true)}
          >
            <Plus size={18} />
            Add to Playlist
          </button>
        </div>
      </aside>

      {showPlaylistModal && (
        <div className="playlist-modal-overlay" onClick={() => setShowPlaylistModal(false)}>
          <div className="playlist-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add to Playlist</h2>
              <button
                className="modal-close"
                onClick={() => setShowPlaylistModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              {playlists.length === 0 ? (
                <div className="no-playlists">
                  <p>No playlists yet. Create one to get started!</p>
                </div>
              ) : (
                <div className="playlists-list">
                  {playlists.map((playlist) => {
                    const isInPlaylist = isPuzzleInPlaylist(playlist.id);
                    const wasJustAdded = addedToPlaylists.has(playlist.id);

                    return (
                      <button
                        key={playlist.id}
                        className={`playlist-option ${isInPlaylist ? 'in-playlist' : ''} ${wasJustAdded ? 'added' : ''}`}
                        onClick={() => !isInPlaylist && handleAddToPlaylist(playlist.id)}
                        disabled={isInPlaylist && !wasJustAdded}
                      >
                        <div className="playlist-option-info">
                          <span className="playlist-option-name">{playlist.name}</span>
                          <span className="playlist-option-count">
                            {playlist.puzzleIds.length} puzzle{playlist.puzzleIds.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        {wasJustAdded ? (
                          <Check size={18} className="check-icon" />
                        ) : isInPlaylist ? (
                          <span className="already-added">Already added</span>
                        ) : (
                          <Plus size={18} className="plus-icon" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="create-section">
                {showCreateForm ? (
                  <div className="create-form">
                    <input
                      type="text"
                      placeholder="Playlist name..."
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateAndAdd()}
                      autoFocus
                      className="create-input"
                    />
                    <button onClick={handleCreateAndAdd} className="create-confirm-btn">
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewPlaylistName('');
                      }}
                      className="create-cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="create-new-btn"
                    onClick={() => setShowCreateForm(true)}
                  >
                    <Plus size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}