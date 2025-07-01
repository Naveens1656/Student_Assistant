import React from 'react';
import FunFactCard from '../components/FunFactCard';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

export default function FunFactPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <Header />

      <h2>💡 Fun Programming Fact</h2>
      <FunFactCard />

      {/* Back to Dashboard at Bottom */}
      <div style={{ marginTop: '14cm', paddingTop: '2rem' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ⬅️ Back to Dashboard
        </button>
      </div>
    </div>
  );
}
