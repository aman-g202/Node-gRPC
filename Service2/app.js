// const messages = require('./proto/demo_service_pb');
// const services = require('./proto/demo_service_grpc_pb');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

var PROTO_PATH = `../protos/demo_service.proto`;

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

var demo_rpc = grpc.loadPackageDefinition(packageDefinition).demo_rpc;

function main() {
  const client = new demo_rpc.DemoSvc( 
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
  );

  /* Used when compiled proto files are generated using grpc tool */
  //   // Access your message instance
  //   const RegisterUser = demo_rpc.DemoSvc.service.RegisterUser;
  //   // Create a new instance of your message
  //   const registerReq = new RegisterUser();
  //   registerReq.setName("Hello");
  //   registerReq.setEmail("hello@world.com");
  //   registerReq.setPassword("Password");
  //   registerReq.setNumber(7415);

  const obj = {
    name: "John",
    email: "john@gmail.com",
    password: "Password",
    number: 7415,
  };

  client.registerUser(obj, function (err, response) {
    console.log(response);
  });
}

main();

/* For two way communication */
let server = new grpc.Server();
server.addService(demo_rpc.DemoSvc.service, {
  getUser: () => {},
});
let address = "127.0.0.1" + ":" + 50052;
server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("Server running at " + address);
});
