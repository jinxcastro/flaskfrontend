import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import io from 'socket.io-client';
import '../styles/chat.css';

const socket = io('http://127.0.0.1:5000');

const Chat: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.emit('join', { username });

        socket.on('receive_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, `${data.sender}: ${data.message}`]);
        });

        return () => {
            socket.emit('leave', { username });
        };
    }, [username]);

    const sendMessage = () => {
        socket.emit('message', { sender: username, recipient: 'other_user', message });
        setMessages([...messages, `Me: ${message}`]);
        setMessage('');
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
                  <li><Link to={`/upload/${username}`} className="side-link">Upload Files</Link></li>
                  <li><Link to="/" className="side-link">Logout</Link></li>
                </ul>
            </aside>

            <main className="main-content">
              <h1>Chat</h1>
              
              <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
              </div>
              <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </main>
          </div>
           
        </div>
    );
};

export default Chat;
