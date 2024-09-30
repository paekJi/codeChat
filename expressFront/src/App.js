import React from "react";
import {Route, Routes } from "react-router-dom";
import ChatPage from "./component/chatting/ChatPage";
import Home from "./Home";
import NotFoundPage from "./NotFountPage";
import UserLogin from "./component/user/userLogin";
import UserSignIn from "./component/user/userSignIn";
import PrivateRoute from "./router/privateRoute";
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signIn" element={<UserSignIn />} />
        <Route path="*" element={<NotFoundPage />} />


        <Route element={<PrivateRoute />}>
          {/** chat */}
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
