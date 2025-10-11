import './InfoCard.css';

export function InfoCard() {
  return (
    <aside className="infocard">
    <div className="infocard-content">
        <h2 className="infocard-title">Puzzle Info</h2>
        <div className="puzzle-stats">
        <div className="stat-item">
            <span className="stat-label">Rating</span>
            <span className="stat-value">0</span>
        </div>
        <div className="stat-item">
            <span className="stat-label">Theme</span>
            <span className="stat-value">None</span>
        </div>
        </div>

        <div className="puzzle-progress">
        <h3 className="progress-title">Your Progress</h3>
        <div className="progress-stats">
            <div className="progress-item">
            <span>Solved Today</span>
            <strong>None</strong>
            </div>
            <div className="progress-item">
            <span>Success Rate</span>
            <strong>0%</strong>
            </div>
            <div className="progress-item">
            <span>Current Streak</span>
            <strong>None</strong>
            </div>
        </div>
        </div>

    </div>
    </aside>
  );
}