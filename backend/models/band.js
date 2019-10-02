const mongoose = require('mongoose');

const bandSchema = mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('Band', bandSchema);
