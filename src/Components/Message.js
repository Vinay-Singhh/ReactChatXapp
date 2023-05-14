import React from "react";

function Message({ message }) {
  const { text, timestamp, fromMe } = message;
  const messageClass = fromMe ? "message-from-me" : "message-from-contact";

  // Convert timestamp to a formatted string
  const formattedTimestamp = new Date(timestamp).toLocaleString();
  console.log("formattedTimestamp:", formattedTimestamp);

  return (
    <div className={`message ${messageClass}`}>
      <div className="message-text">{text}</div>
      <div className="message-timestamp">{formattedTimestamp}</div>
    </div>
  );
}

export default Message;
