import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';
import { registerUser } from '../api/auth/auth';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await registerUser (username, password);
            console.log(response.data);
            navigate('/login');
        } catch (err) {
            setError('Username already exists');
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="register-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
            />
            <button onClick={handleRegister} className="register-button">
                Register
            </button>
            <p className="login-link">
                Already have an account? <span onClick={() => navigate('/login')}>Login</span>
            </p>
        </div>
    );
};

export default RegisterForm;