import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../provider/loginProvider";

const PrivateRoute = () => {
  const { isLogin, userId, loading } = useContext(UserContext);

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
