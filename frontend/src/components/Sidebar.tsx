import { Puzzle, BarChart3, Cog, Home } from 'lucide-react'
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <nav className="nav">
          <button className="nav-btn" onClick={() => navigate('/')}>
            <Home />
            <span>Home</span>
          </button>
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