import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const useEmulator = process.env.USE_EMULATOR;

if (useEmulator) {
  process.env["FIRESTORE_EMULATOR_HOST"] = process.env.EMULATOR_HOST;
}

initializeApp({
  credential: cert(
    require("../config/ebuddy-test-6dbb9-firebase-adminsdk-fbsvc-98da636380.json")
  ),
});

const db = getFirestore();

export default db;
