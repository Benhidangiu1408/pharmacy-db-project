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

// Serve Frontend Static Files
// app.use(express.static(path.join(__dirname, 'dist')));

// Catch-All Route for Frontend
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`REST server running on http://localhost:${PORT}`);
});
