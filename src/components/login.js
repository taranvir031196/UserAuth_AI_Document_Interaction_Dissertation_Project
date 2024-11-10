import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import '../styles/login.css'; // Importing CSS for styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredentials.user.getIdToken();
      // Store token in localStorage or pass it directly
      localStorage.setItem("firebaseToken", idToken);
      window.location.href = `https://bitsdocumentinteractiondissertationproject-uw9dgmv8bysh6leydke.streamlit.app/?token=${idToken}`;   
    } catch (error) {
      setError('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="image-container">
            <img src="/DocuMateAI_Logo.png" alt="logo" style={{ position: 'relative', width: '37%', margin: '0 0 0 144px' }} /> {/* Updated logo path */}
        </div>
            <h2>Welcome!</h2>
            <h3 style={{textAlign: 'center'}}>Sign in to your account</h3>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p style={{textAlign: 'center'}}>Don't have an account? <Link to="/register" style={{color: '#007bff'}}>Register</Link></p>
            </form>
        </div>
    </div>
  );
};

export default Login;
