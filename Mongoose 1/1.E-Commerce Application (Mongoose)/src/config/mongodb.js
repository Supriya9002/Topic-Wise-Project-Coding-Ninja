
import { MongoClient } from "mongodb";

//const url = "mongodb://localhost:27017/ecomdb";
// If the above url gives error (error may be caused due to IPv4/IPv6 configuration conflict), then try the url given below
// const url = "mongodb://127.0.0.1:27017/ecomdb";
const url = process.env.DB_URL;

let client;
const connectToMongoDB = ()=>{
     MongoClient.connect(url)     //MongoClient.connect(url) returns a Promise.
        .then(clientInstance=>{   //Inside the .then() block, clientInstance represents the connected MongoDB client.
            client=clientInstance //client = clientInstance assigns the connected client to the client variable, 
            console.log("Mongodb is connected"); //making it accessible outside the connectToMongoDB function
            createCounter(client.db())
            createIndex(client.db());
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getDB = ()=>{   //(), hare in bracket i use ecomdb, upore url a ecomdb deyechi, tai r dichi na
    //console.log(client);
    return client.db();
}
export const getClient =()=>{
    return client;
}
const createCounter = async(db)=>{
    const exitingCounter =await db.collection("counters").findOne({_id: "cartItemId"}); 
    if(!exitingCounter){
        await db.collection("counters").insertOne({_id: "cartItemId", value: 0});
    }
}
const createIndex = async(db)=>{
    try{
        await db.collection("products").createIndex({price: 1}); //See Documentaion type of index, it is single-fild-index
        await db.collection("products").createIndex({name: 1, category: -1}); //compound-index
        await db.collection("products").createIndex({desc: "text"}); //text-based-index
    }catch(err){
        console.log(err);
    }
    console.log("Index are Created");
}

export default connectToMongoDB; 