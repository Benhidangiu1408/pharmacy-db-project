// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import JsonTable from "./jsonTable"; // Import the table component
// import "./View.css";
// import useProducts from "../../hooks/useProducts";
// import { Product } from "../../entities/product";
// import { Navigate, Outlet } from "react-router-dom";

// // --- Framer Motion Variants ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { x: -20, opacity: 0 },
//   visible: { x: 0, opacity: 1 },
//   exit: { x: 20, opacity: 0 },
// };

// const formVariants = {
//   hidden: { y: -20, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
// };

// // --- Main Component ---
// const BatchView: React.FC = () => {
//   const { isLoading, isError, data, error } = useProducts();
//   const products = data? data.products : [];
//   const nameRef = useRef<HTMLInputElement>(null);
//   const categoryRef = useRef<HTMLInputElement>(null);
//   const quantityRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   const generateId = () => {
//     if (products && products.length > 0) {
//       return Math.max(...products.map((p) => p.id)) + 1;
//     } else {
//       return 1;
//     }
//   };

//   const handleEditProduct = (product: Product) => {navigate('/homepage/productdetail', { state: { product: product } });};

//   const handleDeleteProduct = (productId: number) => {navigate('/delete/product', { state: { int: productId } });};

//   const handleToggleRestock = (productId: number) => {navigate('/restock/product', { state: { int: productId } });};

//   const addProduct = () => navigate("/homepage/CreateBatches");

//   return (
//     <motion.div
//       className="container"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <h1 className="title">Đơn Kho</h1>

//       <button className="toggle-form-button" onClick={() => addProduct()}>
//         Nhập Kho
//       </button>

//       {/* Using the JsonTable component */}
//       <JsonTable
//         data={products}
//         onEdit={handleEditProduct}
//         onDelete={handleDeleteProduct}
//       />
//     </motion.div>
//   );
// };

// export default BatchView;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./View.css";

const BatchView: React.FC = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format date to "yyyy/mm/dd"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get("/api/v1/getBatchDetails");
        setBatches(response.data.batches);
      } catch (error) {
        console.error("Error fetching batch details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="title">Batch Details</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Cost</th>
            <th>Manufacturing Date</th>
            <th>Expiry Date</th>
            <th>Amount</th>
            <th>Warehouse Order ID</th>
            <th>Order Date</th>
            <th>Total Cost</th>
            <th>Inventory Manager ID</th>
            <th>Order Type</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch: any) => (
            <tr key={batch.batch_id}>
              <td>{batch.batch_id}</td>
              <td>{batch.cost}</td>
              <td>{formatDate(batch.manufacturing_date)}</td>
              <td>{formatDate(batch.expiry_date)}</td>
              <td>{batch.amount}</td>
              <td>{batch.warehouse_order_id}</td>
              <td>{formatDate(batch.order_date)}</td>
              <td>{batch.total_cost}</td>
              <td>{batch.inventory_mgr_id}</td>
              <td>{batch.order_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default BatchView;
