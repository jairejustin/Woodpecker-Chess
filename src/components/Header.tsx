import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">♔</span>
          <h1>Chess Puzzles</h1>
        </div>
        <nav className="nav">
          <button className="nav-btn">Puzzles</button>
          <button className="nav-btn">Statistics</button>
          <button className="nav-btn">Settings</button>
        </nav>
      </div>
    </header>
  );
}