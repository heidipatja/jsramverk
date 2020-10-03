import React from 'react';

function getTimeStamp() {
    let now = new Date();
    now = now.toLocaleTimeString("sv-SE", { hour12: false });
    return now;
}

const MessageInput = ({ message, setMessage, sendMessage, setTimeStamp }) => (
    <form>
        <label className="messageLabel" htmlFor="message">Meddelande</label>
        <textarea className="textAreaChat" name="message" type="text" value={message} placeholder="Skriv ett meddelande och tryck på enter" onChange={(event) => setMessage(event.target.value) + setTimeStamp(getTimeStamp())}
            onKeyPress={event => event.key === "Enter" ? sendMessage(event) + setMessage("") : null }
        />
    </form>
);

export default MessageInput;
