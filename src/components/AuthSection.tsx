import { useSubscribeDev } from '@subscribe.dev/react';
import './AuthSection.css';

export function AuthSection() {
  const { isSignedIn, signIn, signOut, user } = useSubscribeDev();

  if (!isSignedIn) {
    return (
      <div className="auth-section">
        <div className="auth-prompt">
          <h2>Welcome to Digital Clock</h2>
          <p>Sign in to save your clock preferences and access all features</p>
          <button className="btn-primary" onClick={signIn}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-section authenticated">
      <div className="user-info">
        {user?.avatarUrl && (
          <img src={user.avatarUrl} alt={user.email} className="user-avatar" />
        )}
        <div className="user-details">
          <span className="user-email">{user?.email}</span>
          <button className="btn-secondary" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}