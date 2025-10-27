import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "../types";

const STORAGE_KEY = "user";
const storage = {
  load(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  },
  save(u: User | null) {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  },
};

interface SessionContextValue {
  user: User | null;
  restoring: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  // Initialize synchronously from storage to avoid flicker on first render.
  const [user, setUser] = useState<User | null>(() => storage.load());
  const [restoring, setRestoring] = useState<boolean>(true);

  useEffect(() => {
    // If you plan to validate token with a network call, do it here.
    // For now we simply mark restoring finished after local load.
    // Example: await api.auth.me() and setUser(...) if valid.
    (async () => {
      try {
        // place for future async token validation
        // await validateTokenIfPresent();
      } finally {
        setRestoring(false);
      }
    })();
  }, []);

  // Persist user whenever it changes
  useEffect(() => {
    storage.save(user);
  }, [user]);

  // Simulate a small network latency and structured failure for the fake login
  async function login(email: string, password: string) {
    // quick validation so UI can show an error path
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return Promise.reject(new Error("Invalid email"));
    }

    // simulate latency
    await new Promise((r) => setTimeout(r, 250));

    // In real backend, this would return user payload + tokens
    const generated: User = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
      username: email.split("@")[0],
      email,
      puzzlesSolved: [],
      playlists: [],
      analytics: { totalSolved: 0, avgRating: 0, streak: 0 },
    };

    setUser(generated);
  }

  function logout() {
    setUser(null);
  }

  /**
   * updateUser performs a defensive shallow merge.
   * If you expect updates to nested objects (analytics, playlists), supply the full nested object
   * or extend this function to do deep/field-level merges.
   */
  function updateUser(partialData: Partial<User>) {
    setUser((prev) => {
      if (!prev) {
        console.warn("Attempted to update user but no session is active.");
        return prev;
      }
      // defensive: merge top-level fields only to avoid accidental nested overwrites
      return { ...prev, ...partialData };
    });
  }

  const contextValue = useMemo(
    () => ({ user, restoring, login, logout, updateUser }),
    [user, restoring]
  );

  return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession() must be used inside a <SessionProvider>.");
  return ctx;
}
