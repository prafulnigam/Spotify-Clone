// this file is for authentication -> Sign Up & Login 

const express = require("express");
const router = express.Router(); // idhar saari cheeze nahi nahi hai toh sirf router module ko kheecha hai 
const User = require("../models/User")
const becrypt = require ("becrypt");
const getToken = require("../utils/helpers");

router.post("/register", async (req, res) => {
    // ye tab chalega jab /register pr jab register hoga user 
    // My req.body will be of format {email, password, firstName, lastName, username}

    const {email, passowrd, firstName, lastName, username} = req.body;

    // check if user exist 
    const user = await User.findOne({email: email}); // jiski email meri req.body email ke same hai 
    if(user) {
        // by default status code is 200
        return res.status(403).json({error: "A user with this email already exists"});
    }

    // after this check the request is valid, so we will store user in db

    const hashedPassword = bcrypt.hash(password, 10); // this is used to has the password which will decrypt it 
    const newUserData = {
        email,
        passoword : hashedPassword, 
        firstName, lastName, 
        username,
    };
    const newUser = await User.create(newUserData);

    // create a token & return it to user 
    const token = await getToken(email, newUser);
    const userToReturn = {...newUser.toJSON(), token};   // taking new user & converting it json 
    delete userToReturn.password; // it is a security measure 
    return res.status(200).json(userToReturn);

})