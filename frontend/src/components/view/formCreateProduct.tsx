import React, { useRef, useState } from "react";
import "./form.css";

const ProductForm = () => {
  // Tạo các ref cho các input
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const originRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const storageConditionRef = useRef<HTMLInputElement>(null);
  const countryOfOriginRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const directionsForUseRef = useRef<HTMLInputElement>(null);
  const certificateRef = useRef<HTMLInputElement>(null);
  const warningRef = useRef<HTMLInputElement>(null);
  const intendedUserRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  // State để hiển thị các trường bổ sung theo loại sản phẩm
  const [type, setType] = useState("supplement");

  // Ref cho các trường bổ sung
  const allergenInfoRef = useRef<HTMLInputElement>(null);
  const sideEffectRef = useRef<HTMLInputElement>(null);
  const indicationRef = useRef<HTMLInputElement>(null);
  const isPrescriptionMedicineRef = useRef<HTMLSelectElement>(null);
  const usageInstructionRef = useRef<HTMLInputElement>(null);
  const materialRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);
  const requirementRef = useRef<HTMLInputElement>(null);
  const warrantyRef = useRef<HTMLInputElement>(null);
  const sterilityRef = useRef<HTMLSelectElement>(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy giá trị từ các ref
    const name = nameRef.current?.value || "";
    const description = descriptionRef.current?.value || "";
    const origin = originRef.current?.value || "";
    const tag = tagRef.current?.value || "";
    const storageCondition = storageConditionRef.current?.value || "";
    const countryOfOrigin = countryOfOriginRef.current?.value || "";
    const price = priceRef.current?.value || "";
    const directionsForUse = directionsForUseRef.current?.value || "";
    const certificate = certificateRef.current?.value || "";
    const warning = warningRef.current?.value || "";
    const intendedUser = intendedUserRef.current?.value || "";
    const productType = typeRef.current?.value || "";

    const additionalData = {};
    if (productType === "supplement") {
      additionalData["allergenInfo"] = allergenInfoRef.current?.value || "";
    } else if (productType === "medicine") {
      additionalData["sideEffect"] = sideEffectRef.current?.value || "";
      additionalData["indication"] = indicationRef.current?.value || "";
      additionalData["isPrescriptionMedicine"] =
        isPrescriptionMedicineRef.current?.value || "";
    } else if (productType === "equipment") {
      additionalData["usageInstruction"] =
        usageInstructionRef.current?.value || "";
      additionalData["material"] = materialRef.current?.value || "";
      additionalData["size"] = sizeRef.current?.value || "";
      additionalData["requirement"] = requirementRef.current?.value || "";
      additionalData["warranty"] = warrantyRef.current?.value || "";
      additionalData["sterility"] = sterilityRef.current?.value || "";
    }

    const newProduct = {
      name,
      description,
      origin,
      tag,
      storageCondition,
      countryOfOrigin,
      price,
      directionsForUse,
      certificate,
      warning,
      intendedUser,
      productType,
      additionalData,
    };

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
          <label>Tên sản phẩm:</label>
          <input type="text" name="name" ref={nameRef} required />
        </div>
        <div>
          <label>Mô tả:</label>
          <input type="text" name="description" ref={descriptionRef} required />
        </div>
        <div>
          <label>Xuất xứ:</label>
          <input type="text" name="origin" ref={originRef} required />
        </div>
        <div>
          <label>Tag:</label>
          <input type="text" name="tag" ref={tagRef} required />
        </div>
        <div>
          <label>Điều kiện bảo quản:</label>
          <input
            type="text"
            name="storageCondition"
            ref={storageConditionRef}
            required
          />
        </div>
        <div>
          <label>Quốc gia sản xuất:</label>
          <input
            type="text"
            name="countryOfOrigin"
            ref={countryOfOriginRef}
            required
          />
        </div>
        <div>
          <label>Giá:</label>
          <input type="number" name="price" ref={priceRef} required />
        </div>
        <div>
          <label>Hướng dẫn sử dụng:</label>
          <input
            type="text"
            name="directionsForUse"
            ref={directionsForUseRef}
            required
          />
        </div>
        <div>
          <label>Chứng chỉ:</label>
          <input type="text" name="certificate" ref={certificateRef} required />
        </div>
        <div>
          <label>Cảnh báo:</label>
          <input type="text" name="warning" ref={warningRef} required />
        </div>
        <div>
          <label>Người dùng dự định:</label>
          <input
            type="text"
            name="intendedUser"
            ref={intendedUserRef}
            required
          />
        </div>
        <div>
          <label>Loại sản phẩm:</label>
          <select
            name="type"
            ref={typeRef}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="supplement">Supplement</option>
            <option value="medicine">Medicine</option>
            <option value="equipment">Equipment</option>
          </select>
        </div>

        {type === "supplement" && (
          <div>
            <label>Thông tin dị ứng:</label>
            <input
              type="text"
              name="allergenInfo"
              ref={allergenInfoRef}
              required
            />
          </div>
        )}

        {type === "medicine" && (
          <>
            <div>
              <label>Tác dụng phụ:</label>
              <input
                type="text"
                name="sideEffect"
                ref={sideEffectRef}
                required
              />
            </div>
            <div>
              <label>Chỉ định:</label>
              <input
                type="text"
                name="indication"
                ref={indicationRef}
                required
              />
            </div>
            <div>
              <label>Có cần kê đơn không?</label>
              <select
                name="isPrescriptionMedicine"
                ref={isPrescriptionMedicineRef}
                required
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </>
        )}

        {type === "equipment" && (
          <>
            <div>
              <label>Hướng dẫn sử dụng:</label>
              <input
                type="text"
                name="usageInstruction"
                ref={usageInstructionRef}
                required
              />
            </div>
            <div>
              <label>Chất liệu:</label>
              <input type="text" name="material" ref={materialRef} required />
            </div>
            <div>
              <label>Kích thước:</label>
              <input type="text" name="size" ref={sizeRef} required />
            </div>
            <div>
              <label>Yêu cầu:</label>
              <input
                type="text"
                name="requirement"
                ref={requirementRef}
                required
              />
            </div>
            <div>
              <label>Bảo hành:</label>
              <input type="text" name="warranty" ref={warrantyRef} required />
            </div>
            <div>
              <label>Vô trùng:</label>
              <select name="sterility" ref={sterilityRef} required>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </>
        )}

        {message && (
          <div className="form-message">
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

export default ProductForm;
