import UserModel from "../user/user.model.js"

export default class ProductModel{

    constructor(id, name, desc, price, imgUrl, category, sizes){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imgUrl=imgUrl;
        this.category=category;
        this.sizes=sizes;
    }
    static getAll(){
        return products;
    }
    static add(product){
        product.id= products.length +1;
        products.push(product);
        return product;
    }
    static getId(id){
      const product= products.find((i)=> i.id==id);
      return product;
    }
    static filter(minPrice, maxPrice, category){
      const result= products.filter((product)=>{
        return(
          product.price >= minPrice &&
          product.price <= maxPrice &&
          product.category == category
        )
      });
      return result;
    }
    static addRatting(userID, productID, ratting){
      //1. check userID valid or not
      const userResult = UserModel.getAll().find((u)=> u.id == userID);
      //if userID not valid
      if(!userResult){
        return "User not found";
      }
      //2. check productID valid or not
      const productResult = ProductModel.getAll().find((u)=> u.id == productID);
      console.log(productResult);
      if(!productResult){
        return "Product Not found";
      }
      //3. ratting 
      if(!productResult.rattings){
        productResult.rattings =[];
        productResult.rattings.push({userID:userID, ratting:ratting});
      }
      else{
        const exitRattingIndex = products.rattings.find((u)=> u.id == userID);
        if(exitRattingIndex == -1){
          productResult.rattings.push({userID:userID, ratting:ratting});
        } //update
        else{
          productResult.rattings[exitRattingIndex] = ({userID:userID, ratting:ratting});
        }
      }
    }
}

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];