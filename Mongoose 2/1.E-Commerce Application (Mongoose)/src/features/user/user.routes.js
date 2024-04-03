// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import UserController from "./user.controller.js"
import jwtAuth from "./../../middlewares/jwt.middleware.js"

// 2. Initialize Express router.
const userRouter = express.Router();

const userController = new UserController();

// All the paths to controller methods.

//userRouter.post('/register', userController.register);
userRouter.post('/register', (req, res)=>{
    userController.register(req,res)
});
//userRouter.post('/login', userController.login);
userRouter.post('/login', (req, res)=>{
    userController.login(req, res)
});
userRouter.post("/resetPassword",jwtAuth,  (req, res, next)=>{
    userController.resetPassword(req, res, next);
})
export default userRouter;