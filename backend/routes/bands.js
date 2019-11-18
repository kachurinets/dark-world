const express = require("express");

const checkAuth = require("../middleware/check-auth");
const multer = require("multer");

const fs = require("fs");
const path = require("path");
var request = require("request");

const router = express.Router();
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
};

const BandController = require("../controllers/bands");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
        console.log(file, 'fffffile');
        const name = file.originalname.split(".").shift();
        const filename = name
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, filename + "-" + Date.now() + "." + ext);
    }
});

router.post("", checkAuth, multer({storage: storage}).single("image"), BandController.createBand);

router.put(
    "/:id",
    checkAuth,
    multer({ storage: storage }).single("image"),
    BandController.updateBand
);

router.get("", BandController.getBands);


/*Band.collection.find({}).forEach(function(err, doc) {
  console.log(doc, 'doc');
});*/

router.get("/:id", BandController.getBand);

router.delete("/:id", checkAuth, BandController.deleteBand);

//Удалить коллекцию


//добавить картинки к существующим группам
router.post(
    "/add-image-loop",
    checkAuth,
    multer({ storage: storage }).array("image", 1000),
    async (req, res, next) => {
        for await (let file of req.files) {
            console.log(file, 'file');
            const url = req.protocol + "://" + req.get("host");
            Band.findOneAndUpdate({name: file.originalname.split('.').shift()}, {$set: {imagePath: url + "/images/" + file.filename }}, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                console.log(doc);
            });
        }
        res.status(201).json({
            message: "Post added successfully"
        });
    }
);

module.exports = router;
