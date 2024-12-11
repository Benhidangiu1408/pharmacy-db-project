import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./pages/Menu";

const Layout = () => {
  return (
    <div className="w-full">
      <Menu/>
      <div id="main">
        <Outlet />
        {/* children show ơ cho outlet */}
      </div>
    </div> 
  );
};

export default Layout;
