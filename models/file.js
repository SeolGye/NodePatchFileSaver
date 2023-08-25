const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  path: {
    type: String,
    required: true
  },
  uploadTime: {
    type: Date
  }
});

module.exports = mongoose.model('File', fileSchema);
