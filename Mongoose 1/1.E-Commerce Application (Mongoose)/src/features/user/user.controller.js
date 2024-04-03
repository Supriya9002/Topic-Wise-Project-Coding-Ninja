
import UserModel from "./user.model.js"
import Jwt  from "jsonwebtoken";
import UserRepository from "./user.repository.js"
import ApplicationError from "../../error-handler/error-handler.middleware.js";
import bcrypt from "bcrypt"

export default class UserController{
    constructor(){
        this.UserRepository = new UserRepository();
    }
    
    async register(req, res){
        const {name, email, password, type} = req.body;
        //console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 12);
        //console.log("Dekh beta HashedPassword: ",hashedPassword);
        const newUser = new UserModel(name, email, hashedPassword, type);
        const result = await this.UserRepository.singUP(newUser);
        //console.log("A lo hashedPassword", hashedPassword, "a lo newuser", newUser, "a lo result", result);
        res.status(201).send(result);
    }
    async login(req, res){
        try{
            const {email, password}= req.body;
            const check = await this.UserRepository.findEmail(email);
            console.log(req.body, " alo ", check);
            if(!check){
                console.log("Check false Supriya");
                return res.status(401).send("Incorrect Credentials");
            }
            else{
                const result = await bcrypt.compare(password, check.password);
                //console.log("a lo body",req.body,"a lo check",check, "a lo result", result);
                console.log("Comare Password: ",check.password, password ); 
                if(result){
                    console.log("supriya")
                    // 1. Create token.
                    const token = Jwt.sign(  
                    {
                        userID: check._id,
                        email: check.email,
                    },
                    //'AnC8dWuCU0',
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h", 
                    }
                    );
                    // 2. Send token.
                    console.log(token);
                    res.status(201).send(token);
                }else{
                    return res.status(400).send('Incorrect Credentials');
                }
            }
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
    async resetPassword(req, res, next){
        try{
            const {password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            const userId = req.userID;
            console.log("A lo userid", userId);
            const result = await this.UserRepository.ResetPassword(hashedPassword, userId);
            console.log("A lo password", password, "A lo hashedpassword", hashedPassword, "alo resulr", result);
            res.status(201).send("Password is update");
        }catch(err){
            console.log(err);
            console.log("Passing error to middleware");
            next(err);
        }
    }
}
