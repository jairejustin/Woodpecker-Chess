import { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import usePlaylists from '../../hooks/usePlaylists';
import './PuzzleDetails.css'

export default function PuzzleDetails({
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
      <aside className="puzzle-details">
        <div className="puzzle-details__content">
          <h2 className="puzzle-details__title">Puzzle Info</h2>
          <div className="puzzle-details__progress">
            <h3 className="puzzle-details__progress-title">{Feedback}</h3>
          </div>
          <div className="puzzle-details__stats">
            <div className="puzzle-details__stat-item">
              <span className="puzzle-details__stat-label">Rating</span>
              <span className="puzzle-details__stat-value">{Rating}</span>
            </div>
          </div>
          <button
            className="puzzle-details__add-to-playlist-btn"
            onClick={() => setShowPlaylistModal(true)}
          >
            <Plus size={18} />
            Add to Playlist
          </button>
        </div>
      </aside>

      {showPlaylistModal && (
        <div className="puzzle-details__modal-overlay" onClick={() => setShowPlaylistModal(false)}>
          <div className="puzzle-details__modal" onClick={(e) => e.stopPropagation()}>
            <div className="puzzle-details__modal-header">
              <h2 className="puzzle-details__modal-title">Add to Playlist</h2>
              <button
                className="puzzle-details__modal-close"
                onClick={() => setShowPlaylistModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="puzzle-details__modal-content">
              {playlists.length === 0 ? (
                <div className="puzzle-details__no-playlists">
                  <p>No playlists yet. Create one to get started!</p>
                </div>
              ) : (
                <div className="puzzle-details__playlists-list">
                  {playlists.map((playlist) => {
                    const isInPlaylist = isPuzzleInPlaylist(playlist.id);
                    const wasJustAdded = addedToPlaylists.has(playlist.id);

                    return (
                      <button
                        key={playlist.id}
                        className={`puzzle-details__playlist-option ${isInPlaylist ? 'puzzle-details__playlist-option--in-playlist' : ''} ${wasJustAdded ? 'puzzle-details__playlist-option--added' : ''}`}
                        onClick={() => !isInPlaylist && handleAddToPlaylist(playlist.id)}
                        disabled={isInPlaylist && !wasJustAdded}
                      >
                        <div className="puzzle-details__playlist-option-info">
                          <span className="puzzle-details__playlist-option-name">{playlist.name}</span>
                          <span className="puzzle-details__playlist-option-count">
                            {playlist.puzzleIds.length} puzzle{playlist.puzzleIds.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        {wasJustAdded ? (
                          <Check size={18} className="puzzle-details__check-icon" />
                        ) : isInPlaylist ? (
                          <span className="puzzle-details__already-added">Already added</span>
                        ) : (
                          <Plus size={18} className="puzzle-details__plus-icon" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="puzzle-details__create-section">
                {showCreateForm ? (
                  <div className="puzzle-details__create-form">
                    <input
                      type="text"
                      placeholder="Playlist name..."
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateAndAdd()}
                      autoFocus
                      className="puzzle-details__create-input"
                    />
                    <button onClick={handleCreateAndAdd} className="puzzle-details__create-confirm-btn">
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewPlaylistName('');
                      }}
                      className="puzzle-details__create-cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="puzzle-details__create-new-btn"
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