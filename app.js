//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash")
const dotenv = require('dotenv').config()


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.${process.env.DB_CLUSTERNAME}.${process.env.DB_HOST}/todolistDB`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const ItemSchema = new mongoose.Schema({
  name: String
})

const Item = new mongoose.model("item", ItemSchema);


const item1 = new Item({
  name: "Welcome to your ToDoList."
})

const item2 = new Item({
  name: "Hit the + button to aff a new item."
})

const item3 = new Item({
  name: "<-- Hit this to delete an item."
})


const defaultItems = [item1, item2, item3];


const listSchema = new mongoose.Schema({
  name: String,
  items: [ItemSchema]
})
const List = mongoose.model("list", listSchema);




const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Item.find({})
    .then(function (foundItems) {

      if (foundItems.length === 0) {
        Item.insertMany(defaultItems)
          .then(function () {
            console.log("Successfully saved");
          })
          .catch(function (err) {
            console.log(err);
          })
        res.redirect("/");
      }
      else {
        res.render("list", { listTitle: "Today", newListItems: foundItems });
      }
    })
    .catch(function (err) {
      console.log(err);
    })


});

app.post("/", function (req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  })

  if (listName === "Today") {
    item.save();
    res.redirect("/")
  } else {
    List.findOne({ name: listName })
      .then(function (foundList) {
        foundList.items.push(item);
        foundList.save();
        res.redirect(`/${listName}`)
      })
      .catch(function (err) {
        console.log(err);
      })

  }


});
app.post("/delete", function (req, res) {

  console.log(req.body);
  let itemID = req.body.checkbox;
  let listName = req.body.listName;

  if (listName === "Today") {
    Item.deleteOne({ _id: itemID })
      .then(function () {
        console.log("Successfully Delete it");
      })
      .catch(function (err) {
        console.log(err);
      })
    res.redirect(`/`);
  } else {
    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: itemID } } })
      .then(function (foundList) {
        if (foundList) {
          res.redirect(`/${listName}`)
        }
      })
      .catch(function (err) {
        console.log(err);
      })


  }
});


app.get("/:customListName", function (req, res) {
  listName = _.capitalize(req.params.customListName);

  List.findOne({ name: listName })
    .then(function (foundList) {
      if (foundList) {
        res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
      } else {
        const list = new List({
          name: listName,
          items: defaultItems
        });
        list.save();
        console.log("can't found it but i'll make new one for u :)");
        res.redirect(`/${listName}`)
      }
    })
    .catch(function (err) {
      console.log(err);
    })


})




app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
