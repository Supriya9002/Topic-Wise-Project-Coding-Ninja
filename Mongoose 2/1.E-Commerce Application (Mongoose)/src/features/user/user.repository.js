import mongoose from "mongoose";
import userSchema from "./user.schema.js"
import ApplicationError from "./../../error-handler/error-handler.middleware.js"


// creating model from schema.
const UserModel = mongoose.model("User", userSchema);
export default class UserRepository{
    async singUP(user){
        try{
            // create instance of model.
            const newUser = new UserModel(user);
            await newUser.save(); //it Save in collection
            return newUser;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async singIN(email, password){
        try{
            return await UserModel.findOne({email, password});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async findEmail(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async ResetPassword(hashedPassword, userID){
        try{
            const user = await UserModel.findById(userID);
            console.log(user);
            if(user){
                user.password = hashedPassword;
                await user.save();
                return user;
            }else{
                throw new Error ("No Such error found");
            }

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);;
        }
    }
}
