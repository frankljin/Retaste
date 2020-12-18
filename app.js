const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const api_url = "https://api.spoonacular.com/recipes/findByIngredients";
const api_key = "5ebf32f8374945ddba4efdce210b90d3";
const app = express();
const ejs = require("ejs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("home");
});

app.get("/results", function(req, res){
    res.render("results")
});

app.listen(3000, function(){ 
    console.log("Server is running on port 3000");
});

app.post("/", function(req, res){
    const ingredients = req.body.ingredients;

    console.log(ingredients);

    res.redirect("/results");
});

