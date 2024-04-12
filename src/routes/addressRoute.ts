import express from "express";
import {
  addNewAddress,
  deleteUserAddress,
  fetchUserAddress,
  updateUserAddress,
} from "../controllers/addressController";

const addressRouter = express.Router();

addressRouter.post("/addNewAddress/:userId", addNewAddress);
addressRouter.get("/fetchUserAddress/:userId", fetchUserAddress);
addressRouter.put("/updateUserAddress/:userId", updateUserAddress);
addressRouter.delete(
  "/deleteUserAddress/:userId/:addressId",
  deleteUserAddress
);

export default addressRouter;
