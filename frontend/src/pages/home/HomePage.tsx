import { Puzzle, Target, Zap, Brain } from "lucide-react"
import "./HomePage.css"

export default function HomePage() {
  const handleStartTraining = () => {
    window.location.href = "/explore";
  };
  
  return (
    <div className="layout">
      <div className="layout__main">
        <div className="layout__content">
          <div className="home-page">
            <div className="home-page__hero-section">
              <h1 className="home-page__title">Woodpecker Chess</h1>
              <p className="home-page__subtitle">Master Chess Tactics Through Repetition</p>
              <p className="home-page__description">
                Train pattern recognition and calculation speed by repeatedly solving tactical
                puzzles with decreasing time intervals.
              </p>
              <button className="home-page__button home-page__button--primary" onClick={handleStartTraining}>
                <Puzzle className="home-page__button-icon" />
                <span>Start Training</span>
              </button>
            </div>

            <div className="home-page__features-grid">
              <div className="home-page__feature-card">
                <Brain className="home-page__feature-icon" />
                <div className="home-page__feature-content">
                  <h3 className="home-page__feature-title">Pattern Recognition</h3>
                  <p className="home-page__feature-description">Instantly recognize tactical motifs</p>
                </div>
              </div>

              <div className="home-page__feature-card">
                <Zap className="home-page__feature-icon" />
                <div className="home-page__feature-content">
                  <h3 className="home-page__feature-title">Speed Training</h3>
                  <p className="home-page__feature-description">Build faster calculation skills</p>
                </div>
              </div>

              <div className="home-page__feature-card">
                <Target className="home-page__feature-icon" />
                <div className="home-page__feature-content">
                  <h3 className="home-page__feature-title">Curated Puzzles</h3>
                  <p className="home-page__feature-description">Thousands from Lichess database</p>
                </div>
              </div>

              <div className="home-page__feature-card">
                <Puzzle className="home-page__feature-icon" />
                <div className="home-page__feature-content">
                  <h3 className="home-page__feature-title">Track Progress</h3>
                  <p className="home-page__feature-description">Monitor improvement over time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}