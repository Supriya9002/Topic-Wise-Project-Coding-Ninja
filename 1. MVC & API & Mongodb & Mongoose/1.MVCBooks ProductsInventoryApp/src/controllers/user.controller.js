import userModel from "../models/user.model.js"
import ProductModel from "../models/product.model.js"

export default class userController {
    getRegister(req, res){
        res.render("register");
    }
    getLogin(req, res){
        res.render("login", {errorMessage: null});
    }
    postRegister(req, res){
        const {name, email, password}= req.body;
        console.log(req.body);
        userModel.add(name, email, password);
        res.render("login", {errorMessage: null});
    }
    postLogin(req, res){
        const {email, password}= req.body;
        const user= userModel.isValidUsers(email, password);
        console.log(user);
        if(!user){
            //res.send("invalid CCCC");
            return res.render("login", {errorMessage: "Invalid Credential"});
        }
        // req.session.userEmail= email;
        req.session.userEmail=email; // session id stored in cookies, my question what meaning of userEmail and what its syntax
        console.log(req.session.userEmail);
        //console.log(locals.userEmail);
        var products= ProductModel.get();
        res.render("products", {products: products, errorMessage: null, userEmail: req.session.userEmail }); //userEmail: req.session.userEmail na dile logout show hoto 
    }
    logout(req, res, next){
        //on logout , destroy the session
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect("/login")
            }
        });
        res.clearCookie("lastVisit");
    }
}