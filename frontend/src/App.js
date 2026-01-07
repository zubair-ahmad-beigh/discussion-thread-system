import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PostView from './components/PostView';
import AuthModal from './components/Auth/AuthModal';
import ThemeToggle from './components/ThemeToggle';
import Avatar from './components/Avatar';
import './App.css';

function AppContent() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // For demo purposes, using a hardcoded post ID
  const demoPostId = '695d60eeec8b9061bb8cc54c';

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <div className="header-left">
            <h1>Discussion Thread System</h1>
            <p>Real-time discussions with nested comments</p>
          </div>
          <div className="header-right">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <PostView postId={demoPostId} />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>Built with React, Express, MongoDB, Socket.io & JWT Authentication</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
