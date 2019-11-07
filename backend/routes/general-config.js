const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Genre = require("../models/genre");
const jwt = require("jsonwebtoken");

router.post("/genre", (req, res, next) => {
    console.log(req, 'req');
    console.log(req.body);
    console.log(req.body.name , 'test');
    const genre = new Genre({
        name: req.body.name,
    });
    genre.save(function (err, resp) {
        if (err) {
            console.log(err);
            res.send({
                message: 'something went wrong'
            });
        } else {
            res.send({
                message: 'the appointment has been saved'
            });
        }
    })
});

router.get('/genre', (req, res, next) => {
    Genre.find().then(documents => {
        res.status(200).json({
            message: 'Genres fetched successfully!',
            genres: documents
        })
    });
});

module.exports = router;
