import React from "react";
import { Link } from "react-router-dom";

const Home = () =>{
    return(
        <div>
            <p>메인 페이지 입니다.</p>
            <nav>
                <Link to="/login">로그인</Link>
                <Link to="/signIn">회원가입</Link>
            </nav>
        </div>
    )
}


export default Home;