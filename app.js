//jshint esversion : 6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

let inputValueArray = ["Buy Food","Cook food"];
let workArray = ["learn JS","Complete Project"];
let taskArray = ["EJS","API"];

app.get("/",function(req,res){
  var options = { weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                };
  var today  = new Date();

  let date = today.toLocaleDateString("en-US", options);
  res.render('list',{title : date, newValue : inputValueArray});
})

app.get("/work",function(req,res){
  res.render('list',{title : "Work",newValue : workArray});
})

app.get("/task",function(req,res){
  res.render("list",{title : "Completed-Task", newValue : taskArray})
})

// app.post("/",function(req,res){
//   console.log(req.body);
//   if(req.body.button === 'Work'){
//     let workList = req.body.newItem;
//     workArray.push(workList);
//     res.redirect("/work");
//   }else{
//     let inputValue = req.body.newItem;
//     inputValueArray.push(inputValue);
//     res.redirect("/");
//   }
// })
app.post("/",function(req,res){
  console.log(req.body);
  switch (req.body.button) {
  case 'Work':
    let workList = req.body.newItem;
    workArray.push(workList);
    res.redirect("/work");
    break;
  case "Completed-Task":
    let taskList = req.body.newItem;
    taskArray.push(taskList);
    res.redirect("/task");
    break;
  default:
    let inputValue = req.body.newItem;
    inputValueArray.push(inputValue);
    res.redirect("/");

  }
})

app.listen(3000,function(req,res){
  console.log("Server running at 3000")
});
