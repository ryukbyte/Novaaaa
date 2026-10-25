
import { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    // Frontend validation
    if (!email.trim() || !password) {
      setError('Please fill in both fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    // Send login details to the Express backend
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed. Please try again.');
        return;
      }

      // Show the Dashboard after successful login
      setLoggedInUser(data.user);
    } catch (err) {
      setError(
        'Unable to connect to NOVA. Make sure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  }

  // Dashboard view after successful login
  if (loggedInUser) {
    return (
      <main className="login-page">
        <nav className="navbar">
          <a className="brand" href="/" aria-label="NOVA home">
            <span className="brand-icon">✳</span>
            nova
          </a>
          <span className="nav-note">YOUR SPACE TO GROW</span>
        </nav>

        <section className="login-card">
          <div className="welcome-icon">✦</div>
          <p className="eyebrow">YOUR DASHBOARD</p>
          <h1>Welcome to NOVA, {loggedInUser.name}!</h1>
          <p className="subtitle">
            You're signed in as {loggedInUser.email}.
          </p>

          <p className="footer-note">
            Your next chapter starts here. ✨
          </p>

          <button
            type="button"
            onClick={() => {
              setLoggedInUser(null);
              setEmail('');
              setPassword('');
              setError('');
            }}
          >
            Sign out
          </button>
        </section>

        <footer className="page-footer">
          MADE FOR YOUR NEXT CHAPTER <span>✳</span>
        </footer>
      </main>
    );
  }

  // Login page
  return (
    <main className="login-page">
      <nav className="navbar">
        <a className="brand" href="/" aria-label="NOVA home">
          <span className="brand-icon">✳</span>
          nova
        </a>
        <span className="nav-note">YOUR SPACE TO GROW</span>
      </nav>

      <section className="login-card">
        <div className="welcome-icon">✦</div>

        <p className="eyebrow">WELCOME BACK</p>
        <h1>Your next chapter starts here.</h1>
        <p className="subtitle">
          Sign in to continue your journey.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && (
            <p className="message" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in to NOVA ↗'}
          </button>
        </form>

        <p className="footer-note">
          A little progress every day adds up.
        </p>
      </section>

      <footer className="page-footer">
        MADE FOR YOUR NEXT CHAPTER <span>✳</span>
      </footer>
    </main>
  );
}

export default App;
