import axios from "axios";
import React, { useEffect, useState } from "react";
import { AppConfig } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatRoomList = () => {

    const userId = useSelector((state)=> state.user.userId);
    const navigator = useNavigate();

    const [roomList, setRoomList] = useState([]);
    const [chatInfo, setChatInfo] = useState({
        name : "",
        comment : "",
        host : userId,
        constraint : "",
        password : ""
    });

    /**call roomList */
    useEffect(()=>{
        const getRoomList = async()=>{
            const response =  await axios.get(AppConfig.serverAddress + "/api/chat/roomList");
            if(response.data){ 
                setRoomList(response.data.roomList);
            }
        }
        getRoomList();
    },[])
    
    /** submit new Room */
    const addNewRoom =  async (e) => {
        e.preventDefault();
        const response = await axios.post(AppConfig.serverAddress + "/api/chat/addRoom", chatInfo, {
            headers: {
              "Content-Type": "application/json",
            },
          });
    }

    /** chat infomation change process */
    const chatInfoChange = (e) => {
        const { name, value } = e.target;
         setChatInfo({
        ...chatInfo,
        [name]: value,
        });
    };

    /** room entry proccess */
    const enterRoom = (e) => {
        const roomId = e.target.getAttribute("data-id");
        const selectedRoom = roomList.find((room) => room._id === roomId);
        navigator("/chat", {
            state : selectedRoom
        });
    }

    return(
        <div>
            <h3>채팅방 목록</h3>
                <ul>
                    {roomList.map((room, idx) => (
                        <li key={idx}>{room.name}<button data-id={room._id} onClick={enterRoom}>입장하기</button></li>    
                    ))}
                </ul>
                <form onSubmit={addNewRoom}>
                    <p>채팅방 새로 만들기</p>
                    <input type="text" name="name" placeholder="채팅방명" onChange={chatInfoChange} />
                    <input type="text" name="comment"  value="채팅방 설명" onChange={chatInfoChange}/>
                    
                    <p>제한 여부</p>
                    <input type="radio" onClick={chatInfoChange}  name="constraint" value="true" />제한방
                    <input type="radio" onClick={chatInfoChange} name="constraint" value="false" />제한없는 방
                    {chatInfo.constraint == 'true' ? ( <input type="password" name="password" placeholder="비밀번호" onChange={chatInfoChange} />) : null}
                    <button type="submit">방 만들기</button>
                </form>
        </div>
    )

}

export default ChatRoomList;