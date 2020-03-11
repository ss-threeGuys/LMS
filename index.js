const express = require("express");
var bodyParser = require("body-parser");
const controllers = require("./controllers/router.js");
const handleErrors = require("./exception-handler");

require("./db-mongoose");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/admin", controllers);

app.listen(3000);
console.log("Server running on port 3000");

app.use(handleErrors);

module.exports = app;
