const express = require("express");
const Band = require("../models/band");
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

router.post("", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const band = new Band({
        name: req.body.name,
        info: req.body.info,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId,
    });
    band.save().then(createdBand => {
        res.status(201).json({
            message: 'Post added successfully',
            band: {
                ...createdBand,
                id: createdBand._id
            }
        });
    });
});

router.put(
    "/:id",
    checkAuth,
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
        let imagePath = req.body.imagePath;
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/" + req.file.filename;
        }
        const band = new Band({
            _id: req.body.id,
            name: req.body.name,
            imagePath: imagePath,
            creator: req.userData.userId
        });
        Band.updateOne(
            { _id: req.params.id, creator: req.userData.userId },
            band
        ).then(result => {
            if (result.nModified > 0) {
                res.status(200).json({ message: "Update succesful!" });
            } else {
                res.status(401).json({ message: "Not authorized" });
            }
        });
    }
);

router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const bandQuery = Band.find();
    let fetchedBands;
    if (pageSize && currentPage) {
        bandQuery.skip(pageSize * currentPage).limit(pageSize);
    }
    bandQuery
        .then(documents => {
            fetchedBands = documents;
            return Band.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: "Bands fetched successfully!",
                bands: fetchedBands,
                maxBands: count
            });
        });
});

router.get("genre", (req, res, next) => {
    let genres = [
        "Ambient",
        "Angry Metal",
        "Atmospheric Black",
        "Avant-garde Metal",
        "Black Industrial",
        "Black Metal",
        "Brutal Death",
        "Crust",
        "Cybergrind",
        "Dark Ambient",
        "Dark Electro",
        "Dark Folk",
        "Dark Metal",
        "Darkwave",
        "Death Metal",
        "Deathcore",
        "Depressive Black",
        "Doom Metal",
        "Doom/Death Metal",
        "Drone Doom",
        "EBM",
        "Epic Metal",
        "Ethereal",
        "Extreme Metal",
        "Folk Metal",
        "Folk Rock",
        "Funeral Doom",
        "Goregrind",
        "Goth Industrial",
        "Gothic Doom/Dark",
        "Gothic Metal",
        "Gothic Rock",
        "Grindcore",
        "Heavy Metal",
        "Horror Metal",
        "Industrial",
        "Instrumental",
        "Martial Industrial",
        "Mathcore",
        "Medieval",
        "Melodic Black",
        "Melodic Death",
        "Melodic Metal",
        "Neo-Classic",
        "Neo-Classical Metal",
        "Noise",
        "NS Black Metal",
        "Occult Rock",
        "Pagan Metal",
        "Porngrind",
        "Post-Metal",
        "Power Metal",
        "Progressive Black",
        "Progressive Death",
        "Progressive Metal",
        "Raw Black Metal",
        "Shoegaze",
        "Sludge Metal",
        "Speed Metal",
        "Stoner Metal",
        "Sympho Black",
        "Symphonic Metal",
        "Technical Black",
        "Technical Death",
        "Thrash Metal",
        "True Black Metal",
        "Vampiric Metal",
        "Viking Metal"
    ];
});

/*Band.collection.find({}).forEach(function(err, doc) {
  console.log(doc, 'doc');
});*/

router.get("/:id", (req, res, next) => {
    Band.findById(req.params.id).then(band => {
        if (band) {
            res.status(200).json(band);
        } else {
            res.status(404).json({ message: "Band not found!" });
        }
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Band.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
        result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Deletion succesful!" });
            } else {
                res.status(401).json({ message: "Not authorized" });
            }
        }
    );
});

//Удалить коллекцию
/*Band.collection.drop();*/

//добавить картинки к существующим группам
router.post(
    "/add-image-loop",
    checkAuth,
    multer({ storage: storage }).array("image", 1000),
    async (req, res, next) => {
        for await (let file of req.files) {
            console.log(file, 'file');
            const url = req.protocol + "://" + req.get("host");
            Band.findOne({name: file.originalname.split('.').shift()})
                .then(async band => {
                    if (band) {
                        band.imagePath = url + "/images/" + file.filename
                        await band.save().then(createdBand => {
                            console.log(createdBand + "was added!");
                        });
                    }
                });
        }
        res.status(201).json({
            message: "Post added successfully"
        });
    }
);

module.exports = router;
