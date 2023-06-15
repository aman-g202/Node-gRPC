const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

/* Stopped the static load of proto files */
// const services = require("./proto/demo_service_grpc_pb");
// const messages = require("./proto/demo_service_pb");

var PROTO_PATH = `../protos/demo_service.proto`;

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const register = (call, callback) => {
  let user = {
    name: call.request.name,
    email: call.request.email,
    password: call.request.password, 
  };

  /* Used when compiled proto files are generated using grpc tool */
  // let resp = new demo_rpc.UserResponse();
  // resp.setId(new Date().getTime().toString());
  // resp.setName(user.name);
  // resp.setEmail(user.email);
  // resp.setToken("aman");

  const resp = {
    id: new Date().getTime().toString(),
    name: user.name,
    email: user.email,
    token: "Aman",
  };

  callback(null, resp);
};

var demo_rpc = grpc.loadPackageDefinition(packageDefinition).demo_rpc;

let server = new grpc.Server();
server.addService(demo_rpc.DemoSvc.service, {
  registerUser: register,
});
let address = "127.0.0.1" + ":" + 50051;
server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("Server running at " + address);
});
