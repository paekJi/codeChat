import { useState } from "react";
import axios from "axios";

const UserLogin = () => {

    const [loginInfo, setLoginInfo] = useState({
      userId : "",
      password : ""
      
    });

    const loginProcess = async () => {
      if (loginInfo.userId && loginInfo.password) {
        const response = await axios.post("http://localhost:5000/login", loginInfo, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("response");
      }
    };

    const loginChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({
          ...loginInfo,
          [name]: value,
        });
    }

    

return (
  <div>
    <p>Login Page</p>
    <form onSubmit={loginProcess}>
      <input type="text" name="userId" placeholder="enter your name" onChange={loginChange} />
      <input type="password" name="password" onChange={loginChange} />
      <button type="submit">login</button>
    </form>
  </div>
);

}


export default UserLogin;