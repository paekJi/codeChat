import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";



const ChatPage = ()=> {
  const [roomList, setRoomList] = useState([]);
   const [userList, setUserList] = useState([]);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  const[serverMsg, setServerMsg] = useState("");

  const location = useLocation();
  // const nickName = location.state.nickName!== ? "" :"";

  //socket connected 
  // const socket = io("http://localhost:3000", { query: { nickName: nickName } }); 
  const socket = io("http://localhost:3000");

  useEffect(()=>{

    //socket connection verify  - not custom, basic event 
    socket.on("connect", ()=>{
      console.log(socket.id);
    });


    //sev
    socket.emit("client-event", "client message");
    socket.on("server-event", (msg)=>{
      setServerMsg(msg);

    })
  

  },[])

  /*
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("user list", (usersList) => {
      setUserList(usersList);
    });


    //listener clean up 
    return () => {
      socket.off("chat message");
      socket.off("user list");
    };
  }, []); */

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      // socket.emit("chat message", message);
      // socket.emit("user list", nickName);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <h2>test :: {serverMsg} </h2>
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