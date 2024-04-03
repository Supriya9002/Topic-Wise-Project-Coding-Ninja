//Manage paths/routs to ProductController
//1. import express
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
}); // , {name: "imgUrl"} //single() function means spacify name of the fild, it is "imgUrl"
//যদি akhane অনক গুলো malter। File thakto tahole "array()" function use করতাম, single() ar বদলে o array() function use korte pari 
router.get("/:id", (req, res)=>{
    productController.getOneProduct(req, res)
});

//router.get("/fff", productController.filterProduct); // line.no 13 ar dublicate, ai code ta akhane likhle output asbe na. output= "Product is not found debe"
// একে চেনার উপায় হলো, এ কোনো error debe na, VS code shudu URL print hoye jabe , example= fff
//router.post("/ratting", productController.rattingProduct);


export default router;