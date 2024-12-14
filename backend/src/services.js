const db = require("./db");

// Implementation of the `GetUser` gRPC method
const fetchUsers = async (call, callback) => {
  const userId = call.request.id;

  try {
    const [results] = await db.query("SELECT * FROM cho WHERE id = ?", [
      userId,
    ]);

    if (results.length === 0) {
      callback({
        code: 5, // NOT_FOUND
        details: "User not found",
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
    console.error("Database error:", error);
    callback({
      code: 13, // INTERNAL
      details: "Database error",
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

// Update employee password
const signin = async (call, callback) => {
  const { account, password } = call.request;

  try {
    // Call the stored procedure with placeholders for OUT parameters
    const [results] = await db.query(
      "CALL employee_prescription.Signin(?, ?)",
      [account, password]
    );

    const SigninResponse = results[0][0];
    // Access the OUT parameters from the result set
    const empID = SigninResponse.ID;
    const employeeJobType = SigninResponse.JobType;    
    const eName = SigninResponse.Name;    

    callback(null, {
      id : empID,
      jobType : employeeJobType,
      name : eName
    });
  } catch (error) {
    console.error("Database error:", error);
    callback({
      id : -1,
      jobType : "Nope",
      name : "Wrong"
    });
  }
};

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
      [
        name,
        address,
        account,
        password,
        phone_no,
        working_type,
        job_type,
        credential,
      ]
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
    await db.query(`CALL employee_prescription.UpdateEmployeePassword(?, ?)`, [
      id,
      new_password,
    ]);

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
    await db.query(`CALL employee_prescription.UpdateEmployeeJobType(?, ?)`, [
      id,
      new_job_type,
    ]);

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
    const [rows] = await db.query(
      `CALL employee_prescription.ShowAllEmployees()`
    );
    const employees = rows[0].map((user) => ({
      id: user.ID,
      name: user.Name,
      address: user.Address,
      account: user.Account,
      password: user.Password,
      phone_no: user.Phone_no,
      working_type: user.WorkingType,
      job_type: user.JobType,
      credential: user.Creadential,
    }));
    callback(null, { employees });
  } catch (error) {
    console.error("Database error:", error);
    callback({ code: 13, details: "Database error while fetching employees" });
  }
};

// Show one employee
const showOneEmployee = async (call, callback) => {
  const { empID } = call.request;

  try {
    const [rows] = await db.query(
      `CALL employee_prescription.ShowOneEmployee(?)`,
      [empID]
    );
    if (rows.length === 0) {
      callback({ code: 5, details: "Employee not found" });
    } else {
      const user = rows[0];
      callback(null, {
        id: user.ID,
        name: user.Name,
        address: user.Address,
        account: user.Account,
        password: user.Password,
        phone_no: user.Phone_no,
        working_type: user.WorkingType,
        job_type: user.JobType,
        credential: user.Creadential,
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    callback({ code: 13, details: "Database error while fetching employee" });
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
    await db.query(
      `CALL order_cus_voucher.InsertOrder(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ]
    );
    callback(null, { message: "Order inserted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    callback({ code: 13, details: "Database error while inserting order" });
  }
};

// Get all orders
const getAllOrders = async (call, callback) => {
  try {
    const [rows] = await db.query(`CALL order_cus_voucher.GetAllOrders()`);
    const orders = rows[0].map((order) => ({
      order_id: order.Order_ID,
      destination: order.Destination,
      note: order.Note,
      distance: order.Distance,
      order_status_id: order.OrderStatus_ID,
      total: order.Total,
      cust_id: order.Cus_ID,
      cust_name: order.Customer_Name,
      cust_phone_no: order.Customer_Phone,
      order_date: order.Order_Date,
      voucher_id: order.Voucher_ID,
      shipper_id: order.Shipper_ID,
      shipper_name: order.Shipper_Name,
      logistic_company_name: order.Logistic_Company_Name,
      shipping_cost: order.Shipping_Cost,
      product_name: order.Product_Name,
      product_quantity: order.Quantity,
      employee_name: order.Name,
    }));
    console.log(orders)
    callback(null, { orders });
  } catch (error) {
    console.error("Database error:", error);
    callback({ code: 13, details: "Database error while fetching orders" });
  }
};

// Get employee orders
const getEmployeeOrders = async (call, callback) => {
  const { empID } = call.request;

  try {
    const [rows] = await db.query(
      `CALL order_cus_voucher.GetEmployeeOrders(?)`,
      [empID]
    );
    const orders = rows[0].map((order) => ({
      order_id: order.Order_ID,
      destination: order.Destination,
      note: order.Note,
      distance: order.Distance,
      order_status_id: order.OrderStatus_ID,
      total: order.Total,
      cust_id: order.Cus_ID,
      cust_name: order.Customer_Name,
      cust_phone_no: order.Customer_Phone,
      order_date: order.Order_Date,
      voucher_id: order.Voucher_ID,
      shipper_id: order.Shipper_ID,
      shipper_name: order.Shipper_Name,
      logistic_company_name: order.Logistic_Company_Name,
      shipping_cost: order.Shipping_Cost,
      product_name: order.Product_Name,
      product_quantity: order.Quantity,
    }));

    callback(null, { orders });
  } catch (error) {
    console.error("Database error:", error);
    callback({
      code: 13,
      details: "Database error while fetching employee orders",
    });
  }
};

// Show order statuses
const showOrderStatus = async (call, callback) => {
  try {
    const [rows] = await db.query(`CALL order_cus_voucher.ShowOrderStatus()`);
    const statuses = rows[0].map((status) => ({
      status_id: status.ID,
      name: status.Name,
    }));
    callback(null, { statuses });
  } catch (error) {
    console.error("Database error:", error);
    callback({
      code: 13,
      details: "Database error while fetching order statuses",
    });
  }
};

// Show shipper info
const showShipperInfo = async (call, callback) => {
  try {
    const [rows] = await db.query(`CALL order_cus_voucher.ShowShipperInfo()`);
    const shippers = rows[0].map((shipper) => ({
      id: shipper.Shipper_ID,
      name: shipper.Shipper_Name,
    }));
    callback(null, { shippers });
  } catch (error) {
    console.error("Database error:", error);
    callback({
      code: 13,
      details: "Database error while fetching shipper info",
    });
  }
};

const showVoucherInfo = async (call, callback) => {
  try {
      const [rows] = await db.query(`CALL order_cus_voucher.ShowVoucherInfo()`);
      const vouchers = rows[0].map(voucher => ({
        id : voucher.ID,
        name : voucher.Name,
        price:voucher.Amount
      }));
      callback(null, { vouchers } );
  } catch (error) {
      console.error('Database error:', error);
      callback({ code: 13, details: 'Database error while fetching shipper info' });
  }
};

// Get customer details
const getCustomerDetails = async (call, callback) => {
  try {
    const [rows] = await db.query(
      `CALL order_cus_voucher.GetCustomerDetails()`
    );
    const customers = rows[0].map((customer) => ({
      id: customer.ID,
      name: customer.Name,
      phone_no: customer.Phone_no,
    }));
    callback(null, { customers });
  } catch (error) {
    console.error("Database error:", error);
    callback({
      code: 13,
      details: "Database error while fetching customer details",
    });
  }
};

const fetchProductList = async (call, callback) => {
  try {
    const [results] = await db.query("CALL batch_product.GetProductList()");

    // results[0] because stored procedure results are nested in an extra array
    const products = results[0].map((product) => ({
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
    console.error("Database error:", error);
    callback({
      code: grpc.status.INTERNAL, // Use grpc.status for better error codes
      details: "Database error",
    });
  }
};

module.exports = {
  fetchUsers,
  insertEmployee,
  updateEmployeePassword,
  updateEmployeeJobType,
  showAllEmployees,
  showOneEmployee,
  insertOrder,
  getAllOrders,
  getEmployeeOrders,
  showOrderStatus,
  showShipperInfo,
  getCustomerDetails, fetchProductList,signin,showVoucherInfo};

