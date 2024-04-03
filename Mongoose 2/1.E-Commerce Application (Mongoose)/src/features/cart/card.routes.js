
import express from "express"
import CardController from "./card.controller.js"

const cardRouter = express.Router();
const cardController = new CardController();

cardRouter.post("/", (req, res)=>{
    cardController.addCard(req, res)
});
cardRouter.get("/",(req, res)=>{
    cardController.getCard(req, res)
});
cardRouter.delete("/:id", (req, res)=>{
    cardController.deleteCard(req, res)
});

export default cardRouter;
