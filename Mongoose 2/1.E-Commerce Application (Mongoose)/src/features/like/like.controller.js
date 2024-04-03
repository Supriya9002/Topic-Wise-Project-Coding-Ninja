import LikeRepository from "./like.respository.js"

export default class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository();
    }
    async getLikes(req, res){
        try{
            const {id, type} = req.query;
            console.log(id, type);
            const result = await this.likeRepository.getLikes(id, type);
            res.status(201).send(result);
        }catch(err){
            console.log(err);
            res.status(201).send("Something wrong")
        }
    }
    async likeItems(req, res){
        try{
            //const userID = req.userID;
            const {id, type} = req.body;
            if(type != "Product" && type != "Category"){
                res.status(400).send("Invalid Request")
            }
            if(type=="Product"){
                const result = await this.likeRepository.likeProduct(req.userID, id)
                res.status(201).send('Like Created');
            }
            else{
                const result = await this.likeRepository.likeCategory(req.userID, id)
                res.status(201).send('Like Created');
            }
        }catch(err){
            console.log(err);
            res.status(201).send("Something wrong")
        }
    }
}