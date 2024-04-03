import ProductModel from "./product.model.js"

export default class ProductController{

    getAllProducts(req,res){
        const products = ProductModel.getAll();
        res.status(200).send(products);
    }
    addProduct(req, res){
        console.log(req.body);
        console.log("This is post request");
        console.log(req.file.filename);
        const {name, price, imgUrl, sizes}= req.body;
        const newProduct= {name, price: parseFloat(price), imgUrl: req.file.filename, sizes: sizes.toString().split(','),}; 
        const recordProduct= ProductModel.add(newProduct);
        res.status(200).send(recordProduct);
    }

    getOneProduct(req, res){
        const id= req.params.id;
        console.log(id);
        const product = ProductModel.getId(id);
        if(!product){
            res.status(404).send("Product not found");
        }else{
            res.status(200).send(product);
        }
    }

    filterProduct(req, res){
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        console.log(req.query.minPrice);
        const result = ProductModel.filter(minPrice, maxPrice, category);
        console.log("filter function call")
        res.status(200).send(result);
    }
    rattingProduct(req, res){
        const userID = req.query.userID;
        const productID = req.query.productID;
        const ratting = req.query.ratting;
        console.log(req.query.userID);
        const result = ProductModel.addRatting(userID, productID, ratting);
        console.log(result);
        if(!result){
            res.status(200).send("Ratting add Complete");
        }
        else{
            res.status(401).send("error")
        }
    }
}