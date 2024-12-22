// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import "./View.css";

// const BatchView: React.FC = () => {
//   const [batches, setBatches] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Format date to "yyyy/mm/dd"
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     return `${year}/${month}/${day}`;
//   };

//   useEffect(() => {
//     const fetchBatches = async () => {
//       try {
//         const response = await axios.get("/api/v1/getBatchDetails");
//         setBatches(response.data.batches);
//       } catch (error) {
//         console.error("Error fetching batch details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBatches();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <motion.div
//       className="container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <h1 className="title">Batch Details</h1>
//       <table className="styled-table">
//         <thead>
//           <tr>
//             <th>Batch ID</th>
//             <th>Cost</th>
//             <th>Manufacturing Date</th>
//             <th>Expiry Date</th>
//             <th>Amount</th>
//             <th>Warehouse Order ID</th>
//             <th>Order Date</th>
//             <th>Total Cost</th>
//             <th>Inventory Manager ID</th>
//             <th>Order Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {batches.map((batch: any) => (
//             <tr key={batch.batch_id}>
//               <td>{batch.batch_id}</td>
//               <td>{batch.cost}</td>
//               <td>{formatDate(batch.manufacturing_date)}</td>
//               <td>{formatDate(batch.expiry_date)}</td>
//               <td>{batch.amount}</td>
//               <td>{batch.warehouse_order_id}</td>
//               <td>{formatDate(batch.order_date)}</td>
//               <td>{batch.total_cost}</td>
//               <td>{batch.inventory_mgr_id}</td>
//               <td>{batch.order_type}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </motion.div>
//   );
// };

// export default BatchView;

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import JsonTable from "./jsonTable"; // Import the table component
import "./View.css";
import useProducts from "../../hooks/useProducts";
import { Product } from "../../entities/product";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminOrder, useEmployeeOrder } from "../../hooks/useOrders";
import useUserStore from "../../current_data/user";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import DateInput from "./DateTimeInput";

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
const BatchView: React.FC = () => {
  // const {info}=useUserStore()
  // const { isLoading, isError, data, error } = useEmployeeOrder(info.id);
  // const nameRef = useRef<HTMLInputElement>(null);
  // const categoryRef = useRef<HTMLInputElement>(null);
  // const quantityRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [ManuDate, setManuDate] = useState<Date | null>(null);
  const [ExpDate, setExpDate] = useState<Date | null>(null);
  const [OrderDate, setOrderDate] = useState<Date | null>(null);

  const handleEditProduct = (product: Product) => {
    navigate("/homepage/productdetail", { state: { product: product } });
  };

  const handleDeleteProduct = (productId: number) => {
    navigate("/delete/product", { state: { int: productId } });
  };

  const handleToggleRestock = (productId: number) => {
    navigate("/restock/product", { state: { int: productId } });
  };

  const handleManuDateChange = (date: Date | null) => {
    setManuDate(date);
    console.log("Selected Date Time: ", date?.toLocaleString());
  };

  const addProduct = () => navigate("/homepage/CreateOrders");

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const products = batches ? batches : [];

  useEffect(() => {
    if (products && Array.isArray(products)) {
      let results = [...products]; // Start with all products

      // Filter by search term
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const searchKeywords = lowerCaseSearchTerm
        .split(" ")
        .filter((keyword) => keyword.trim() !== "");

      if (searchKeywords.length > 0) {
        results = results.filter((product) =>
          searchKeywords.some((keyword) => {
            if (!keyword) {
              return false;
            }
            if (!isNaN(Number(keyword))) {
              return (
                product.batch_id === Number(keyword) ||
                product.warehouse_order_id === Number(keyword)
              );
            }
            return false;
          })
        );
      }

      // Filter by Manufacturing Date
      if (ManuDate) {
        results = results.filter((product) => {
          const productManuDate = new Date(product.manufacturing_date);
          return (
            productManuDate.getFullYear() === ManuDate.getFullYear() &&
            productManuDate.getMonth() === ManuDate.getMonth() &&
            productManuDate.getDate() === ManuDate.getDate()
          );
        });
      }
      const modifiedArray = results.map(obj => {
        const { expiry_date, ...rest } = obj; // Use destructuring to remove Password
        return rest;
      });
      results = modifiedArray
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, ManuDate, products]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="title">Đơn Kho</h1>

      <motion.div className="search-bar-container" variants={formVariants}>
        <input
          type="text"
          placeholder="Tìm kiếm đơn kho..."
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

      <div className="date-input-container">
        <div className="date-input-group">
          <label htmlFor="manuDate">Manufacturing date:</label>
          <DateInput
            value={ManuDate}
            onChange={handleManuDateChange}
          />
        </div>
        <div className="date-input-group">
          <label htmlFor="expDate">Expiry date:</label>
          <DateInput
            value={ExpDate}
            onChange={handleManuDateChange}
          />
        </div>
        <div className="date-input-group">
          <label htmlFor="orderDate">Order date:</label>
          <DateInput
            value={OrderDate}
            onChange={handleManuDateChange}
          />
        </div>
      </div>

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

export default BatchView;
