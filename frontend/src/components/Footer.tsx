import './styles/Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Chess Puzzle Trainer. Practice makes perfect.</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#privacy">Privacy</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}