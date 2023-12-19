// first step -> npm init ( to create package.json in backend)
// second step -> npm i express ( to download the expressJS framework )

const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
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


app.get("/", (req, res) => {
    // req contains all data for the request 
    // res contains all dsta for the response 
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("Server is Live");
})
