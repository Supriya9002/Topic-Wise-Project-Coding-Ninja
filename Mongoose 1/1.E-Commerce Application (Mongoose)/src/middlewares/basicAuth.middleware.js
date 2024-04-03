
// import UserModel from "../features/user/user.model.js"

// const basicAuthorizer = (req, res, next)=>{

//     // 1. Check if authorization header is empty.
//     const authHeader = req.headers["authorization"]; 
//     //Now, what we need to check is first Check if the data has been sent in the authorization header check if authorization Header. 
//     //Is empty. So how do we get the data from authorization header? So, let's say, So when we send our credentials,those credentials 
//     //will be part of authorization header header as an HTTP header, right? So, STP, headers we can access from request object. 
//     //So here we can use request dot headers and headers is an array Multiple headers from client to server and also server to client in 
//     //the responsible. So here we are looking for authorization. Header to have something. Okay. And then,

//     if(!authHeader){  //if there are no Another thing in alteration header, then we can basically Return the response. Status code, 
//         //401. What is 401 status code? It means that unauthorized the request is heade unauthorized and we can also send a message Sorry, 
//         //this should be status. Status function Then send function takes your message. So Authorization.
//         return res.status(401).send("No authorization details found");
//     }
//     console.log(authHeader);

//     // 2. Extract credentials. [Basic qwertyusdfghj345678cvdfgh]
//     const base64Credentials = authHeader.replace('Basic ','');
//     console.log(base64Credentials);
//     //So, next step is then to extract the credentials. How do we extract the credentials? Now, the credentials which we are going to 
//     //send from client and receive any server. They will be encoded with base 64 encoding Base 64 is a popular encoding technique, which 
//     //encours the data, usually when we transfer from client to server. All right, so how do we do that? We can create a constant constant 
//     //base,64. Credentials. First, we need to access the data from our request. Header, basically

//     // 3. decode crdentials.
//     const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8') 
//     console.log(decodedCreds); // [username:password]

//     const creds = decodedCreds.split(':');

//     const user = UserModel.getAll().find(u=> u.email==creds[0] && u.password==creds[1]);
//     //So this threads will give us an array of username and password user.model.js verify that credential against the data we have in our 
//     //user array
//     if(user){
//         next();
//     }
//     else{
//         return res.status(401).send("Incorrect Credentials");
//     }
// }
// export default basicAuthorizer;

//// JWT-1
// import bAuth from "express-basic-auth"
// import UserModel from "../features/user/user.model.js"

// const basicAuthorizer = (username, password) => {
//     // 1. Get users
//     const users = UserModel.getAll();
//     // 2. Compare email
//     const user = users.find((u) =>
//       bAuth.safeCompare(username, u.email)
//     );
//     if (user) {
//       // 3. Compare password and return
//       return bAuth.safeCompare(
//         password,
//         user.password
//       );
//     } else {
//       // 4. Return error message
//       return false;
//     }
//   };
  
//   const authorizer = bAuth({
//     authorizer: basicAuthorizer,
//     challenge: true,
//   });
  
//   export default authorizer;




































