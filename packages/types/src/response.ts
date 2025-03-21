import { User } from "./user";

type DataEnum =
  | User
  | User[]
  | ValidationErrorData
  | ValidationErrorDataItem[]
  | LoginResponseData
  | null;

interface LoginResponseData {
  token: string;
  user: User;
}

// {type: 'field', value: '', msg: 'Email can not be empty!', path: 'email', location: 'body'}

interface ValidationErrorDataItem {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

interface ValidationErrorData {
  errors: ValidationErrorDataItem[];
}

interface BaseResponse {
  status: string;
  message: string;
  data: DataEnum;
}

export type {
  BaseResponse,
  ValidationErrorData,
  ValidationErrorDataItem,
  LoginResponseData,
  DataEnum,
};
