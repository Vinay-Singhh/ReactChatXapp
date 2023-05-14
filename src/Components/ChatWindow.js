import React, { useState } from 'react';
import dummyData from './dummyData.json';
import Message from './Message';
import { ToastContainer, toast } from 'react-toastify';

function ChatWindow({ id }) {
    console.log("Params:", id);
    const contact = dummyData.contacts.find(contact => contact.id === parseInt(id));

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const newMessageObj = {
                text: newMessage,
                timestamp: Date.now(),
                fromMe: true
            };

            setMessages((prevMessages) => [...prevMessages, newMessageObj]);
            setNewMessage('');
        }
        // Show success message
        toast.success('Message sent successfully!');
    };

    return (
        <div className="chat-window-container">
            <div className="chat-window">
                <h2 className="contact-name">{contact.name}</h2>
            </div>
            <div className="message-container">
                {messages.map((message) => (
                    <div
                        key={contact.id}
                        // className={`messsage ${message.fromMe ? "message-from-me" : "message-from-contact"
                        className={`messsage ${message.fromMe ? 'message sent' : 'messsage received'
                            }`}
                    >
                        {/* <div className="message-text">{message.text}</div>
                        <div className=".message-timestamp">{message.timestamp}</div> */}
                        <Message message={message} />
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleMessageChange}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
                <ToastContainer />
            </div>
        </div>
    );
}

export default ChatWindow;

