import express from 'express';
import LikeController from "./like.controller.js"


//Initialize Express router.
const likeRouter = express.Router();

//Instance
const likeController = new LikeController();

//Routes
likeRouter.post("/", (req, res)=>{
    likeController.likeItems(req, res);
})
likeRouter.get("/", (req, res)=>{
    likeController.getLikes(req, res);
})



export default likeRouter;  