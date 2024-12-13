import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./form.css";
import useBatchStore from "../../current_data/batch";
import useorderStore from "../../current_data/order";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(0);

  const location = useLocation();
  const product = location.state?.product;
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
  const { addorder } = useorderStore(); // Lấy hàm login
  const { addBatch } = useBatchStore(); // Lấy hàm login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addorder({
      id: product.id,
      name: product.name,
      quantity: quantity,
      price: product.price,
      
    });
    addBatch({
      id: product.id,
      name: product.name,
      quantity: quantity,
      type: product.type,
    });
    navigate("/homepage/ShowProducts");

  };
  if (!product) {
    return <div>Product not found.</div>; // Or redirect, or show an error message
  } else
    return (
      <div className="content-container">
        <h1>NHẬP THÔNG TIN SẢN PHẨM</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Tên sản phẩm:</label>
            <p>{product.name}</p>
          </div>
          <div>
            <label>Mô tả:</label>
            <p>{product.description}</p>
          </div>
          <div>
            <label>Xuất xứ:</label>
            <p>{product.origin}</p>
          </div>
          <div>
            <label>Tag:</label>
            <p>{product.tag}</p>
          </div>
          <div>
            <label>Điều kiện bảo quản:</label>

            <p>{product.storage_condition}</p>
          </div>
          <div>
            <label>Quốc gia sản xuất:</label>

            <p>{product.country_of_origin}</p>
          </div>
          <div>
            <label>Giá:</label>
            <p>{product.price}</p>
          </div>
          <div>
            <label>Hướng dẫn sử dụng:</label>

            <p>{product.directions_for_use}</p>
          </div>
          <div>
            <label>Chứng chỉ:</label>
            <p>{product.certificate}</p>
          </div>
          <div>
            <label>Cảnh báo:</label>
            <p>{product.warning}</p>
          </div>
          <div>
            <label>Người dùng dự định:</label>

            <p>{product.intended_user}</p>
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

          <div className="flex justify-center items-center space-x-4">
            <button
              className="form_button bg-emerald-400 border border-black w-[80px] h-[40px] mr-10"
              type="submit"
            >
              Xác nhận
            </button>
            <label>Số Lượng:</label>
            <input
              type="number"
              placeholder="Số Lượng"
              className="input-field2"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
        </form>
      </div>
    );
};

export default ProductDetail;
