
export default class UserModel{
    constructor(name, email, password, type, id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }

    static getAll(){
        return users;
    }
}

var users = [
    new UserModel(
        "seller user",
        "seller@gmail.com",
        "seller52@",
        "seller",
        "1"
    ),
    new UserModel(
        "Supriya",
        "supri@gmail.com",
        "supriya52@",
        "coustomer",
        "2"
    )
];



