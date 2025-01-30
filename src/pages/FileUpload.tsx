import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams} from 'react-router-dom';
import '../styles/fileUpload.css';

const FileUpload: React.FC = () => {
  const { username } = useParams();
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

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
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError('Invalid file type or upload failed');
            setMessage('');
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
                  {/* <li><Link to={'/dashboard/:username'} className="side-link">Home</Link></li> */}
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
            </main>
          </div>
        </div>
    );
};

export default FileUpload;