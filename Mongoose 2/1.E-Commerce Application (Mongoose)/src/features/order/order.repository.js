import OrderModel from "./order.model.js"
import { ObjectId } from "mongodb";
import { getDB } from "./../../config/mongodb.js";
import ApplicationError from "./../../error-handler/error-handler.middleware.js"
import {getClient} from "./../../config/mongodb.js"

export default class OrderRepository{

    constructor(){
        this.collection = "orders";
    }

    async placeOrder (userId){
        try{
            const client = getClient();//I start session client.start station, we get decision, we start the transaction.toryCo And then,with
            const session = client.startSession();//every transaction, we with every operation which we create, we pass these session object.
            const db = getDB();
            session.startTransaction(); //transaction means it is a collection of all the database operations which must be Performed in such
            //a way that either all the operations are executed or none of them

            // 1. Get cartitems and calculate total amount.
            const result = await this.getTotalAmount(userId, session);
            const finalTotalAmount = result.reduce((acc, itm)=> acc + itm.totalAmount, 0)
            console.log("a lo result", result, "A lo finaltotal", finalTotalAmount);
    
            // 2. Create an order record.
            const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
            await db.collection(this.collection).insertOne(newOrder, {session});
    
            // 3. Reduce the stock.
            for(let item of result){
                console.log("Supriya Haldar")
                db.collection("products").updateOne(
                    {_id: item.productID},
                    {$inc: {stock: -item.quantity}},{session}
                )
            }
            throw new Error("Something is wrong in placeOrder");
            // 4. Clear the cart items.
            db.collection("cardItems").deleteMany({_id: new ObjectId(userId)},{session})
            return;
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something is wrong in placeOrder");
        }
    }

    async getTotalAmount(userId, session){
        const db = getDB();
        const result = await db.collection("cardItems").aggregate([
            // 1. Get cart items for the user
            {
                $match: {userID: new ObjectId(userId)}
            },
            // 2. Get the products form products collection.
            {
                $lookup:
                {
                  from: "products",
                  localField: "productID",
                  foreignField: "_id",
                  as: "productInfo"
                }
            },
            // 3. Unwind the productinfo.
            {
                $unwind: "$productInfo"
            },
            //4. Calculate totalamount
            {
                $addFields: {
                    "totalAmount": {
                        $multiply:["$productInfo.price", "$quantity"]
                    }
                }
            }
        ],{session}).toArray();
        // const CardtotalAmount = result.reduce((acc, itm)=> acc + itm.totalAmount, 0)
        // console.log(result);
        return result;
    }
}