import React, { useState } from "react";
import "./form.css";

const ProductForm = () => {
  // State để lưu trữ các giá trị của form
  const [product, setProduct] = useState({
    name: "",
    quantity: 1,
    type: "Medicine", // Default value for type
    expiryDate: "",
  });
  const [message, setMessage] = useState("");

  // Hàm cập nhật state khi người dùng nhập dữ liệu
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "quantity" && parseInt(value, 10) < 1) {
      return;
    }
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Hàm để gửi dữ liệu đến backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", product);
    const newProduct = {
      ...product,
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
      .then((data) => setMessage("Product added successfully!"))
      .catch((error) => setMessage("Failed to add product."));
  };

  return (
    <div className="content-container">
      <h1>NHẬP THÔNG TIN SẢN PHẨM</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Số lượng:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Loại:</label>
          <select
            name="type"
            value={product.type}
            onChange={handleChange}
            required
          >
            <option value="Thuốc">Thuốc</option>
            <option value="Thực phẩm chức năng">Thực phẩm chức năng</option>
            <option value="Equipment">Equipment</option>
          </select>
        </div>
        <div>
          <label>Hạn sử dụng:</label>
          <input
            type="date"
            name="expiryDate"
            value={product.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Xác nhận</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductForm;
