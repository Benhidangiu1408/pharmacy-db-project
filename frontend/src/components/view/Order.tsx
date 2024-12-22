import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import JsonTable from "./jsonTable"; // Import the table component
import "./View.css";
import useProducts from "../../hooks/useProducts";
import { Product } from "../../entities/product";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminOrder } from "../../hooks/useOrders";
import { FaSearch } from "react-icons/fa";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
};

const formVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
};

// --- Main Component ---
const OrderView: React.FC = () => {
  const { isLoading, isError, data, error } = useAdminOrder();
  const products = data ? data.orders : [];
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products && Array.isArray(products) && products.length > 0) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const searchKeywords = lowerCaseSearchTerm
        .split(" ")
        .filter((keyword) => keyword.trim() !== "");
      var results;
      if (searchKeywords.length > 0) {
        results = products.filter((product) =>
          searchKeywords.some((keyword) => {
            if (!keyword) {
              return false;
            }
            if (!isNaN(Number(keyword))) {
              return (
                product.order_id === Number(keyword) ||
                product.distance === Number(keyword)
              );
            }
            return (
              product.destination.toLowerCase().includes(keyword) ||
              product.note.toLowerCase().includes(keyword) ||
              product.account.toLowerCase().includes(keyword) ||
              product.job_type.toLowerCase().includes(keyword) ||
              product.working_type.toLowerCase().includes(keyword) ||
              product.phone_no.toLowerCase().includes(keyword)
            );
          })
        );
        console.log("results la ", results);
        setFilteredProducts(results);
      } else {
        setFilteredProducts(products);
      }
    } else {
      // Handle the case where products is not yet an array (e.g., set filteredProducts to an empty array)
      // setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEditProduct = (product: Product) => {
    navigate("/homepage/productdetail", { state: { product: product } });
  };

  const handleDeleteProduct = (productId: number) => {
    navigate("/delete/product", { state: { int: productId } });
  };

  const handleToggleRestock = (productId: number) => {
    navigate("/restock/product", { state: { int: productId } });
  };

  const addProduct = () => navigate("/homepage/CreateOrders");

  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="title">Đơn Thuốc</h1>

      <motion.div className="search-bar-container" variants={formVariants}>
        <input
          type="text"
          placeholder="Tìm kiếm theo đơn..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <motion.i
          className="search-icon"
          animate={{ scale: 1.2, rotate: 360 }}
          transition={{ repeat: 0, duration: 0.5 }}
        >
          <FaSearch />
        </motion.i>
      </motion.div>

      <button className="toggle-form-button" onClick={() => addProduct()}>
        Thêm Đơn
      </button>

      {/* Using the JsonTable component */}
      <JsonTable
        data={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </motion.div>
  );
};

export default OrderView;
