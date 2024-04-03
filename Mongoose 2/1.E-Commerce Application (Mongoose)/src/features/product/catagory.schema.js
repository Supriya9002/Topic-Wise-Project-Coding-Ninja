import mongoose from "mongoose";

const categorySchema =new mongoose.Schema({
    name: String,
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
})


export default categorySchema;