import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Message from './Message';
import dummyData from './dummyData.json';
import { ToastContainer, toast } from 'react-toastify';


function ConversationDetail() {
  const { ID } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    const foundConversation = dummyData.conversations.find(conversation => conversation.id === parseInt(ID));

    setConversation(foundConversation);
  }, [ID]);

  // Handle scenario when conversation is not found
  if (!conversation) {
    return (
      <div>
        <h2>Conversation Not Found</h2>
        <p>The conversation you are looking for does not exist.</p>
      </div>
    );
  }

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      conversation.messages.push({ 
        id: Date.now(), 
        text: newMessage,
        timestamp: Date.now(),
        fromMe: true,
      });
      setNewMessage('');
    }
    toast.success('Message sent successfully!');
  };
  return (
    <div className="conversation-detail">
      <h2 className="contact-name">{conversation.contact}</h2>
      <ul className="message-list">
        {conversation.messages.map(message => (
          <li key={message.id} className="message">
            <Message message={message} />
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage} className="message-form">
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="message-input"
          />
          <button type="submit" className="send-button">Send</button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default ConversationDetail;