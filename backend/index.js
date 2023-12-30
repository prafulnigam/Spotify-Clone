// first step -> npm init ( to create package.json in backend)
// second step -> npm i express ( to download the expressJS framework )

// ALL THE IMPORTS
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const playlistRoutes = require("./routes/playlist");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const app = express();
const port = 3000;

// MIDDLEWARE
app.use(express.json());

// CONNECTION WITH MONGODB
// mongoose connect will be used to connect to the db to node & it has two arguements (1) url to db & (2) connection options
mongoose
  .connect("mongodb://127.0.0.1:27017/spotify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((err) => {
    console.error("Error while connecting to Mongo:", err);
    // Fallback for offline mode, use an in-memory database or any other mechanism
  });

// PASSWORD - JWT
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY; // this key would be in env
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
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
  })
);

// HOME PAGE
app.get("/", (req, res) => {
  // req contains all data for the request
  // res contains all dsta for the response
  res.send("Hello World");
});

//ROUTES
app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

// SERVER LISTENING
app.listen(port, () => {
  console.log("Server is Live");
});
