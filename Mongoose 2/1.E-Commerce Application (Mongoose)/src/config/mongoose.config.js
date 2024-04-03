import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import categorySchema from "./../features/product/catagory.schema.js"

const url = process.env.DB_URL;
export const connectUsingMongoose = async()=>{
    try{
        await mongoose.connect(url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("Mongodb connected using mongoose");
        addCategory();
    }catch(err){
        console.log("Error while connecting to db");
        console.log(err);
    }
}

async function addCategory(){
    const CategoryModel = mongoose.model("Category", categorySchema);
    const categories = await CategoryModel.find();
    if(!categories || (categories).length==0){
        await CategoryModel.insertMany([{name:"Books"}, {name:"Cloths"}, {name:"Electronics"}]);
    }
    console.log('Categories added');
}