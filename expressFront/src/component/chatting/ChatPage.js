import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "../../provider/loginProvider";


const ChatPage = ()=> {
  const navigator = useNavigate();
  const location = useLocation();
  const userId = useContext(UserContext).userId;

  const [socketConnect, setSocketConnect] = useState(false);
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [serverMsg, setServerMsg] = useState("");
  const [roomInfo, setRoomInfo] = useState("");

  //socket nameSpace connected 
  const socket = io("http://localhost:3000/chat");
  /** basic connection */
  useEffect(()=>{
    if(!location || !location.state){
      navigator("/");
    }else{
      setRoomInfo(location.state);

    }

    //socket connection verify  - not custom, basic event 
    socket.on("connect", ()=>{
      setSocketConnect(true);
    });

    socket.emit("cli_roomConnet",roomInfo);


    /*
    //sev
    socket.emit("client-event", "client message");
    socket.on("server-event", (msg)=>{
      setServerMsg(msg);

    }) */
  

  },[])


  /**join room */
  useEffect(()=>{



  })  



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
      <h1>채팅방 : {roomInfo.name}</h1>
      <h3>{setSocketConnect ? <p>서버 연결됨</p> : <p>서버 연결이 끊어짐</p>}</h3>
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