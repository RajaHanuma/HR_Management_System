const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config();
const router = require("../Hr management system/router/router");
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URL);
const connection = mongoose.connection;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api",router);

connection.on('open', () => {
    console.log("mongo is connected");
});

app.listen(process.env.PORT,() =>{
    console.log("server started");
});
