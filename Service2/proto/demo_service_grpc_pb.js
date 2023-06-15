// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var demo_service_pb = require('./demo_service_pb.js');

function serialize_demo_rpc_RegisterUser(arg) {
  if (!(arg instanceof demo_service_pb.RegisterUser)) {
    throw new Error('Expected argument of type demo_rpc.RegisterUser');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_rpc_RegisterUser(buffer_arg) {
  return demo_service_pb.RegisterUser.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_demo_rpc_UserResponse(arg) {
  if (!(arg instanceof demo_service_pb.UserResponse)) {
    throw new Error('Expected argument of type demo_rpc.UserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_rpc_UserResponse(buffer_arg) {
  return demo_service_pb.UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DemoSvcService = exports.DemoSvcService = {
  registerUser: {
    path: '/demo_rpc.DemoSvc/registerUser',
    requestStream: false,
    responseStream: false,
    requestType: demo_service_pb.RegisterUser,
    responseType: demo_service_pb.UserResponse,
    requestSerialize: serialize_demo_rpc_RegisterUser,
    requestDeserialize: deserialize_demo_rpc_RegisterUser,
    responseSerialize: serialize_demo_rpc_UserResponse,
    responseDeserialize: deserialize_demo_rpc_UserResponse,
  },
};

exports.DemoSvcClient = grpc.makeGenericClientConstructor(DemoSvcService);
