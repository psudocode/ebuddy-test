// validate request token (express middleware) with firestore database

// NOTE:
// not implementing the token refresh mechanism yet
// the token will be valid for 1 hour

import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { error401 } from "../helpers/responseFormatter";
import logging from "./loggingMiddleware";

const jwt_secret = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : "defaultS3cr3t";

const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      error401(res, "Not authorized", null);
    }
    try {
      const decoded = jwt.verify(token as string, jwt_secret) as { id: string };

      if (typeof decoded !== "object") {
        error401(res, "Not authorized", null);
      }

      // LOGGING :
      // recording and updating the user's last activity
      // update recent activity before proceeding
      await logging.updateRecentActivity(decoded.id);

      // set locals for the next middleware
      res.locals.id = decoded.id;

      next();
    } catch (error) {
      error401(res, "Not authorized", null);
    }
  }
);

export default authMiddleware;
