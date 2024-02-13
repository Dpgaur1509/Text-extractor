// Create a file named imageModel.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  text_content: {
    type: String,
    required: true,
  },
  bold_words: {
    type: [String],
    required: true,
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
