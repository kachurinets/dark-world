
const express = require("express");
const Band = require('../models/band');
const multer = require('multer');

const router = express.Router();
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid  = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const band = new Band({
    name: req.body.name,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });
  band.save().then( createdBand => {
    res.status(201).json({
      message: 'Post added successfully',
      band: {
        ...createdBand,
        id: createdBand._id
      }
    });
  });
});

router.put("/:id", multer({storage: storage}).single("image"), (req, res, next) => {
  console.log(req.file);
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const band = new Band({
    _id: req.body.id,
    name: req.body.name,
    content: req.body.content,
    imagePath: imagePath
  });
  Band.updateOne({_id: req.params.id}, band ).then(result => {
    console.log(result);
    res.status(200).json({message: "Update succesfful"});
  });
});

router.get('', (req, res, next) => {
  Band.find().
  then(documents => {
    res.status(200).json({
      message: 'Posts fetched succesfully!',
      bands: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Band.findById(req.params.id).then(band => {
    if (band) {
      res.status(200).json(band);
    } else {
      res.status(404).json({message: 'Band not found!'})
    }
  })
});

router.delete("/:id", (req, res, next) => {
  Band.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });

});

module.exports = router;
