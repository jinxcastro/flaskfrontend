import React, { useState } from 'react';
import '../styles/dashboard.css';

interface User {
  id: string;
  username: string;
}

interface DashboardProps {
  username: string;
  users: User[];
}

const Dashboard: React.FC<DashboardProps> = ({ username, users }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const handleDeleteUser = (userId: string, event: React.MouseEvent) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      event.preventDefault();
    }
  };

  const handleLogout = () => {
    alert('Logged out');
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      <nav>
        <button className="toggle-btn" onClick={toggleSideNav}>
          ☰
        </button>
        <div className="dropdown">
          <button className="dropdown-toggle">
            <p>Welcome, {username} ▼</p>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </button>
        </div>
      </nav>

      <nav id="side-nav" className={isSideNavOpen ? 'open' : ''}>
        <ul>
          <li>
            <a href={`/dashboard/${username}`}>Dashboard</a>
          </li>
          <li>
            <a href={`/file_upload/${username}`}>Upload File</a>
          </li>
        </ul>
      </nav>

      <div className="content">
        <h2>Users</h2>
        <div className="actions">
          <a href={`/new_user/${username}`} className="btn btn-primary">
            New User
          </a>
        </div>

        <div className="user-table">
          <table className="grid-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>
                    <a href={`/edit_user/${user.id}`}>Edit</a> |{' '}
                    <a
                      href={`/delete_user/${user.id}`}
                      onClick={(event) => handleDeleteUser(user.id, event)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
