const mongoose = require('mongoose');

const bandSchema = mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: false },
  imagePath: { type: String, required: false }
});

module.exports = mongoose.model('Band', bandSchema);
