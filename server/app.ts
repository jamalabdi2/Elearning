require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/Error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";


app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());


const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true
};

app.use(cors(corsOptions));

//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/layouts", layoutRouter);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// unknow routes
app.get("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(
    `Route ${req.originalUrl} does not exists in this server`
  ) as any;
  error.statusCode = 404;
  next(error);
});
app.use(ErrorMiddleware);
