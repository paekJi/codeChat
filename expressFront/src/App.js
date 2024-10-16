import React from "react";
import {Route, Routes } from "react-router-dom";
import ChatPage from "./component/chatting/ChatPage";
import Home from "./Home";
import NotFoundPage from "./NotFountPage";
import UserLogin from "./component/user/userLogin";
import UserSignIn from "./component/user/userSignIn";
import PrivateRoute from "./router/privateRoute";
import ChatRoomList from "./component/chatting/chatRoomList";
import UserProvider from "./provider/loginProvider";
import LeftNavi from "./component/common/leftNavi";
import FriendList from "./component/user/friendList";


function App() {
  return (
    <div>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route element={<LeftNavi/>}>
              {/** chat */}
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chatRoomList" element={<ChatRoomList/>}/>
              <Route path="/friend/manage" element={<FriendList/>}/>
            </Route>
          </Route>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signIn" element={<UserSignIn />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
