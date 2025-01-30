import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditUser: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:5000/api/edit_user/${userId}`);
            setUsername(response.data.username);
            setPassword(response.data.password);
        };
        fetchUser();
    }, [userId]);

    const handleUpdateUser = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/edit_user/${userId}`, { username, password });
            console.log(response.data);
            // Redirect or handle successful update
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Edit User</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleUpdateUser}>Update User</button>
        </div>
    );
};

export default EditUser;