const Band = require("../models/band");


exports.createBand =  (req, res, next) => {
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
}

exports.updateBand =  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }


    console.log(req.userData.userId);
    const band = new Band({
        _id: req.body.id,
        name: req.body.name,
        imagePath: imagePath,
        info: req.body.info,
    });
    Band.updateOne(
        { _id: req.params.id, creator: req.userData.userId },
        band
    ).then(result => {
        console.log(result);
        if (result.nModified > 0) {
            res.status(200).json({ message: "Update succesful!" });
        } else {
            res.status(401).json({ message: "Not authorized" });
        }
    });
}

exports.getBands = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const bandName = req.query.name;
    if (bandName) {
        Band.findOne({'name': bandName}).then(documents => {
            fetchedBands = documents;
            res.status(200).json({
                message: "Band fetched successfully!",
                bands: fetchedBands,
            });
        })
    } else {
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
    }
}

exports.getBand = (req, res, next) => {
    Band.findById(req.params.id).then(band => {
        if (band) {
            res.status(200).json(band);
        } else {
            res.status(404).json({ message: "Band not found!" });
        }
    });
}

exports.deleteBand = (req, res, next) => {
    Band.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
        result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Deletion succesful!" });
            } else {
                res.status(401).json({ message: "Not authorized" });
            }
        }
    );
}
