import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { Link } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('User created successfully');
    } catch (error) {
      setError('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
      <div className="image-container">
            <img src="/DocuMateAI_Logo.png" alt="logo" style={{ position: 'relative', width: '37%', margin: '0 0 0 144px' }} /> {/* Updated logo path */}
        </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">CREATE A NEW ACCOUNT
          </h2>
          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}
          <form onSubmit={handleRegister}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
            <p style={{textAlign: 'center'}}>Already have an account? <Link to="/login" style={{color: '#007bff'}}>Login</Link></p>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
