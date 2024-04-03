
import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: {type: String, unique: true, required: true},
//     password: {type: String,  unique: true, required: true},
//     type: {type: String, enum: ["Customer", "Seller"]}
// })

const userSchema = new mongoose.Schema({
    name: { type: String, maxLength:[25, "Name can't be greater than 25 characters"]},
    email: {type: String, unique: true, required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password: {type: String, 
        // validate:{
        //     validator: function(value){
        //         return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)
        //     },
        //     message:"Password should be between 8-12 charachetrs and have a special character"
        // }
    },
    type:{ type: String, enum: ['Customer', 'Seller']}
})


export default userSchema;





// // for better 
// import mongoose from "mongoose";

// export const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "name is required"],
//     minLength: [3, "The name should be at least 3 characters long"],
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: [true, "email is required"],
//     match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
//   },
//   mobile: {
//     type: String,
//     unique: true,
//     required: [true, "mobile number is reuired"],
//   },
//   age: {
//     type: Number,
//     required: [true, "age is required"],
//     validate: {
//       validator: function (userAge) {
//         return userAge > 0 && userAge <= 100;
//       },
//       message: "age must be b/w 0 and 100",
//     },
//   },
//   password: { type: String, required: [true, "password is required"] },
//   type: {
//     type: String,
//     enum: ["student", "fresher", "experienced"],
//     required: [
//       true,
//       "The 'usetype' is required; it must be either 'student,' 'fresher,' or 'experienced",
//     ],
//   },
// });
