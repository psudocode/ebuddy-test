import express, { Express, Request, RequestHandler, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import { error404, successResponse } from "./helpers/responseFormatter";
import cors from "cors";

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  successResponse(res, "Server is running well", {
    serverDate: new Date().toISOString(),
  });
});

app.use(userRouter);

app.get("*", function (req, res) {
  error404(res, "Path not found", null);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
