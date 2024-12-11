// import { grpc } from "./improbable-eng/grpc-web";

// class MyServiceClient {
//   private readonly client;

//   constructor(endpoint: string) {
//     this.client = grpc.client(MyService.GetData, {
//       host: endpoint,
//     });
//   }

//   getData(request: Request): Promise<Response> {
//     return new Promise((resolve, reject) => {
//       this.client.start();

//       this.client.onMessage((response: Response) => {
//         resolve(response);
//       });

//       this.client.onEnd((status: grpc.Code, message: string) => {
//         if (status !== grpc.Code.OK) {
//           reject(new Error(message));
//         }
//       });

//       this.client.send(request);
//       this.client.finishSend();
//     });
//   }
// }

// // Usage:
// const client = new MyServiceClient("http://localhost:8080");
// client.getData({ query: "Hello!" }).then(console.log).catch(console.error);
