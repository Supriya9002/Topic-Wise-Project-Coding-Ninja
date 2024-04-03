
import express from "express"
import ProductController from "../product/product.controller.js"
import uplodeFile from "./../../middlewares/fileUplode.middleware.js"

//2.initialize Express router.
const router=express.Router();
const productController = new ProductController();

// All the paths to the controller methods.
router.get("/averagePrice", (req, res, next)=>{
    productController.averagePrice(req, res)
});
router.post("/ratting", (req, res)=>{
    productController.rattingProduct(req, res)
});
router.get("/filter", (req, res)=>{
    productController.filterProduct(req, res)
}); 
router.get("/", (req, res)=>{
    productController.getAllProducts(req, res)
});
router.post("/",uplodeFile.single("imgUrl"), (req, res)=>{
    productController.addProduct(req, res);
});
router.get("/:id", (req, res)=>{
    productController.getOneProduct(req, res)
});


export default router;