import express from "express";
import ProductRouter from './src/features/product/product.routes.js';
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
//import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js"
import jwtAuth from "./src/middlewares/jwt.middleware.js"
import cardRouter from "./src/features/cart/card.routes.js"
import path from "path";
// for use swagger
import swagger from "swagger-ui-express"
import apiDocs from './swagger.json' assert {type: 'json'};

import loggerMiddleware from "./src/middlewares/logger.middleware.js" //for logger
import connectToMongodb from "./src/config/mongodb.js"


const server= express();
server.use(bodyParser.json()); //khatay lekha ache "karon"
server.use(express.static(path.resolve("public")));
// for use swagger
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
//logger
server.use(loggerMiddleware);

// for all requests related to product, redirect to product routes.
// localhost:3200/api/products
//pattern use, any request of product 
server.use("/api/products",jwtAuth, ProductRouter); //basicAuthorizer //authorizer //jwtAuth
server.use("/api/user", userRouter);
server.use("/api/card",jwtAuth, cardRouter); //jwtAuth

// Default request handler
server.get("/", (req, res)=>{
    res.send("E-Commerce Applications");
})
// Error handler middleware
server.use((err, req, res, next)=>{
    console.log(err);
    res.status(503).send('Something went wrong, please try later');
});
//Middleware to handle 404 requests.
server.use((req, res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs")
});

server.listen(3200, ()=>{
    console.log("Server is Running 3200");
    connectToMongodb();
})