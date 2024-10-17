import React from "react";
import { Link, Outlet } from "react-router-dom";
const LeftNavi = () => {

return (
    <nav>
    <div className="navigator">
        <div className="navi-logo"></div>
        <div className="setting-navi">
            <Link to="/friend/manage">친구 관리</Link>
        </div>
    </div>
    <Outlet />
</nav>
);

}


export default LeftNavi;