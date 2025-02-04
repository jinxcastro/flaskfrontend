import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import DataGrid from 'react-data-grid';
import '../styles/dashboard.css';
import "react-data-grid/lib/styles.css";

const API_URL = 'http://127.0.0.1:5000/api';

const Dashboard: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [users, setUsers] = useState<{ id: number; username: string }[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${API_URL}/dashboard/${username}`);
            setUsers(response.data.users);
        };
        fetchUsers();
    }, [username]);

    const handleDelete = async (userId: number) => {
        try {
            const response = await axios.delete(`${API_URL}/delete_user/${userId}`);
            if (response.status === 200) {
                setUsers(users.filter(user => user.id !== userId));
            }
        } catch (err) {
            console.error('Error deleting user', err);
        }
    };

    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'username', name: 'Username' },
        {
            key: 'actions',
            name: 'Actions',
            renderCell: ({ row }) => (
                <div>
                    <button onClick={() => handleDelete(row.id)}>Delete</button>
                    <Link to={`/chat/${row.id}/${row.id}`}>Chat</Link>
                </div>
            ),
        },
    ];

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-brand">Welcome</div>
            </nav>

            <div className="content-wrapper">
                <aside className="side-panel">
                    <h3>Menu</h3>
                    <ul>
                        <li><Link to={`/upload/${username}`} className="side-link">Upload Files</Link></li>
                        <li><Link to={`/chat/${username}`} className="side-link">Chat</Link></li>
                        <li><Link to="/" className="side-link">Logout</Link></li>
                    </ul>
                </aside>

                <main className="main-content">
                    <h1>Dashboard</h1>

                    <Link to="/dashboard/new">
                        <button>Create New User</button>
                    </Link>

                    <DataGrid
                        columns={columns}
                        rows={users}
                        rowKeyGetter={(row) => row.id}
                        headerRowHeight={40}
                        style={{ height: 500, width: '100%' }}
                    />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;