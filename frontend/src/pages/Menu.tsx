import React, { useMemo } from "react";
import "./Menu.css"; // Assuming you will create a separate CSS file for styling
import useAuth from "../hooks/useRole";
import { IoMenuSharp } from "react-icons/io5";
const Menu: React.FC = () => {
  const { user } = useAuth();
  const role = user.role;

  const dropdownContent = useMemo(() => {
    if (!user) return null;

    if (user.role === "admin") {
      return (
        <>
          <a href="/homepage/CreateOrders" className="menu_left">
            Tạo Đơn Hàng
          </a>
          <a href="/homepage/CreateProducts" className="menu_left">
            Thêm Sản Phẩm
          </a>
          <a href="/homepage/CreateBatches" className="menu_left">
            Nhập Kho
          </a>
          <a href="/homepage/ShowAccount" className="menu_left">
            Tạo Tài Khoản Nhân viên
          </a>
          <a href="#">Hồ sơ</a>

          <a href="/homePage/home2">Thoát</a>
        </>
      );
    }

    if (user.role === "productManager") {
      return (
        <>
          <a href="/homepage/CreateProducts" className="menu_left">
            Thêm Sản Phẩm
          </a>
          <a href="#">Hồ sơ</a>

          <a href="/homePage/home2">Thoát</a>
        </>
      );
    }

    if (user.role === "batchManager") {
      return (
        <>
          <a href="/homepage/CreateBatches" className="menu_left">
            Nhập Kho
          </a>

          <a href="#">Hồ sơ</a>

          <a href="/homePage/home2">Thoát</a>
        </>
      );
    }

    if (user.role === "pharmacist") {
      return (
        <>
          <a href="/homepage/CreateOrders" className="menu_left">
            Tạo Đơn Hàng
          </a>

          <a href="#">Hồ sơ</a>

          <a href="/homePage/home2">Thoát</a>
        </>
      );
    }

    return null; // No dropdown for other roles
  }, [user]); // Only recalculate if the user role changes
  return (
    <nav>
      <a href="#" className="menu_left">
        <img
          src="/BK-logo.jpg"
          alt="Logo"
          className="logo"
          style={{ height: "50px" }}
        />
      </a>
      <a href="/homepage" className="menu_left">
        Trang chủ
      </a>
      <a href="/homepage/ShowProducts" className="menu_left">
        Sản phẩm
      </a>
      {user?.role === "admin" && (
        <>
          <a href="/homepage/ShowAllOrders" className="menu_left">
            Đơn Hàng
          </a>
        </>
      )}

      {user?.role === "pharmacist" && (
        <>
          <a href="/homepage/ShowOrder" className="menu_left">
            Đơn Hàng
          </a>
        </>
      )}

      {(user?.role === "admin" || user?.role === "batchManager") && (
        <>
          <a href="/homepage/ShowBatches" className="menu_left">
            Kho
          </a>
        </>
      )}

      {user?.role === "admin" && (
        <>
          <a href="/homepage/ShowAccount" className="menu_left">
            Nhân viên
          </a>
        </>
      )}
      <div className="menu_right dropdown">
        <button className="dropbtn mt-5 mr-25">
          <span className="caret">
          <IoMenuSharp size={25} />
          </span>
        </button>

        <div className="dropdown-content">{dropdownContent}</div>
      </div>

      {role === "admin" && (
        <>
          <div className="menu_right dropdown ">
            <button className="dropbtn">
              <span className="caret"></span>
            </button>

            <div className="dropdown-content">
              <a href="/homepage/CreateOrders" className="menu_left">
                Tạo Đơn Hàng
              </a>
              <a href="/homepage/CreateProducts" className="menu_left">
                Thêm Sản Phẩm
              </a>
              <a href="/homepage/CreateBatches" className="menu_left">
                Nhập Kho
              </a>
              <a href="/homepage/ShowAccount" className="menu_left">
                Tạo Tài Khoản Nhân viên
              </a>

              <a href="#">Hồ sơ</a>

              <a href="/homePage/home2">Thoát</a>
            </div>
          </div>
        </>
      )}

      {role === "pharmacist" && (
        <>
          <div className="menu_right dropdown">
            <button className="dropbtn">
              <span className="caret"></span>
            </button>

            <div className="dropdown-content">
              {/* <a href="#">Điểm</a> */}

              <a href="/homepage/CreateOrders" className="menu_left">
                Tạo Đơn Hàng
              </a>

              <a href="#">Hồ sơ</a>

              <a href="/homePage/home2">Thoát</a>
            </div>
          </div>
        </>
      )}

      {role === "productManager" && (
        <>
          <div className="menu_right dropdown">
            <button className="dropbtn">
              <span className="caret"></span>
            </button>

            <div className="dropdown-content">
              {/* <a href="#">Điểm</a> */}

              <a href="/homepage/CreateProducts" className="menu_left">
                Thêm Sản Phẩm
              </a>

              <a href="#">Hồ sơ</a>

              <a href="/homePage/home2">Thoát</a>
            </div>
          </div>
        </>
      )}

      {role === "batchManager" && (
        <>
          <div className="menu_right dropdown">
            <button className="dropbtn">
              <span className="caret"></span>
            </button>

            <div className="dropdown-content">
              {/* <a href="#">Điểm</a> */}

              <a href="/homepage/CreateBatches" className="menu_left">
                Nhập Kho
              </a>

              <a href="#">Hồ sơ</a>

              <a href="/homePage/home2">Thoát</a>
            </div>
          </div>
        </>
      )}

      <div></div>
    </nav>
  );
};

export default Menu;
