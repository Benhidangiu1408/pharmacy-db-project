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
  const [type, setType] = useState("SUPPLEMENT");

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
    const storage_condition = storageConditionRef.current?.value || "";
    const country_of_origin = countryOfOriginRef.current?.value || "";
    const price = priceRef.current?.value || "";
    const directions_for_use = directionsForUseRef.current?.value || "";
    const certificate = certificateRef.current?.value || "";
    const warning = warningRef.current?.value || "";
    const intended_user = intendedUserRef.current?.value || "";
    const product_type = typeRef.current?.value || "";

    const additionalData = {};
    if (product_type === "SUPPLEMENT" || product_type === "MEDICINE") {
      additionalData["consumable_serving_size"] = "";
      additionalData["consumable_dosage"] = "";
      additionalData["consumable_dosage_form"] = "";
      additionalData["consumable_constraindication"] = "";
    }
    if (product_type === "SUPPLEMENT") {
      additionalData["supplement_allergen_info"] = allergenInfoRef.current?.value || "";
    } else if (product_type === "MEDICINE") {
      additionalData["medicine_side_effect"] = sideEffectRef.current?.value || "";
      additionalData["medicine_indication"] = indicationRef.current?.value || "";
      additionalData["medicine_is_prescription_medicine"] =
        isPrescriptionMedicineRef.current?.value || "";
    } else if (product_type === "EQUIPMENT") {
      additionalData["medical_equipment_usage_instruction"] =
        usageInstructionRef.current?.value || "";
      additionalData["medical_equipment_material"] = materialRef.current?.value || "";
      additionalData["medical_equipment_size_dimension"] = sizeRef.current?.value || "";
      additionalData["medical_equipment_requirement"] = requirementRef.current?.value || "";
      additionalData["medical_equipment_warranty"] = warrantyRef.current?.value || "";
      additionalData["medical_equipment_sterility"] = sterilityRef.current?.value || "";
    }
    const newProduct = {
      name,
      description,
      origin,
      tag,
      storage_condition,
      country_of_origin,
      price,
      directions_for_use,
      certificate,
      warning,
      intended_user,
      "total_amount_from_batch" : 0,
      product_type,
      ...additionalData,
    };
    fetch("http://localhost:8080/api/v1/addproduct", {
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
            <option value="SUPPLEMENT">Supplement</option>
            <option value="MEDICINE">Medicine</option>
            <option value="EQUIPMENT">Equipment</option>
          </select>
        </div>

        {type === "SUPPLEMENT" && (
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

        {type === "MEDICINE" && (
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

        {type === "EQUIPMENT" && (
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
        <button className="form_button bg-emerald-400 borderborder-black w-[80px] h-[40px]" type="submit">
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
