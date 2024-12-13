const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  author: {type: String, required: true,},
  image: { type: String, required: true },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);