import { Puzzle, BarChart3, Cog } from 'lucide-react'
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="logo">
          <span className="logo-icon">♔</span> {/* temporary */}
          <h1>Chess Puzzles</h1>
        </div>
        <nav className="nav">
          <button className="nav-btn" onClick={() => navigate('/explore')}>
            <Puzzle />
            <span>Puzzles</span>
          </button>
          <button className="nav-btn" onClick={() => navigate('/stats')}>
            <BarChart3 />
            <span>Stats</span>
          </button>
          <button className="nav-btn" onClick={() => navigate('/settings')}>
            <Cog />
            <span>Settings</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}