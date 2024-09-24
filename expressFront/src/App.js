import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ChatPage from "./chatting/ChatPage";
import NotFoundPage from "../public/NotFountPage";
import Home from "./Home";
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/makeNick" element />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
