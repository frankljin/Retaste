// constants for initialization
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
const ejs = require("ejs");
const api_url = "https://api.spoonacular.com/recipes/findByIngredients";
const api_key = "5ebf32f8374945ddba4efdce210b90d3";

// access files/locations required for project 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// homepage 
app.get("/", function(req, res){
    res.render("home");
});

// displays after searching 
app.get("/results", function(req, res){
    res.render("results")
});

// startup 
app.listen(3000, function(){ 
    console.log("Server is running on port 3000");
});

// take user input
app.post("/", function(req, res){
    let ingredients = req.body.ingredients;
    ingredients = ingredients.replace(/\s+/g, '');  // remove spaces

    const url = api_url + "?apiKey=" + api_key + "&ingredients=" + ingredients + "&number=6";

    https.get(url, function(response){

        // JSON is sent in chunks... make sure all is sent
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            const apibody = JSON.parse(data);
            var namelist = [];
            var imglist = [];
            var inglist = [];

            apibody.forEach(function(m){
                namelist.push(m[Object.keys(m)[1]]);
                imglist.push(m[Object.keys(m)[2]]);
                inglist.push(m[Object.keys(m)[4]]);
            })

            res.render("results", {
                names: namelist,
                images: imglist,
                ingredients: inglist
            })
        })
    });

    
});

