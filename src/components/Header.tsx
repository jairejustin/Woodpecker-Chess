import './Header.css';
import { Puzzle, ChartNoAxesCombinedIcon, Cog } from 'lucide-react';
export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">♔</span>
          <h1>Chess Puzzles</h1>
        </div>
        <nav className="nav">
          <button className="nav-btn"><Puzzle /></button>
          <button className="nav-btn"><ChartNoAxesCombinedIcon /></button>
          <button className="nav-btn"><Cog /></button>
        </nav>
      </div>
    </header>
  );
}