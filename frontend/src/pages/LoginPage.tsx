import { useState } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import "./Pages.css";

export default function LoginPage() {
  const { user, login } = useSession();
  const navigate = useNavigate?.() as any;
  const location = useLocation?.() as any;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If there's a `from` route saved in location.state (protected routes), redirect there after login
  const redirectTo = location?.state?.from?.pathname ?? "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);
    try {
      // calls SessionContext.login(), which persists session to localStorage
      await login(email, password);
      // on success, navigate or fallback to location assign
      if (navigate) navigate(redirectTo, { replace: true });
      else window.location.href = redirectTo;
    } catch (err) {
      setError("Failed to login. Try again.");
    } finally {
      setLoading(false);
    }
  }

  // Simulate OAuth in mock mode we just create a fake session via login()
  async function handleOAuth(provider: "google" | "github") {
    setError(null);
    setLoading(true);
    try {
      // create a predictable fake email for the provider so the UI shows a username
      const fakeEmail = `${provider}_user@example.com`;
      await login(fakeEmail, "oauth"); // your login will generate a user and persist it
      if (navigate) navigate(redirectTo, { replace: true });
      else window.location.href = redirectTo;
    } catch (err) {
      console.error("OAuth login failed:", err);
      setError("OAuth failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  // simple email check
  function validateEmail(v: string) {
    return /^\S+@\S+\.\S+$/.test(v);
  }

  if (user) {
    // if accidentally navigated to login while already authenticated
    if (navigate) {
      navigate(redirectTo, { replace: true });
    } else {
      window.location.href = redirectTo;
    }
    return null;
  }

  return (
    <div className="main-layout">
      <div className="main-content">
        <div className="card auth-card">
          <div className="auth-container">
            <h2 className="auth-title">Welcome Back</h2>

            <form className="auth-form" onSubmit={handleSubmit} aria-describedby="login-error">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <input
                    id="email"
                    placeholder="Enter your Email"
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    aria-label="Email address"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                  </button>
                </div>
              </div>

              <div className="forgot-password-wrapper">
                <a href="#" className="forgot-password-link">
                  Forgot password?
                </a>
              </div>

              <div style={{ marginTop: 8 }}>
                <button
                  type="submit"
                  className="btn auth-btn"
                  disabled={loading}
                  aria-disabled={loading}
                >
                  <LogIn size={20} />
                  <span>{loading ? "Logging in…" : "Login"}</span>
                </button>
              </div>

              {/* Inline error */}
              <div role="status" aria-live="polite" id="login-error" style={{ minHeight: 20 }}>
                {error && <p className="error-text">{error}</p>}
              </div>

              <div className="divider">
                <span className="divider-text">OR</span>
              </div>

              <div className="oauth-buttons">
                <button
                  type="button"
                  className="oauth-btn google"
                  onClick={() => handleOAuth("google")}
                  disabled={loading}
                >
                  <svg className="oauth-icon" viewBox="0 0 24 24" aria-hidden>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  className="oauth-btn github"
                  onClick={() => handleOAuth("github")}
                  disabled={loading}
                >
                  <svg className="oauth-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Continue with GitHub
                </button>
              </div>
            </form>

            <div className="auth-prompt">
              No account?{" "}
              <a href="/register" className="auth-link">
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
