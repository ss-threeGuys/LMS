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
  res.header("Access-Control-Allow-Methods","POST, GET, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json());
app.use("/admin", controllers);

app.listen(3000);
console.log("Server running on port 3000");

app.use(handleErrors);

/**
 * Route not found handler
 * 
 * <p>Will return 404 on undefined route instead of 500<p>
 */
app.use(function (req, res, next) {
  if (req.path === '/health' || req.path === '/')
    res.status(200).json({code: 200, message:"Healthy", timestamp:Date.now()});
  else
    res.status(404).json({code: 404, message:"Sorry can't find that route!",route:req.path});
})

module.exports = app;
