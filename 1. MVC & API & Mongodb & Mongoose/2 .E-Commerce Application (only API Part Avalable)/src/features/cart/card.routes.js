
import express from "express"
import CardController from "./card.controller.js"

const cardRouter = express.Router();
const cardController = new CardController();

cardRouter.post("/", cardController.addCard);
cardRouter.get("/", cardController.getCard);
cardRouter.delete("/:id", cardController.deleteCard);

export default cardRouter;
