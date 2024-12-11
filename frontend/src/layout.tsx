import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./pages/Menu";

const Layout = () => {
  return (
    <>
      <Menu/>
      <div id="main">
        <Outlet />
        {/* children show ơ cho outlet */}
      </div>
    </> 
  );
};

export default Layout;
