import { ObjectId } from "mongodb";
import { getDB } from "./../../config/mongodb.js";
import ApplicationError from "./../../error-handler/error-handler.middleware.js"

export default class ProductRepository{

    constructor(){
        this.collection = "products";
    }
    
    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            console.log(products);
            return products;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async add(newProduct){
        try{
           const db = getDB();
           const collection = db.collection(this.collection);
           await collection.insertOne(newProduct);
           return newProduct;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async getId(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(id)});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async filter(minPrice, maxPrice, category){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression = {};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)};
            }
            // if(maxPrice){
            //     filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)};
            // }
            // if postman send category array Ex. category = ["c1", "c2"], then those data covert in string
            const categorys = JSON.parse(category.replace(/'/g,'"')); // (' ke " change korbe)
            if(categorys){
                //filterExpression.category = category;
                //filterExpression = {$and: [{category: category}, filterExpression]} //AND operator
                //filterExpression = {$or: [{category: category}, filterExpression]} //OR operator
                //// if i use category array, postman send string array Ex. category = ["c1", "c2"]
                filterExpression = {$or: [{category: {$in: categorys}}, filterExpression]} // in operator//// 1 st category says in Database array
            }
            //return await collection.find(filterExpression).toArray();
            //return await collection.find(filterExpression).project({name:1, price: 1}).toArray(); // see id, name, price
            //return await collection.find(filterExpression).project({name:1, price: 1, _id: 0}).toArray(); // see without _id, id not visible
            //return await collection.find(filterExpression).project({name:1, price: 1, _id: 0, rattings: 1}).toArray(); // see all ratting
            return await collection.find(filterExpression).project({name:1, price: 1, _id: 0, rattings:{$slice: -1}}).toArray();
            //rattings:{$slice: 3} slice return first 3 ratting, if i given 1 then return first ratting,if i give (-1)then return last ratting
            
            //[NB: $ operator limits the contents of an <array> to return the first element that matches the query condition on the array]
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async ratting(userID, productID, ratting){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            //1. find the product
            const product = await collection.findOne({_id: new ObjectId(productID)});
            console.log("a lo product",product)
            //2. find the ratting 
            const userRatting = product?.rattings?.find(r=> r.userID == userID);
            console.log("a lo userRatting",userRatting, "Alo ak chis", product?.rattings)
            if(userRatting){
                //3. update the ratting 
                await collection.updateOne(
                    {_id: new ObjectId(productID), "rattings.userID": new ObjectId(userID)}
                    , 
                    {$set: {"rattings.$.ratting": ratting}}
                )
            }else{
                await collection.updateOne(
                    {_id: new ObjectId(productID)}, 
                    {$push: {rattings: {userID: new ObjectId(userID), ratting}}});
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }


/// Better Approch
// async ratting(userID, productID, rating) {
//     try {
//         console.log(userID);
//         const db = getDB(); //returning your MongoDB connection
//         const collection = db.collection(this.collection);

      //if already given, then remove
//         await collection.updateOne(
//             { _id: new ObjectId(productID) },
//             { $pull: { ratings: { userID: userID } } }
//         );

     // updateOne
//         await collection.updateOne(
//             { _id: new ObjectId(productID) },
//             { $push: { ratings: { userID: userID, rating } } }
//         );

//     } catch (err) {
//         console.error(err);
//         throw new ApplicationError("Something went wrong with the database", 500);
//     }
// }


async averageProductPricePerCategory(){
    try{
        const db=getDB();
        return await db.collection(this.collection).aggregate([ // Search MongoDB Aggretion Pipeline Document, for better cleare
                {
                    // Stage 1: Get Vaerge price per category
                    $group:{
                        _id:"$category",
                        averagePrice:{$avg:"$price"} 
                    }
                }
            ]).toArray();
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
}
}
