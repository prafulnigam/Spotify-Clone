const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email });

    if (user) {
      return res
        .status(403)
        .json({ error: "A user with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUserData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
    };

    const newUser = await User.create(newUserData);

    // Create a token and return it to the user
    const token = await getToken(email, newUser);

    // Return user data without the password
    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email : email});
    if(!user) return res.status(403).json({err: "Inavlid Cridentials"});

    // now we will check hash == hash 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return res.status(403).json({err: "Inavlid Cridentials"});

    const token = await getToken(user.email, user);
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports = router;
