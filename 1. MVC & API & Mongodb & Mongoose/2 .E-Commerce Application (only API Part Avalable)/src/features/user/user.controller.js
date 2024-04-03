import UserModel from "./user.model.js"
import Jwt  from "jsonwebtoken";
import ProductModel from "../product/product.model.js"


export default class UserController{
    
    async register(req, res){
        const {name, email, password, type} = req.body;
        console.log(req.body);
        const user = await UserModel.singUP(name, email, password, type);
        res.status(201).send(user);
    }
    login(req, res){
        const {email, password}= req.body;
        const check = UserModel.singIN(email, password);
        if(!check){
            res.status(401).send("Incorrect Credentials")
        }
        else{
            // 1. Create token.
            const token = Jwt.sign(  
            //JWT Library? So jwt has a function sine and that sine function, basically sines the total to by 
            ///provided algorithm and the private key and the payload. So it takes data, the payload, remember we have talked about that, 
            //every token has header payload and signature now header and signature can be managed internally. You can also specify under 
            //options which algorithm you want to use, but will be using the default algorithm And in payload, what do we want to store in 
            //the payload? Well what were the payload has first thing is you should not store any sensitive data in payload like passwords. 
            //All right, you can store something like user ID, which you can always retrieve when you use your sense, another request to 
            //understand who they see user is. Another thing you can store in. Payload is users? Authorization permissions? What all details 
            //user or what? All resources user is authorized to access so these details can be stored inside our token. So for now, I'm going 
            //to store User ID. And the value for that is, Going to be this result. Dot ID. The result is basically here, you can add multiple 
            //records. This is Json object again, JavaScript object. You can store here. So you can if you lingni want, you can store email as 
            //well. Result dot email but again don't store passwords. Perfect. Second. Parameter which we have first and second are the 
            //mandatory parame
            {
                    userID: check.id,
                    email: check.email,
                },
                'AnC8dWuCU0',  //Second. Parameter which we have first and second are the mandatory parameters payload, the second is then. 
                                //Secret or private key. So you need to define a key using which you are going to sign the token. And same key
                                // has to be used when you are going to verify the token. Now, this key again should be very strong key. 
                                //There are many key generators which you can use, you can, in fact, go here and say online key. Generator
                {
                expiresIn: "1h", //And then we have got options in options. There are multiple options which you can find here. Yeah. So 
                                //these are the options for example, I algorithm by default, it has hs256, but there are other algorithms, 
                                //which you can use, you can use expires in which tells you that when this token should expire whenever you 
                                //are creating a token, make sure to add expires in value. So that after some time it gets expired, you can 
                                //expired in, for example. Numeric values interpreted as second count. So if you say
                                //এটা jsonwebtoken এ redme:MD te আছে sob details
                }
            );

            // 2. Send token.
            console.log(token);
            res.status(201).send(token);
        }
        // else{
        //     //const product = ProductModel.getAll;
        //     res.status(201).send(ProductModel.getAll());
        // }
    }
}
