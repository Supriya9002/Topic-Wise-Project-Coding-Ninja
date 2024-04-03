// Please don't change the pre-written code
// Import the necessary modules here
import { getAllUsers } from "../../user/model/user.model.js";

let id = 3;
const products = [
  { id: 1, name: "iphone", price: 100000 },
  { id: 2, name: "oneplus", price: 50000 },
  { id: 3, name: "samsung", price: 60000 },
];

export const fetchAllProducts = () => {
  return products;
};

export const rateProductModel = (productId, userId, rating) => {
  // Write your code here
  const productResult = fetchAllProducts().find((u)=> u.id == productId);
  if(!productResult){
    return { success: false, msg: "product not found" };
  }

  const userResult = getAllUsers().find((u)=> u.id == userId);
  if(!userResult){
    return { success: false, msg: "user not found" };
  }

  // if(rating >5 && rating <0){
  //   return { success: false, msg: "rating should be b/w 0 and 5"};
  // }
  if (rating < 0) {
    return { success: false, msg: "rating should be b/w 0 and 5"};
  }else if(rating > 5) {
    return { success: false, msg: "rating should be b/w 0 and 5"};
  }


  if(!productResult.rattings){
    productResult.rattings = [];
    productResult.rattings.push({userId:userId, rating:rating});
  }else{
    const exitProductIndex = productResult.rattings.findIndex((u)=> u.id == userId);
    console.log(exitProductIndex);
    if(exitProductIndex == -1){
      productResult.rattings.push({userId:userId, rating:rating});
    }
    else{
      productResult.rattings[exitProductIndex] = ({userId:userId, rating:rating});
    }

  }
};
