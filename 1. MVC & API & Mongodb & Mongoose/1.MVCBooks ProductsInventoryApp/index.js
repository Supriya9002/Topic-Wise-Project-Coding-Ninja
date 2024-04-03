import express from 'express';
import ProductController from './src/controllers/product.controller.js'
import userController from "./src/controllers/user.controller.js"
import EjsLayouts from 'express-ejs-layouts';
import path from 'path'
import validdateRequest from "./src/middlewares/validation.middleware.js"
import uplodeFile from "./src/middlewares/file-uplode.middlewares.js"
import session from 'express-session'; // import for cookie
import {auth} from './src/middlewares/auth.middleware.js'
import cookieParser from 'cookie-parser';
import {setLastVisit} from "./src/middlewares/lastVisit.middleware.js" //last Visit timing

// const express = require('express');

const server = express();

//public folder public
server.use(express.static("public"));
server.use(cookieParser());
server.use(setLastVisit);

// use session
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

//parse from data
server.use(express.urlencoded({extended: true}));

//inform our server we use mjs
//setup view engine setting
server.set('view engine', 'ejs');
//where my mjs folder
// this "views" is syntex where i y set ejs, must be write 'views' one time, it very imp, y see my folder name is view, 
//view && view is differents
server.set('views', path.join(path.resolve(), 'src', 'view'));
//server.use(express.static('src/view'))
// server.get('/', (req,res)=>{
//     return res.send('Welcome to Inventory App');
// });

server.use(EjsLayouts); //middleware

const pro_controler= new ProductController();
const user_controller= new userController();
server.get("/register", user_controller.getRegister);
server.get("/login", user_controller.getLogin);
server.post("/register", user_controller.postRegister);
server.post("/login", user_controller.postLogin);

server.get('/', auth, (pro_controler.getdetails));
server.get('/new', auth, (pro_controler.getAddFrom)); 

server.post('/',auth, uplodeFile.single("imgUrl"), validdateRequest, (pro_controler.addnewProducts)); 
//single-> Returns middleware that processes a single file associated with the given form field, 
//fieldName — Name of the multipart form field to process.

server.get("/update-product/:id",auth, (pro_controler.getUpdateProductView)); 
//Using the URL parameters. So here we can specify Colon. What it means, is whatever value. You are going to receive one to five,
// then. Whatever that value is. That value will be accessible inside your controller using this ID parameter. So, this ID is 
//the parameter of this URL. We call it URL parameters.
server.post('/update-product',auth, (pro_controler.postUpdateProducts));
server.post("/delete-product/:id",auth, (pro_controler.deleteProduct));
server.get("/logout", user_controller.logout);

server.use(express.static('src/view'))

server.listen(8000, (err)=>{
    if(err){
        console.log(err);
    }
    console.log("Your server Running is 8000 port");
    
});

