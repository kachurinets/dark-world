const express = require("express");
const Band = require('../models/band');
const multer = require('multer');
const checkAuth = require("../middleware/check-auth");
const fs = require('fs');

const router = express.Router();
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
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
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
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


router.put("/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
    console.log(imagePath, 'url');
  }
  const band = new Band({
    _id: req.body.id,
    name: req.body.name,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Band.updateOne({_id: req.params.id, creator: req.userData.userId}, band).then(result => {
    console.log(result);
    if (result.nModified > 0) {
      res.status(200).json({message: "Update succesful!"})
    } else {
      res.status(401).json({message: "Not authorized"});
    }

  });
});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const bandQuery = Band.find();
  let fetchedBands;
  if (pageSize && currentPage) {
    bandQuery.skip(pageSize * currentPage).limit(pageSize);
  }
  bandQuery.then(documents => {
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

router.get("/test", checkAuth,(req, res, next) => {
  fs.readFile('backend/models/allBandInfo.json', 'utf8', function (err, data) {
    console.log('parse....')
    if (err) throw err;
    let bandData = JSON.parse(data);

    async function processArray(array) {
      for (const item of bandData) {
        await saveSchemaData(item);
      }
    }
    processArray(bandData);

    function saveSchemaData(el) {
      console.log('saved');
      new Band({
        name: el.name,
        info: el.info,
        imagePath: '',
        genre: el.genre,
        existence: el.existence,
        country: el.country,
        users: el.users,
        albums: el.albums,
        creator: req.userData.userId
      })
          .save()
          .catch(err => {
            console.log(err.message);
          });
    }

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

router.delete("/:id", checkAuth, (req, res, next) => {
  Band.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({message: "Deletion succesful!"})
    } else {
      res.status(401).json({message: "Not authorized"});
    }
  });

});



module.exports = router;
