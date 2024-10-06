import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "../../provider/loginProvider";
import { AppConfig } from "../../config/config";
const { ipcRenderer } = window.require("electron");

const ChatPage = ()=> {
  const navigator = useNavigate();
  const location = useLocation();
  const { userInfo } = useContext(UserContext);
  const socket = io(AppConfig.serverAddress + "/chat");


  const [connection , setConnection] = useState({
      socket : false,
      room : false,
  })
  const [userList, setUserList] = useState([]);
  const [message , setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomInfo, setRoomInfo] = useState("");

  const [sqlMessage, setSqlMessage ] = useState(null);
  const [prevMessages , setPrevMessages] = useState([]);


  /**sql object prototype */
  let messageProto = {
    roomId : "",
    userId : null,
    userName : null,
    content : null,
    type : null,
  };

  
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
    };
  },[])


  /**join room */
  useEffect(()=>{
    if(roomInfo){
      
      /**set sql message object protoType */
      messageProto.roomId = roomInfo._id;
      setSqlMessage(messageProto);

      /**get previos messages  */
      ipcRenderer.send("selectMessages", roomInfo._id);
      ipcRenderer.on("selectMessage-reply",(e, messages)=>{
        setPrevMessages(messages);

      })


      socket.emit("cli_roomConnet",roomInfo);
      socket.on("ser_roomJoin", (roomConnection)=>{
        if(roomConnection){
          setConnection(prev => ({ ...prev, room: true }));
        }
      })

    // //socket custom - send message
    socket.on("ser_sendMessage", (messageInfo)=>{
      setMessages(prev => [...prev, messageInfo]);

      setSqlMessage((prev)=> ({...prev, 
        userId : messageInfo.userInfo.userId,
        userName : messageInfo.userInfo.userName,
        content :  messageInfo.content,
        type : messageInfo.type }));

 
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
        socket.emit("cli_sendMessage", {content : message, userInfo : userInfo});
        setMessage("");
    }
  } 


  
  /** message db insert  */
  useEffect(()=>{
    if(sqlMessage && sqlMessage.userId){
      ipcRenderer.send("saveMessage", sqlMessage);
      ipcRenderer.on("saveMessage-reply",(e, res)=>{
        if(res){
          console.log("저장완료");
        }else{
          console.log("저장실패");
        }
      })
    }
  },[sqlMessage])


  return (
    <div>
      <h1>채팅방 : {roomInfo._id}</h1>
      <h5>유저 : {userInfo.userName}</h5>
      <h3>{connection.socket ? <p>서버 연결됨</p> : <p>서버 연결이 끊어짐</p>}</h3>
      <h3>{connection.room ? <p>room 연결됨</p> : <p>room 연결이 끊어짐</p>}</h3>

      <ul>
      {prevMessages.map((msg, index) => (
          <div key={'prev_div'+index}>
            <li key={'prev_user'+index}>{msg.userName} : {msg.timestamp}</li>
            <li key={'prev_msg'+index}>{msg.content}</li>
          </div>
        ))}
      </ul>

      <ul>
        {messages.map((msg, index) => (
          <div key={'div'+index}>
            <li key={'user'+index}>{msg.userInfo.userName} : {msg.sendDate}</li>
            <li key={'msg'+index}>{msg.content}</li>
          </div>
        ))}
      </ul>


      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatPage;