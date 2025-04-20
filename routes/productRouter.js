import express from "express";
import { deletceProduct, getProducts, getProductById, saveProduct, updateProduct, } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/",saveProduct);
productRouter.put("/:productId", updateProduct)
productRouter.delete("/:productId", deletceProduct)
productRouter.get("/:productId", getProductById)

              


export default productRouter;