import React, { useRef, useState } from "react";
import "./form.css";
// import "../components/view/form.css";
// import ".../components/view/form.css"
import { useEmployees } from "../../hooks/useEmployees";
import { Employee } from "../../entities/Employee";

import { useLocation } from "react-router-dom";
import { noop } from "framer-motion";

import useUserStore from "../../current_data/user";

const AccountDetail = () => {
  const { info } = useUserStore();
  const emId = info.id;
  const emName = info.name;
  const emAddress = info.address;
  const emAccount = info.account;
  const emPassword = info.password;
  const emPhone_no = info.phone_no;
  const emWorking_type = info.working_type;
  const emJobType = info.jobType;

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // success hoặc error

  const location = useLocation();
  const { data, isLoading, error } = useEmployees();

  // const product = data ? data.employees : [];
  // Hàm để gửi dữ liệu đến backend
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Lấy giá trị từ các ref
  //   const name = nameRef.current?.value || "";
  //   const address = addressRef.current?.value || "";
  //   const account = accountRef.current?.value || "";
  //   const password = passwordRef.current?.value || "";
  //   const phoneNo = phoneNoRef.current?.value || "";
  //   const workingType = workingTypeRef.current?.value || "";
  //   const jobType = jobTypeRef.current?.value || "";
  //   const credential = credentialRef.current?.value || "";

  //   if (!name || !address || !account || !password || !phoneNo) {
  //     setMessageType("error");
  //     setMessage("Vui lòng điền đầy đủ thông tin.");
  //     return;
  //   }

  //   // Tạo form data để gửi file ảnh
  //   const formData = new FormData();
  //   formData.append("empName", name);
  //   formData.append("empAddress", address);
  //   formData.append("empAccount", account);
  //   formData.append("empPassword", password);
  //   formData.append("empPhoneNo", phoneNo);
  //   formData.append("empWorkingType", workingType);
  //   formData.append("empJobType", jobType);
  //   formData.append("empCredential", credential);

  //   // Gửi thông tin đến backend (Node.js)
  //   // fetch("/api/employees", {
  //   //   method: "POST",
  //   //   body: formData,
  //   // })
  //   //   .then((response) => {
  //   //     if (!response.ok) throw new Error("Failed to add employee.");
  //   //     return response.json();
  //   //   })
  //   //   .then((data) => {
  //   //     setMessageType("success");
  //   //     setMessage("Employee added successfully!");
  //   //   })
  //   //   .catch((error) => {
  //   //     setMessageType("error");
  //   //     setMessage("Failed to add employee.");
  //   //   });
  // };

  return (
    <div className="content-container">
      <h1>THÔNG TIN NHÂN VIÊN</h1>
      <form onSubmit={noop} encType="multipart/form-data">
        <div>
          <label>Họ và tên:</label>
          <p>{emName}</p>
        </div>
        <div>
          <label>ID:</label>
          <p>{emId}</p>
        </div>
        <div>
          <label>Địa chỉ:</label>
          <p>{emAddress}</p>
        </div>
        <div>
          <label>Tài khoản:</label>
          <p>{emAccount}</p>
        </div>
        <div>
          <label>Mật khẩu:</label>
          <p>{emPassword}</p>
        </div>
        <div>
          <label>Số điện thoại:</label>
          <p>{emPhone_no}</p>
        </div>
        <div>
          <label>Loại công việc:</label>
          {/* <select name="workingType" ref={workingTypeRef} required>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select> */}
          <p>{emWorking_type}</p>
        </div>
        <div>
          <label>Vị trí công việc:</label>
          {/* <select name="jobType" ref={jobTypeRef} required>
            <option value="Dược sĩ">Dược sĩ</option>
            <option value="Quản kho">Quản kho</option>
            <option value="Quản hàng">Quản hàng</option>
          </select> */}
          <p>{emJobType}</p>
        </div>
        <div>
          <label>Chứng chỉ:</label>
          <p>{}</p>
        </div>

        {/* Thông báo */}
        {message && (
          <div className={`form-message ${messageType}`}>
            <p>{message}</p>
          </div>
        )}

        {/* <button
          className="form_button bg-emerald-400 borderborder-black w-[80px] h-[40px]"
          type="submit"
        >
          Xác nhận
        </button> */}
      </form>
    </div>
  );
};

export default AccountDetail;
