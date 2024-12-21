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
