import validation from "../helpers/validation";
import privateRoute from "../middleware/authMiddleware";
import express from "express";
import authCtrl from "../controller/authController";
import userCtrl from "../controller/userController";

const router = express.Router();

router.post("/login", validation.validateLogin as any, authCtrl.login);

// not implementing register for now as per requirement
// router.post("/register", authCtrl.register);

router.get("/fetch-user-data", privateRoute, userCtrl.fetchUserData);
router.get("/fetch-users-data", privateRoute, userCtrl.fetchUsersData);

router.put(
  "/update-user-data",
  privateRoute,
  validation.validateUpdate as any,
  userCtrl.updateUserData
);

export default router;
