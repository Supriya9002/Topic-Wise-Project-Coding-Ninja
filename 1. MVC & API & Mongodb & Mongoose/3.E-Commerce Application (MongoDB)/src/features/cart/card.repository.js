import { ObjectId } from "mongodb";
import {getDB} from "./../../config/mongodb.js"
import ApplicationError from "./../../error-handler/error-handler.middleware.js"

export default class CardRepository{
    constructor(){
       this.collection = "cardItems";
    }
    async add(productID, userID, quantity){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            //await collection.insertOne({productID: new ObjectId(productID), userID: new ObjectId(userID), quantity}); 
            //above this code one problem, i user add duplicate data (means same card)
            // find the document 
            // either insert or update
            // Insertion.
            const id = await this.getNextCounter(db);
            console.log("A lo id",id);
            await collection.updateOne(
                {productID: new ObjectId(productID), userID: new ObjectId(userID)},
                {
                    $setOnInsert: {_id:id}, //only on the insert, not work when update, it is work only when insert, not work update
                    $inc: {quantity: quantity}
                },
                {upsert: true}
                )
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async getID (userID){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const tt = await collection.find({userID: new ObjectId(userID)}).toArray(); //help ta
            console.log("a lo tt", tt)
            return tt;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async delete(cardDeleteID, userID){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.deleteOne({_id: new ObjectId(cardDeleteID), userID: new ObjectId(userID)});
            return result.deletedCount>0;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async getNextCounter(db){
        console.log("SUPRIYA HALDAR")
        const resultDocument = await db.collection("counters").findOneAndUpdate(
            {_id:'cartItemId'}, //Is how do we find the counter? So by using the ID which ID card item ID, Because for that card item ID, 
            {$inc:{value: 1}}, //I want to retrieve the value and then update it, using incress
            {returnDocument:'after'} //Document by default, as you can see. Returns the updated document. If return a new document is set 
                                     //to true or written document is set to after
        )  
        console.log(resultDocument);
        return resultDocument.value;
    }



}



