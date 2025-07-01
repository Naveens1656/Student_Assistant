import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthPage.css';

function AuthPage() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    department: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(formData.email, formData.password);
    } else {
      register(
        formData.name,
        formData.email,
        formData.password,
        formData.department,
        formData.dob
      );
    }
  };

  return (
    <div className="auth-container">
      <h1 className="app-title">Student Assistance Chatbot</h1>

      <div className="auth-card">
        <div className="auth-left">
          <h1>Welcome Back!</h1>
          <p>Please login with your personal info</p>
          <button onClick={() => setIsLogin(true)}>Sign In</button>
        </div>

        <div className="auth-right">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </form>

          {isLogin ? (
            <button className="toggle-btn" onClick={() => setIsLogin(false)}>
              New user? Register
            </button>
          ) : (
            <button className="toggle-btn" onClick={() => setIsLogin(true)}>
              Already have an account?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
