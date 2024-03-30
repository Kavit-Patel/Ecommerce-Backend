import express from "express";
import {
  addNewUser,
  cookieAutoLogin,
  isAdmin,
  loginUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/addNewUser", addNewUser);
userRouter.post("/loginUser", loginUser);
userRouter.get("/cookieAutoLogin", cookieAutoLogin);

export default userRouter;
