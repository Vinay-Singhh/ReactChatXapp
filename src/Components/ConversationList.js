import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import NewConversationPopup from './NewConversationPopup';

function ConversationList({ conversations }) {
    const [filteredConversations, setFilteredConversations] = useState(conversations);
    const handleSearch = (searchQuery) => {
        const filtered = conversations.filter((conversation) =>
            conversation.contact.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredConversations(filtered);
    };
    const [showPopup, setShowPopup] = useState(false);
    const [selectedConversationId, setSelectedConversationId] = useState(null);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleConversationSelect = (conversationId) => {
        console.log("handleConversationSelect = (conversationId)", conversationId);
        setSelectedConversationId(conversationId);
    };

    return (
        <div className="conversation-list">
            <h2 className="list-title">CHATS</h2>
            <SearchBar onSearch={handleSearch} />
            <ul className="conversation-items">
                {filteredConversations.map((conversation) => (
                    <li
                        key={conversation.id}
                        onClick={() => handleConversationSelect(conversation.id)}
                        className={conversation.id === selectedConversationId ? 'selected' : ''}
                    >
                        <Link to={`/conversation/${conversation.id}`} className="conversation-link">
                            <div className="contact-name">{conversation.contact}</div>
                            <div className="last-message">{conversation.messages[conversation.messages.length - 1].text}</div>
                        </Link>
                    </li>
                ))}
            </ul>
            <button className="new-conversation-button" onClick={handleOpenPopup}>Create CHAT</button>
            {showPopup && (
                <NewConversationPopup
                    onClose={handleClosePopup}
                    onConversationSelect={handleConversationSelect}
                />
            )}
        </div>
    );
}

export default ConversationList;
