// Step 1
const mongoose = require("mongoose");


// Step 2 : CREATE MNONGOOSE SCHEMA 
const Playlist = new mongoose.Schema({
    name:{
        type: String, 
        required: true, // this is a compulsion 
    },
    thumbnail:{
        type: String, // because URL will be stored
        required: true,
    },
    owner: {
        //will user userid provided by mongo, because artist is also a user of spotify 
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    // playlist mai songs kaunse hai 
    // playlist ke collaborators
    songs: [ // Array of Songs 
        {
        type: mongoose.Types.ObjectId,
        ref: "song",
        },
    ],
    collaborators: [ // Array of Collaborators 
        {
        type: mongoose.Types.ObjectId,
        ref: "user",
        },
    ],
});

const PlaylistModel = mongoose.model("Playlist", Playlist);
module.exports = Playlist;