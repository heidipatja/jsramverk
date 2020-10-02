import React from 'react';

const Message = ({ message: { username, message, timestamp }, }) => {
    return (
        <div className="messageBox">
            <div className="username">{username}</div>
            <div className="timestamp">{timestamp}</div>
            <div className="message">{message}</div>
        </div>
    );
};

export default Message;
