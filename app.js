const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.set("strictQuery", false);

// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect("mongodb://localhost:27017/wikiDB");
// };

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = new mongoose.model("Article", articleSchema);

app.get("/", function(req, res){
    res.send("This working cuh!");
});

app.listen(3000, function(req, res){
    console.log("Server is listening on port 3000");
});