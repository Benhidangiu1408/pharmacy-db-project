import React, { useEffect, useRef, useState } from "react";
import "./form.css";
// import "../components/view/form.css";
// import ".../components/view/form.css"
import { useEmployees } from "../../hooks/useEmployees";
import { Employee } from "../../entities/Employee";

import { useLocation } from "react-router-dom";
import { noop } from "framer-motion";

import useUserStore from "../../current_data/user";
import { Input } from "@chakra-ui/react";

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

  const [employeeData, setEmployeeData] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const nameRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy giá trị từ các ref
    const newPass = nameRef.current?.value || "";

    const newProduct = {
      newPass,
    };
    fetch(`/api/v2/updateDetailedPass/${2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessageType("success");
        setMessage("Password changed successfully!");
      })
      .catch((error) => {
        setMessageType("error");
        setMessage("Fail to change Password.");
      });
  };
  // const { data, isLoading, error } = useEmployees();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true); // Set loading state to true
      setError(null); // Reset error state

      try {
        // Call the backend API
        const response = await fetch(`/api/v2/showDetailedEmployee/${2}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch employee data");
        }

        // Parse and set the employee data
        const data = await response.json();
        console.log(data[0]);
        setEmployeeData(data[0]);
      } catch (error) {
        setError(error.message); // Set error state
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEmployeeData();
  }, [info.id]); // Dependency array: triggers when employeeId changes

  // Render loading, error, or employee data
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {employeeData.map((employee) => (
          <>
            <div>
              <label>Họ và tên:</label>
              <p>{employee.Name}</p>
            </div>

            <div>
              <label>Địa chỉ:</label>
              <p>{employee.Address}</p>
            </div>

            <div>
              <label>Tài khoản:</label>
              <p>{employee.Account}</p>
            </div>

            <div>
              <label>Mật khẩu:</label>
              {/* <p>{employee.Password}</p> */}
              <input
                type="text"
                name="name"
                ref={nameRef}
                placeholder={employee.Password}
                style={{
                  color: "gray", // Placeholder color
                }}
                onFocus={(e) => (e.target.style.color = "black")}
              />
            </div>

            <div>
              <label>Số điện thoại:</label>
              <p>{employee.Phone_no}</p>
            </div>

            <div>
              <label>Loại công việc:</label>
              {/* <select name="workingType" ref={workingTypeRef} required>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select> */}
              <p>{employee.WorkingType}</p>
            </div>
            <div>
              <label>Vị trí công việc:</label>
              {/* <select name="jobType" ref={jobTypeRef} required>
            <option value="Dược sĩ">Dược sĩ</option>
            <option value="Quản kho">Quản kho</option>
            <option value="Quản hàng">Quản hàng</option>
          </select> */}
              <p>{employee.JobType}</p>
            </div>
            <div>
              <label>Chứng chỉ:</label>
              <p>{employee.Credentials}</p>
            </div>

            {/* Thông báo */}
            {message && (
              <div className={`form-message ${messageType}`}>
                <p>{message}</p>
              </div>
            )}
          </>
        ))}

        <button
          className="form_button bg-emerald-400 borderborder-black w-[80px] h-[40px]"
          type="submit"
        >
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default AccountDetail;
