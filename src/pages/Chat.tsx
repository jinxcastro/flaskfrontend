import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import io from 'socket.io-client';
import '../styles/chat.css';

const socket = io('http://127.0.0.1:5000');

interface Message {
  sender: string;
  message: string;
}

const Chat: React.FC = () => {
    const { userId, recipientId } = useParams<{ userId: string, recipientId: string }>();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.emit('join', { username: userId });

        const handleReceiveMessage = (data: Message) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        socket.on('receive_message', handleReceiveMessage);

        return () => {
            socket.off('receive_message', handleReceiveMessage);
            socket.emit('leave', { username: userId });
        };
    }, [userId]);

    const sendMessage = () => {
        if (message.trim() === '') return;

        const newMessage = { sender: userId, message };
        socket.emit('message', { sender: userId, recipient: recipientId, message });
        setMessages([...messages, newMessage]);
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
                  <li><Link to={`/dashboard/${userId}`} className="side-link">Dashboard</Link></li>
                  <li><Link to={`/upload/${userId}`} className="side-link">Upload Files</Link></li>
                  <li><Link to="/" className="side-link">Logout</Link></li>
                </ul>
            </aside>

            <main className="main-content">
              <h1>Chat</h1>
              
              <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === userId ? 'my-message' : 'other-message'}>
                        <strong>{msg.sender === userId ? 'Me' : msg.sender}:</strong> {msg.message}
                    </div>
                ))}
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </main>
        </div>
      </div>
    );
};

export default Chat;
