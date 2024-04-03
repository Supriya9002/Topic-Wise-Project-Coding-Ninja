import {getDB} from "./../../config/mongodb.js"

export default class UserModel{
    constructor(name, email, password, type, id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }
    // static singUP(name, email, password, type){
    //     const user = new UserModel(name, email, password, type, users.length + 1);
    //     users.push(user);
    //     return user;
    // }
    static async singUP(name, email, password, type){
        //1. get database
        const db = getDB();
        //2. get the collection
        //console.log(db);
        const collection = db.collection("users");
        //console.log(collection);
        //3. inser the document
        const newUser = new UserModel(name, email, password, type);
        await collection.insertOne(newUser);
        return newUser;
    }
    static singIN(email, password){
        return users.find((p)=> p.email == email && p.password == password);
    }
    static getAll(){
        return users;
    }
}

var users = [
    new UserModel(
        "seller user",
        "seller@gmail.com",
        "seller52@",
        "seller",
        "1"
    ),
    new UserModel(
        "Supriya",
        "supri@gmail.com",
        "supriya52@",
        "coustomer",
        "2"
    )
];