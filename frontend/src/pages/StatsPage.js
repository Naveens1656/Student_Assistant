import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const StatsPage = () => {
  const navigate = useNavigate();

  // Example dummy data
  const data = [
    { name: 'Tasks Done', value: 24 },
    { name: 'Users Registered', value: 8 },
    { name: 'Likes', value: 53 },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 style={{ marginBottom: '2rem' }}>📊 Project Stats</h2>

      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>

      {/* Back to Dashboard */}
      <div style={{ marginTop: '2rem' }}>
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
};

export default StatsPage;
