import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { successResponse } from "../helpers/responseFormatter";

import db from "../helpers/database";
import { User } from "@repo/types";
import sortingPriority from "../helpers/sortingPriority";

const fetchUserData = asyncHandler(async (req: Request, res: Response) => {
  // for security reason, we only allow user to fetch their own data
  const { id } = res.locals;

  const usersRef = db.collection("users").doc(id);
  const doc = await usersRef.get();

  if (!doc.exists) {
    successResponse(res, "No user found", null);
    return;
  } else {
    successResponse(res, "User data fetched", {
      id: doc.id,
      ...doc.data(),
    } as User);
  }
});

const fetchUsersData = asyncHandler(async (req: Request, res: Response) => {
  const usersRef = db.collection("users");

  // sort by totalAverageWeightRatings for firestore query
  const snapshot = await usersRef
    .orderBy("totalAverageWeightRatings", "desc")
    .limit(10)
    .offset(0)
    .get();

  const users: User[] = [];

  if (snapshot.empty) {
    successResponse(res, "No users found", []);
    return;
  }

  snapshot.forEach((doc) => {
    users.push({
      id: doc.id,
      ...doc.data(),
    } as User);
  });

  // resorting the Users data
  // priority 1 : totalAverageWeightRatings
  // priority 2 : numberOfRents
  // priority 3 : recentlyActive
  const sortedUsers = sortingPriority(users);

  successResponse(res, "Users data fetched", sortedUsers);
});

// NOTES :
// we only can update the name and username for now (for simplicity)
const updateUserData = asyncHandler(async (req: Request, res: Response) => {
  // for security reason, we only allow user to update their own data
  // we get the user id from the token pass by authMiddleware
  const { id } = res.locals;

  const usersRef = db.collection("users").doc(id);
  const { name, username } = req.body;
  const data = { name, username };

  await usersRef.update(data);

  usersRef.get().then((doc) => {
    if (!doc.exists) {
      successResponse(res, "No user found", {});
      return;
    }
    const { password, ...userData } = doc.data() as User;
    successResponse(res, "User data updated", userData);
  });
});

export default { fetchUserData, updateUserData, fetchUsersData };
