import React, { useRef, useState } from "react";
import "./form.css";

const OrderForm = () => {
  // Tạo các ref cho các input
  const destinationRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLInputElement>(null);
  const distanceRef = useRef<HTMLInputElement>(null);
  const totalRef = useRef<HTMLInputElement>(null);
  const custNameRef = useRef<HTMLInputElement>(null);
  const custPhoneNoRef = useRef<HTMLInputElement>(null);
  const orderDateRef = useRef<HTMLInputElement>(null);
  const voucherIdRef = useRef<HTMLSelectElement>(null);
  const shipperIdRef = useRef<HTMLSelectElement>(null);
  const shipperCostRef = useRef<HTMLInputElement>(null);
  const orderItemsRef = useRef<HTMLInputElement>(null);
  const employeeIdRef = useRef<HTMLSelectElement>(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // success hoặc error

  // Hàm để gửi dữ liệu đến backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy giá trị từ các ref
    const destination = destinationRef.current?.value || "";
    const note = noteRef.current?.value || "";
    const distance = distanceRef.current?.value || "";
    const total = totalRef.current?.value || "";
    const custName = custNameRef.current?.value || "";
    const custPhoneNo = custPhoneNoRef.current?.value || "";
    const orderDate = new Date().toISOString();
    const voucherId = voucherIdRef.current?.value || "";
    const shipperId = shipperIdRef.current?.value || "";
    const shipperCost = shipperCostRef.current?.value || "";
    const orderItems = orderItemsRef.current?.value || "";
    const employeeId = employeeIdRef.current?.value || "";

    if (!destination || !custName || !custPhoneNo) {
      setMessageType("error");
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Tạo form data để gửi file ảnh
    const formData = new FormData();
    formData.append("Destination", destination);
    formData.append("Note", note);
    formData.append("Distance", distance);
    formData.append("Total", total);
    formData.append("custName", custName);
    formData.append("custPhoneNo", custPhoneNo);
    formData.append("OrderDate", orderDate);
    formData.append("VoucherId", voucherId);
    formData.append("ShipperId", shipperId);
    formData.append("ShipperCost", shipperCost);
    formData.append("OrderItems", orderItems);
    formData.append("EmployeeId", employeeId);

    // Gửi thông tin đến backend (Node.js)
    fetch("/api/orders", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add order.");
        return response.json();
      })
      .then((data) => {
        setMessageType("success");
        setMessage("Order added successfully!");
      })
      .catch((error) => {
        setMessageType("error");
        setMessage("Failed to add order.");
      });
  };

  return (
    <div className="content-container">
      <h1>NHẬP THÔNG TIN ĐƠN HÀNG</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Địa điểm giao hàng:</label>
          <input type="text" name="destination" ref={destinationRef}  />
        </div>
        <div>
          <label>Ghi chú:</label>
          <input type="text" name="note" ref={noteRef} />
        </div>
        <div>
          <label>Khoảng cách:</label>
          <input type="number" name="distance" ref={distanceRef}  />
        </div>
        <div>
          <label>Tổng tiền:</label>
          <input type="number" name="total" ref={totalRef} required />
        </div>
        <div>
          <label>Tên khách hàng:</label>
          <input type="text" name="custName" ref={custNameRef} required />
        </div>
        <div>
          <label>Số điện thoại khách hàng:</label>
          <input type="text" name="custPhoneNo" ref={custPhoneNoRef} required />
        </div>
        {/* <div>
          <label>Ngày đặt hàng:</label>
          <input type="date" name="orderDate" ref={orderDateRef} required />
        </div> */}
        <div>
          <label>Voucher ID:</label>
          <select name="voucherId" ref={voucherIdRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label>Shipper ID:</label>
          <select name="shipperId" ref={shipperIdRef} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label>Chi phí giao hàng:</label>
          <input
            type="number"
            name="shipperCost"
            ref={shipperCostRef}
            
          />
        </div>
        <div>
          <label>Chi tiết đơn hàng:</label>
          <input type="text" name="orderItems" ref={orderItemsRef}  />
        </div>
        <div>
          <label>Mã nhân viên:</label>
          <select name="employeeId" ref={employeeIdRef} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
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

export default OrderForm;
