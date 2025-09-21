import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import HomePage from './pages/HomePage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import HabitsPage from './pages/HabitsPage.jsx';
import GoalsPage from './pages/GoalsPage.jsx';
import BucketlistPage from './pages/BucketlistPage.jsx';
import Navigation from './components/Navigation.jsx';
import './App.css';

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  if (!clerkKey) {
    return <div style={{ padding: 24 }}>Missing VITE_CLERK_PUBLISHABLE_KEY in client/.env</div>;
  }

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <BrowserRouter>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Navigation />
          <main style={{ flex: 1, padding: 16 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/habits" element={<HabitsPage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/bucketlist" element={<BucketlistPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
