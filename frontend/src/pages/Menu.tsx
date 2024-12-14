import React, { useMemo } from "react";
import "./Menu.css"; // Assuming you will create a separate CSS file for styling
import useAuth from "../hooks/useRole";
import { IoMenuSharp } from "react-icons/io5";
import useUserStore from "../current_data/user";
import useBatchStore from "../current_data/batch";
import useorderStore from "../current_data/order";
import { useNavigate } from "react-router-dom";
const Menu: React.FC = () => {
  const { info,logout } = useUserStore();
  const {logoutBatches}=useBatchStore()
  const{logoutOrders}=useorderStore();
  const role = info.jobType;
  const navigate = useNavigate();

  const dropdownContent = useMemo(() => {
    if (!info) return null;

    if (role === "admin") {
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
          <a href="/homepage/CreateAccount" className="menu_left">
            Tạo Tài Khoản Nhân viên
          </a>
          <a href="#">Hồ sơ</a>

          <a href="/">Thoát</a>
        </>
      );
    }

    if (role === "product manager") {
      return (
        <>
          <a href="/homepage/CreateProducts" className="menu_left">
            Thêm Sản Phẩm
          </a>
          <a href="#">Hồ sơ</a>

          <a href="/">Thoát</a>
        </>
      );
    }

    if (role === "inventory manager") {
      return (
        <>
          <a href="/homepage/CreateBatches" className="menu_left">
            Nhập Kho
          </a>

          <a href="#">Hồ sơ</a>

          <a href="/">Thoát</a>
        </>
      );
    }

    if (role === "pharmacist") {
      return (
        <>
          <a href="/homepage/CreateOrders" className="menu_left">
            Tạo Đơn Hàng
          </a>

          <a href="#">Hồ sơ</a>

          <a href="/">Thoát</a>
          <span
            className="font-semibold pt--1 pl-2 cursor-pointer"
            onClick={()=>(logout(), logoutBatches(), logoutOrders(), navigate("/"))}
          >
            Đăng xuất
          </span>
        </>
      );
    }

    return null; // No dropdown for other roles
  }, [info]); // Only recalculate if the user role changes
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
      {role === "admin" && (
        <>
          <a href="/homepage/ShowAllOrders" className="menu_left">
            Đơn Hàng
          </a>
        </>
      )}

      {role === "pharmacist" && (
        <>
          <a href="/homepage/ShowOrder" className="menu_left">
            Đơn Hàng
          </a>
        </>
      )}

      {(role === "admin" || role === "inventory manager") && (
        <>
          <a href="/homepage/ShowBatches" className="menu_left">
            Kho
          </a>
        </>
      )}

      {role === "admin" && (
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
