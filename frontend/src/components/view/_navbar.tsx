import React from "react";
import "./Navbar.css"; // Assuming you will create a separate CSS file for styling

const Navbar: React.FC = () => {
  return (
    <nav>
      <a href="/" className="menu_left">
        <img
          src="BK-logo.jpg"
          alt="Logo"
          className="logo"
          style={{ height: "50px" }}
        />
      </a>
      <a href="/signin" className="menu_right flex ml-auto pr-10 text-black">
        Đăng nhập
      </a>
    

      <div></div>
    </nav>
  );
};

export default Navbar;
