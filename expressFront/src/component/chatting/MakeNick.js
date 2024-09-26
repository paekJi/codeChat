import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const MakeNick = () => {
  const [nickName, setNickName] = useState("");
  const navigator = useNavigate();

  const enterChat = () => {
    if (nickName.length <= 0) {
      window.confirm("check nickName");
      return;
    } else {
      navigator("/chat", { state: { nickName: nickName }});
    }
  };

  return (
    <div>
      <form onClick={enterChat}>
        <input
          type="text"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="닉네임을 입력해주세요"
        />
        <button type="submit">채팅하러 가기</button>
      </form>
    </div>
  );
};

export default MakeNick;
