import express from "express";
import {
  addNewUser,
  cookieAutoLogin,
  isAdmin,
  loginUser,
  logOutUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/addNewUser", addNewUser);
userRouter.post("/loginUser", loginUser);
userRouter.get("/cookieAutoLogin", cookieAutoLogin);
userRouter.get("/logoutUser", logOutUser);

export default userRouter;
