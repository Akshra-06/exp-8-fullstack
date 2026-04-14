import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "../server/src/config/env.js";
import authRouter from "../server/src/routes/auth.routes.js";
import userRouter from "../server/src/routes/user.routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "../server/src/middlewares/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientOrigin }));
app.use(morgan("dev"));
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API routes - no /api prefix since Vercel rewrites /api/* to /api
app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
