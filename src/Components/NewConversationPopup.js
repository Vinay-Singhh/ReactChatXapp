import React, { useState } from 'react';
import dummyData from './dummyData.json';
import { useHistory } from 'react-router-dom';

function NewConversationPopup({ onClose, onConversationSelect }) {
  console.log("onConversationSelect", onConversationSelect);
  const [selectedContact, setSelectedContact] = useState(null);
  const history = useHistory();

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  const handleStartConversation = () => {
    console.log("handleStartConversation", selectedContact);
    if (selectedContact) {
      // Check if conversation already exists for the selected contact
      const existingConversation = dummyData.conversations.find(
        conversation => conversation.id === selectedContact.id
      );
      console.log("existingConversation", existingConversation);


      if (existingConversation) {
        // Open existing conversation
        // setSelectedConversationId(existingConversation.id);
        console.log("existingConversation.name:", existingConversation.contact)

        onConversationSelect(existingConversation.id);
        // Navigate to the chat page for the existing conversation
        history.push(`/conversation/${existingConversation.id}`);

      } else {
        // Start new conversation
        const newConversation = {
          id: selectedContact.id,
          contact: selectedContact.name,
          messages: []
        };
        // dummyData.conversations.push(newConversation);
        // setSelectedConversationId(newConversation.id);
        onConversationSelect(newConversation.id);
        console.log("newConversation.id:", newConversation.id);

        // Navigate to the chat page for the existing conversation
        history.push(`/new-conversation/${newConversation.id}`);
      }
    }
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Create Conversation</h2>
        <ul>
          {dummyData.contacts.map(contact => (
            <li key={contact.id} onClick={() => handleContactSelect(contact)}>
              {contact.name}
            </li>
          ))}
        </ul>
        <div className="button-container">
          <button className="start-button" onClick={handleStartConversation} disabled={!selectedContact}>
            Start Conversation
          </button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default NewConversationPopup;
