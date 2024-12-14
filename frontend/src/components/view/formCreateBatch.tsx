import React, { useRef, useState } from "react";
import "./form.css";
import useBatchStore from "../../current_data/batch";
import useorderStore from "../../current_data/order";

const BatchForm = () => {
  const { getAllBatches,logoutBatches } = useBatchStore(); // Lấy hàm login
  const{logoutOrders}=useorderStore()
  const batches = getAllBatches();

  // Tạo các ref cho các input
  const IDRef = useRef<HTMLSelectElement>(null);
  // const IDRef=useRef<HTMLSelectElement>(null);
  const warehouseIDRef = useRef<HTMLSelectElement>(null);
  const employeeIDRef = useRef<HTMLSelectElement>(null);
  const productIDRef = useRef<HTMLSelectElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const expiryDateRef = useRef<HTMLInputElement>(null);
  const manufacturingDateRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("success"); // success hoặc error

  // Hàm để gửi dữ liệu đến backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy giá trị từ các ref
    // const name = nameRef.current?.value || "";
    // const ID = IDRef.current?.value || "";
    const price = priceRef.current?.value || "1";
    const warehouseID = warehouseIDRef.current?.value || "1";
    const productID = productIDRef.current?.value || "1";
    const quantity = quantityRef.current?.value || "1";
    const type = typeRef.current?.value || "Medicine";
    const expiryDate = expiryDateRef.current?.value || "";
    const manufacturingDate = manufacturingDateRef.current?.value || "";
    const employeeID = employeeIDRef.current?.value || "";

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

    const newBatch = {
      // name,
      warehouseID: parseInt(warehouseID, 10) || null, // Giá trị null nếu không hợp lệ
      productID: parseInt(productID, 10) || null, // Giá trị null nếu không hợp lệ
      employeeID: parseInt(employeeID, 10) || null, // Giá trị null nếu không hợp lệ
      quantity: parseInt(quantity, 10) || 0, // Mặc định 0 nếu không hợp lệ
      price: parseFloat(price) || 0.0, // Mặc định 0.0 nếu không hợp lệ
      type: type || "unknown", // Giá trị mặc định nếu không hợp lệ
      expiryDate: expiryDate || null, // Ngày hết hạn (null nếu không hợp lệ)
      manufacturingDate: manufacturingDate || null,
      // dateAdded: new Date().toISOString(), // Lấy ngày hiện tại làm ngày nhập
      // id: Math.floor(Math.random() * 1000000), // ID ngẫu nhiên
      // ID ngẫu nhiên

      // warehouse_id,
      // product_id,
      // employee_id,
      // quantity,
      // type,
      // expiry_date,
      // manufacturing_date,
      // price,
    };

    console.log("Batch data to send:", newBatch);

    // Gửi thông tin đến backend
    fetch("/api/v1/insertBatchData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBatch),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessageType("success");
        setMessage("Batch data inserted successfully!");
      })
      .catch((error) => {
        setMessageType("error");
        setMessage("Failed to insert batch data.");
      });
  };

  return (
    <div className="content-container">
      <h1>THÔNG TIN LÔ HÀNG</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID sản phẩm:</label>
          <select name="number" ref={productIDRef} required>
            <option value="16">16</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label>ID nhà kho:</label>
          <select name="number" ref={warehouseIDRef} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label>ID nhân viên:</label>
          <select name="number" ref={employeeIDRef} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label>Giá:</label>
          <input type="number" name="price" ref={priceRef} required />
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
