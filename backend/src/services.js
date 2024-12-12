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

module.exports = { fetchUsers, fetchProductList };
