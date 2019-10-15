const mongoose = require('mongoose');

const bandSchema = mongoose.Schema({
  name: { type: String, required: true },
  info: { type: String, required: false },
  imagePath: { type: String, required: false },
  genre: { type: String, required: false },
  existence: { type: String, required: false },
  country: { type: String, required: false },
  users: { type: Array , required: false },
  albums: {type: Array, required: false }
});

module.exports = mongoose.model('Band', bandSchema);
