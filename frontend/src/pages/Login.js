import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import '../index.css';

export default function Login() {
  return (
    <div style={{ minHeight: '100vh', background: '#e0f7fa', position: 'relative' }}>
      
      {/* Header with logo + text top-right */}
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <Header />
      </div>

      {/* Centered login form */}
      <div style={styles.centerContent}>
        <h1 style={styles.heading}>Welcome to Student Assistant</h1>
        <LoginForm />
      </div>
    </div>
  );
}

const styles = {
  centerContent: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '20px',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '24px',
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'black',  
  },
};
