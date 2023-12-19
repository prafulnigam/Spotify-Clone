// first step -> npm init ( to create package.json in backend)
// second step -> npm i express ( to download the expressJS framework )

const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require("./models/User")
const app = express();
const port = 8000;


// mongoose connect will be used to connect to the db to node & it has two arguements (1) url to db & (2) connection options
mongoose.connect("mongodb+srv://prafulnigam16:" + process.env.MONGO_PASSWORD + "@cluster0.1g2mgi2.mongodb.net/?retryWrites=true&w=majority", 
{
    useNewUrlParser: true, // options of connection
    useUnifiedTopology: true
})
.then(() => { 
    console.log("Connected to Mongo"); // to check if monngo.connect is working
})
.catch((err) => {
    console.log("Error while connecting to Mongo");
});

// setup of passport-jwt
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY; // this key would be in env 
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        // does the user exist ?? 

        //if error then return false
        if (err) {
            return done(err, false);
        }
        // if exist return the user
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/", (req, res) => {
    // req contains all data for the request 
    // res contains all dsta for the response 
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("Server is Live");
})
