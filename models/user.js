import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,

    },
    fistName : {
        type : String,
        required : true,

    },
    lastName : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
        default : "costumer",
    },
    isBlocked : {
        type : Boolean,
        required : true,
        default : false,
    },
    img : {
        type : String,
        required : false,
        default : "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",


    },
    


});

const User = mongoose.model("User", userSchema);

export default User;