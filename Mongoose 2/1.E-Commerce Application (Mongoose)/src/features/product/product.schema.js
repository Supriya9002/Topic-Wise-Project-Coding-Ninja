import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    desc: {
        type: String,
    },
    category: String,
    price:{
        type: Number, 
        required: true
    },
    inStock: Number,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    categorys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }]
})

export default productSchema;