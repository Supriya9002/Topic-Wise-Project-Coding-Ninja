import ApplicationError from "./../../error-handler/error-handler.middleware.js"
import {getDB} from "./../../config/mongodb.js"


export default class UserRepository{
    
    async singUP(newUser){
        try{
            //1. get database
            const db = getDB(); //ecomdb
            //2. get the collection
            const collection = db.collection("users");
            //3. inser the document
            await collection.insertOne(newUser);
            return newUser;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async singIN(email, password){
        try{
            const db = getDB();
            const collection = db.collection("users");
            return await collection.findOne({email, password});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async findEmail(email){
        try{
            const db = getDB();
            return await db.collection("users").findOne({email});
        }catch(err){
            throw new ApplicationError("Something went wrong with database", 500);;
        }
    }
}