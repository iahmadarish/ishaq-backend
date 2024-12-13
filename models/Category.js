// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }, // Optional description for each category
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Array of course IDs
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
