import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [feedback, setFeedback] = useState({
    name: user?.name || '',
    email: user?.email || '',
    message: '',
  });

  const getEmojiForMessage = (text) => {
    const msg = text.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) return ' 👋';
    if (msg.includes('python')) return ' 🐍';
    if (msg.includes('java')) return ' ☕';
    if (msg.includes('c language') || msg.includes('c program')) return ' 💻';
    if (msg.includes('mongodb')) return ' 🍃';
    if (msg.includes('javascript')) return ' ✨';
    if (msg.includes('thank')) return ' 🙏';
    if (msg.includes('good job') || msg.includes('well done')) return ' 🎉';
    if (msg.includes('error') || msg.includes('sorry')) return ' ⚠️';
    return '';
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.response, sender: 'bot' }]);
      toast.info('💬 Assistant replied');
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: 'Error connecting to assistant.', sender: 'bot' },
      ]);
      toast.error('⚠️ Failed to reach assistant');
    }

    setInput('');
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      const result = await res.json();
      toast.success(result.message || 'Feedback submitted!');
      setFeedback({ name: user?.name || '', email: user?.email || '', message: '' });
      setShowFeedback(false);
    } catch {
      toast.error('Error sending feedback');
    }
  };

  return (
    
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: darkMode ? '#121212' : '#ffffff',
        color: darkMode ? '#f2f2f2' : '#000000',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Header />
      {/* Stats Icon */}
<div
  style={{
    position: 'absolute',
    top: '20px',
    left: '270px',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 'bold',
  }}
  onClick={() => navigate('/stats')}
  title="View Stats"
>
  📊 Stats
</div>

      {/* Profile Icon */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          cursor: 'pointer',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
        onClick={() => navigate('/profile')}
        title="View Profile"
      >
        👤 Profile
      </div>

      {/* Fun Fact Icon */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '130px',
          cursor: 'pointer',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
        onClick={() => navigate('/funfact')}
        title="See Fun Programming Facts"
      >
        
        💡 Fun Fact
      </div>

      {/* Dark Mode Toggle */}
      <div style={{ position: 'absolute', top: '800px', right: '30px' }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            backgroundColor: darkMode ? '#333' : '#eee',
            color: darkMode ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Main Section */}
      <div
        style={{
          flexGrow: 1,
          padding: '2rem',
          marginTop: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>
          Welcome, {user?.name || user?.email} 🎓
        </h2>

        {/* Chat Interface */}
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            height: '400px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            overflowY: 'auto',
            backgroundColor: darkMode ? '#1e1e1e' : '#f9f9f9',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                margin: '8px 0',
              }}
            >
              <strong>{msg.sender === 'user' ? 'You' : 'Assistant'}:</strong>{' '}
              {msg.text}
              {msg.sender === 'bot' && getEmojiForMessage(msg.text)}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask your question..."
            style={{
              flexGrow: 1,
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #aaa',
              marginRight: '8px',
              backgroundColor: darkMode ? '#2e2e2e' : '#fff',
              color: darkMode ? '#fff' : '#000',
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>

        {/* Contact Us Button */}
        <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <button
            onClick={() => setShowFeedback(!showFeedback)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {showFeedback ? 'Close Feedback' : 'Contact Us'}
          </button>
        </div>

        {/* Feedback Form */}
        {showFeedback && (
          <form
            onSubmit={handleFeedbackSubmit}
            style={{
              width: '100%',
              maxWidth: '600px',
              backgroundColor: darkMode ? '#222' : '#f2f2f2',
              padding: '1rem',
              borderRadius: '10px',
            }}
          >
            <h3>Send Feedback</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={feedback.name}
              onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={feedback.email}
              onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
            <textarea
              placeholder="Your Feedback"
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '10px',
                height: '100px',
                marginBottom: '10px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </form>
        )}
      </div>

      {/* Motivational Quote */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '0.5rem',
          fontStyle: 'italic',
          color: darkMode ? '#bbb' : '#555',
        }}
      >
        "The expert in anything was once a beginner."
      </div>

      {/* Logout Button */}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <button
          onClick={logout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2500} theme={darkMode ? 'dark' : 'light'} />
    </div>
  );
};



export default Dashboard;
