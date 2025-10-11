import { Puzzle, BarChart3, Cog } from 'lucide-react'
import './Sidebar.css';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="logo">
          <span className="logo-icon">♔</span> {/* temporary */}
          <h1>Chess Puzzles</h1>
        </div>
        <nav className="nav">
          <button className="nav-btn">
            <Puzzle />
            <span>Puzzles</span>
          </button>
          <button className="nav-btn">
            <BarChart3 />
            <span>Stats</span>
          </button>
          <button className="nav-btn">
            <Cog />
            <span>Settings</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}