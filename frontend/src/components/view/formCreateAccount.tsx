import React, { useRef, useState } from "react";
import "./form.css";

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
    const formData = new FormData();
    formData.append("empName", name);
    formData.append("empAddress", address);
    formData.append("empAccount", account);
    formData.append("empPassword", password);
    formData.append("empPhoneNo", phoneNo);
    formData.append("empWorkingType", workingType);
    formData.append("empJobType", jobType);
    formData.append("empCredential", credential);

    // Gửi thông tin đến backend (Node.js)
    fetch("/api/employees", {
      method: "POST",
      body: formData,
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
          <input type="number" name="phoneNo" ref={phoneNoRef} required />
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
            <option value="Dược sĩ">Dược sĩ</option>
            <option value="Quản kho">Quản kho</option>
            <option value="Quản hàng">Quản hàng</option>
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

        <button className="form_button" type="submit">
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
