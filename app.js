//jshint esversion : 6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

//database connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/TodoListDB",{useNewUrlParser: true});

// item schema
const itemSchema = {
    name :  String,
};

//mongoose model for item schema
const Item = mongoose.model("Item",itemSchema);

// 3 new document using the schema
const item1 = new Item({ name : "Welcome to Todo List"});
const item2 = new Item({ name : "Hit the + button to add new item" });
const item3 = new Item({ name : " <-- Hit This to delete item"});
const defaultItems = [item1,item2,item3];

//--- insert into db ----
// Item.insertMany(defaultItems,function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("data Inserted");
//   }
// })


// ---  dynamic way of accessing  ---//
const listSchema = {
    name :  String,
    items : [itemSchema]
};
const List = mongoose.model("List",listSchema);

// -- GET --
app.get("/",function(req,res){
  // --- find items () ---
  Item.find({} , function(err, foundItems){  //foundItems finds everything inside items database
    if(foundItems.length === 0){
      Item.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);
        }else{
          console.log("data Inserted");
        }
        res.redirect("/");
      });
    }else{
        res.render("list",{title : "Today", newValue : foundItems});
    }
  });
});


// --- Dynamic Route ---
app.get("/:customerListname",function(req,res){
  const customerListName = req.params.customerListname;

  List.findOne({ name: customerListName },
   function (err, foundItems) {
     if(!err){
       if(!foundItems){
         //create a new list
         const list = new List ({
           name : customerListName,
           items : defaultItems,
         })
         list.save();
       }else{
         //show an existing list
         res.render("List",{title : foundItems.name, newValue : foundItems.items})
       }
     }
   });
});

app.post("/",function(req,res){

   const itemName = req.body.newItem;
   const item = new Item({ name : itemName});
   item.save();  //save it to the items collection
   res.redirect("/");
})

app.post("/delete",function(req,res){
  const idToBeDeleted = req.body.id;
  Item.findByIdAndRemove(idToBeDeleted,function(err){
    if(!err){
      res.redirect("/")
    }
  })
})



app.listen(3000,function(req,res){
  console.log("Server running at 3000")
});
