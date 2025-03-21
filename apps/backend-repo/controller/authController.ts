// NOTES :
// not implementing refresh token for simplicity
// when token expires, user will have to login again

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

import db from "../helpers/database";
import { User } from "@repo/types";
import { error422, successResponse } from "../helpers/responseFormatter";
import loggingMiddleware from "../middleware/loggingMiddleware";

const jwt_secret = process.env.JWT_SECRET || "defaultS3cr3t";
const salt = process.env.SALT_ROUNDS || 10;

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let result = {} as User;

  // fetch user from firestore
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", email).get();

  if (snapshot.empty) {
    error422(res, "There is no user with that email address", null);
    return;
  }

  snapshot.forEach((doc) => {
    result = { id: doc.id, ...doc.data() } as User;
  });

  // compare password hash with bcrypt
  const validPassword = await bcrypt.compare(password, result.password);

  if (!validPassword) {
    error422(res, "Invalid password", null);
    return;
  }

  // create jwt token
  const token = jwt.sign({ id: result.id, email }, jwt_secret, {
    expiresIn: "1h",
  });

  // record recent activity
  await loggingMiddleware.updateRecentActivity(result.id);

  // exclude password from response
  const { password: _, ...userWithoutPassword } = result;

  successResponse(res, "Login successful", {
    token,
    user: userWithoutPassword,
  });
});

// we not implementing register for now as per requirement
const register = asyncHandler(async (req: Request, res: Response) => {
  // not implemented yet
  // creating the password hash (dev purpose)
  // const hashedPassword = await bcrypt.hash("qwerty", salt);
  // console.log(hashedPassword);
  // success(res, "Register successful", { password: hashedPassword });
});

export default { login, register };
