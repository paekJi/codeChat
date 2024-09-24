import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";



const ChatPage = ()=> {
  const [roomList, setRoomList] = useState([]);
   const [userList, setUserList] = useState([]);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();
  const nickName = location.state.nickName;

  //socket connected 
  const socket = io("http://localhost:3000", { query: { nickName: nickName } }); 


  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("user list", (users) => {
      setUserList(users);
    });


    //listener clean up 
    return () => {
      socket.off("chat message");
      socket.off("user list");
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat {nickName}</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;