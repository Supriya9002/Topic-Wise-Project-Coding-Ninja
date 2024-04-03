

export default class ProductModel{

    constructor(_id, _name, _dec, _price, _imgUrl){
        this.id=_id;
        this.name= _name;
        this.des= _dec;
        this.price=_price;
        this.imgUrl=_imgUrl;
    }
    static get(){ // THIS method do not need to create a class instence, i can direct call it
        return products;
    }
    // static add(productObj){
    //   let newProduct= new ProductModel(products.length+1,productObj.name, productObj.des, productObj.price, productObj.imgUrl);
    //   products.push(newProduct);
    //   console.log(newProduct);
    // }

    static add(name, des, price, imgUrl){
      let newProduct = new ProductModel(products.length + 1, name, des, price, imgUrl);
      products.push(newProduct);
    }
    static getById(id){
      return products.find((p)=> p.id==id);
    }
    static update(productObj){
      const index = products.findIndex((p) => p.id == productObj.id);
      products[index] = productObj;
    }
    static delete (id){
      const index = products.findIndex((p)=> p.id == id);
      products.splice(index,1);
    }
    
}

//Array of products
var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      4,
      'Product 4',
      'Description for Product 4',
      99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    ),
  ]