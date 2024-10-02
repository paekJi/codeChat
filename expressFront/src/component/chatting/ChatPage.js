import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "../../provider/loginProvider";


const ChatPage = ()=> {
  const navigator = useNavigate();
  const location = useLocation();
  const userId = useContext(UserContext).userId;

  const [connection , setConnection] = useState({
      socket : false,
      room : false,
  })
  const [userList, setUserList] = useState([]);
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [serverMsg, setServerMsg] = useState("");
  const [roomInfo, setRoomInfo] = useState("");

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
      setConnection(prev => ({ ...prev, socket: true }));
    });

    // clean up
    return () => {
      socket.off("connect");
      socket.off("chat message");
    };
  },[])


  /**join room */
  useEffect(()=>{
    if(roomInfo){
      socket.emit("cli_roomConnet",roomInfo);
      socket.on("ser_roomJoin", (roomConnection)=>{
        if(roomConnection){
          setConnection(prev => ({ ...prev, room: true }));
        }
      })

    // //socket custom - send message
    socket.on("ser_sendMessage", (messageInfo)=>{
      setMessages(prev => [...prev, messageInfo]);
    })

    //clean up
    return () => {
      socket.off("ser_roomJoin");
      socket.off("ser_sendMessage");
    };
    }

  },[roomInfo]);  


  /** send message */
  const sendMessage = (e)=> {
    if (message) {
        socket.emit("cli_sendMessage", {message : message, userId : userId});
        setMessage("");
    }
  } 


  return (
    <div>
      <h1>채팅방 : {roomInfo._id}</h1>
      <h5>유저 : {userId}</h5>
      <h3>{connection.socket ? <p>서버 연결됨</p> : <p>서버 연결이 끊어짐</p>}</h3>
      <h3>{connection.room ? <p>room 연결됨</p> : <p>room 연결이 끊어짐</p>}</h3>
      <h2>test :: {serverMsg} </h2>
      <ul>
        {messages.map((msg, index) => (
          <div key={'div'+index}>
            <li key={'user'+index}>{msg.userId} : {msg.sendDate}</li>
            <li key={'msg'+index}>{msg.message}</li>
          </div>
        ))}
      </ul>


      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatPage;