import ProductModel from "./product.model.js"
import ProductRepository from "./product.repository.js"

export default class ProductController{

    constructor(){
        this.ProductRepository = new ProductRepository();
    }

    async getAllProducts(req,res){
        try{
            const products = await this.ProductRepository.getAll();
            res.status(200).send(products);
        }catch(err){
            console.log(err);
            res.status(503).send("Something Wrong");
        }
    }

    async addProduct(req, res){
        try{
            console.log(req.body);
            console.log("This is post request");
            console.log(req.file.filename);
            const {name, price, imgUrl, sizes}= req.body;
            const newProduct= new ProductModel(name, null,  parseFloat(price), req.file.filename, null,  sizes.toString().split(','));
            const recordProduct= await this.ProductRepository.add(newProduct);
            res.status(200).send(recordProduct);
        }catch(err){
            console.log(err);
            res.status(200).send("Something Wrong");
        }
    }

    async getOneProduct(req, res){
        try{
            const id= req.params.id;
            console.log(id);
            const product = await this.ProductRepository.getId(id);
            if(!product){
                res.status(404).send("Product not found");
            }else{
                res.status(200).send(product);
            }
        }catch(err){
            console.log(err);
            res.status(200).send("Something Wrong");
        }
    }

    async filterProduct(req, res){
        try{
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            console.log(req.query);
            const result = await this.ProductRepository.filter(minPrice, maxPrice, category);
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            res.status(200).send("Something Wrong");
        }
    }
    async rattingProduct(req, res){
        try{
            const userID = req.userID;
            console.log(userID);
            const productID = req.query.productID;
            const ratting = req.query.ratting;
            console.log(req.query.productID, req.query.ratting)
            await this.ProductRepository.ratting(userID, productID, ratting);
            res.status(200).send("Ratting add Complete");
        }catch(err){
            console.log(err);
            res.status(200).send("Something Wrong");
        }
    }
    async averagePrice(req, res, next){
        try{
          const result =await this.ProductRepository.averageProductPricePerCategory();
          res.status(200).send(result);
        }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");
      }
    }
}