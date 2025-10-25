import { Sidebar } from "./components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import PuzzleExplorerPage from "./pages/PuzzleExplorerPage";
import SettingsPage from "./pages/SettingsPage";
import StatsPage from "./pages/StatsPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import './App.css';

export default function App() {
  const location = useLocation();
  const showSidebar = location.pathname !== "/";

  return (
    <div className="layout">
      {showSidebar && <Sidebar />}
      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<PuzzleExplorerPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
