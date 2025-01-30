import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/LoginForm';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewUser from './pages/NewUser';
import EditUser from './pages/EditUser';
import FileUpload from './pages/FileUpload';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/:username" element={<Dashboard />} />
                <Route path="/dashboard/new" element={<NewUser />} />
                <Route path="/edit_user/:userId" element={<EditUser />} />
                <Route path="/upload/:username" element={<FileUpload />} />
            </Routes>
        </Router>
    );
};

export default App;