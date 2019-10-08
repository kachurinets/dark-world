
const express = require("express");
const Band = require('../models/band');

const router = express.Router();
router.post("", (req, res, next) => {
  const band = new Band({
    name: req.body.name,
    content: req.body.content
  });
  band.save().then( createdBand => {
    res.status(201).json({
      message: 'Post added successfully',
      bandId: createdBand._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const band = new Band({
    _id: req.body.id,
    name: req.body.name,
    content: req.body.content
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
