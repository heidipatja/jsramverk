import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Messages from "./Messages";
import MessageInput from "./MessageInput";

// const socket = io('http://localhost:8300');
let socket;

const Chat = () => {
    const [username, setUserName] = useState("");
    const [timestamp, setTimeStamp] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatActive, setChatActive] = useState(false);

    const server = "http://localhost:8300";

    // const server = "https://socket-server.heidipatja.me/";

    useEffect(() => {
        socket = io(server);

        return () => {
            socket.emit("disconnect");

            socket.off();
        }
    }, [server]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    useEffect(() => {
        socket.on("join", (username) => {
            setUserName(username);
        });
    });

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            setMessages([...messages, {
                timestamp: timestamp,
                username: username,
                message: message
            }]);
            socket.emit("message", {
                timestamp: timestamp,
                username: username,
                message: message
            }, () => setMessage(""));
        }
    }

    const join = (event) => {
        event.preventDefault();
        setUserName(username);
        setChatActive(true);

        if (username) {
            socket.emit("join", username);
        }
    }

    if (chatActive) {
        return (
            <main>
                <h1>Chatt</h1>
                <div className="chatBox">
                    <Messages timestamp={timestamp} username={username} messages={messages} />
                    <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} setTimeStamp={setTimeStamp} />
                </div>
            </main>
        )
    } else {
        return (
            <main>
                <h1>Chatt</h1>
                <form onSubmit={join}>
                    <label htmlFor="username">Användarnamn</label>
                    <input name="username" value={username} type="text" onChange={(event) => setUserName(event.target.value)} required />
                    <button type="submit">Börja chatta</button>
                </form>
            </main>
        );
    }
}

export default Chat;
