import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import JsonTable from "./jsonTable"; // Import the table component
import "./View.css";
import useProducts from "../../hooks/useProducts";
import { Product } from "../../entities/product";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminOrder } from "../../hooks/useOrders";

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
  const products = data? data.orders : [];
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const generateId = () => {
    if (products && products.length > 0) {
      return Math.max(...products.map((p) => p.id)) + 1;
    } else {
      return 1;
    }
  };

  const handleEditProduct = (product: Product) => {navigate('/homepage/productdetail', { state: { product: product } });};

  const handleDeleteProduct = (productId: number) => {navigate('/delete/product', { state: { int: productId } });};

  const handleToggleRestock = (productId: number) => {navigate('/restock/product', { state: { int: productId } });};

  const addProduct = () => navigate("/homepage/CreateOrders");

  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="title">Đơn Thuốc</h1>

      <button className="toggle-form-button" onClick={() => addProduct()}>
        Thêm Đơn
      </button>

      {/* Using the JsonTable component */}
      <JsonTable
        data={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </motion.div>
  );
};

export default OrderView;
