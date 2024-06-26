import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { ConnectDB } from "./ConnectDB/connection";
import errorHandler from "./ErrorHandling/error";
import { errorMiddleware } from "./ErrorHandling/error";
import productRouter from "./routes/productRoute";
import userRouter from "./routes/userRoute";
import cors from "cors";
import cookieParser from "cookie-parser";
import cartRouter from "./routes/cartRoute";
import addressRouter from "./routes/addressRoute";
import orderRouter from "./routes/orderRoute";
import paymentRouter from "./routes/paymentRoute";
import Stripe from "stripe";
const app = express();
config();
const allowedOrigins = process.env.CORS_URL
  ? process.env.CORS_URL.split(",")
  : [];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new Error(`Cors Policy doesn't allow ${origin}  !`),
          false
        );
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
export const stripe = new Stripe(process.env.STRIPE_KEY || "-");

config();
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
ConnectDB(DB_URL);

app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", addressRouter);
app.use("/api", orderRouter);
app.use("/api", paymentRouter);

app.use(errorMiddleware);
app.listen(PORT || 4000, () => console.log(`Express running on ${PORT}`));
