
import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        refPath: "on_model"
    },
    on_model:{
        type: String,
        enum: ["Product" , "Category"],
    }
})

export default  likeSchema;