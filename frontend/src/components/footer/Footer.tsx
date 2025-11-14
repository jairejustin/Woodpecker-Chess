import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">© 2025 Chess Puzzle Trainer. Practice makes perfect.</p>
        <div className="footer__links">
          <a href="#about" className="footer__link">About</a>
          <a href="#privacy" className="footer__link">Privacy</a>
          <a href="#contact" className="footer__link">Contact</a>
        </div>
      </div>
    </footer>
  );
}