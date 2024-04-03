
import likeSchema from "./like.schema.js"
import ApplicationError from "../../error-handler/error-handler.middleware.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const LikeModel = mongoose.model("Like", likeSchema)

export default class LikeRepository{

    async getLikes(id, type){
        try{
            const like = await LikeModel.find({likeable: new ObjectId(id), on_model: type}).populate("userId")
            .populate({path: "likeable", model: type})
            //.populate({path:'likeable', model: type})
            console.log(like);
            return like;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Problem on Database", 500);
        }
    }

    async likeProduct(userID, productID){
        try{
            const newLike = new LikeModel({
                userId: new Object(userID),
                likeable: new ObjectId(productID),
                on_model: "Product"
            })
            const SaveLike = newLike.save();
            return SaveLike;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Problem on Database", 500);
        }
    }
    async likeCategory(userID, categoryID){
        try{
            const newLike = new LikeModel({
                userId: userID,
                likeable: categoryID,
                on_model: "Category"
            })
            const SaveLike = newLike.save();
            return SaveLike;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Problem on Database", 500);
        }
    }
}