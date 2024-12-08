import { useState } from "react";

import { Button } from "../components/ui/button";
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1 className="text-3xl font-bold underline">Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//         <Button>Click me</Button>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   );
// }

import jsQR from "jsqr";
// import QRCodeGenerator from "@/pages/scanner";
import QRCodeGenerator from "./scanner";
import React from "react";

const ScannerComponent = () => {
  const [scanResult, setScanResult] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    quantity: "",
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          context?.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imageData = context?.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          // Sử dụng jsQR để phân tích mã QR
          const code = jsQR(imageData!.data, imageData!.width, imageData!.height);
          if (code) {
            setScanResult(code.data); // Hiển thị dữ liệu mã QR
            try {
              const order = JSON.parse(code.data); // Parse JSON từ mã QR
              setFormData({
                productName: order.productName,
                productCode: order.productCode,
                quantity: order.quantity,
              });
            } catch (err) {
              console.error("Invalid QR Code format:", err);
            }
          } else {
            alert("Không tìm thấy mã QR trong ảnh!");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div>
        <h2>Tải ảnh mã QR</h2>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <div>
          <h3>Kết quả quét:</h3>
          <p>{scanResult}</p>
        </div>
        <form>
          <label>
            Tên sản phẩm:
            <input
              type="text"
              value={formData.productName}
              readOnly
              className="text-white"
            />
          </label>
          <br />
          <label>
            Mã sản phẩm:
            <input
              type="text"
              value={formData.productCode}
              readOnly
              className="text-white"
            />
          </label>
          <br />
          <label>
            Số lượng:
            <input
              type="number"
              value={formData.quantity}
              readOnly
              className="text-white"
            />
          </label>
        </form>
      </div>
      <QRCodeGenerator />
    </>
  );
};

export default ScannerComponent;
