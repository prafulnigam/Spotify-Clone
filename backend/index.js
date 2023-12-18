// first step -> npm init ( to create package.json in backend)
// second step -> npm i express ( to download the expressJS framework )

const express = require('express');
const app = express();
const port = 8000;

app.get("/", (req, res) => {
    // req contains all data for the request 
    // res contains all dsta for the response 

    res.send("Hello World");

});

app.listen(port, () => {
    console.log("Server is Live");
})
