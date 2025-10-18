import { Puzzle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="main-layout">
      <div className="home-container">
        <h1 className="home-title">Not implemented</h1>
        <p className="home-description">
          The homepage content should go here
        </p>
        <button className="home-btn" onClick={() => navigate("/explore")}>
          <Puzzle className="home-icon" />
          <span>Play Puzzles</span>
        </button>
      </div>
    </div>
  );
}

