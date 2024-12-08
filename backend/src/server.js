const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { fetchUsers } = require('./services');

const PROTO_PATH = './protos/service.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const databaseService = protoDescriptor.DatabaseService;

const server = new grpc.Server();
server.addService(databaseService.service, { GetUser: fetchUsers });

const PORT = 50051;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) throw err;
  console.log(`gRPC server running on port ${port}`);
  server;
});

// const grpc = require('@grpc/grpc-js');
// const { Server } = require('grpc-web-node-server');
// const protoLoader = require('@grpc/proto-loader');
// const { fetchUsers } = require('./services');

// const PROTO_PATH = './protos/service.proto';
// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   arrays: true,
// });
// const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// const databaseService = protoDescriptor.DatabaseService;

// // Set up the gRPC server
// const server = new grpc.Server();
// server.addService(databaseService.service, { GetUser: fetchUsers });

// // Start the gRPC server
// const grpcWebServer = new Server(server, {
//   grpcPort: 50051,  // gRPC server port
//   grpcWebPort: 8080,  // gRPC-Web server port (this is the one you'll use in the frontend)
// });

// grpcWebServer.start();
// console.log('gRPC-Web server running on http://localhost:8080');





