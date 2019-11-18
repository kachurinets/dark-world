const mongoose = require('mongoose');

const bandSchema = mongoose.Schema({
    serialNumber: {type: Number, required: false},
    name: {type: String, required: true},
    info: {type: String, required: false},
    country: {type: String, required: false},
    genre: {type: String, required: false},
    existence: {type: String, required: false},
    members: {type: Array, required: false},
    pastMembers: {type: Array, required: false},
    discography: {type: Array, required: false},
    videography: {type: Array, required: false},
    imagePath: {type: String, required: false},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model('Band', bandSchema);
