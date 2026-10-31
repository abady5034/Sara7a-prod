import express from "express";
import { env } from "./config/env.service.js";
import { databaseConnection } from "./database/connection.js";
import userRouter from "./module/user/user.controller.js";
import authRouter from "./module/auth/auth.controller.js";
import messageRouter from "./module/message/message.controller.js";
import { BadRequestException, globalHandlingError, redis } from "./common/index.js";
import { redisConnection } from "./database/redis/connection.js";
import { decrypting } from "./common/services/encrypting.service.js";

const app = express();
const port = env.port;

await databaseConnection();
export let client = await redisConnection();

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);
app.use(globalHandlingError);

app.get("/", (req, res) => {
  res.json("Server Running");
});

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});


