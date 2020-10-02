import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const Messages = ({ messages, username, timestamp, join }) => (
    <ScrollToBottom className="messages">
        {messages.map((message, key) =>
            <div key={key}>
                <Message timestamp={timestamp} username={username} message={message} /></div>)}
    </ScrollToBottom>
);

export default Messages;
