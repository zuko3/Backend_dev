import axios from "axios";
import { StatusCodes } from "http-status-codes";

async function healthCheck(request, reply) {
  try {
    const uri = `${process.env.AUTH_SERVICE_URI}/ping`;
    const headerOpts = {
      headers: {
        "x-com": request?.headers?.["x-com"],
      },
    };
    const response = await axios.get(uri, headerOpts);
    reply.status(StatusCodes.OK).send(response.data);
  } catch (err) {
    throw err;
  }
}

async function handleLogin(request, reply) {
  try {
    const uri = `${process.env.AUTH_SERVICE_URI}/db/login`;
    const headerOpts = {
      headers: {
        "x-com": request?.headers?.["x-com"],
      },
    };
    const response = await axios.post(uri, request.body, headerOpts);
    reply.status(StatusCodes.OK).send(response.data);
  } catch (err) {
    throw err;
  }
}

async function handleSignUp(request, reply) {
  try {
    const uri = `${process.env.AUTH_SERVICE_URI}/db/signup`;
    const headerOpts = {
      headers: {
        "x-com": request?.headers?.["x-com"],
      },
    };
    const response = await axios.post(uri, request.body, headerOpts);
    reply.status(StatusCodes.OK).send(response.data);
  } catch (err) {
    throw err;
  }
}

async function validateAuthToken(request, reply) {
  try {
    const uri = `${process.env.AUTH_SERVICE_URI}/validate`;
    const headerOpts = {
      headers: {
        "x-com": request.headers?.["x-com"],
        "x-auth-token": request.headers?.["x-auth-token"],
      },
    };
    const response = await axios.get(uri, headerOpts);
    reply.status(StatusCodes.OK).send(response.data);
  } catch (err) {
    throw err;
  }
}

export { healthCheck, handleLogin, handleSignUp, validateAuthToken };
