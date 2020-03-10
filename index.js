
const express = require("express");

const controllers = require('./controllers/router.js');
const handleErrors = require('./exception-handler')

require('./db-mongoose');

const app = express();

app.use(express.json());
app.use("/admin", controllers);

app.listen(3000);
console.log("Server running on port 3000");


app.use(handleErrors);
