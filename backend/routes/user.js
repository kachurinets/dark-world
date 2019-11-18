const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const UserController = require("../controllers/user");

router.post("/signup", UserController.createUser);

router.post('/login', UserController.userLoogin);

module.exports = router;
