const express = require('express');
const grpc = require('@grpc/grpc-js');
// const protoLoader = require('@grpc/proto-loader');

// const PROTO_PATH = './protos/service.proto';
// const packageDefinition = protoLoader.loadSync(PROTO_PATH);
// const exampleProto = grpc.loadPackageDefinition(packageDefinition).ExampleService;

// const grpcClient = new exampleProto('localhost:50051', grpc.credentials.createInsecure());

const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './protos/service.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const client = new protoDescriptor.DatabaseService('localhost:50051', grpc.credentials.createInsecure());


const app = express();
app.use(express.json());
const PORT = 8080;

app.get('/api/v1/example/:id', (req, res) => {
    const id = req.params.id;
    client.GetUser({ id }, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});


app.post('/api/v1/insertEmployee', (req, res) => {
    const {
        name, address, account, password, phone_no,
        working_type, job_type, credential
    } = req.body;

    const request = {
        name, address, account, password,
        phone_no, working_type, job_type, credential
    };

    client.InsertEmployee(request, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.post('/api/v1/updateEmployeePassword', (req, res) => {
    const { id, new_password } = req.body;
    client.UpdateEmployeePassword({ id, new_password }, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.post('/api/v1/updateEmployeeJobType', (req, res) => {
    const { id, new_job_type } = req.body;
    client.UpdateEmployeeJobType({ id, new_job_type }, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.get('/api/v1/showAllEmployees', (req, res) => {
    client.ShowAllEmployees({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.get('/api/v1/showAllEmployees/:id', (req, res) => {
    // const { empID } = req.body;
    const empID = req.params.id;

    client.ShowOneEmployee({ empID }, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.post('/api/v1/insertOrder', (req, res) => {
    const {
        destination, note, distance, order_status_id, total,
        cust_id, cust_name, cust_phone_no, order_date, voucher_id,
        shipper_id, shipper_cost, order_items, employee_id
    } = req.body;

    const request = {
        destination, note, distance, order_status_id, total,
        cust_id, cust_name, cust_phone_no, order_date, voucher_id,
        shipper_id, shipper_cost, order_items, employee_id
    };

    client.InsertOrder(request, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.get('/api/v1/getAllOrders', (req, res) => {
    client.GetAllOrders({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});
app.get('/api/v1/getEmployeeOrders/:id', (req, res) => {
    // const { empID } = req.body;
    const empID = req.params.id;

    client.GetEmployeeOrders({ empID }, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.get('/api/v1/showOrderStatus', (req, res) => {
    client.ShowOrderStatus({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.get('/api/v1/showShipperInfo', (req, res) => {
    client.ShowShipperInfo({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.get('/api/v1/getCustomerDetails', (req, res) => {
    client.GetCustomerDetails({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});


// Endpoint to get the product list
app.get('/api/v1/products', (req, res) => {
    client.GetProductList({}, (err, response) => { // Use an empty object {} for the Empty message
      if (err) {
        console.error("gRPC Error:", err);
        if (err.code === grpc.status.UNIMPLEMENTED) {
          res.status(501).send({ error: "gRPC method not implemented on the server" });
        } else {
          res.status(500).send({ error: "An error occurred while fetching data from gRPC server" });
        }
      } else {
        res.json(response); // Use the generated getter for the repeated field
      }
    });
  });

// Serve Frontend Static Files
// app.use(express.static(path.join(__dirname, 'dist')));

// Catch-All Route for Frontend
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`REST server running on http://localhost:${PORT}`);
});
