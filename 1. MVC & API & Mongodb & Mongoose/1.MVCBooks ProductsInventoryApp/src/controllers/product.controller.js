import path from 'path'
import ProductModel from '../models/product.model.js'

export default class ProductController{

    getdetails(req, res){
        console.log(path.resolve());
        let pro= ProductModel.get();
        //console.log(pro);
        //return res.sendFile(path.join(path.resolve(),"src",'view',"products.ejs" ));
        res.render("products", {products:pro, userEmail: req.session.userEmail});
    }
    getAddFrom(req,res, next){
        return res.render('new-products',{errorMessage: null, userEmail: req.session.userEmail}) //{} ami kono data pass korachina tai
    }

    //receved the data from form

    addnewProducts(req,res, next){
        //access data from form
        //console.log(req.body);
        const {name, des, price}=req.body;
        const imgUrl= "images/"+ req.file.filename;
        ProductModel.add(name, des, price, imgUrl);
        let pro= ProductModel.get(); //updateing pro (product) from the model
        res.render("products", {products:pro, userEmail: req.session.userEmail}); //This method is used to render HTML views using 
        //a template engine. It takes a view (template) as the first argument and an optional object containing local variables as 
        //the second argument.
        //return res.send(); //This method is a more general-purpose method for sending a response to the client. It can be used to 
        //send various types of responses, including HTML, JSON, plain text, etc.it sends an empty response.
    }
    getUpdateProductView(req, res, next){
        // if product exit then return view
        //const {id}= req.body;
        const id = req.params.id; //This ID parameter here. 
        //That is that you can access using request dot. Parents request.parents is the object, 
        //which allows you to access all the URL parameters, which you have defined here. So request dot, 
        //param params dot ID will give you the value which client has passed for this URL. Okay. Now let's try, I'm going to

        const productIdFound= ProductModel.getById(id);
        if(productIdFound){
            return res.render("update-product", {product: productIdFound, errorMessage: null, userEmail: req.session.userEmail});
        }
        //else return error
        else{
            return res.status(401).send("product not found");
        } 
    }
    postUpdateProducts(req,res){
        ProductModel.update(req.body);
        var products= ProductModel.get();
        res.render("products", {products : products});
        //res.redirect("/");
    }
    deleteProduct(req,res){
        const id= req.params.id;
        const productFound= ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send("Product is not found");
        }
       
        ProductModel.delete(id);
        var products= ProductModel.get();
        res.render("products", {products, userEmail: req.session.userEmail});
    }
}

