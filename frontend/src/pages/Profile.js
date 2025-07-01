import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
      <p><strong>Date of Birth:</strong> {user?.dob}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Department:</strong> {user?.department}</p>

      {/* Button group with spacing */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem' }}>
        <button onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
