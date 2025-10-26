import { Puzzle, Target, Zap, Brain } from "lucide-react"
import "./Pages.css"

export default function HomePage() {
  const handleStartTraining = () => {
    window.location.href = "/explore";
  };
  
  return (
    <div className="main-layout">
      <div className="home-container">
        <div className="hero-section">
          <h1 className="home-title">Woodpecker Chess</h1>
          <p className="home-subtitle">Master Chess Tactics Through Repetition</p>
          <p className="home-description">
            Train pattern recognition and calculation speed by repeatedly solving tactical 
            puzzles with decreasing time intervals.
          </p>
          <button className="home-btn primary" onClick={handleStartTraining}>
            <Puzzle className="home-icon" />
            <span>Start Training</span>
          </button>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <Brain className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Pattern Recognition</h3>
              <p className="feature-description">Instantly recognize tactical motifs</p>
            </div>
          </div>

          <div className="feature-card">
            <Zap className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Speed Training</h3>
              <p className="feature-description">Build faster calculation skills</p>
            </div>
          </div>

          <div className="feature-card">
            <Target className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Curated Puzzles</h3>
              <p className="feature-description">Thousands from Lichess database</p>
            </div>
          </div>

          <div className="feature-card">
            <Puzzle className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Track Progress</h3>
              <p className="feature-description">Monitor improvement over time</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}