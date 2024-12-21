import React from "react";
import { motion, noop } from "framer-motion";
import JsonTable from "./jsonTable"; // Import the table component
import "./View.css";

import useUserStore from "../../current_data/user";

const UserTable: React.FC = () => {
  const { info } = useUserStore();

  const tableData = [
    {
      id: info.id,
      name: info.name,
      address: info.address,
      account: info.account,
      password: info.password,
      phone_no: info.phone_no,
      working_type: info.working_type,
      jobType: info.jobType,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="title">Nhân Viên</h1>

      {/* Placeholder for JsonTable */}
      <JsonTable data={tableData} onEdit={noop} onDelete={noop} />
    </motion.div>
  );
};

export default UserTable;
