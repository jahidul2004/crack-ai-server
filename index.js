const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
dotenv = require('dotenv').config();



app.get('/', (req, res) => {
    res.send({
        msg:"Crack the power of AI server is running"
    });
})

app.listen(port, () => {
    console.log("Ai is running on port: " + port);
})
