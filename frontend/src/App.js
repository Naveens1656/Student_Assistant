import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile';
import Header from './components/Header';
import FunFactPage from './pages/FunFactPage';
import StatsPage from './pages/StatsPage';

// Import your new pages
import TopicSelect from './pages/TopicSelect';
import ChatBot from './pages/ChatBot';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />  {/* Common header */}
        <Routes>
          <Route path="/" element={<AuthPage />} />

          {/* Public topic selection (if you want to allow guests to select topics) */}
          <Route path="/topics" element={<TopicSelect />} />
           <Route path="/funfact" element={<FunFactPage />} />
           <Route path="/stats" element={<StatsPage />} />

          {/* Protect chatbot page */}
          <Route
            path="/chat/:topic"
            element={
              <PrivateRoute>
                <ChatBot />
              </PrivateRoute>
            }
          />

          {/* Existing protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
