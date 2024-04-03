import UserModel from "../user/user.model.js"

export default class ProductModel{

    constructor(name, desc, price, imgUrl, category, sizes){
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imgUrl=imgUrl;
        this.category=category;
        this.sizes=sizes;
        //this._id=id;
    }
}

