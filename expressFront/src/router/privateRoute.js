import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../provider/loginProvider";

const PrivateRoute = () => {
  const { isLogin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLogin === true || isLogin === false) {
      setIsLoading(false);
    }
  }, [isLogin]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
