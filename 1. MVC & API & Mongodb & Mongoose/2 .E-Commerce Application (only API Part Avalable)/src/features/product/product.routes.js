//Manage paths/routs to ProductController
//1. import express
import express from "express"
import ProductController from "../product/product.controller.js"
import uplodeFile from "./../../middlewares/fileUplode.middleware.js"

//2.initialize Express router.
const router=express.Router();
const productController = new ProductController();

// All the paths to the controller methods.
// localhost/api/products
router.post("/ratting", productController.rattingProduct);
router.get("/filter", productController.filterProduct); // এই কোড টা যদি line no 17 এর পর লিখতাম, তাহলে Postman a Product is not found দেখাতো কারণ filter router ke age call korte হবে, [Bcz Help TA ?]
router.get("/", productController.getAllProducts);
router.post("/",uplodeFile.single("imgUrl"), productController.addProduct); // , {name: "imgUrl"} //single() function means spacify name of the fild, it is "imgUrl"
//যদি akhane অনক গুলো malter। File thakto tahole "array()" function use করতাম, single() ar বদলে o array() function use korte pari 
router.get("/:id", productController.getOneProduct);
//router.get("/fff", productController.filterProduct); // line.no 13 ar dublicate, ai code ta akhane likhle output asbe na. output= "Product is not found debe"
// একে চেনার উপায় হলো, এ কোনো error debe na, VS code shudu URL print hoye jabe , example= fff
//router.post("/ratting", productController.rattingProduct);


export default router;