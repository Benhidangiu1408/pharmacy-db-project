import React, { useRef, useState } from "react";
import "./form.css";
import useorderStore from "../../current_data/order";
import useUserStore from "../../current_data/user";
import useBatchStore from "../../current_data/batch";
import useShippers from "../../hooks/useShippers";
import useVouchers from "../../hooks/useVouchers";

const OrderForm = () => {
  // Tạo các ref cho các input
  const { getAllorders, logoutOrders } = useorderStore(); // Lấy hàm login
  const { getInfo } = useUserStore(); // Lấy hàm login
  const { logoutBatches } = useBatchStore();

  const orders = getAllorders();
  const info = getInfo();

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
  const { isLoading, isError, data, error } = useShippers(); //shippers
  const { data: vouchers } = useVouchers(); //vouchers
  const shippers2 = data ? data.shippers : [];
  const vouchers2 = data ? vouchers.vouchers : [];

  // Function to calculate the total
  const calculateTotal = () => {
    return orders.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  };

  // Hàm để gửi dữ liệu đến backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    logoutBatches();
    logoutOrders();

    // Lấy giá trị từ các ref
    const destination = destinationRef.current?.value || "";
    const note = noteRef.current?.value || "";
    const distance = Number(distanceRef.current?.value || "");
    const total = Number(calculateTotal());
    const custName = custNameRef.current?.value || "";
    const custPhoneNo = custPhoneNoRef.current?.value || "";
    const orderDate = new Date().toISOString().split("T")[0];
    const voucherId =  Number(voucherIdRef.current?.value || "");
    const shipperId =  Number(shipperIdRef.current?.value || "");
    const shipperCost =  Number(shipperCostRef.current?.value || "");
    // const orderItems = orderItemsRef.current?.value || "";
    const employeeId = info.id;
    const orderItems = orders.map(({ id, quantity }) => ({
      id,
      quantity,
    }));
    const order_status_id = 2;
    const cust_id = 1;

    // const orderStatus

    if (!destination || !custName || !custPhoneNo) {
      setMessageType("error");
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const orderData = {
      destination,
      note,
      distance,
      order_status_id,
      total,
      cust_id,
      custName,
      custPhoneNo,
      orderDate,
      voucherId,
      shipperId,
      shipperCost,
      orderItems,
      employeeId,
    };
    // Tạo form data để gửi file ảnh
    // const formData = new FormData();
    // formData.append("Destination", destination);
    // formData.append("Note", note);
    // formData.append("Distance", distance);
    // formData.append("Total", total);
    // formData.append("custName", custName);
    // formData.append("custPhoneNo", custPhoneNo);
    // formData.append("OrderDate", orderDate);
    // formData.append("VoucherId", voucherId);
    // formData.append("ShipperId", shipperId);
    // formData.append("ShipperCost", shipperCost);
    // formData.append("OrderItems", orderItems);
    // formData.append("EmployeeId", employeeId);

    // Gửi thông tin đến backend (Node.js)
    console.log(orderData);
    fetch(`/api/v2/addOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
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
          <input type="text" name="destination" ref={destinationRef} />
        </div>
        <div>
          <label>Ghi chú:</label>
          <input type="text" name="note" ref={noteRef} />
        </div>
        <div>
          <label>Khoảng cách:</label>
          <input type="number" name="distance" ref={distanceRef} />
        </div>
        <div>
          <label>Tổng tiền:</label>
          <p> {calculateTotal()}</p>
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
            {/* {shippers2.map()} */}
            {vouchers2.map((voucher) => (
              <option value={voucher.id}>{voucher.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Shipper ID:</label>
          <select name="shipperId" ref={shipperIdRef}>
            {shippers2.map((shipper) => (
              <option value={shipper.id}>{shipper.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Chi phí giao hàng:</label>
          <input type="number" name="shipperCost" ref={shipperCostRef} />
        </div>
        <div>
          <label>Chi tiết đơn hàng:</label>
          <input type="text" name="orderItems" ref={orderItemsRef} />
        </div>
        <div>
          {orders.map((product, index) => (
            <div key={index} className="mb-4">
              <div>
                <label>Tên sản phẩm:</label>
                <p>{product.name} </p>
              </div>

              <div>
                <label>Số lượng:</label>
                <p>{product.quantity}</p>
              </div>
              <div>
                <label>Giá:</label>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <label>Nhân viên:</label>
          <p>{info.name}</p>
        </div>

        {/* Thông báo */}
        {message && (
          <div className={`form-message ${messageType}`}>
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
    </div>
  );
};

export default OrderForm;
