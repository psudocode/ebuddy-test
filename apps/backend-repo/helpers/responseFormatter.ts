import {
  DataEnum,
  LoginResponseData,
  User,
  ValidationErrorData,
} from "@repo/types";
import { Response } from "express";

const baseResponse = (
  res: Response,
  statusCode: number,
  statusMessage: string,
  message: string,
  data: any
) => {
  res.status(statusCode).send({
    status: statusMessage,
    message,
    data,
  });
};

// Base Success Response
const successResponse = (res: Response, message: string, data: any) => {
  baseResponse(res, 200, "success", message, data);
};

// Base Error Response
const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: DataEnum
) => {
  baseResponse(res, statusCode, "error", message, data);
};

const error200 = (res: Response, message: string, data: DataEnum) => {
  errorResponse(res, 200, message, data);
};

// Custom Error Response
const error422 = (res: Response, message: string, data: DataEnum) => {
  errorResponse(res, 422, message, data);
};

const error401 = (res: Response, message: string, data: DataEnum) => {
  errorResponse(res, 401, message, data);
};

const error404 = (res: Response, message: string, data: DataEnum) => {
  errorResponse(res, 404, message, data);
};

export {
  baseResponse,
  error200,
  error422,
  error401,
  error404,
  successResponse,
  errorResponse,
};
