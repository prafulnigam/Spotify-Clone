// Step 1
const mongoose = require("mongoose");


// Step 2 : CREATE MNONGOOSE SCHEMA 
const User = new mongoose.Schema({
    firstName:{
        type: String, 
        required: true, // this is a compulsion 
    },
    lastName:{
        type: String,
    },
    password: {
        type: String,
        required:true,
        private: true
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    likedSong:{
        type:String,
        default: "",
    },
    likedPlaylists:{
        type:String,
        default: "",
    },
    subscribedArtists:{
        type:String,
        default: "",
    },
});

const UserModel = mongoose.model("User", User);
module.exports = UserModel;