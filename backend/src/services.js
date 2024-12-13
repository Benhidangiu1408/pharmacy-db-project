const db = require('./db');

// Implementation of the `GetUser` gRPC method
const fetchUsers = async (call, callback) => {
  const userId = call.request.id;

  try {
    const [results] = await db.query('SELECT * FROM cho WHERE id = ?', [userId]);

    if (results.length === 0) {
      callback({
        code: 5, // NOT_FOUND
        details: 'User not found',
      });
    } else {
      const user = results[0];
      callback(null, {
        id: user.id,
        sdt: user.sdt,
        email: user.email,
        
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    callback({
      code: 13, // INTERNAL
      details: 'Database error',
    });
  }
};
// async function fetchUsers() {
//     try {
//       const [rows] = await db.query('SELECT * FROM cho');
//       console.log(rows);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   }


// Insert a new employee
const insertEmployee = async (call, callback) => {
  const {
      name,
      address,
      account,
      password,
      phone_no,
      working_type,
      job_type,
      credential,
  } = call.request;

  try {
      const [results] = await db.query(
          `CALL employee_prescription.InsertEmployee(?, ?, ?, ?, ?, ?, ?, ?)`,
          [name, address, account, password, phone_no, working_type, job_type, credential]
      );

      callback(null, {
          id: 0, // Assuming MySQL returns the ID
          message: "Employee inserted successfully",
      });
  } catch (error) {
      console.error("Database error:", error);
      callback({
          code: 13, // INTERNAL
          details: "Database error while inserting employee",
      });
  }
};

// Update employee password
const updateEmployeePassword = async (call, callback) => {
  const { id, new_password } = call.request;

  try {
      await db.query(
          `CALL employee_prescription.UpdateEmployeePassword(?, ?)`,
          [id, new_password]
      );

      callback(null, { message: "Password updated successfully" });
  } catch (error) {
      console.error("Database error:", error);
      callback({
          code: 13, // INTERNAL
          details: "Database error while updating password",
      });
  }
};

// Update employee job type
const updateEmployeeJobType = async (call, callback) => {
  const { id, new_job_type } = call.request;

  try {
      await db.query(
          `CALL employee_prescription.UpdateEmployeeJobType(?, ?)`,
          [id, new_job_type]
      );

      callback(null, { message: "Job type updated successfully" });
  } catch (error) {
      console.error("Database error:", error);
      callback({
          code: 13, // INTERNAL
          details: "Database error while updating job type",
      });
  }
};

// Show all employees
const showAllEmployees = async (call, callback) => {
  try {
      const [rows] = await db.query(`CALL employee_prescription.ShowAllEmployees()`);
      callback(null, { employees: rows });
  } catch (error) {
      console.error('Database error:', error);
      callback({ code: 13, details: 'Database error while fetching employees' });
  }
};

// Show one employee
const showOneEmployee = async (call, callback) => {
  const { empID } = call.request;

  try {
      const [rows] = await db.query(`CALL employee_prescription.ShowOneEmployee(?)`, [empID]);
      if (rows.length === 0) {
          callback({ code: 5, details: 'Employee not found' });
      } else {
          callback(null, rows[0]);
      }
  } catch (error) {
      console.error('Database error:', error);
      callback({ code: 13, details: 'Database error while fetching employee' });
  }
};

// Insert order
const insertOrder = async (call, callback) => {
  const {
      destination,
      note,
      distance,
      order_status_id,
      total,
      cust_id,
      cust_name,
      cust_phone_no,
      order_date,
      voucher_id,
      shipper_id,
      shipper_cost,
      order_items,
      employee_id,
  } = call.request;

  try {
      await db.query(`CALL order_cus_voucher.InsertOrder(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
          destination,
          note,
          distance,
          order_status_id,
          total,
          cust_id,
          cust_name,
          cust_phone_no,
          order_date,
          voucher_id,
          shipper_id,
          shipper_cost,
          order_items,
          employee_id,
      ]);
      callback(null, { message: 'Order inserted successfully' });
  } catch (error) {
      console.error('Database error:', error);
      callback({ code: 13, details: 'Database error while inserting order' });
  }
};

// Get all orders
const getAllOrders = async (call, callback) => {
  try {
      const [rows] = await db.query(`CALL order_cus_voucher.GetAllOrders()`);
      callback(null, { orders: rows });
  } catch (error) {
      console.error('Database error:', error);
      callback({ code: 13, details: 'Database error while fetching orders' });
  }
};

// Get employee orders
const getEmployeeOrders = async (call, callback) => {
  const { empID } = call.request;

  try {
      const [rows] = await db.query(`CALL order_cus_voucher.GetEmployeeOrders(?)`, [empID]);
      callback(null, { orders: rows });
  } catch (error) {
      console.error('Database error:', error);
      callback({ code: 13, details: 'Database error while fetching employee orders' });
  }
};

// Show order statuses
const showOrderStatus = async (call, callback) => {
  try {
      const [rows] = await db.query(`CALL order_cus_voucher.ShowOrderStatus()`);
      const statuses = rows[0].map(status => ({
        status_id : status.Status_ID,
        name : status.Status_Name
      }));
      callback(null, { statuses });
  } catch (error) {
      console.error('Database error:', error);
      callback({ code: 13, details: 'Database error while fetching order statuses' });
  }
};

// Show shipper info
const showShipperInfo = async (call, callback) => {
  try {
      const [rows] = await db.query(`CALL order_cus_voucher.ShowShipperInfo()`);
      const shippers = rows[0].map(shipper => ({
        id : shipper.Shipper_ID,
        name : shipper.Shipper_Name
      }));
      callback(null, { shippers } );
  } catch (error) {
      console.error('Database error:', error);
      callback({ code: 13, details: 'Database error while fetching shipper info' });
  }
};

// Get customer details
const getCustomerDetails = async (call, callback) => {
  try {
      const [rows] = await db.query(`CALL order_cus_voucher.GetCustomerDetails()`);
      callback(null, { customers: rows });
  } catch (error) {
      console.error('Database error:', error);
      callback({ code: 13, details: 'Database error while fetching customer details' });
  }
};

const fetchProductList = async (call, callback) => {
  try {
    const [results] = await db.query('CALL batch_product.GetProductList()');

    // results[0] because stored procedure results are nested in an extra array
    const products = results[0].map(product => ({
      id: product.ID,
      employee_id: product.Employee_ID,
      name: product.Name,
      description: product.Description,
      origin: product.Origin,
      tag: product.Tag,
      storage_condition: product.Storage_Condition,
      country_of_origin: product["Country of origin"], // Handle names with spaces
      price: product.Price,
      directions_for_use: product["Directions for use"], // Handle names with spaces
      certificate: product.Certificate,
      warning: product.Warning,
      intended_user: product["Intended User"], // Handle names with spaces
      total_amount_from_batch: product["Total amount from batch"], // Handle names with spaces
    }));

    callback(null, { products }); // Return an object with a 'products' field

  } catch (error) {
    console.error('Database error:', error);
    callback({
      code: grpc.status.INTERNAL, // Use grpc.status for better error codes
      details: 'Database error',
    });
  }
};

module.exports = { fetchUsers,insertEmployee,
  updateEmployeePassword,
  updateEmployeeJobType, showAllEmployees,
  showOneEmployee,
  insertOrder,
  getAllOrders,
  getEmployeeOrders,
  showOrderStatus,
  showShipperInfo,
  getCustomerDetails, fetchProductList};

