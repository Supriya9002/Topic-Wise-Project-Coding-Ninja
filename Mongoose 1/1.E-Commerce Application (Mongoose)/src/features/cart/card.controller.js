import CardModel from "./card.model.js"
import CardRepository from "./card.repository.js"

export default class CardController{
    constructor(){
        this.cardRepository = new CardRepository();
    }
    async addCard(req, res){
        try{
            const productID = req.query.productID;
            const quantity = req.query.quantity;
            //console.log(req.query.quantity);
            //console.log(typeof(req.query.productID));
            const userID = req.userID;
            await this.cardRepository.add(productID, userID, parseInt(quantity)); 
            res.status(201).send("Card is Update");
        }catch(err){
            console.log(err);
            res.status(500).send("Something Wrong in AddCard");
        }
    }
    async getCard(req, res){
        try{
            const userID = req.userID;
            console.log(userID);
            const result =await this.cardRepository.getID(userID);
            //console.log(result)
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            res.status(500).send("Something Wrong in GetCard");
        }
    }
    async deleteCard(req, res){
        try{
            const userID = req.userID;
            const cardDeleteID = req.params.id;
            console.log(userID, cardDeleteID);
            const result = await this.cardRepository.delete(cardDeleteID, userID);
            console.log(result);
            if(result){
                res.status(404).send("Cart item is removed");
            }else{
                res.status(200).send("Item is not found");
            }
        }catch(err){
            console.log(err);
            res.status(500).send("Something Wrong in GetCard");
        }
    }
}