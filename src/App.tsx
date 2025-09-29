import { useSubscribeDev } from '@subscribe.dev/react';
import { AuthSection } from './components/AuthSection';
import { DigitalClock } from './components/DigitalClock';
import { SubscriptionPanel } from './components/SubscriptionPanel';
import './App.css';

function SignInScreen() {
  const { signIn } = useSubscribeDev();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Digital Clock</h1>
        <p className="app-subtitle">A beautiful digital clock with customizable settings</p>
      </header>

      <main className="app-main">
        <div className="sign-in-prompt">
          <div className="prompt-content">
            <div className="prompt-icon">🕐</div>
            <h2>Welcome to Digital Clock</h2>
            <p>Sign in to save your clock preferences and access all features</p>
            <button className="btn-primary-large" onClick={signIn}>
              Sign In to Get Started
            </button>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Powered by Subscribe.dev</p>
      </footer>
    </div>
  );
}

function AuthenticatedApp() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Digital Clock</h1>
        <p className="app-subtitle">Your personalized digital clock</p>
      </header>

      <AuthSection />

      <main className="app-main">
        <DigitalClock />
        <SubscriptionPanel />
      </main>

      <footer className="app-footer">
        <p>Powered by Subscribe.dev</p>
      </footer>
    </div>
  );
}

function App() {
  const { isSignedIn } = useSubscribeDev();

  return isSignedIn ? <AuthenticatedApp /> : <SignInScreen />;
}

export default App;
