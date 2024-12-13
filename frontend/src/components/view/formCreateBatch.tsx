import React, { useRef, useState } from "react";
import "./form.css";

const BatchForm = () => {
  // Tạo các ref cho các input
  const IDRef = useRef<HTMLSelectElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const expiryDateRef = useRef<HTMLInputElement>(null);
  const manufacturingDateRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("success"); // success hoặc error

  // Hàm để gửi dữ liệu đến backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy giá trị từ các ref
    // const name = nameRef.current?.value || "";
    const quantity = quantityRef.current?.value || "1";
    const type = typeRef.current?.value || "Medicine";
    const expiryDate = expiryDateRef.current?.value || "";
    const manufacturingDate = manufacturingDateRef.current?.value || "";

    if (parseInt(quantity, 10) < 1) {
      setMessage("Số lượng phải lớn hơn hoặc bằng 1.");
      return; // Không gửi form nếu quantity không hợp lệ
    }

    const today = new Date();
    const manufacturingDateObj = new Date(manufacturingDate);
    if (manufacturingDateObj >= today) {
      setMessage("Ngày sản xuất phải trước ngày hôm nay.");
      return; // Không gửi form nếu manufacturingDate không hợp lệ
    }

    const newProduct = {
      // name,
      quantity: parseInt(quantity, 10),
      type,
      expiryDate,
      manufacturingDate,
      dateAdded: new Date().toISOString(), // Lấy ngày hiện tại làm ngày nhập
      id: Math.floor(Math.random() * 1000000), // ID ngẫu nhiên
    };

    // Gửi thông tin đến backend (Node.js)
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessageType("success");
        setMessage("Product added successfully!");
      })
      .catch((error) => {
        setMessageType("error");
        setMessage("Failed to add product.");
      });
  };

  return (
    <div className="content-container">
      <h1>NHẬP THÔNG TIN SẢN PHẨM</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID sản phẩm:</label>
          <select name="name" ref={IDRef} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label>Số lượng:</label>
          <input type="number" name="quantity" ref={quantityRef} required />
        </div>
        <div>
          <label>Loại:</label>
          <select name="type" ref={typeRef} required>
            <option value="Thuốc">Thuốc</option>
            <option value="Thực phẩm chức năng">Thực phẩm chức năng</option>
            <option value="Equipment">Equipment</option>
          </select>
        </div>
        <div>
          <label>Ngày sản xuất:</label>
          <input
            type="date"
            name="manufacturingDate"
            ref={manufacturingDateRef}
            required
          />
        </div>
        <div>
          <label>Hạn sử dụng:</label>
          <input type="date" name="expiryDate" ref={expiryDateRef} required />
        </div>
        {message && (
          <div className="form-message">
            <p>{message}</p>
          </div>
        )}
        <button
          className="form_button bg-emerald-400 borderborder-black w-[80px] h-[40px]"
          type="submit"
        >
          Xác nhận
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BatchForm;
