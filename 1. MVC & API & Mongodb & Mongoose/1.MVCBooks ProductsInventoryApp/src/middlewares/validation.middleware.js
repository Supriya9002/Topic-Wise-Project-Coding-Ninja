import {body, validationResult } from "express-validator";
const validdateRequest = async (req, res, next)=> {
    // // Validate data
    // const { name, price, imgUrl } = req.body;
    //     let error= [];
    //     if(!name || name.trim()== ''){ //!name means Undefine
    //         error.push("Name is required");
    //     }
    //     if(!price || parseFloat(price)<1){
    //         error.push("price must be positive Value");
    //     }
    //     try{
    //         const validurl= new URL(imgUrl);
    //     }catch(err){
    //         error.push(err);
    //     }
    //     if(error.length>0){
    //         console.log(error);
    //         return res.render('new-products', {errorMessage : error[0]});
    //     }
    //     next();
    console.log(req.body);
    // 1. Setup rules for validation.
    const rules = [
      body('name').notEmpty().withMessage('Name is required'),
      body('price').isFloat({ gt: 0 }).withMessage('Price should be a positive value'),
      // body('imgUrl').isURL().withMessage('Invalid url'),
      body('imageUrl').custom((value, { req }) => {
        if (!req.file) {
          throw new Error('Image is required');
        }
        return true;
      }),
    
  
    ];
  
    // 2. run those rules.
    await Promise.all(rules.map((rule) => rule.run(req.body))); // all is array of promisses. first 'rules comming from express-validation. 
    //and 2 nd 'rule' is it has a function run and run takes the request object
  
    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);
    console.log(validationErrors);
    // 4. if errros, return the error message
    //So, what we need to check is that validation errors is not empty. And if it is not empty, then we will be returning this error message. So this 
    //validation errors which we are getting it has it is basically an object. Result of validation error. So we can convert that into an array and return. 
    //The first error message from that
    
    if (!validationErrors.isEmpty()) {
      return res.render('new-products', {errorMessage: validationErrors.array()[0].msg,});
    }
    next();

};

export default validdateRequest;