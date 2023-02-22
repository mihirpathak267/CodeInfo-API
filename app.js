const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.set("strictQuery", false);

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/wikiDB");
};

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = new mongoose.model("Article", articleSchema);

app.route("/articles")

.get(function(req, res){
    Article.find({}, function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        } else{
            res.send(err);
        }
    })
})

.post(function(req, res){
    // console.log(req.body.title);
    // console.log(req.body.content);

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save(function(err){
        if (!err){
            res.send("Successfully added the article!");
        } else {
            res.send(err);
        }
    });
})

.delete(function(req, res){
    Article.deleteMany(function(err){
        if(!err){
        res.send("Successfully deleted all the articles!");
        } else {
            res.send(err);
        }
    });
});

app.listen(3000, function(req, res){
    console.log("Server is listening on port 3000");
});