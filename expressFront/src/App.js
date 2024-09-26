import React from "react";
import {Route, Routes } from "react-router-dom";
import ChatPage from "./component/chatting/ChatPage";
import Home from "./Home";
import NotFoundPage from "./NotFountPage";
import UserLogin from "./component/user/userLogin";
import UserSignIn from "./component/user/userSignIn";
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        {/** user */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signIn" element={<UserSignIn />} />

        {/** chat */}
        <Route path="/chat" element={<ChatPage />} />

        {/** error redirect */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
