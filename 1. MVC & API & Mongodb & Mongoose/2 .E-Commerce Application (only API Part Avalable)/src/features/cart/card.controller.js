import CardModel from "./card.model.js"
export default class CardController{
    
    addCard(req, res){
        const {productID, quantity} = req.query
        console.log(req.query);
        const userID = req.userID;
        CardModel.add(productID, userID, quantity);
        res.status(201).send("Card is add");
    }
    getCard(req, res){
        const userID = req.userID;
        //console.log(userID);
        const result = CardModel.getID(userID);
        res.status(201).send(result);
    }
    deleteCard(req, res){
        const userID = req.userID;
        const cardDeleteID = req.params.id;
        console.log(userID, cardDeleteID);
        const result = CardModel.delete(cardDeleteID, userID);
        if(result){
            res.status(404).send(result);
        }else{
            res.status(201).send("Cart item is removed");
        }
        // try{
        //     CardModel.delete(cardDeleteID, userID);
        // }catch(err){
        //     res.status(404).send(err.message);
        // }
        // res.status(201).send("Cart item is removed");
    }
}