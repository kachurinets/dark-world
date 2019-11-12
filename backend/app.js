const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const bandsRoutes = require('./routes/bands');
const userRoutes = require('./routes/user');
const generalConfigRoutes = require('./routes/general-config')
const app = express();


mongoose.connect("mongodb+srv://Dima:xj5vRWkqL2obNQqY@cluster0-yezzc.mongodb.net/node-angular?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
  next();
});

app.use("/api/bands", bandsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/general-config", generalConfigRoutes);

module.exports = app;
