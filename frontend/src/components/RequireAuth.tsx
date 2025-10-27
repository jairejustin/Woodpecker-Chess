import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useSession();
  const location = useLocation();

  // If not authenticated, redirect to /login and store the original location so LoginPage can redirect back
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
