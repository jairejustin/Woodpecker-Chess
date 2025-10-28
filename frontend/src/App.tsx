// src/App.tsx
import { Sidebar } from "./components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import PuzzleExplorerPage from "./pages/PuzzleExplorerPage";
import SettingsPage from "./pages/SettingsPage";
import StatsPage from "./pages/StatsPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RequireAuth from "./components/RequireAuth";
import PlaylistsPage from "./pages/PlaylistsPage";
import { useSession } from "./context/SessionContext";
import './App.css';

export default function App() {
  const location = useLocation();
  const { user } = useSession();

  // Hide sidebar on landing, login, register; show only when authenticated and not on excluded pages.
  const excludedPaths = ["/", "/login", "/register"];
  const showSidebar = !!user && !excludedPaths.includes(location.pathname);

  return (
    <div className="layout">
      {showSidebar && <Sidebar />}
      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Protected routes — wrap each in RequireAuth */}
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

          {/* Public auth pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
