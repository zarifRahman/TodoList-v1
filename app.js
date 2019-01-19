//jshint esversion : 6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

let inputValueArray = ["Buy Food","Cook food"];

app.get("/",function(req,res){
  var options = { weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                };
  var today  = new Date();

  let date = today.toLocaleDateString("en-US", options);
  res.render('list',{title : date, newValue : inputValueArray});
})

app.post("/",function(req,res){
  let inputValue = req.body.newItem;
  inputValueArray.push(inputValue);
  res.redirect("/");
})


app.listen(3000,function(req,res){
  console.log("Server running at 3000")
});
