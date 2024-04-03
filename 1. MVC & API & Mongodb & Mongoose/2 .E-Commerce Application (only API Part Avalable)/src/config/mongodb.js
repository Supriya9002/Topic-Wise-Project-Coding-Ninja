
import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";
// If the above url gives error (error may be caused due to IPv4/IPv6 configuration conflict), then try the url given below
// const url = "mongodb://127.0.0.1:27017/ecomdb";

let client;
const connectToMongoDB = ()=>{
     MongoClient.connect(url)     //MongoClient.connect(url) returns a Promise.
        .then(clientInstance=>{   //Inside the .then() block, clientInstance represents the connected MongoDB client.
            client=clientInstance //client = clientInstance assigns the connected client to the client variable, 
            console.log("Mongodb is connected"); //making it accessible outside the connectToMongoDB function
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getDB = ()=>{
    //console.log(client);
    return client.db();
}

export default connectToMongoDB; 