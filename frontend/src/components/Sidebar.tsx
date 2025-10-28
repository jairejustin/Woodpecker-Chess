import { Puzzle, BarChart3, Cog, Home, User2Icon, Menu, X , FolderOpenIcon} from 'lucide-react'
import { useState } from 'react'
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close menu after navigation on mobile
  };

  return (
    <>
      <button className="hamburger-btn" onClick={toggleMenu}>
        {isOpen ? <X /> : <Menu />}
      </button>
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <nav className="nav">
            <button className="nav-btn" onClick={() => handleNavigation('/')}>
              <Home />
              <span>Home</span>
            </button>
            <button className="nav-btn" onClick={() => handleNavigation('/explore')}>
              <Puzzle />
              <span>Puzzles</span>
            </button>
            <button className="nav-btn" onClick={() => handleNavigation('/stats')}>
              <BarChart3 />
              <span>Stats</span>
            </button>
            <button className="nav-btn" onClick={() => handleNavigation('/playlists')}>
              <FolderOpenIcon />
              <span>Playlists</span>
            </button>
            <button className="nav-btn" onClick={() => handleNavigation('/settings')}>
              <Cog />
              <span>Settings</span>
            </button>
            <button className='user-nav-btn' onClick={() => handleNavigation('/profile')}>
              <User2Icon />
              <span>User</span>
            </button>
          </nav>
        </div>
      </aside>
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}