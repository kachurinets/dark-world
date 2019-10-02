const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Band = require('./models/band');

const app = express();

mongoose.connect("mongodb+srv://Dima:xj5vRWkqL2obNQqY@cluster0-yezzc.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.post("/api/bands", (req, res, next) => {
  const band = new Band({
    name: req.body.name,
    content: req.body.content
  });
  band.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
  next();
});


app.get('/api/bands', (req, res, next) => {
  Band.find().
    then(documents => {
    res.status(200).json({
      message: 'Posts fetched succesfully!',
      bands: documents
    });
  });
});

app.delete("/api/bands/:id", (req, res, next) => {
  Band.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });

});

module.exports = app;
