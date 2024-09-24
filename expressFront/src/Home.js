import React from "react";
import { Link } from "react-router-dom";
import ChatPage from "./chatting/ChatPage";

const Home = () =>{
    
    return(

        <div>
            <p>메인 페이지 입니다.</p>
            <nav>
                <Link to="/makeNick">채팅창하러 가기</Link>
            </nav>
        </div>
    )


}

export default Home;