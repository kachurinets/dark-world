const mongoose = require('mongoose');

const bandSchema = mongoose.Schema({
  name: { type: String, required: true },
  info: { type: String, required: false },
  imagePath: { type: String, required: false },
  genre: { type: String, required: false },
  existence: { type: String, required: false },
  country: { type: String, required: false },
  users: { type: String , required: false },
  albums: {type: String, required: false },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Band', bandSchema);
