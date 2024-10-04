import axios from "axios";
//`import { setUser as setUserAction } from "../slice/userSlice"; // 액션을 직접 가져옵니다.
import { AppConfig } from "../../config/config";
import { userReducer } from "../slice/userSlice";

// login - set userInfo
const setUser = (loginInfo) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(AppConfig.serverAddress + "/api/login", loginInfo, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            dispatch(userReducer.setUser(response.data.message)); 
        } catch (error) {
          
        }
    };
}


//logout - clean userInfo 
const cleanUser = () => {
    dispatch(userReducer.clearUser());
}


export const userAction = {
    setUser,
    cleanUser
}
