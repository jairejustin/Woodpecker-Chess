import './InfoCard.css';

export function InfoCard({Rating, Themes, Feedback}:
   {
    Rating: number,
    Themes: string, 
    Feedback: string }) 
  {

  return (
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
        <div className="stat-item">
            <span className="stat-label">Theme</span>
            <span className="stat-value">{Themes}</span>
        </div>
        </div>



    </div>
    </aside>
  );
}