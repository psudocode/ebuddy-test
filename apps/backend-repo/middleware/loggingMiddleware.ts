import { Timestamp } from "firebase-admin/firestore";
import db from "../helpers/database";

// record recent activity of user (when user access the routes with right token)
// etc : login, fetch user data, update user data

const updateRecentActivity = async (id: string) => {
  const usersRef = db.collection("users").doc(id);
  await usersRef.update({
    recentlyActive: Timestamp.fromDate(new Date()),
  });
};

export default { updateRecentActivity };
