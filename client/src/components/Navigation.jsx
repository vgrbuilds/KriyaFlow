import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const { pathname } = useLocation();

  const linkStyle = (to) => ({
    display: 'block',
    padding: '8px 10px',
    borderRadius: 6,
    background: pathname === to ? '#f0f4ff' : 'transparent',
    color: pathname === to ? '#0b5ed7' : 'inherit',
  });

  return (
    <nav
      style={{
        width: 220,
        minHeight: '100vh',
        borderRight: '1px solid #eee',
        padding: 16,
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <strong>KriyaFlow</strong>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      <div style={{ marginBottom: 16 }}>
        <SignedOut>
          <SignInButton mode="modal">Sign in</SignInButton>
        </SignedOut>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
        <li><Link style={linkStyle('/')} to="/">Home</Link></li>
        <li><Link style={linkStyle('/tasks')} to="/tasks">Tasks</Link></li>
        <li><Link style={linkStyle('/events')} to="/events">Events</Link></li>
        <li><Link style={linkStyle('/habits')} to="/habits">Habits</Link></li>
        <li><Link style={linkStyle('/goals')} to="/goals">Goals</Link></li>
        <li><Link style={linkStyle('/bucketlist')} to="/bucketlist">Bucketlist</Link></li>
      </ul>
    </nav>
  );
}