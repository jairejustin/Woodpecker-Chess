import { Sidebar } from "./components/sidebar/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import PuzzleExplorerPage from "./pages/explore/PuzzleExplorerPage";
import SettingsPage from "./pages/options/SettingsPage";
import StatsPage from "./pages/stats/StatsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import RequireAuth from "./context/RequireAuth";
import PlaylistsPage from "./pages/playlists/PlaylistsPage";
import { useSession } from "./context/SessionContext";
import { excludedPaths } from "./constants";
import './App.css';

export default function App() {
  const location = useLocation();
  const { user } = useSession();

  const showSidebar = !!user && !excludedPaths.includes(location.pathname);

  return (
    <div className={`layout ${showSidebar ? "layout--with-sidebar" : ""}`}>
    {showSidebar && <Sidebar/>}
    <main className="layout__main">
      <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/explore"
            element={
              <RequireAuth>
                <PuzzleExplorerPage />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <SettingsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/stats"
            element={
              <RequireAuth>
                <StatsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/playlists"
            element={
              <RequireAuth>
                <PlaylistsPage />
              </RequireAuth>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
