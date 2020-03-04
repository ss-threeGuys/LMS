
const express = require("express");
const mongoose = require('mongoose');
const controllers = require('./controllers/router.js');

const app = express();
app.use(express.json());
app.use("/admin", controllers);

app.listen(3000);
console.log("server running on port 3000");

mongoose.connect("mongodb+srv://admin:admin@cluster0-xarex.mongodb.net/test?retryWrites=true&w=majority");

