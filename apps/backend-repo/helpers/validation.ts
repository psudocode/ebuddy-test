import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { error200 } from "./responseFormatter";
import { ValidationErrorDataItem } from "@repo/types";

const validationErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return error200(
      res,
      "Validation error",
      errors.array() as ValidationErrorDataItem[]
    );
  next();
};

const validateEmail = () =>
  body("email")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Email can not be empty!")
    .bail()
    .isEmail()
    .withMessage("Email format is invalid")
    .bail();

const validatePassword = () =>
  body("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Password can not be empty!")
    .bail();

const validateUsername = () =>
  body("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Username can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail();

const validateName = () =>
  body("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail();

const validateRegister = [
  validateUsername(),
  validateEmail(),
  validatePassword(),
  validationErrorHandler,
];

const validateLogin = [
  validateEmail(),
  validatePassword(),
  validationErrorHandler,
];

const validateUpdate = [
  validateUsername(),
  validateName(),
  validationErrorHandler,
];

export default { validateLogin, validateRegister, validateUpdate };
