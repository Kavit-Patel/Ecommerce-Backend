import express from "express";
import { addNewProduct } from "../controllers/productController";
import { isAdmin } from "../controllers/userController";

const productRouter = express.Router();

productRouter.post("/addNewProduct", isAdmin, addNewProduct);

export default productRouter;
