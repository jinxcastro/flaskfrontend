import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/newUser.css';

const NewUser: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/dashboard/new', { username, password });
            navigate(`/dashboard/${username}`);
            console.log(response.data);
        } catch (err) {
            setError('Username already exists');
        }
    };

    const handleCancel = () => {
        navigate(`/dashboard/${username}`);
    };

    return (
        <div className="new-user-container">
            <div className="form-wrapper">
                <h1>Create New User</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="input-field"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="button-group">
                    <button className="submit-button" onClick={handleCreateUser}>Create User</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NewUser;
