import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [dob, setDob] = useState('');
  const { register } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    register(name, email, password, department, dob);
  };

  return (
    <div>
      <h2>Register</h2>
<form onSubmit={handleSubmit}>
  <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)} />
  <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
  <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
  <input type="date" placeholder="Date of Birth" required value={dob} onChange={e => setDob(e.target.value)} />
    <input type="text" placeholder="Department" required value={department} onChange={e => setDepartment(e.target.value)} />
  <button type="submit">Register</button>
</form>

      <p>
        Already registered? <Link to="/">Login here</Link>
      </p>
    </div>
  );
}
