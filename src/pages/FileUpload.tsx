import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/fileUpload.css';

const FileUpload: React.FC = () => {
    const { username } = useParams();
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<{ id: number; filename: string; filetype: string }[]>([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUploadedFiles();
    }, []);

    const fetchUploadedFiles = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/upload/${username}`);
            console.log("Fetched files:", response.data);
            setUploadedFiles(response.data.files || []);
        } catch (err) {
            console.error('Error fetching uploaded files:', err);
            setUploadedFiles([]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setError('');
        }
    };

    const handleFileUpload = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://127.0.0.1:5000/api/upload/${username}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMessage(response.data.message);
            setError('');
            setFile(null);
            setPreviewUrl(null);
            setTimeout(fetchUploadedFiles, 500);
        } catch (err) {
            setError('Invalid file type or upload failed');
            setMessage('');
        }
    };

    const handleFileDelete = async (fileId: number) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/delete/${fileId}`);
            setMessage("File deleted successfully!");
            fetchUploadedFiles();
        } catch (err) {
            setError('Failed to delete file');
        }
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-brand">Welcome</div>
            </nav>

            <div className="content-wrapper">
                <aside className="side-panel">
                    <h3>Menu</h3>
                    <ul>
                        <li><Link to={`/dashboard/${username}`} className="side-link">Dashboard</Link></li>
                        <li><Link to="/" className="side-link">Logout</Link></li>
                    </ul>
                </aside>

                <main className="main-content">
                    <h1>File Upload</h1>
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}
                    <div className="upload-section">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*, video/*"
                            className="file-input"
                        />
                        <button onClick={handleFileUpload} className="upload-button">
                            Upload
                        </button>
                    </div>

                    {previewUrl && (
                        <div className="preview-container">
                            {file?.type.startsWith('image/') ? (
                                <img src={previewUrl} alt="Uploaded Preview" className="preview-media" />
                            ) : file?.type.startsWith('video/') ? (
                                <video controls className="preview-media">
                                    <source src={previewUrl} type={file.type} />
                                    Your browser does not support the video tag.
                                </video>
                            ) : null}
                        </div>
                    )}

                    <div className="uploaded-files">
                        <h2>Uploaded Files</h2>
                        {uploadedFiles.length > 0 ? (
                            <ul>
                                {uploadedFiles.map((file) => (
                                    <li key={file.id} className="file-item">
                                        {file.filetype.startsWith('image/') ? (
                                            <img
                                                src={`http://127.0.0.1:5000/static/uploads/${file.filename}`}
                                                alt={file.filename}
                                                className="uploaded-media"
                                            />
                                        ) : file.filetype.startsWith('video/') ? (
                                            <video controls className="uploaded-media">
                                                <source src={`http://127.0.0.1:5000/static/uploads/${file.filename}`} type={file.filetype} />
                                            </video>
                                        ) : (
                                            <a href={`http://127.0.0.1:5000/static/uploads/${file.filename}`} download>
                                                {file.filename}
                                            </a>
                                        )}
                                        <button onClick={() => handleFileDelete(file.id)} className="delete-button">
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No files uploaded yet.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FileUpload;
