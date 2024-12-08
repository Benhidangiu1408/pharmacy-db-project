import React, { useState } from "react";
import QRCode from "qrcode";

const QRCodeGenerator = () => {
  const [order, setOrder] = useState({
    productName: "Sản phẩm A",
    productCode: "SP001",
    quantity: 10,
  });

  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQRCode = async () => {
    const orderData = JSON.stringify(order); // Chuyển thông tin đơn hàng thành chuỗi JSON
    try {
      const url = await QRCode.toDataURL(orderData); // Tạo mã QR
      setQrCodeUrl(url); // Cập nhật URL để hiển thị
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Tạo mã QR cho đơn hàng</h1>
      <form>
        <label>
          Tên sản phẩm:
          <input
            type="text"
            value={order.productName}
            onChange={(e) =>
              setOrder({ ...order, productName: e.target.value })
            }
            className="text-white"
          />
        </label>
        <br />
        <label>
          Mã sản phẩm:
          <input
            type="text"
            value={order.productCode}
            onChange={(e) =>
              setOrder({ ...order, productCode: e.target.value })
            }
            className="text-white"

          />
        </label>
        <br />
        <label>
          Số lượng:
          <input
            type="number"
            value={order.quantity}
            onChange={(e) => setOrder({ ...order, quantity: parseInt( e.target.value) })}
            className="text-white"

          />
        </label>
      </form>
      <button onClick={generateQRCode}>Tạo mã QR</button>
      <div>
        {qrCodeUrl && (
          <div >
            <h3>Mã QR:</h3>
            <img src={qrCodeUrl} alt="QR Code" />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
