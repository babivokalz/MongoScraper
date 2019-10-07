var bodyParser = require("body-parser");
var logger = require("morgan");
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 8000;

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static("public"));

app.use(express.static(process.cwd() + "/public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/MongoScraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
console.log("Connected to Mongoose");

var routes = require("./controller/controller.js");
app.use("/", routes);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
