import React from 'react';
import './Navbar.css'; // Assuming you will create a separate CSS file for styling

const Navbar: React.FC = () => {
  return (
    <nav>
      <a href="/" className="menu_left">
        <img
          src="BK-logo.jpg"
          alt="Logo"
          className="logo"
          style={{ height: '50px' }}
        />
      </a>
      <a href="/" className="menu_left">
        Trang chủ
      </a>
      <a href="/homepage/showproducts" className="menu_left">
        Sản phẩm
      </a>
      <div className="menu_right dropdown">
        <button className="dropbtn">
          <span className="caret">▼</span>
        </button>

        <div className="dropdown-content">
          <a href="#">Hồ sơ</a>
          {/* <a href="#">Điểm</a> */}
          <a href="#">Lịch</a>
          <a href="#">Tập tin riêng tư</a>
          <a href="#">Báo cáo</a>
          <a href="#">Tùy chọn</a>
          <div className="submenu">
            <a href="#">Ngôn ngữ</a>
            <div className="submenu-content">
              <a href="#">Tiếng Việt</a>
              <a href="#">English</a>
            </div>
          </div>
          <a href="/homePage/home2">Thoát</a>
        </div>
      </div>

      <div>

      </div>
    </nav>
  );
};

export default Navbar;