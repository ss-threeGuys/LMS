
const express = require("express");
const mongoose = require('mongoose');
const controllers = require('./controllers/router.js');

const app = express();
app.use(express.json());
app.use("/admin", controllers);

app.listen(3000);
console.log("server running on port 3000");

app.use((err, req, res, next) => {

    if (res.headersSent) {
        return next(err)
    }

    if (err.status) {
        return res.status(err.status).json(err);
    }
    res.status(500).json(err);
});

mongoose.connect("mongodb://localhost/library");

