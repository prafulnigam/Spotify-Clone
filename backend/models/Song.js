// Step 1
const mongoose = require("mongoose");


// Step 2 : CREATE MNONGOOSE SCHEMA 
const Song = new mongoose.Schema({
    name:{
        type: String, 
        required: true, // this is a compulsion 
    },
    thumbnail:{
        type: String, // because URL will be stored
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    artist: {
        //will user userid provided by mongo, because artist is also a user of spotify 
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
});

const SongModel = mongoose.model("Song", Song);
module.exports = SongModel;