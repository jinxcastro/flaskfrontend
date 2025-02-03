import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { loginUser } from '../api/auth/auth';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await loginUser (username, password);
            console.log(response.data);
            navigate(`/dashboard/${username}`);
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
            />
            <button onClick={handleLogin} className="login-button">
                Login
            </button>
            <p className="register-link">
                Don't have an account? <span onClick={() => navigate('/register')}>Register</span>
            </p>
        </div>
    );
};

export default Login;