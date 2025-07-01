import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem(email));
    if (storedUser && storedUser.password === password) {
      setUser(storedUser);
      localStorage.setItem('user', JSON.stringify(storedUser));
      navigate('/dashboard');
    } else {
      alert('Invalid email or password!');
    }
  };

const register = (name, email, password, department, dob) => {
  const existing = localStorage.getItem(email);
  if (existing) {
    alert('User already exists!');
    return;
  }

  const newUser = { name, email, password, department, dob };
  localStorage.setItem(email, JSON.stringify(newUser));
  localStorage.setItem('user', JSON.stringify(newUser));
  setUser(newUser);
  navigate('/dashboard');
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
