
export default class CardModel{

    constructor(productID, userID, quantity, id){
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
        this.id = id;
    }
    static add(productID, userID, quantity){
        const newCard = new CardModel (productID, userID, quantity, cards.length + 1);
        cards.push(newCard);
        console.log(newCard);
    }
    static getID(userID){
        console.log(userID);
        return cards.filter((u)=> u.userID == userID);
    }
    static delete(cardDeleteID, userID){
        const cardDeleteID_Index = cards.findIndex((u)=> u.id == cardDeleteID && u.userID == userID); 
        if(cardDeleteID_Index != -1){
            cards.splice(cardDeleteID_Index, 1);
        }
        else{
            return "Item not found";
            //throw new Error("Item not found");
        }
    }
}
var cards = [
    new CardModel(1, 2, 10, 1),
    new CardModel(2, 2, 50, 2),
];