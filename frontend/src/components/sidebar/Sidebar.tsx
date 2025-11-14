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
      <button className="sidebar__hamburger-btn" onClick={toggleMenu}>
        {isOpen ? <X /> : <Menu />}
      </button>
      
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__content">
          <nav className="sidebar__nav">
            <button className="sidebar__nav-btn" onClick={() => handleNavigation('/')}>
              <Home />
              <span>Home</span>
            </button>
            <button className="sidebar__nav-btn" onClick={() => handleNavigation('/explore')}>
              <Puzzle />
              <span>Puzzles</span>
            </button>
            <button className="sidebar__nav-btn" onClick={() => handleNavigation('/stats')}>
              <BarChart3 />
              <span>Stats</span>
            </button>
            <button className="sidebar__nav-btn" onClick={() => handleNavigation('/playlists')}>
              <FolderOpenIcon />
              <span>Playlists</span>
            </button>
            <button className="sidebar__nav-btn" onClick={() => handleNavigation('/settings')}>
              <Cog />
              <span>Settings</span>
            </button>
            <button className='sidebar__user-nav-btn' onClick={() => handleNavigation('/profile')}>
              <User2Icon />
              <span>User</span>
            </button>
          </nav>
        </div>
      </aside>
      {isOpen && <div className="sidebar__overlay" onClick={toggleMenu}></div>}
    </>
  );
}