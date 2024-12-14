import React, { useRef, useState } from "react";
import "./form.css";
import { useLocation } from "react-router-dom";

const EmployeeForm = () => {
  // Tạo các ref cho các input
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneNoRef = useRef<HTMLInputElement>(null);
  const workingTypeRef = useRef<HTMLSelectElement>(null);
  const jobTypeRef = useRef<HTMLSelectElement>(null);
  const credentialRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // success hoặc error

  // Hàm để gửi dữ liệu đến backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy giá trị từ các ref
    const name = nameRef.current?.value || "";
    const address = addressRef.current?.value || "";
    const account = accountRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const phoneNo = phoneNoRef.current?.value || "";
    const workingType = workingTypeRef.current?.value || "";
    const jobType = jobTypeRef.current?.value || "";
    const credential = credentialRef.current?.value || "";

    if (!name || !address || !account || !password || !phoneNo) {
      setMessageType("error");
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Tạo form data để gửi file ảnh
    const formData = {};
    formData["name"]= name;
    formData["address"]= address;
    formData["account"]= account;
    formData["password" ]=password;
    formData["phone_no"]= phoneNo;
    formData["working_type"]= workingType;
    formData["job_type"]= jobType;
    formData["credential"]= credential;
    
    // formData.append("empName", name);
    // formData.append("empAddress", address);
    // formData.append("empAccount", account);
    // formData.append("empPassword", password);
    // formData.append("empPhoneNo", phoneNo);
    // formData.append("empWorkingType", workingType);
    // formData.append("empJobType", jobType);
    // formData.append("empCredential", credential);

    const send = {
      ...formData,
    };
    console.log(JSON.stringify(send));
    // Gửi thông tin đến backend (Node.js)
    fetch("http://localhost:8080/api/v1/insertEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add employee.");
        return response.json();
      })
      .then((data) => {
        setMessageType("success");
        setMessage("Employee added successfully!");
      })
      .catch((error) => {
        setMessageType("error");
        setMessage("Failed to add employee.");
      });
  };

  return (
    <div className="content-container">
      <h1>NHẬP THÔNG TIN NHÂN VIÊN</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Họ và tên:</label>
          <input type="text" name="name" ref={nameRef} required />
        </div>
        <div>
          <label>Địa chỉ:</label>
          <input type="text" name="address" ref={addressRef} required />
        </div>
        <div>
          <label>Tài khoản:</label>
          <input type="text" name="account" ref={accountRef} required />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" name="password" ref={passwordRef} required />
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input type="text" name="phoneNo" ref={phoneNoRef} required />
        </div>
        <div>
          <label>Loại công việc:</label>
          <select name="workingType" ref={workingTypeRef} required>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <div>
          <label>Vị trí công việc:</label>
          <select name="jobType" ref={jobTypeRef} required>
            <option value="pharmacist">Dược sĩ</option>
            <option value="inventory manager">Quản kho</option>
            <option value="product manager">Quản hàng</option>
          </select>
        </div>
        <div>
          <label>Chứng chỉ:</label>
          <input type="text" name="credential" ref={credentialRef} />
        </div>

        {/* Thông báo */}
        {message && (
          <div className={`form-message ${messageType}`}>
            <p>{message}</p>
          </div>
        )}

        <button className="form_button bg-emerald-400 borderborder-black w-[80px] h-[40px]" type="submit">
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
