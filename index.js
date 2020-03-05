
const express = require("express");
const mongoose = require('mongoose');
const controllers = require('./controllers/router.js');

const app = express();
debugger;
app.use(express.json());
app.use("/admin", controllers);

app.listen(3000);
console.log("Server running on port 3000");

app.use((err, req, res, next) => {
    console.error(err.stack);
    if (res.headersSent) {
        return next(err)
    }

    if (err.status) {
        return res.status(err.status).json(err);
    }
    res.status(500).json(err);
});

mongoose.connect("mongodb+srv://user:user@cluster0-xarex.mongodb.net/library?retryWrites=true&w=majority", { useNewUrlParser: true , useUnifiedTopology: true } );

